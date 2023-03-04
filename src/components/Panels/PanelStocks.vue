<script setup>
import AssetTile from '../AssetTile.vue';

defineProps({
  assets: {
    type: Object,
    default: () => {}
  },
})
</script>

<template>
    <div :key="key" class="asset-tile" v-for="( stock, key ) in assets">
        a
      <AssetTile>
          <template #heading>
            <p>{{ key }}</p>
          </template>
          <template #body>
        <p>{{stock.variation}}</p>
          </template>
          <template #footer>
        <p>{{stock.location}}</p>
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