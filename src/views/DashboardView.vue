<script setup>
//TODO create logout function / button
//TODO create topbar
//TODO theme based on the blog
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/auth/auth';
import { getStocksAndCurrencies } from '@/services/dashboard-service'
import PanelCurrencies from '../components/Panels/PanelCurrencies.vue'
import PanelStocks from '../components/Panels/PanelStocks.vue'

const router = useRouter();

const dashboardData =  reactive({ 
  stocks: {},
  currencies: {} })

// TODO create loading effect / skeleton for mounted.
async function getDasboardData() {
  try {
    const {stocks, currencies} =  await getStocksAndCurrencies()
    dashboardData.stocks = stocks
    dashboardData.currencies = currencies
  } catch(err) {
    // TODO warn user
    console.error(err);
  }
}

onMounted(() => {
  console.log(`the component is now mounted.`)
  if (!isAuthenticated()) {
    router.push({name: 'login'})
  }
  getDasboardData();
})
</script>

<template>
  <div class="dashboard">
    <h1>DASHBOARD</h1>
      <PanelStocks :assets="dashboardData.stocks"/>
      <PanelCurrencies :assets="dashboardData.currencies"/>
  </div>
</template>

<style scoped>
.asset-tile {
  text-align: center;
  margin: 10px;
}
</style>