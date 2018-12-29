module.exports = function ScreenplayBidService(deps) {

    const socketRepository = deps.socketRepository;
    const userRepository = deps.userRepository;
    const stateService = deps.stateService;

    return {
        bidOnScreenplay,
        endBidding
    };

    function bidOnScreenplay(playerId, { name }) {
        stateService.update(state => {
            const screenplay = state.screenplays.find(s => s.name === name);
            screenplay.price += 1000;
            screenplay.status = 'hasBid';
            screenplay.ownerId = playerId;
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

            const totalAmountOfUsers = (await userRepository.getAll()).length;
            if (state.transient.playersThatWantToMoveOn.length >= totalAmountOfUsers) {
                let boughtScreenplays = state.screenplays.filter(s => !!s.ownerId);
                for (const screenplay of boughtScreenplays) {
                    screenplay.status = 'notAvailable';
                }

                state.scene = 'postScreenplayBidding';

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