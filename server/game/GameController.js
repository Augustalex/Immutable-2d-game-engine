const State = require('./State.js');
const ScreenplayBidService = require('./ScreenplayBidService.js');

module.exports = function (deps) {

    const socketRepository = deps.socketRepository;

    const stateService = State({
        scene: 'screenplayBidding',
        screenplays: [
            { name: 'TEST', price: 10000, status: 'available' }
        ]
    });
    const screenplayBidService = ScreenplayBidService({ ...deps, stateService });

    return {
        bidOnScreenplay: (playerId, { name }) => screenplayBidService.bidOnScreenplay(playerId, { name }),
        endBidding: playerId => screenplayBidService.endBidding(playerId),
        requestState
    }

    function requestState(playerId) {
        const connection = socketRepository.getForUser(playerId);

        connection.emit('action', {
            action: 'updateState',
            value: stateService.getState()
        })
    }
};