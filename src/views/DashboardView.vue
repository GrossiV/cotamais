<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/auth/auth';
import { getStocksAndCurrencies } from '@/services/dashboard-service'
import PanelCurrencies from '../components/Panels/PanelCurrencies.vue'
import PanelStocks from '../components/Panels/PanelStocks.vue'
import TopBar from '../components/TopBar.vue'
import Alert from '../components/Alert.vue';

const router = useRouter();

const alertText = ref('')
const alertType = ref('')

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
    alertText.value = 'Erro ao buscar dados, tente novamente mais tarde.'
    alertType.value = 'danger'
    console.error(err)
  }
}

onMounted(() => {
  if (!isAuthenticated()) {
    router.push({name: 'login'})
  }
  getDasboardData();
})
</script>

<template>
  <TopBar/>
  <div class="container">
    <Alert class="alert" :type="alertType" :text="alertText" />
    <div class="dashboard">
      <PanelCurrencies :assets="dashboardData.currencies"/>
      <PanelStocks :assets="dashboardData.stocks"/>
    </div>
  </div>
</template>
 <style scoped>
 .container {
  padding: 0 24px;
 }
</style>
