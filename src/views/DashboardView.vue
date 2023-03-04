<script setup>
//TODO create logout function / button
//TODO create topbar
//TODO theme based on the blog
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/auth/auth';
import { getStocksAndCurrencies } from '@/services/dashboard-service'

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
    <ul>
      <li v-for="( value, key ) in dashboardData.stocks">
        {{ key }}
        <p>{{value.variation}}</p>
        <p>{{value.points}}</p>
        <p>{{value.name}}</p>
      </li>
    </ul>
    <ul>
      <li v-for="( value, key ) in dashboardData.currencies">
        {{ key }}
        <p>{{value.variation}}</p>
        <p>{{value.buy}}</p>
        <p>{{value.name}}</p>
      </li>
    </ul>
  </div>
</template>

