<template>
    <div class="post-screenplay-bidding smallScene">
        <h1 class="header">
            Bidding for screenplays is over - You have ${{ funds }}
        </h1>
        <template v-if="ownScreenplays.length === 0">
            <h2 class="header">You have no screenplays...</h2>
        </template>
        <template v-else>
            <h2 class="header">Your screenplays:</h2>
            <div class="screenplays">
                <div v-for="screenplay in ownScreenplays" class="screenplay">
                    <div class="screenplay-row">
                        <span class="screenplay-name" :title="screenplay.name">
                            {{ screenplay.name }}
                        </span>
                        <span v-if="playerId === screenplay.ownerId" class="screenplay-hasLatestBid">
                            Has bid for <strong>{{ screenplay.price }}</strong>
                        </span>
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
        </template>
        <button
                :disabled="transient.playersThatWantToMoveOn.includes(playerId)"
                class="screenplay-endBidding screenplay-button"
                @click="goToActorBidding">
            Go to Actor bidding
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
            return {};
        },
        computed: {
            ...mapState([
                'playerId',
                'screenplays'
            ]),
            ownScreenplays() {
                return this.screenplays.filter(s => s.ownerId === this.playerId);
            },
            funds() {
                let totalCost = this.ownScreenplays.reduce((acc, s) => acc + this.getScreenplayTotalCost(s), 0)
                return 100000 - totalCost;
            }
        },
        methods: {
            ...mapActions(['goToActorBidding']),
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