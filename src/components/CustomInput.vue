<script setup>
import { ref } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['onInputChange'])

const input = ref('')

function updateInput(e) {
  emit('onInputChange', input.value)
}

</script>

<template>
    <input class="input" @input="updateInput" v-model="input" :placeholder="placeholder" :type="type">
</template>


<style scoped>
.input {
  padding: 4px;
  border: 1px solid #222;
  border-radius: 2px;
}
.input:focus {
  outline: none;
}
</style>