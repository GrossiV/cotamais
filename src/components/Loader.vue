<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: true
  },
})
</script>

<template>
    <div class="loader" ></div>
</template>


<style scoped>
.loader {
  border: 8px solid #DDD;
  border-radius: 50%;
  border-top: 8px solid var(--primary);
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>