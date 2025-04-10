import { defineStore } from 'pinia';
import { ref } from 'vue';

let interval = null;

export const useTimerStore = defineStore('timer', {
  state: () => ({
    startTime: null,
    elapsed: 0,
    interval: null
  }),
  actions: {
    startTimer() {
      this.startTime = Date.now();
      this.elapsed = 0;

      this.interval = setInterval(() => {
        this.elapsed = Math.floor((Date.now() - this.startTime) / 1000); 
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
      this.interval = null;
    },
    resetTimer() {
      this.stopTimer();
      this.startTime = null;
      this.elapsed = 0;
    }
  },
  getters: {
    formattedTime(state) {
      const mins = Math.floor(state.elapsed / 60).toString().padStart(2, '0');
      const secs = (state.elapsed % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
  }
});
