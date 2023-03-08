<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/auth/auth'
import { getStocksAndCurrencies } from '@/services/dashboard-service'
import TopBar from '../components/TopBar.vue'
import Alert from '../components/AlertRow.vue'
import Loader from '../components/LoaderCircular.vue'
import CurrenciesTable from '../components/Tables/CurrenciesTable.vue'
import StocksTable from '../components/Tables/StocksTable.vue'
import LineChart from '../components/Charts/LineChart.vue'
import { RESULTS } from '../utils/constants'

const router = useRouter()

const alertText = ref('')
const alertType = ref('')
const isLoading = ref(true)
const chart = ref(null)

const chartConfig = reactive({
  show: false,
  chartData: {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        tension: 0,
        borderColor: '',
        backgroundColor: '',
        fill: true
      }
    ]
  },
  chartOptions: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }
})

const dashboardData = reactive({
  stocks: {},
  currencies: {}
})

const datasets = reactive({})

function processChartData() {
  const date = Object.keys(RESULTS)
  const assets = Object.keys(RESULTS[date])
  for (let asset of assets) {
    datasets[asset] = {
      labels: Object.keys(RESULTS[Object.keys(RESULTS)][asset]),
      data: Object.values(RESULTS[Object.keys(RESULTS)][asset])
    }
  }
}

async function getDasboardData() {
  try {
    const { stocks, currencies } = await getStocksAndCurrencies()
    dashboardData.stocks = stocks
    dashboardData.currencies = currencies
    processChartData()
  } catch (err) {
    alertText.value = 'Erro ao buscar dados, tente novamente mais tarde.'
    alertType.value = 'danger'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function setChartData(currency) {
  chartConfig.show = true
  chartConfig.chartData = {
    labels: datasets[currency].labels,
    datasets: [
      {
        label: currency,
        data: datasets[currency].data,
        tension: 0,
        borderColor: 'rgb(53, 209, 165)',
        backgroundColor: 'rgba(53, 209, 165, 0.2)',
        fill: true
      }
    ]
  }
}

function scrollToChart(currency) {
  setChartData(currency)
  chart.value.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (!isAuthenticated()) {
    router.push({ name: 'login' })
  }
  getDasboardData()
})
</script>

<template>
  <TopBar />
  <Loader v-if="isLoading" />
  <div v-else class="container">
    <Alert class="alert" :type="alertType" :text="alertText" />
    <div class="dashboard">
      <CurrenciesTable @focus-on-chart="scrollToChart" :assets="dashboardData.currencies" />
      <span ref="chart"></span>
      <div class="dashboard__chart">
        <LineChart
          :show="chartConfig.show"
          :chartData="chartConfig.chartData"
          :chartOptions="chartConfig.options"
        />
      </div>
      <StocksTable :assets="dashboardData.stocks" />
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 0 24px;
}

.dashboard__chart {
  max-width: 980px;
  margin: 0 auto 80px auto;
}
</style>
