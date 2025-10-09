<template>
    <div class="page-content">
        <!-- Text fade -->
        <Transition name="fade">
            <div id="content-container">
                <div v-if="true" class="fade-group">
                    <h1>Attract video</h1>
                    <button class="bottom-button" @click="goNext">Start</button>
                </div>
            </div>
        </Transition>
    </div>
</template>



<script setup>
import { useRouter } from 'vue-router'
import { startSession, logClick } from '@/utils/logger.js'

const router = useRouter()
function goNext() {
    startSession()

    logClick('Start Button Clicked', 'Attract')
    router.push('/instructions')
}
</script>

<style scoped>

</style>
