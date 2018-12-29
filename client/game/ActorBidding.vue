<template>
    <div class="screenplay-bidding smallScene">
        <h1 class="header">
            Bid for actors - You have ${{ funds }}
        </h1>
        <div class="screenplays">
            <div v-for="actor in actors" class="screenplay">
                <div class="screenplay-row">
                    <span class="screenplay-name" :title="actor.name">
                        {{ actor.name }}
                    </span>
                    <span class="screenplay-hasLatestBid" v-if="playerId === actor.ownerId">
                        Has bid for <strong>{{ actor.price }}</strong>
                    </span>
                    <template v-else>
                        <span :class="['screenplay-status', actor.status === 'available' ? 'screenplay-status--available' : 'screenplay-status--hasBid']"/>
                        <button class="screenplay-bid screenplay-button" @click="bidOnScreenplay(actor.name)">
                            Bid {{ actor.price }}
                        </button>
                    </template>
                </div>
                <div class="screenplay-row">
                    <div class="screenplay-totalProductionTime">
                        Prod. time:
                        <strong>{{ getScreenplayTotalProductionTime(actor) }} months</strong>
                    </div>
                    <div class="screenplay-totalCost">
                        Cost:
                        <strong>${{ getScreenplayTotalCost(actor) }}</strong>
                    </div>
                </div>
                <div class="screenplay-row screenplay-row--stack">
                    <span class="screenplay-genre">
                        Main genre: <strong>{{ actor.genre }}</strong>
                    </span>
                    <div class="screenplay-acts">
                        <div v-for="act, index in actor.acts" class="screenplay-act">
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
            };
        },
        computed: {
            ...mapState([
                'playerId',
                'actors',
                'transient',
                'fundsByPlayerId'
            ]),
            ownActors() {
                return this.screenplays.filter(s => s.ownerId === this.playerId);
            },
            funds() {
                let totalCost = this.ownActors.reduce((acc, s) => acc + this.getActorTotalCost(s), 0)
                return (this.fundsByPlayerId || 0) - totalCost;
            },
            hasClickedEndBidding() {
                console.log(this.transient.playersThatWantToMoveOn.includes(this.playerId))
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