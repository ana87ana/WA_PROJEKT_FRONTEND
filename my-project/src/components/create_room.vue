<template>
  <div class="escape-room-creator p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Create New Escape Room</h1>
      
      <div class="bg-gray-100 p-4 mb-6 rounded shadow-sm">
        <h2 class="text-xl font-semibold mb-2">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Title:</label>
            <input v-model="escapeRoom.title" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-1">Genre:</label>
            <input v-model="escapeRoom.genre" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-1">Difficulty:</label>
            <select v-model="escapeRoom.difficulty" class="w-full p-2 border rounded">
              <option>Easy</option>
              <option>Normal</option>
              <option>Hard</option>
              <option>Expert</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block mb-1">Description:</label>
          <textarea v-model="escapeRoom.description" class="w-full p-2 border rounded" rows="3"></textarea>
        </div>
      </div>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Challenges ({{ escapeRoom.subrooms.length }}/4)</h2>
        
        <div class="space-y-4">
          <div v-for="(subroom, index) in escapeRoom.subrooms" :key="index" class="bg-gray-100 p-4 rounded shadow-sm">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium">Challenge {{ index + 1 }}</h3>
              <button @click="removeSubroom(index)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">Remove</button>
            </div>
            
            <div class="mb-4">
              <label class="block mb-1">Challenge Type:</label>
              <select v-model="subroom.type" class="w-full p-2 border rounded">
                <option value="number_guess">Number Guess</option>
                <option value="image_sentence">Image Sentence</option>
                <option value="emoji_guess">Emoji Guess</option>
                <option value="person_connection">Person Connection</option>
              </select>
            </div>
            
            <div v-if="subroom.type === 'number_guess'" class="bg-white p-3 rounded shadow-sm">
              <h4 class="font-medium mb-2">Number Guess Details</h4>
              <div class="mb-3">
                <label class="block mb-1">Question:</label>
                <input v-model="subroom.questions[0].question" class="w-full p-2 border rounded" 
                       placeholder="e.g. Se_en, O_e, * Ronin, * Dalmatians" />
              </div>
              <div class="mb-3">
                <label class="block mb-1">Answer:</label>
                <input v-model="subroom.questions[0].answer" class="w-full p-2 border rounded" 
                       placeholder="e.g. 7147101" />
              </div>
              <div class="mb-3">
                <label class="block mb-1">Hints:</label>
                <div class="space-y-2">
                  <div v-for="(hint, hintIndex) in subroom.questions[0].hints" :key="hintIndex">
                    <div class="flex gap-2">
                      <input v-model="subroom.questions[0].hints[hintIndex]" class="flex-grow p-2 border rounded" />
                      <button v-if="hintIndex > 0" @click="removeHint(subroom, 0, hintIndex)" 
                              class="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-colors">×</button>
                    </div>
                  </div>
                </div>
                <button v-if="subroom.questions[0].hints.length < 3" @click="addHint(subroom, 0)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600 transition-colors">Add Hint</button>
              </div>
            </div>
            
            <div v-if="subroom.type === 'image_sentence'" class="bg-white p-3 rounded shadow-sm">
              <h4 class="font-medium mb-2">Image Sentence Details</h4>
              <div class="mb-3">
                <label class="block mb-1">Images (URLs):</label>
                <div class="space-y-2">
                  <div v-for="(img, imgIndex) in subroom.questions[0].images" :key="imgIndex">
                    <div class="flex gap-2">
                      <input v-model="subroom.questions[0].images[imgIndex]" class="flex-grow p-2 border rounded" 
                             placeholder="Image URL" />
                      <button v-if="imgIndex > 0" @click="removeImage(subroom, 0, imgIndex)" 
                              class="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-colors">×</button>
                    </div>
                  </div>
                </div>
                <button v-if="subroom.questions[0].images.length < 4" @click="addImage(subroom, 0)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600 transition-colors">Add Image</button>
              </div>
              <div class="mb-3">
                <label class="block mb-1">Answer:</label>
                <input v-model="subroom.questions[0].answer" class="w-full p-2 border rounded" 
                       placeholder="e.g. titanic" />
              </div>
              <div class="mb-3">
                <label class="block mb-1">Hints:</label>
                <div class="space-y-2">
                  <div v-for="(hint, hintIndex) in subroom.questions[0].hints" :key="hintIndex">
                    <div class="flex gap-2">
                      <input v-model="subroom.questions[0].hints[hintIndex]" class="flex-grow p-2 border rounded" />
                      <button v-if="hintIndex > 0" @click="removeHint(subroom, 0, hintIndex)" 
                              class="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-colors">×</button>
                    </div>
                  </div>
                </div>
                <button v-if="subroom.questions[0].hints.length < 3" @click="addHint(subroom, 0)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600 transition-colors">Add Hint</button>
              </div>
            </div>
            
            <div v-if="subroom.type === 'emoji_guess'" class="bg-white p-3 rounded shadow-sm">
              <h4 class="font-medium mb-2">Emoji Guess Details</h4>
              <div class="mb-3">
                <label class="block mb-1">Emoji Image URL:</label>
                <input v-model="subroom.questions[0].image" class="w-full p-2 border rounded" 
                       placeholder="Emoji image URL" />
              </div>
              <div class="mb-3">
                <label class="block mb-1">Answer:</label>
                <input v-model="subroom.questions[0].answer" class="w-full p-2 border rounded" 
                       placeholder="e.g. Forrest Gump" />
              </div>
              <div class="mb-3">
                <label class="block mb-1">Hints:</label>
                <div class="space-y-2">
                  <div v-for="(hint, hintIndex) in subroom.questions[0].hints" :key="hintIndex">
                    <div class="flex gap-2">
                      <input v-model="subroom.questions[0].hints[hintIndex]" class="flex-grow p-2 border rounded" />
                      <button v-if="hintIndex > 0" @click="removeHint(subroom, 0, hintIndex)" 
                              class="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-colors">×</button>
                    </div>
                  </div>
                </div>
                <button v-if="subroom.questions[0].hints.length < 3" @click="addHint(subroom, 0)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600 transition-colors">Add Hint</button>
              </div>
            </div>
            
            <div v-if="subroom.type === 'person_connection'" class="bg-white p-3 rounded shadow-sm">
              <h4 class="font-medium mb-2">Person Connection Details</h4>
              <div class="mb-3">
                <label class="block mb-1">Answer (Person Name):</label>
                <input v-model="subroom.questions[0].answer" class="w-full p-2 border rounded" 
                       placeholder="e.g. Brad Pitt" />
              </div>
              <div class="mb-3">
                <label class="block mb-1">Connection Items:</label>
                <div class="space-y-2">
                  <div v-for="(item, itemIndex) in subroom.questions[0].items" :key="itemIndex">
                    <div class="flex gap-2">
                      <input v-model="subroom.questions[0].items[itemIndex]" class="flex-grow p-2 border rounded" 
                             placeholder="Item connected to the person" />
                      <button v-if="itemIndex > 0" @click="removeItem(subroom, 0, itemIndex)" 
                              class="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-colors">×</button>
                    </div>
                  </div>
                </div>
                <button v-if="subroom.questions[0].items.length < 4" @click="addItem(subroom, 0)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600 transition-colors">Add Item</button>
              </div>
              <div class="mb-3">
                <label class="block mb-1">Hints:</label>
                <div class="space-y-2">
                  <div v-for="(hint, hintIndex) in subroom.questions[0].hints" :key="hintIndex">
                    <div class="flex gap-2">
                      <input v-model="subroom.questions[0].hints[hintIndex]" class="flex-grow p-2 border rounded" />
                      <button v-if="hintIndex > 0" @click="removeHint(subroom, 0, hintIndex)" 
                              class="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-colors">×</button>
                    </div>
                  </div>
                </div>
                <button v-if="subroom.questions[0].hints.length < 3" @click="addHint(subroom, 0)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600 transition-colors">Add Hint</button>
              </div>
            </div>
          </div>
        </div>
        
        <button v-if="escapeRoom.subrooms.length < 4" @click="addSubroom" 
                class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition-colors">Add Challenge</button>
      </div>
      
      <div class="mt-6 pb-8">
        <button @click="saveEscapeRoom" class="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition-colors">Save Escape Room</button>
        <div v-if="savedMessage" class="mt-4 p-3 bg-green-100 text-green-700 rounded">{{ savedMessage }}</div>
        <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 text-red-700 rounded">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EscapeRoomCreator',
  data() {
    return {
      escapeRoom: {
        title: '',
        genre: '',
        difficulty: 'Normal',
        description: '',
        subrooms: []
      },
      savedMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    createEmptyQuestion(type) {
      switch(type) {
        case 'number_guess':
          return {
            question: '',
            answer: '',
            hints: ['']
          };
        case 'image_sentence':
          return {
            images: [''],
            answer: '',
            hints: ['']
          };
        case 'emoji_guess':
          return {
            image: '',
            answer: '',
            hints: ['']
          };
        case 'person_connection':
          return {
            answer: '',
            hints: [''],
            items: ['']
          };
        default:
          return {};
      }
    },
    
    addSubroom() {
      if (this.escapeRoom.subrooms.length < 4) {
        const type = 'number_guess'; // Default type
        this.escapeRoom.subrooms.push({
          type: type,
          questions: [this.createEmptyQuestion(type)]
        });
      }
    },
    
    removeSubroom(index) {
      this.escapeRoom.subrooms.splice(index, 1);
    },
    
    addHint(subroom, questionIndex) {
      if (subroom.questions[questionIndex].hints.length < 3) {
        subroom.questions[questionIndex].hints.push('');
      }
    },
    
    removeHint(subroom, questionIndex, hintIndex) {
      subroom.questions[questionIndex].hints.splice(hintIndex, 1);
    },
    
    addImage(subroom, questionIndex) {
      if (subroom.questions[questionIndex].images.length < 4) {
        subroom.questions[questionIndex].images.push('');
      }
    },
    
    removeImage(subroom, questionIndex, imageIndex) {
      subroom.questions[questionIndex].images.splice(imageIndex, 1);
    },
    
    addItem(subroom, questionIndex) {
      if (subroom.questions[questionIndex].items.length < 4) {
        subroom.questions[questionIndex].items.push('');
      }
    },
    
    removeItem(subroom, questionIndex, itemIndex) {
      subroom.questions[questionIndex].items.splice(itemIndex, 1);
    },
    
    async saveEscapeRoom() {
      try {
        // Validate that we have exactly 4 subrooms
        if (this.escapeRoom.subrooms.length !== 4) {
          this.errorMessage = 'An escape room must have exactly 4 challenges.';
          this.savedMessage = '';
          return;
        }
        
        const response = await axios.post('/admin/add_room', this.escapeRoom);
        
        if (response.status === 201) {
          this.savedMessage = 'Escape room saved successfully!';
          this.errorMessage = '';
         
          this.escapeRoom = {
            title: '',
            genre: '',
            difficulty: 'Normal',
            description: '',
            subrooms: []
          };
          
          this.addSubroom();
        } else {
          this.errorMessage = 'Failed to save escape room.';
          this.savedMessage = '';
        }
      } catch (error) {
        console.error('Error saving escape room:', error);
        this.errorMessage = `Error: ${error.response?.data?.message || error.message}`;
        this.savedMessage = '';
      }
    }
  },
  watch: {
    'escapeRoom.subrooms': {
      deep: true,
      handler(subrooms) {
        subrooms.forEach(subroom => {
          if (!subroom.questions || subroom.questions.length === 0) {
            subroom.questions = [this.createEmptyQuestion(subroom.type)];
          }
        });
      }
    }
  },
  created() {
    this.addSubroom();
  }
}
</script>

<style scoped>
.escape-room-creator {
  max-height: 100vh;
  overflow-y: auto;
}

.transition-colors {
  transition: background-color 0.3s ease;
}

input, select, textarea {
  font-size: 0.95rem;
}

.pb-8 {
  padding-bottom: 2rem;
}
</style>