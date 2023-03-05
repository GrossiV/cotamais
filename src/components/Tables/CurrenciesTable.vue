<script setup>
import Chip from '../Chip.vue'
import AssetCell from './Cells/AssetCell.vue';

defineProps({
  assets: {
    type: Object,
    default: () => {}
  },
})

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}

function chipType(variation) {
  if (variation > 0) {
    return 'success'
  } 
  return 'danger'
}

</script>

<template>
  <h2 class="title">Acompanhe as principais moedas</h2>
  <div class="panel-container">
    <template :key="key" v-for="( currency, key ) in assets">
      <div class="asset-tile" v-if="currency.buy">
        <AssetCell>
            <template #heading>
              <div class="asset-tile__heading">
                <p class="asset-tile__heading-title">{{ key }}</p>
                <div class="asset-tile__heading-chip">
                  <Chip :type="chipType(currency.variation)" :text="currency.variation + ' %'"/>
                </div>
              </div>
            </template>
            <template #body>
            <p class="asset-tile__main-info">{{ formatCurrency(currency.buy)  }}</p>
            </template>
            <template #footer>
            <p>{{currency.name}}</p>
          </template>
        </AssetCell>
        <hr class="panel-container__divider"/>
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
}
.asset-tile {
  text-align: center;
}
.asset-tile__heading {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.asset-tile__heading-title {
  font-weight: bold;
}
.asset-tile__heading-chip {
  margin-bottom: 5.5px;
}

.asset-tile__main-info {
 font-size: 1.7rem;
 font-weight: 500;
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