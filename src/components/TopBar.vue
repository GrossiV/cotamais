<script setup>
import IconLogout from './icons/IconLogout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleHomeClick() {
  router.push({ name: 'dashboard' })
}
function handleLogoutClick() {
  localStorage.removeItem('loggedUser')
  router.push({ name: 'login' })
}
</script>

<template>
  <nav class="topbar">
    <ul>
      <li @click="handleHomeClick" class="nav-item logo">Cota +</li>
      <li @click="handleLogoutClick" class="nav-item logout">
        <IconLogout />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.topbar {
  padding: 8px 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
}
.nav-item {
  display: flex;
  align-items: center;
  color: var(--primary);
}
.nav-item:hover {
  cursor: pointer;
}
.logo {
  font-weight: bold;
  font-size: 1.3rem;
  border: 1px solid var(--primary);
  padding: 0 8px;
  border-radius: 5px;
}
ul {
  display: flex;
  justify-content: space-between;
  padding: 0;
}
ul li {
  list-style-type: none;
}
</style>
