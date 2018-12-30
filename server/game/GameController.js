const State = require('./State.js');
const ScreenplayBidService = require('./ScreenplayBidService.js');
const ActorBidService = require('./ActorBidService.js');
const ScreenplayGenerator = require('../screenplay/ScreenplayGenerator.js');
const ActorGenerator = require('../actor/ActorGenerator.js');
const BiomeGenerator = require('../map/Map.js');

module.exports = function (deps) {

    const socketRepository = deps.socketRepository;
    const userRepository = deps.userRepository;

    const screenplayGenerator = ScreenplayGenerator();
    const actorGenerator = ActorGenerator();
    const biomeGenerator = BiomeGenerator();

    const stateService = State({
        ...deps,
        originalState: {
            scene: 'screenplayBidding',
            screenplays: screenplayGenerator.generate(10),
            actors: actorGenerator.generate(10),
            biomes: biomeGenerator.generate(),
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
        endActorBidding: playerId => actorBidService.endBidding(playerId),
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
                        .reduce((acc, s) => s.price - 1000, 0);
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