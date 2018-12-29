<template>
    <div class="screenplay-bidding smallScene">
        <h1 class="header">
            Bid for screenplays - You have ${{ funds }}
        </h1>
        <div class="screenplays">
            <div v-for="screenplay in screenplays" class="screenplay">
                <div class="screenplay-row">
                    <span class="screenplay-name" :title="screenplay.name">
                        {{ screenplay.name }}
                    </span>
                    <span class="screenplay-hasLatestBid" v-if="playerId === screenplay.ownerId">
                        Has bid for <strong>{{ screenplay.price }}</strong>
                    </span>
                    <template v-else>
                        <span :class="['screenplay-status', screenplay.status === 'available' ? 'screenplay-status--available' : 'screenplay-status--hasBid']"/>
                        <button class="screenplay-bid screenplay-button" @click="bidOnScreenplay(screenplay.name)">
                            Bid {{ screenplay.price }}
                        </button>
                    </template>
                </div>
                <div class="screenplay-row">
                    <div class="screenplay-totalProductionTime">
                        Prod. time:
                        <strong>{{ getScreenplayTotalProductionTime(screenplay) }} months</strong>
                    </div>
                    <div class="screenplay-totalCost">
                        Cost:
                        <strong>${{ getScreenplayTotalCost(screenplay) }}</strong>
                    </div>
                </div>
                <div class="screenplay-row screenplay-row--stack">
                    <span class="screenplay-genre">
                        Main genre: <strong>{{ screenplay.genre }}</strong>
                    </span>
                    <div class="screenplay-acts">
                        <div v-for="act, index in screenplay.acts" class="screenplay-act">
                            Act {{ (index + 1) }}:
                            <strong>{{ act.genre }}</strong>
                            ({{ act.productionTime }} months)
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button
                :disabled="hasClickedEndBidding"
                class="screenplay-endBidding screenplay-button"
                @click="endBidding">
            End bidding
        </button>
        <portal to="game">
            <template v-if="viewActsForScreenplay">
                <div @click="viewActsForScreenplay = null" class="modal-overlay"/>
                <div class="modal">
                    <div @click="viewActsForScreenplay = null" class="modal-close">X</div>
                    <div class="modal-header">{{ viewActsForScreenplay.name }}</div>
                    <div class="screenplay-acts">
                        <div v-for="act, index in viewActsForScreenplay.acts" class="screenplay-act">
                            {{ (index + 1) }} {{ act.genre }} ({{ act.productionTime }} months)
                        </div>
                    </div>
                </div>
            </template>
        </portal>
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
            return {
                viewActsForScreenplay: null
            };
        },
        computed: {
            ...mapState([
                'playerId',
                'screenplays',
                'transient'
            ]),
            ownScreenplays() {
                return this.screenplays.filter(s => s.ownerId === this.playerId);
            },
            funds() {
                let totalCost = this.ownScreenplays.reduce((acc, s) => acc + this.getScreenplayTotalCost(s), 0)
                return 100000 - totalCost;
            },
            hasClickedEndBidding() {
                return this.transient.playersThatWantToMoveOn.includes(this.playerId);
            }
        },
        methods: {
            ...mapActions([
                'bidOnScreenplay',
                'endBidding'
            ]),
            getScreenplayTotalProductionTime(screenplay) {
                return screenplay.acts.reduce((acc, act) => acc + act.productionTime, 0);
            },
            getScreenplayTotalCost(screenplay) {
                return this.getScreenplayTotalProductionTime(screenplay) * 3000;
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "./screenplayBidding";
</style>