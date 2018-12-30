<template>
    <div class="gameMap">
        <div class="biomes">
            <div v-for="biome in biomes" class="biome" :style="{backgroundImage: `url(/image/${biome.name}.jpg)` }">
                <span class="biome-name">{{ biome.name }}</span>
            </div>
        </div>
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
                'biomes'
            ])
        }
    };
</script>
<style lang="scss">
    @import "./screenplayBidding";
    @import "./gameMap";
</style>