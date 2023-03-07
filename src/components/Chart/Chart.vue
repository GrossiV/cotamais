<script setup>
import { onMounted } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Title,
  Legend,
  Tooltip
} from 'chart.js'
// TODO add real data to chart
// TODO make chart dynamic for each asset
onMounted(() => {
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Title,
    Legend,
    Tooltip
  )
  const ctx = document.getElementById('lineChart')

  const labels = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho']
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'USD',
        data: [65, 59, 80, 81, 56, 55, 40],
        tension: 0,
        borderColor: 'rgb(53, 209, 165)',
        backgroundColor: 'rgba(53, 209, 165, 0.2)',
        fill: true
      }
    ]
  }

  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  })
})
</script>
<template>
  <h1>Gráfico dos ultimos 12 meses</h1>
  <canvas id="lineChart"></canvas>
</template>
