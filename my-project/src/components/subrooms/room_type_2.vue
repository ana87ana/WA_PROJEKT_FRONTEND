<template>
  <div class="escape-question">
    <h2>UPIŠI NAZIV FILMA</h2>
    <div class="image-grid">
      <img v-for="(img, index) in images" :key="index" :src="img" alt="screenshot" />
    </div>

    <div class="input-row">
      <input
        v-model="userAnswer"
        type="text"
        placeholder="Enter movie name"
        @input="checkAnswer"
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
    const userAnswer = ref('');
    const hints = ref([]);
    const displayedHints = ref([]);
    const hintIndex = ref(0);
    const showHints = ref(false);
    const images = ref([]);

    const escapeRoomId = route.params.id;
    const subroomIndex = parseInt(route.query.index) || 0;

    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/escape_room/${escapeRoomId}`);
        const data = await response.json();

        const subroom = data.subrooms[subroomIndex];
        const q = subroom.questions[0];
        question.value = q.question;
        correctAnswer.value = q.answer;
        hints.value = q.hints;

        images.value = q.images;  

      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    const checkAnswer = () => {
      if (userAnswer.value.toLowerCase() === correctAnswer.value.toLowerCase()) {
        nextSubroom();
      }
    };

    const nextSubroom = async () => {
      const response = await fetch(`http://localhost:3000/escape_room/${escapeRoomId}`);
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
      showHints.value = true;
    });

    return {
      question,
      userAnswer,
      images,
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

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

img {
  width: 100%;        
  height: 200px;       
  object-fit: cover;   
  border-radius: 8px;   
}

input {
  width: 200px;
  height: 30px;
  text-align: center;
  font-size: 16px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
