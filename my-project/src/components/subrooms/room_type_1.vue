<template>
  <div class="escape-question">
    <h2>UPIŠI NEDOSTAJUĆE ZNAMENKE</h2>
    <p class="question-text">{{ question }}</p>

    <div class="input-row">
      <input
        v-for="(input, index) in userAnswers"
        :key="index"
        v-model="userAnswers[index]"
        maxlength="1"
        :disabled="correctAnswers[index]"
        @input="checkAnswer(index)"
      />
    </div>

    <div v-if="showHints">
      <button @click="revealHint">Show Hint</button>
      <p v-for="(hint, index) in displayedHints" :key="index">Hint {{ index + 1 }}: {{ hint }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const question = ref('');
    const correctAnswer = ref('');
    const userAnswers = ref([]);
    const correctAnswers = ref([]);
    const hints = ref([]);
    const displayedHints = ref([]);
    const hintIndex = ref(0);
    const showHints = ref(false);

    const escapeRoomId = route.params.id;
    const subroomIndex = parseInt(route.query.index) || 0;

    const fetchQuestion = async () => {
      try {
        const response = await fetch(`https://wa-projekt-backend-xm06.onrender.com/escape_room/${escapeRoomId}`);
        const data = await response.json();

        const subroom = data.subrooms[subroomIndex];
        const q = subroom.questions[0];
        question.value = q.question;
        correctAnswer.value = q.answer;
        hints.value = q.hints;

        userAnswers.value = new Array(q.answer.length).fill('');
        correctAnswers.value = new Array(q.answer.length).fill(false);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    const checkAnswer = (index) => {
      if (userAnswers.value[index] === correctAnswer.value[index]) {
        correctAnswers.value[index] = true;
      }

      if (correctAnswers.value.every((val) => val)) {
        nextSubroom();
      }
    };

    const nextSubroom = async () => {
      const response = await fetch(`https://wa-projekt-backend-xm06.onrender.com/escape_room/${escapeRoomId}`);
      const data = await response.json();

      if (subroomIndex + 1 < data.subrooms.length) {
        const nextType = data.subrooms[subroomIndex + 1].type;
        router.push({
          path: `/subroom/${escapeRoomId}/${nextType}`,
          query: { index: subroomIndex + 1 },
        });
      } else {
        router.push(`/escape-complete/${escapeRoomId}`);
      }
    };

    const revealHint = () => {
      if (hintIndex.value < hints.value.length) {
        displayedHints.value.push(hints.value[hintIndex.value]);
        hintIndex.value++;
      }
    };

    onMounted(() => {
  fetchQuestion();
  setTimeout(() => {
    showHints.value = true;
  }, 5000); 
});

    

    return {
      question,
      userAnswers,
      correctAnswers,
      hints,
      displayedHints,
      hintIndex,
      showHints,
      revealHint,
      checkAnswer,
    };
  }
};
</script>

<style scoped>
.escape-question {
  text-align: center;
  padding: 20px;
}

.question-text {
  font-size: 18px;
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  width: 30px;
  height: 40px;
  text-align: center;
  font-size: 18px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
