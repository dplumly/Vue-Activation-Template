<template>
    <div class="page-content">
        <Transition name="fade">
            <div id="content-container">
            <div v-if="true" class="fade-group">
                <h1>CTA screen</h1>
                <button class="bottom-button" @click="finish">Finish</button>
            </div>
        </div>
        </Transition>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { endSession } from '@/utils/logger.js'

const router = useRouter()

function finish() {
    endSession()
    router.push('/')
}
</script>




<style scoped>
</style>
