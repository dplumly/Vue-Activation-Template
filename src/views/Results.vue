<template>
    <div class="content-container">
        <div class="results-container">
            <h3 id="score">
            You answered {{ score }} {{ questionText }} correctly. <br>
            You get {{ score }} {{ ballText }} to throw at the target.
            </h3>
        </div>
        <button class="bottom-button" @click="$router.push('/')">Finish</button>
    </div>
</template>


<style scoped>
.results-container {
        position: relative;
    width: 100%;
    height: 1200px;
    background: white;
    border-radius: 50px;
}

#score {
    color: #001E5B;
    padding: 200px;
    margin: 0 auto;
    display: table;
}
</style>

<script>
export default {
  computed: {
    score() { return parseInt(this.$route.query.score) || 0 },
    total() { return parseInt(this.$route.query.total) || 0 },
    questionText() { return this.score === 1 ? 'question' : 'questions' },
    ballText() { return this.score === 1 ? 'ball' : 'balls' }
  }
}
</script>