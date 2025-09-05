<!-- <template>
  <div class="app-container">
    <video
      v-if="isAttract"
      autoplay loop muted playsinline
      class="bg-video"
    >
      <source src="/videos/attract-bg.mp4" type="video/mp4" />
    </video>

    <video
      v-else
      autoplay loop muted playsinline
      class="bg-video"
    >
      <source src="/videos/main-bg.mp4" type="video/mp4" />
    </video>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAttract = computed(() => route.name === 'Attract')
</script>

<style>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.bg-video {
  position: fixed;      /* stick to viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;    /* fill screen */
  z-index: -1;          /* <--- makes sure it's BEHIND your content */
  pointer-events: none; /* <--- so clicks go through it */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->
<template>
  <div class="app-container">
    <!-- Attract video -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="bg-video attract"
      :class="{ visible: currentPath === '/' }"
    >
      <source src="/videos/attract-bg.mp4" type="video/mp4" />
    </video>

    <!-- Main background video -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="bg-video main"
      :class="{ visible: currentPath !== '/' }"
    >
      <source src="/videos/main-bg.mp4" type="video/mp4" />
    </video>

    <!-- Routed page content -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath
  },
  { immediate: true }
)
</script>

<style>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
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
  transition: opacity 1s ease; /* smooth fade */
  pointer-events: none;
}

.bg-video.visible {
  opacity: 1;
}

/* Page content fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

