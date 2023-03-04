<script setup>
import Chip from '../Chip.vue'
import AssetTile from '../AssetTile.vue';

defineProps({
  assets: {
    type: Object,
    default: () => {}
  },
})


function chipType(variation) {
  if (variation > 0) {
    return 'success'
  } 
  return 'danger'
}

</script>

<template>
    <div class="asset-tile" :key="key" v-for="( currency, key ) in assets">
        <AssetTile v-if="currency.buy">
            <template #heading>
            <p>{{ key }}
            <Chip :type="chipType(currency.variation)" :text="currency.variation + ' %'"/> </p>
            </template>
            <template #body>
            <p>R$ {{currency.buy}}</p>
            </template>
            <template #footer>
            <p>{{currency.name}}</p>
            </template>
        </AssetTile>
    </div>
</template>

<style scoped>
.asset-tile {
  text-align: center;
  margin: 10px;
}
</style>