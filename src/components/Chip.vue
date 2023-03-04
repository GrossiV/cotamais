<script setup>
defineProps({
  type: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '-0,025 %'
  },
})
</script>

<template>
    <span class="chip" :class="`chip--${type}`">{{ text }}</span>
</template>


<style scoped>
.chip {
    padding: 0;
    border-radius: 10px;
    font-size: .65rem;
    padding: 2px 6px;
    color: #fff;
    font-weight: bold;
}
.chip--success {
    background-color: #0ACF97;
}
.chip--danger {
    background-color: #FA5C7C;
}
</style>