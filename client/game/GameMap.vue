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
        <portal to="game">
            <div v-if="selectedBiomeSlots.length > 0" class="sidebar">
                <h1 class="sidebar-header">Assign Act</h1>
                <div v-if="applicableScreenplays.length === 0" class="sidebar-alert">
                    No applicable acts for slots
                </div>
                <div v-else>
                    <div v-for="screenplay in applicableScreenplays">
                        <h2>{{ screenplay.name }}</h2>
                        <div>
                            <div class="screenplay-acts">
                                <div v-for="act, index in screenplay.acts"
                                     class="screenplay-act">
                                    {{ (index + 1) }} {{ act.genre }} ({{ act.productionTime }} months)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </portal>
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
                'playerId',
                'biomes',
                'actors',
                'screenplays'
            ]),
            applicableScreenplays() {
                return this.screenplays
                    .filter(s => s.ownerId === this.playerId)
                    .map(screenplay => {
                        return {
                            name: screenplay.name,
                            acts: screenplay.acts.filter(act => act.productionTime === this.selectedBiomeSlots.length)
                        }
                    })
                    .filter(screenplay => screenplay.acts.length > 0);
            }
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
            },
            getAssignableActsInScreenplay(screenplay) {
                return screenplay.acts;
            }
        }
    };
</script>
<style lang="scss">
    @import "./screenplayBidding";
    @import "./gameMap";
    @import "./sidebard";
</style>