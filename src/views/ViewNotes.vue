<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Type new note..."
    >
      <template #buttons>
        <button
            class="button is-link has-background-success"
            :disabled="!newNote"
            @click="addNote()"
            @keyup.prevent.enter="addNote()"
            type="submit"
          >
            Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-small is-success mt-6"
      max="100"
    />

    <template v-else>
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />

      <div
        v-if="!storeNotes.notes.length"
        class="is-size-5 has-text-centered has-text-grey-light py-6"
      >
        No notes here yet...
      </div>
    </template>
   </div> 

</template>

<script setup>

/* 
  imports
*/

  import { useStoreNotes } from '@/stores/storeNotes'
  import { ref, onMounted, onUnmounted } from 'vue'
  import Note from '@/components/Notes/Note.vue'
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  import { useWatchCharacters } from '@/use/useWatchCharacters'

/* 
  store
*/

  const storeNotes = useStoreNotes()

/* 
  notes
*/

  const newNote = ref('')
  const addEditNoteRef = ref()

/* 
  add note
*/

  const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextArea()
  }

/* 
  directives
*/

  useWatchCharacters(newNote)

/* 
  keyboard controls
*/

  const keyboardHandler = e => {
    if(e.key === 'Enter') 
      addNote()
    }

  onMounted(() => {
    document.addEventListener('keyup', keyboardHandler)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', keyboardHandler)
  })

</script>