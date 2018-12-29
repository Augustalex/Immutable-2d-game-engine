<
<template>
    <div class="gameMap">
    </div>
</template>
<script>
    const Vuex = require('vuex');
    const {
        mapState
    } = Vuex.createNamespacedHelpers('game');

    module.exports = {
        computed: {
            ...mapState([

            ])
        },
        components: {
            ScreenplayBidding,
            PostScreenplayBidding,
            ActorBidding,
            GameMap
        }
    };
</script>
<style lang="scss">
    @import "./screenplayBidding";
    @import "./gameMap";
</style>