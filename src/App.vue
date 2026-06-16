<template>
  <div class="app-container">

    <div id="invisibleReset" ref="resetDiv" @touchstart.passive="handleInvisibleTap" />

    <!-- Attract background video -->
    <video
        autoplay muted loop playsinline
        class="bg-video attract"
        :class="{ visible: currentPath === '/' }"
        >
        <source src="/videos/4k-attract-bg.mp4" type="video/mp4" />
    </video>


    <!-- Main app background video -->
    <video
        autoplay muted loop playsinline
        class="bg-video main"
        :class="{ visible: currentPath !== '/' }"
        >
        <source src="/videos/4k-main-bg.mp4" type="video/mp4" />
    </video>


    <!-- Routed content transitions -->
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>


    <!-- Timeout Modal component -->
    <TimeoutModal 
      :ignoreRoutes="['/']" 
      @restart="handleRestart" 
    />

  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import TimeoutModal from "@/components/TimeoutModal.vue"
import { onMounted, onBeforeUnmount } from 'vue'; // Scaler util
// import { endSession } from "@/utils/logger.js"



// Scaler util
const updateScale = () => {
  // 2160 is the design 'short side' (Width in Portrait / Height in Landscape)
  const designShortSide = 2160; 
  
  // Detect current hardware's shortest side
  const currentShortSide = Math.min(window.innerWidth, window.innerHeight);
  
  // Calculate multiplier (4K = 1.0, 1080p = 0.5)
  const scale = currentShortSide / designShortSide;
  
  // Set the CSS variable globally
  document.documentElement.style.setProperty('--res-scale', scale);
};

onMounted(() => {
  updateScale();
  window.addEventListener('resize', updateScale);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale);
});



// Restart handler (called by TimeoutModal when countdown ends or user clicks Restart)
function handleRestart() {
//   endSession()
  router.push("/")
}


const router = useRouter()
const route = useRoute()
const currentPath = ref(route.path)


// Keep track of route for background video switching
watch(
  () => route.path,
    (newPath) => {
        currentPath.value = newPath
    },
  { immediate: true }
)


// Invisible reset button
let tapCount = 0
let tapTimer = null

function handleInvisibleTap() {
    if (++tapCount === 3) {
        tapCount = 0
        router.push("/")
        return
    }
    clearTimeout(tapTimer)
    tapTimer = setTimeout(() => tapCount = 0, 500)
}
</script>

<style>
.app-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.bg-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}

.bg-video.visible {
  opacity: 1;
}

#invisibleReset {
    position: fixed;   
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    z-index: 20;       
    background: transparent;
}
</style>