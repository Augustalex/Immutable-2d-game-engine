module.exports = function ScreenplayBidService(deps) {

    const socketRepository = deps.socketRepository;
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

    function endBidding() {
        stateService.update(state => {
            for (const screenplay of state.screenplays) {
                screenplay.status = 'notAvailable';
            }

            state.scene = 'postScreenplayBidding';
        });

        socketRepository
            .getSocketMaster()
            .emit('action', {
                action: 'updateState',
                value: stateService.getState()
            });
    }
}