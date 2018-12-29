module.exports = function (deps) {

    const gameController = deps.gameController;
    const userRepository = deps.userRepository;

    return {
        namespaced: true,
        state: {
            scene: 'loading',
            playerId: userRepository.getOwnUser().id,
            screenplays: [],
            transient: {
                playersThatWantToMoveOn: []
            }
        },
        getters: {},
        mutations: {},
        actions: {
            updateState,
            bidOnScreenplay,
            endBidding,
            goToActorBidding,
            bidOnActor
        }
    };

    function updateState({ state }, mergeData) {
        for (const key of Object.keys(mergeData)) {
            state[key] = mergeData[key]
        }
    }

    function bidOnScreenplay({}, name) {
        gameController.emit('bidOnScreenplay', { name });
    }

    function endBidding({}) {
        gameController.emit('endBidding');
    }

    function goToActorBidding({}) {
        gameController.emit('goToActorBidding');
    }

    function bidOnActor({}, name) {
        gameController.emit('bidOnActor', { name });
    }
}