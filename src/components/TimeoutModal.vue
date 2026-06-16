<template>
  <transition name="fade">
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal">
        <img id="eyes-gif" src="/img/eyes.gif" />
        <h2 id="modal-header">Are you still there?</h2>
        <p id="countdown">{{ countdown }}</p>
        <div class="buttons">
          <button @click="restart">Restart</button>
          <button @click="continueSession">Continue</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useRoute } from "vue-router"

const emit = defineEmits(["restart"])

const props = defineProps({
  ignoreRoutes: {
    type: Array,
    default: () => []
  },
  inactivityLimit: {
    type: Number,
    default: 60000  // default 60 seconds
  },
  countdownSeconds: {
    type: Number,
    default: 10 // default 10 second countdown
  }
})

const route = useRoute()
const showModal = ref(false)
const countdown = ref(props.countdownSeconds)

let inactivityTimer = null
let countdownTimer = null

function resetTimer() {
  if (props.ignoreRoutes.includes(route.path)) return
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(openModal, props.inactivityLimit)
}

function openModal() {
  showModal.value = true
  countdown.value = props.countdownSeconds

  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) restart()
  }, 1000)
}

function closeModal() {
  showModal.value = false
  clearInterval(countdownTimer)
}

function continueSession() {
  closeModal()
  resetTimer()
}

function restart() {
  closeModal()
  emit("restart")
}

function activityListener() {
  if (!showModal.value && !props.ignoreRoutes.includes(route.path)) resetTimer()
}

// watch route changes
watch(
  () => route.path,
  (newPath) => {
    if (props.ignoreRoutes.includes(newPath)) {
      clearTimeout(inactivityTimer)
      clearInterval(countdownTimer)
      showModal.value = false
    } else {
      resetTimer()
    }
  }
)

onMounted(() => {
  window.addEventListener("mousemove", activityListener)
  window.addEventListener("mousedown", activityListener)
  window.addEventListener("keydown", activityListener)
  window.addEventListener("touchstart", activityListener)
  window.addEventListener("scroll", activityListener)

  resetTimer()
})

onBeforeUnmount(() => {
  clearTimeout(inactivityTimer)
  clearInterval(countdownTimer)

  window.removeEventListener("mousemove", activityListener)
  window.removeEventListener("mousedown", activityListener)
  window.removeEventListener("keydown", activityListener)
  window.removeEventListener("touchstart", activityListener)
  window.removeEventListener("scroll", activityListener)
})
</script>

<style scoped>
/* =================
    Modal
================= */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal {
    background: white;
    opacity: 0.9;
    color: black;
    padding: 4rem;
    border-radius: 75px;
    text-align: center;
    width: 1200px;
    height: 1200px;
}

/* =================
    Modal contents
================= */
#eyes-gif {
    width: 200px;
}

#modal-header {
    font-size: 80px;
}

#countdown {
    font-size: 320px;
    margin-top: 85px;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 120px;
}

.buttons button {
    padding: 15px 75px;
    cursor: pointer;
}
</style>