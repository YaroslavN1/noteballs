<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="info"
      placeholder="Edit note"
      label="Edit note"
    >
      <template #buttons>
        <button
            @click="$router.back"
            class="button is-link is-light mr-3"
          >
            Cancel
        </button>
        <button
            @click="saveButtonClicked"
            class="button is-link has-background-info"
            :disabled="!noteContent"
          >
            Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>

/*
  imports
*/

  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes';

/* 
  store
*/

  const storeNotes = useStoreNotes()

/* 
  router
*/

  const route = useRoute()
  const router = useRouter()
/* 
  note
*/

  const noteContent = ref('')
  noteContent.value = storeNotes.getNoteContent(route.params.id)

/* 
  save button
*/

  const saveButtonClicked = () => {
    storeNotes.updateNote(noteContent.value, route.params.id)
    router.push('/')
  }

</script>