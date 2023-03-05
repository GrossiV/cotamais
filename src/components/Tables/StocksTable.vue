<script setup>
import AssetCell from './Cells/AssetCell.vue'
import IconUp from '../icons/IconUp.vue'
import IconDown from '../icons/IconDown.vue'

defineProps({
  assets: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <h2 class="title">Índices de bolsas de valores pelo mundo</h2>
  <div class="panel-container">
    <template :key="key" v-for="(stock, key) in assets">
      <div class="asset-tile" v-if="stock.variation">
        <AssetCell>
          <template #heading>
            <p>{{ key }}</p>
          </template>
          <template #body>
            <p v-if="stock.variation > 0" class="asset-tile__main-info success">
              <IconUp /> {{ stock.variation }}
            </p>
            <p v-else-if="stock.variation < 0" class="asset-tile__main-info danger">
              <IconDown /> {{ stock.variation }}
            </p>
            <p v-else class="asset-tile__main-info">{{ stock.variation }}</p>
          </template>
          <template #footer>
            <p>{{ stock.location }}</p>
          </template>
        </AssetCell>
        <hr class="panel-container__divider" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
}
.panel-container {
  display: grid;
  place-items: center;
  max-width: 980px;
  margin: 60px auto;
  gap: 20px;
}
.asset-tile {
  text-align: center;
}
.asset-tile__main-info {
  font-size: 1.7rem;
  font-weight: 500;
}
.success {
  color: var(--success);
}
.danger {
  color: var(--danger);
}
.panel-container__divider {
  width: 150px;
  margin: 12px auto;
}
@media (min-width: 425px) {
  .panel-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }
}

@media (min-width: 728px) {
  .panel-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
  }
}
</style>
