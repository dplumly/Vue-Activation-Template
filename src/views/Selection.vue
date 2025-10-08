<template>
    <div class="page-content">
        <Transition name="fade">
            <div id="content-container">
                <div v-if="true" class="fade-group">
                    <h1>This is some sort of selection screen. Right now, we just go to the CTA screen</h1>
                    <button class="bottom-button" @click="goCta">Go to CTA screen</button>
                </div>
            </div>
        </Transition>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { logClick } from '@/utils/logger.js'

const router = useRouter()

function goCta() {
    logClick('CTA Button Clicked', 'CTA')
  router.push('/cta') 
}
</script>




<style scoped>

</style>
