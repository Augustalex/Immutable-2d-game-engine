<template>
    <div class="screenplay-bidding smallScene">
        <h1 class="header">
            Bid for screenplays
        </h1>
        <div class="screenplays">
            <div v-for="screenplay in screenplays" class="screenplay">
                <span class="screenplay-name">
                    {{ screenplay.name }}
                </span>
                <span class="screenplay-hasLatestBid" v-if="playerId === screenplay.ownerId">
                    HAS LATEST BID FOR {{ screenplay.price }}
                </span>
                <template v-else>
                    <span :class="['screenplay-status', screenplay.status === 'available' ? 'screenplay-status--available' : 'screenplay-status--hasBid']"/>
                    <button class="screenplay-bid screenplay-button" @click="bidOnScreenplay(screenplay.name)">
                        Bid {{ screenplay.price }}
                    </button>
                </template>
            </div>
        </div>
        <button class="screenplay-endBidding screenplay-button" @click="endBidding">End bidding</button>
    </div>
</template>
<script>
    const Vuex = require('vuex');
    const {
        mapState,
        mapActions
    } = Vuex.createNamespacedHelpers('game');

    module.exports = {
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'playerId',
                'screenplays'
            ])
        },
        methods: {
            ...mapActions([
                'bidOnScreenplay',
                'endBidding'
            ])
        }
    };
</script>
<style scoped lang="scss">
    @import "./screenplayBidding";
</style>