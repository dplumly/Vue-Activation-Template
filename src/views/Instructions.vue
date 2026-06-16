<template>
    <div class="page-content">
        <Transition name="fade">
            <div class="content-container">
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
// import { logClick } from '@/utils/logger.js'

function goNext() {
//   logClick('Instructions Button Clicked')
  router.push('/quiz')
}

const router = useRouter()

</script>

<style scoped>

h4 {
    max-width: 1200px;
    margin: 100px auto 0 auto;
}

</style>
