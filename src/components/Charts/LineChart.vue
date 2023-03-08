<template>
  <Line v-if="show" :options="chartOptions" :data="chartData" />
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
