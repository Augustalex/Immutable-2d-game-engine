<template>
    <div class="game">
        <h1 v-if="scene === 'loading'">LOADING</h1>
        <screenplay-bidding v-else-if="scene === 'screenplayBidding'"/>
        <post-screenplay-bidding v-else-if="scene === 'postScreenplayBidding'"/>
        <actor-bidding v-else-if="scene === 'actorBidding'"/>
        <portal-target name="game"/>
    </div>
</template>
<script>
    const Vuex = require('vuex');
    const {
        mapState
    } = Vuex.createNamespacedHelpers('game');
    const ScreenplayBidding = require('./ScreenplayBidding.vue').default;
    const PostScreenplayBidding = require('./PostScreenplayBidding.vue').default;
    const ActorBidding = require('./ActorBidding.vue').default;

    module.exports = {
        computed: {
            ...mapState(['scene'])
        },
        components: {
            ScreenplayBidding,
            PostScreenplayBidding,
            ActorBidding
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