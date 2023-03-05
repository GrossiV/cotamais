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
  },
  hasError: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onInputChange', 'onInputFocus'])

const input = ref('')

function updateInput(e) {
  emit('onInputChange', input.value)
}
function onFocus() {
  emit('onInputFocus')
}
</script>

<template>
  <input
    class="input"
    :class="{ 'input--error': hasError }"
    @focus="onFocus"
    @input="updateInput"
    v-model="input"
    :placeholder="placeholder"
    :type="type"
  />
</template>

<style scoped>
.input {
  padding: 12px;
  border: 1px solid var(--black);
  border-radius: 4px;
}
.input:focus {
  outline: none;
  border: 1px solid var(--primary);
}
.input:focus::placeholder {
  color: var(--primary);
}

.input--error {
  border: 1px solid var(--danger);
}
.input--error::placeholder {
  color: var(--danger);
}
</style>
