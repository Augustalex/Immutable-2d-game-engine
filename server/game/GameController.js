const State = require('./State.js');
const ScreenplayBidService = require('./ScreenplayBidService.js');
const ActorBidService = require('./ActorBidService.js');
const ScreenplayGenerator = require('../screenplay/ScreenplayGenerator.js');
const ActorGenerator = require('../actor/ActorGenerator.js');

module.exports = function (deps) {

    const socketRepository = deps.socketRepository;
    const userRepository = deps.userRepository;

    const screenplayGenerator = ScreenplayGenerator();
    const actorGenerator = ActorGenerator();

    const stateService = State({
        ...deps,
        originalState: {
            scene: 'screenplayBidding',
            screenplays: range(10, () => screenplayGenerator.generate()),
            actors: actorGenerator.generate(7),
            transient: {
                playersThatWantToMoveOn: []
            },
            fundsByPlayerId: {}
        }
    });
    const screenplayBidService = ScreenplayBidService({ ...deps, stateService });
    const actorBidService = ActorBidService({ ...deps, stateService });

    return {
        bidOnScreenplay: (playerId, { name }) => screenplayBidService.bidOnScreenplay(playerId, { name }),
        endBidding: playerId => screenplayBidService.endBidding(playerId),
        bidOnActor: (playerId, { name }) => actorBidService.bidOnActor(playerId, { name }),
        goToActorBidding,
        requestState
    }

    async function goToActorBidding(playerId) {
        await stateService.update(async state => {
            state.transient.playersThatWantToMoveOn.push(playerId);

            let playersReady = state.transient.playersThatWantToMoveOn.length;
            let allUsers = await userRepository.getAll();
            if (playersReady >= allUsers.length) {
                state.scene = 'actorBidding';
                state.transient.playersThatWantToMoveOn = [];

                for (const user of allUsers) {
                    const totalScreenplayCosts = state.screenplays
                        .filter(s => s.ownerId === user.id)
                        .reduce((acc, s) => s.acts.reduce((acc2, a) => acc2 + a.productionTime * 3000, 0), 0);
                    state.fundsByPlayerId[user.id] = 100000 - totalScreenplayCosts;
                }
            }
        });

        socketRepository
            .getSocketMaster()
            .emit('action', {
                action: 'updateState',
                value: stateService.getState()
            });
    }

    function requestState(playerId) {
        const connection = socketRepository.getForUser(playerId);

        connection.emit('action', {
            action: 'updateState',
            value: stateService.getState()
        })
    }
};

function range(count, callback) {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(callback());
    }
    return result;
}