<template>
  <div class="page-content">
    <h1>Welcome</h1>
    <button @click="goNext">Start</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goNext() {
  router.push('/page1')
}
</script>

<style scoped>
.page-content {
  position: relative;   /* keeps it above video */
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-align: center;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
