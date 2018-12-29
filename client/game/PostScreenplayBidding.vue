<template>
    <div class="post-screenplay-bidding smallScene">
        <h1 class="header">
            Bidding for screenplays is over
        </h1>
        <template v-if="ownScreenplays.length === 0">
            <h2 class="header">You have no screenplays...</h2>
        </template>
        <template v-else>
            <h2 class="header">Your screenplays:</h2>
            <div class="screenplays">
                <div v-for="screenplay in ownScreenplays">
                    {{ screenplay.name }} -- bought for {{ screenplay.price }}
                </div>
            </div>
        </template>
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
            }
        },
        methods: {
            ...mapActions([])
        }
    };
</script>
<style scoped lang="scss">
    @import "./screenplayBidding";
</style>