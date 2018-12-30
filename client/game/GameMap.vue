<template>
    <div class="gameMap">
        <div class="biomes">
            <div v-for="biome in biomes" class="biome" :style="{backgroundImage: `url(/image/${biome.name}.jpg)` }">
                <span class="biome-name">{{ biome.name }}</span>
                <div class="biome-slots">
                    <div v-for="_, index in 4"
                         @click="biomeSlotClick(biome, index)"
                         :class="getSlotClasses(biome, index)">
                        {{ index }}
                    </div>
                </div>
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
        data() {
            return {
                selectedBiomeSlots: []
            }
        },
        computed: {
            ...mapState([
                'biomes'
            ])
        },
        methods: {
            getSlotClasses(biome, slotIndex) {
                const classes = ['biome-slot'];
                let alreadyHasSlotSelected = this.selectedBiomeSlots.some(s => {
                    return s.biome.name === biome.name
                        && s.slotIndex === slotIndex;
                });
                if (alreadyHasSlotSelected) {
                    classes.push('biome-slot--selected');
                }
                return classes;
            },
            biomeSlotClick(biome, slotIndex) {
                let hasOtherBiomeSelected = this.selectedBiomeSlots.some(s => s.biome.name !== biome.name);
                if (hasOtherBiomeSelected) {
                    this.selectedBiomeSlots = [{ biome, slotIndex }]
                    return;
                }

                let alreadyHasSlotSelected = this.alreadyHasSlotSelected(biome, slotIndex)
                if (alreadyHasSlotSelected) {
                    this.selectedBiomeSlots = this.selectedBiomeSlots.filter(s => s.slotIndex !== slotIndex);
                }
                else {
                    this.selectedBiomeSlots.push({ biome, slotIndex });
                }

                if (this.selectedBiomeSlots.length > 0) {
                    const sortedByIndex = this.selectedBiomeSlots.slice().sort((a, b) => a.slotIndex - b.slotIndex);
                    const isInSequence = sortedByIndex[sortedByIndex.length - 1].slotIndex - sortedByIndex[0].slotIndex === this.selectedBiomeSlots.length - 1;
                    if (!isInSequence) {
                        this.selectedBiomeSlots = alreadyHasSlotSelected ? [] : [{ biome, slotIndex }];
                    }
                }
            },
            alreadyHasSlotSelected(biome, slotIndex) {
                return this.selectedBiomeSlots.some(s => {
                    return s.biome.name === biome.name
                        && s.slotIndex === slotIndex;
                });
            }
        }
    };
</script>
<style lang="scss">
    @import "./screenplayBidding";
    @import "./gameMap";
</style>