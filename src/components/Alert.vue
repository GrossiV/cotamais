<script setup>
defineProps({
  type: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div v-if="text" class="alert" :class="`alert--${type}`">{{ text }}</div>
</template>

<style scoped>
.alert {
  padding: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  color: #fff;
  font-weight: bold;
}
.alert--success {
  background-color: var(--success);
}
.alert--danger {
  background-color: var(--danger);
}
</style>
