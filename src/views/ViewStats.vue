<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of characters (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="statsQuestion"
      class="input"
      type="text"
      placeholder="Do you like _noteballs?"
      v-autofocus
      maxlength="20"
      >
  </div>
</template>

<script setup>

/* 
  imports
*/

  import { ref } from 'vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import { vAutofocus } from '@/directives/vAutofocus'
  import { useWatchCharacters } from '@/use/useWatchCharacters'

/* 
  store
*/

  const storeNotes = useStoreNotes()
/* 
  question
*/

  const statsQuestion = ref('')

  /* 
  directives
*/
  useWatchCharacters(statsQuestion, 20)

</script>