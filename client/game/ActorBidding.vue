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
                        <button class="screenplay-bid screenplay-button" @click="bidOnActor(actor.name)">
                            Bid {{ actor.price }}
                        </button>
                    </template>
                </div>
                <div class="screenplay-row actor-genres">
                    <span class="screenplay-genre">
                        Genres:
                    </span>
                    <div v-for="knownGenre, index in actor.knownGenres" class="actor-genre">
                        <strong v-if="knownGenre.experience === 1">--</strong>
                        <strong v-if="knownGenre.experience === 2"></strong>
                        <strong v-if="knownGenre.experience === 3">++</strong>
                        {{ knownGenre.genre }}{{ index < actor.knownGenres.length - 1 ? ',' : '' }}
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
            return {};
        },
        computed: {
            ...mapState([
                'playerId',
                'actors',
                'transient',
                'fundsByPlayerId'
            ]),
            ownActors() {
                return this.actors.filter(s => s.ownerId === this.playerId);
            },
            funds() {
                let totalCost = this.ownActors.reduce((acc, actor) => acc + actor.price, 0)
                console.log(this.fundsByPlayerId, this.playerId)
                return (this.fundsByPlayerId[this.playerId] || 0) - totalCost;
            },
            hasClickedEndBidding() {
                return this.transient.playersThatWantToMoveOn.includes(this.playerId);
            }
        },
        methods: {
            ...mapActions([
                'bidOnActor',
                'endBidding'
            ])
        }
    };
</script>
<style scoped lang="scss">
    @import "./screenplayBidding";
</style>