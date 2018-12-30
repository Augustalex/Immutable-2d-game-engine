module.exports = function (deps) {

    const gameController = deps.gameController;
    const userRepository = deps.userRepository;

    return {
        namespaced: true,
        state: {
            scene: 'loading',
            biomes: [],
            playerId: userRepository.getOwnUser().id,
            screenplays: [],
            actors: [],
            transient: {
                playersThatWantToMoveOn: []
            },
            fundsByPlayerId: {}
        },
        getters: {},
        mutations: {},
        actions: {
            updateState,
            bidOnScreenplay,
            endBidding,
            endActorBidding,
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

    function endActorBidding({}) {
        gameController.emit('endActorBidding');
    }

    function goToActorBidding({}) {
        gameController.emit('goToActorBidding');
    }

    function bidOnActor({}, name) {
        gameController.emit('bidOnActor', { name });
    }
}