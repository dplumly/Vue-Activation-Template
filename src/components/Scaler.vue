<template>
  <div ref="scaleContainer" :style="containerStyle">
    <slot />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  designHeight: {
    type: Number,
    default: 1080
  }
})

const scaleContainer = ref(null)
const containerStyle = reactive({
  transformOrigin: 'top left',
  width: '100%',
})

function handleResize() {
  if (!scaleContainer.value) return
  const scale = window.innerHeight / props.designHeight
  containerStyle.transform = `scale(${scale})`
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>