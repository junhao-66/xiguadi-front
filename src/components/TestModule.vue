<template>
  <!--
    TestModule — 养犬适配测试组件
    功能：选择题互动测试，自动计算适配结果
    复用场景：养前测试页面
  -->
  <div class="test-module">
    <!-- 题目区 -->
    <div v-if="!finished" class="test-module__body">
      <div class="test-module__progress">
        <span class="test-module__step">第 {{ currentStep + 1 }} / {{ questions.length }} 题</span>
        <div class="test-module__bar">
          <div class="test-module__bar-fill" :style="{ width: ((currentStep + 1) / questions.length * 100) + '%' }"></div>
        </div>
      </div>

      <div class="test-module__question" :key="currentStep">
        <h3 class="test-module__q-title">{{ questions[currentStep].question }}</h3>
        <div class="test-module__options">
          <button
            v-for="(opt, oIdx) in questions[currentStep].options"
            :key="oIdx"
            class="test-module__option"
            :class="{ 'test-module__option--selected': answers[currentStep] === opt.score }"
            @click="selectOption(opt.score)"
          >
            <span class="test-module__option-letter">{{ String.fromCharCode(65 + oIdx) }}</span>
            <span class="test-module__option-text">{{ opt.label }}</span>
          </button>
        </div>
      </div>

      <div class="test-module__nav">
        <button v-if="currentStep > 0" class="test-module__nav-btn" @click="currentStep--">上一题</button>
        <button
          v-if="currentStep < questions.length - 1"
          class="test-module__nav-btn test-module__nav-btn--primary"
          :disabled="answers[currentStep] === undefined"
          @click="currentStep++"
        >下一题</button>
        <button
          v-if="currentStep === questions.length - 1"
          class="test-module__nav-btn test-module__nav-btn--primary"
          :disabled="answers[currentStep] === undefined"
          @click="finish"
        >查看结果</button>
      </div>
    </div>

    <!-- 结果区 -->
    <Transition name="result-fade">
      <div v-if="finished" class="test-module__result">
        <div class="test-module__result-icon">{{ resultEmoji }}</div>
        <h3 class="test-module__result-title">{{ resultLevel.label }}</h3>
        <p class="test-module__result-desc">{{ resultLevel.desc }}</p>
        <div class="test-module__result-score">适配度 {{ resultPercent }}%</div>
        <button class="test-module__retry" @click="reset">重新测试</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  questions: { type: Array, required: true }
})

const emit = defineEmits(['complete'])

const currentStep = ref(0)
const answers = ref({})
const finished = ref(false)

const totalScore = computed(() => {
  let sum = 0
  for (const key in answers.value) sum += answers.value[key]
  return sum
})

const maxScore = computed(() =>
  props.questions.reduce((sum, q) => {
    const max = Math.max(...q.options.map(o => o.score))
    return sum + max
  }, 0)
)

const resultPercent = computed(() =>
  Math.round((totalScore.value / maxScore.value) * 100)
)

const resultLevel = computed(() => {
  const rate = resultPercent.value
  if (rate >= 80) return { label: '完美适配', desc: '你非常适合养西高地！你具备充足的时间、精力和准备，西高地会成为你最棒的伙伴。', color: '#0145F2' }
  if (rate >= 60) return { label: '基本适合', desc: '你具备一定的条件，但仍需在部分方面做好准备，建议深入了解西高地的养护需求后再决定。', color: '#4372F5' }
  if (rate >= 40) return { label: '需要准备', desc: '你可能还需要更多准备来迎接西高地，建议花时间了解更多关于这个品种的知识。', color: '#667799' }
  return { label: '再考虑一下', desc: '目前你可能不太适合养西高地，建议重新评估自己的时间、精力和经济条件。', color: '#99AACC' }
})

const resultEmoji = computed(() => {
  const rate = resultPercent.value
  if (rate >= 80) return '🎉'
  if (rate >= 60) return '😊'
  if (rate >= 40) return '🤔'
  return '💭'
})

function selectOption(score) {
  answers.value[currentStep.value] = score
}

function finish() {
  finished.value = true
  emit('complete', { score: totalScore.value, total: maxScore.value, percent: resultPercent.value })
}

function reset() {
  currentStep.value = 0
  answers.value = {}
  finished.value = false
}
</script>

<style scoped>
.test-module { max-width: 600px; margin: 0 auto; }
.test-module__progress { margin-bottom: 32px; }
.test-module__step {
  font-size: 0.8rem; font-weight: 600; color: var(--color-accent);
  letter-spacing: 0.06em; display: block; margin-bottom: 8px;
}
.test-module__bar {
  height: 4px; background: var(--color-border); border-radius: 4px; overflow: hidden;
}
.test-module__bar-fill {
  height: 100%; background: var(--color-accent); border-radius: 4px;
  transition: width 0.5s var(--ease-out-quart);
}
.test-module__q-title {
  font-family: var(--font-serif); font-size: 1.25rem;
  font-weight: 600; color: var(--color-text-primary);
  margin-bottom: 24px; line-height: 1.6;
}
.test-module__options { display: flex; flex-direction: column; gap: 10px; }
.test-module__option {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 20px; background: var(--color-bg-card);
  border: 1.5px solid var(--color-border); border-radius: var(--radius-md);
  cursor: pointer; transition: all 0.3s ease; text-align: left;
}
.test-module__option:hover { border-color: var(--color-accent); box-shadow: var(--shadow-sm); }
.test-module__option--selected {
  border-color: var(--color-accent); background: rgba(1,69,242,0.06);
}
.test-module__option-letter {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--color-bg-secondary); display: flex;
  align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 600; color: var(--color-text-secondary);
  flex-shrink: 0;
}
.test-module__option--selected .test-module__option-letter {
  background: var(--color-accent); color: #fff;
}
.test-module__option-text { font-size: 0.93rem; color: var(--color-text-secondary); }
.test-module__nav {
  display: flex; justify-content: center; gap: 12px; margin-top: 32px;
}
.test-module__nav-btn {
  padding: 10px 28px; border-radius: 50px;
  font-size: 0.9rem; font-weight: 500; cursor: pointer;
  background: var(--color-bg-card); color: var(--color-text-secondary);
  border: 1px solid var(--color-border); transition: all 0.3s;
}
.test-module__nav-btn--primary {
  background: var(--color-accent); color: #fff; border-color: var(--color-accent);
}
.test-module__nav-btn--primary:disabled {
  opacity: 0.5; cursor: not-allowed;
}
.test-module__nav-btn:hover:not(:disabled) {
  border-color: var(--color-accent); color: var(--color-accent);
}
.test-module__nav-btn--primary:hover:not(:disabled) {
  background: var(--color-accent-deep); color: #fff;
}

.test-module__result { text-align: center; padding: 40px 20px; }
.test-module__result-icon { font-size: 3rem; margin-bottom: 16px; }
.test-module__result-title {
  font-family: var(--font-serif); font-size: 1.8rem;
  font-weight: 700; color: var(--color-text-primary); margin-bottom: 12px;
}
.test-module__result-desc {
  font-size: 0.95rem; color: var(--color-text-secondary);
  max-width: 400px; margin: 0 auto 20px; line-height: 1.7;
}
.test-module__result-score {
  font-size: 1.2rem; font-weight: 600; color: var(--color-accent);
  margin-bottom: 28px;
}
.test-module__retry {
  padding: 12px 36px; border-radius: 50px;
  background: var(--color-accent); color: #fff; border: none;
  font-size: 0.9rem; font-weight: 500; cursor: pointer;
  transition: background 0.3s;
}
.test-module__retry:hover { background: var(--color-accent-deep); }

.result-fade-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.result-fade-leave-active { transition: opacity 0.3s ease; }
.result-fade-enter-from { opacity: 0; transform: translateY(20px); }
.result-fade-leave-to { opacity: 0; }
</style>