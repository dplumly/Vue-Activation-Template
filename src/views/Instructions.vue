<template>
    <div class="page-content">
        <Transition name="fade">
            <div id="content-container">
                <div v-if="true" class="fade-group">
                    <h1>This is an instructions screen</h1>
                    <h4>Slack is the entry point and hub that connects every team. Pick a route and see how Slack + Agentforce power the Agentic Enterprise</h4>
                    <button class="bottom-button" @click="goNext">Next</button>
                </div>
        </div>
        </Transition>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logClick } from '@/utils/logger.js'

const router = useRouter()

function goNext() {
  logClick('Instructions Button Clicked')
  router.push('/selection')
}
</script>

<style scoped>

</style>
