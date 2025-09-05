<template>
  <div class="page-content">
    <h2>Page 1</h2>
    <button @click="goNext">Next</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goNext() {
  router.push('/page2')
}
</script>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: white;
  z-index: 0;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
