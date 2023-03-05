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
  <span class="chip" :class="`chip--${type}`">{{ text }}</span>
</template>

<style scoped>
.chip {
  border-radius: 10px;
  font-size: 0.65rem;
  padding: 2px 6px;
  color: #fff;
  font-weight: bold;
}
.chip--success {
  background-color: var(--success);
}
.chip--danger {
  background-color: var(--danger);
}
</style>
