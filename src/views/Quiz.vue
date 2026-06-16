<template>
    <div class="content-container">

        <transition name="fade" mode="out-in">
            <div :key="currentIndex" class="question-block">
                <h2 id="question-text">{{ currentQuestion.text }}</h2>

                <div id="questions">
                    <button
                        v-for="(option, index) in currentQuestion.options"
                        :key="index"
                        @click="selectAnswer(option)"
                        :class="{ isSelected: userAnswers[currentIndex] === option }"
                    >
                        <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
                        <span class="option-text">{{ option }}</span>
                    </button>
                </div>
            </div>
        </transition>

        <div class="nav-controls">
            <button class="back-button" v-if="currentIndex > 0" @click="prevQuestion">Back</button>
            <button
                class="next-button"
                v-if="!isLastQuestion"
                :disabled="!isAnswerSelected"
                :class="{ 'is-active': isAnswerSelected }"
                @click="nextQuestion"
            >Next</button>
            <button
                class="next-button"
                v-if="isLastQuestion"
                :disabled="!isAnswerSelected"
                :class="{ 'is-active': isAnswerSelected }"
                @click="submitQuiz"
            >Submit</button>
        </div>

         <div class="progress-container">
            <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
        </div>
    </div>
</template>


<style scoped>
#question-text {
    margin: 0 auto 100px auto;
    max-width: 1600px;
    transition: opacity 0.3s ease-in-out;
    color: #EDEDED;
}

#questions {
    top: 800px;
    display: grid;
    justify-content: center;
}

#questions button {
    display: flex;
    align-items: center;
    min-height: 130px;
    padding: 60px;
    border: none;
    text-align: left;
    margin: 20px 0;
    cursor: pointer;
    background-color: #408EC6;
}

.option-letter {
    font-size: 110px;
    line-height: 1;
    flex-shrink: 0;
    margin-right: 60px;
    color: #EDEDED;
    font-family: 'SalesforceSans-Semibold', Sans-Serif;
}

span.option-text {
    color: #EDEDED;
    font-size: 65px;
    font-weight: 400;
    line-height: 1;
    padding-top: 8px;
}

/* =================
    Progressbar
================= */
.progress-container {
    width: 75%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px auto;
    position: relative;
    top: 1000px;
}

.progress-bar {
    height: 100%;
    background-color: #7A2048;
    transition: width 0.3s ease-in-out;
}

/* =================
    Quiz navigation
================= */
.nav-controls {
    position: absolute;
    bottom: 600px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

button {
    margin: 15px 0;
    background-color: #408EC6;
    color: #EDEDED;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}

.next-button {
    position: absolute;
    right: 200px;
}
  
.back-button {
    position: absolute;
    left: 200px;
}

.next-button, .back-button, .submit-button {
    min-width: 600px;
}
  
 #questions button.isSelected {
    background-color: #7A2048;
}
#questions button.isSelected .option-letter,
#questions button.isSelected .option-text {
    color: #ffffff;
}
</style>



<script>
import questions from '@/data/questionnaire.json'

export default {
  data() {
    return {
      currentIndex: 0,
      questions: questions,
      userAnswers: []
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || { text: '', options: [] }
    },
    isAnswerSelected() {
      return !!this.userAnswers[this.currentIndex]
    },
    isLastQuestion() {
      return this.currentIndex === this.questions.length - 1
    },
    progressPercentage() {
      return ((this.currentIndex) / this.questions.length) * 100
    }
  },
  methods: {
    selectAnswer(option) {
      this.userAnswers.splice(this.currentIndex, 1, option)
    },
    nextQuestion() {
      this.currentIndex++
    },
    prevQuestion() {
      this.currentIndex--
    },
    submitQuiz() {
      const correctCount = this.questions.reduce((count, question, index) => {
        return count + (this.userAnswers[index] === question.answer ? 1 : 0)
      }, 0)
      this.$router.push({
        path: '/results',
        query: { score: correctCount, total: this.questions.length }
      })
    }
  }
}
</script>