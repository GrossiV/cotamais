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
    <input class="input" :class="{'input--error': hasError}" @focus="onFocus" @input="updateInput" v-model="input" :placeholder="placeholder" :type="type">
</template>


<style scoped>
.input {
  padding: 6px;
  border: 1px solid rgb(8, 85, 66);
  border-radius: 14px;
  text-indent: 14px;
}
.input--error {
  border: 1px solid red;
}
.input:focus {
  outline: none;
}
</style>