<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
      class="modal-card"
      ref="modalCardRef"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note</p>
        <button
          @click="closeModal"
          class="delete"
          aria-label="close"
          ref="modalCloseButtonRef"
          >
        </button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete a note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          @click="closeModal"
          class="button"
          ref="modalCancelButtonRef"
          >
            Cancel
        </button>
        <button
          @click="storeNotes.deleteNote(noteID)"
          class="button is-danger"
        >
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>

/* 
  imports
*/

  import { onMounted, onUnmounted, ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStoreNotes } from '@/stores/storeNotes'

/* 
  emits
*/

  const emit = defineEmits(['update:modelValue'])

/* 
  props
*/

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteID: {
    type: String,
    required: true
  }
})

/* 
  store
*/

const storeNotes = useStoreNotes()

/* 
  close modal
*/

  const closeModal = () => {
    emit('update:modelValue', false)
  }

/* 
  close modal on click outside
*/

  const modalCardRef = ref(null)

  onClickOutside(modalCardRef, closeModal)

/* 
  keyboard controls
*/

  const keyboardHandler = e => {
      if(e.key === 'Escape') closeModal()
    }

  onMounted(() => {
    document.addEventListener('keyup', keyboardHandler)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', keyboardHandler)
  })

</script>