<template>
  <div class="escape-question">
    <h2>Find the missing numbers!</h2>
    <div v-for="(movie, index) in movies" :key="index" class="movie">
      <span>{{ movie.title.replace(/\d/g, '_') }}</span>
      <input
        type="text"
        v-model="userAnswers[index]"
        maxlength="1"
        :disabled="correctAnswers[index]"
        @input="checkAnswer(index)"
      />
    </div>
    
    <div v-if="showHints">
      <button @click="revealHint">Show Hint</button>
      <p v-if="hintIndex >= 1">Hint 1: {{ hints[0] }}</p>
      <p v-if="hintIndex >= 2">Hint 2: {{ hints[1] }}</p>
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
    const movies = ref([]);
    const userAnswers = ref(["", "", "", ""]);
    const correctAnswers = ref([false, false, false, false]);
    const hints = ref([]);
    const hintIndex = ref(0);
    const showHints = ref(false);
    const escapeRoomId = route.params.id;
    const subroomIndex = parseInt(route.query.index) || 0;
    
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/escape_room/${escapeRoomId}`);
        if (!response.ok) throw new Error("Failed to fetch escape room data");
        const data = await response.json();
        
        movies.value = data.subrooms[subroomIndex].movies;
        hints.value = data.subrooms[subroomIndex].hints;
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    
    const checkAnswer = (index) => {
      if (userAnswers.value[index] === movies.value[index].answer) {
        correctAnswers.value[index] = true;
      }
      if (correctAnswers.value.every((val) => val)) {
        nextSubroom();
      }
    };
    
    const nextSubroom = async () => {
      try {
        const response = await fetch(`http://localhost:3000/escape_room/${escapeRoomId}`);
        if (!response.ok) throw new Error("Failed to fetch escape room data");
        const data = await response.json();
        
        if (subroomIndex + 1 < data.subrooms.length) {
          const nextType = data.subrooms[subroomIndex + 1].type;
          router.push({
            path: `/subroom/${escapeRoomId}/${nextType}`,
            query: { index: subroomIndex + 1 }
          });
        } else {
          router.push(`/escape-complete/${escapeRoomId}`);
        }
      } catch (error) {
        console.error("Error navigating to next subroom:", error);
      }
    };
    
    const revealHint = () => {
      if (hintIndex.value < hints.value.length) {
        hintIndex.value++;
      }
    };
    
    onMounted(() => {
      fetchQuestion();
      setTimeout(() => (showHints.value = true), 60000);
      setTimeout(() => revealHint(), 60000);
      setTimeout(() => revealHint(), 120000);
    });
    
    return { movies, userAnswers, correctAnswers, hints, hintIndex, showHints, revealHint, checkAnswer };
  }
};
</script>

<style scoped>
.escape-question {
  text-align: center;
  padding: 20px;
}
.movie {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
input {
  width: 30px;
  text-align: center;
  font-size: 18px;
}
button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
