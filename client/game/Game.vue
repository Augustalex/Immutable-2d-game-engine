<template>
    <div class="game">
        <h1 v-if="scene === 'loading'">LOADING</h1>
        <screenplay-bidding v-else-if="scene === 'screenplayBidding'"/>
        <post-screenplay-bidding v-else-if="scene === 'postScreenplayBidding'"/>
    </div>
</template>
<script>
    const ScreenplayBidding = require('./ScreenplayBidding.vue').default;
    const PostScreenplayBidding = require('./PostScreenplayBidding.vue').default;
    const Vuex = require('vuex');
    const {
        mapState
    } = Vuex.createNamespacedHelpers('game');

    module.exports = {
        computed: {
            ...mapState(['scene'])
        },
        components: {
            ScreenplayBidding,
            PostScreenplayBidding
        }
    };
</script>
<style lang="scss">
    .game {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .smallScene {
        width: 800px;
        display: flex;
        flex-direction: column;
    }
</style>