<!-- eslint-disable -->
<template>
  <div v-if="show">
    <!-- eslint-disable -->
    <Line :options="chartOptions" :data="chartData" />
    <!-- eslint-enable -->
    <p class="disclaimer">
      * Dados ficticios, para ter acesso aos dados reais torne-se membro Cota+ Premium.
    </p>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Legend,
  Tooltip
} from 'chart.js'

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Legend,
  Tooltip
)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    show: {
      type: Boolean,
      deafult: false
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.disclaimer {
  font-size: 12px;
  color: rgb(221, 218, 218);
}
</style>
