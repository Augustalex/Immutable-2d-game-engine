module.exports = function ActorBidService(deps) {

    const socketRepository = deps.socketRepository;
    const userRepository = deps.userRepository;
    const stateService = deps.stateService;

    return {
        bidOnActor,
        endBidding
    };

    function bidOnActor(playerId, { name }) {
        stateService.update(state => {
            const actor = state.actors.find(s => s.name === name);
            actor.price += 1000;
            actor.status = 'hasBid';
            actor.ownerId = playerId;
        });

        socketRepository
            .getSocketMaster()
            .emit('action', {
                action: 'updateState',
                value: stateService.getState()
            });
    }

    async function endBidding(playerId) {
        await stateService.update(async state => {
            state.transient.playersThatWantToMoveOn.push(playerId);

            let allUsers = await userRepository.getAll();
            const totalAmountOfUsers = allUsers.length;
            if (state.transient.playersThatWantToMoveOn.length >= totalAmountOfUsers) {
                let boughtActors = state.actors.filter(s => !!s.ownerId);
                for (const actor of boughtActors) {
                    actor.status = 'notAvailable';
                }

                state.scene = 'map';

                state.transient.playersThatWantToMoveOn = [];
            }
        });

        socketRepository
            .getSocketMaster()
            .emit('action', {
                action: 'updateState',
                value: stateService.getState()
            });
    }
}