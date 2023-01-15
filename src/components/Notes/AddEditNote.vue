<template>
  <div
    class="card p-4 mb-4"
    :class="`has-background-${ bgColor }-dark`"
  >
    <label
      v-if="label"
      class="label has-text-white"
    >
      {{ label }}
    </label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textAreaRef"
          maxlength="100"
          v-autofocus
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script setup>

/* 
  imports
*/

import { ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'
import { useStoreNotes } from '@/stores/storeNotes'

/* 
  store
*/

const storeNotes = useStoreNotes()

/* 
  props
*/

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String,
      default: 'Type something...'
    },
    label: {
      type: String
    }
  })

/* 
  emits
*/

  const emit = defineEmits(['update:modelValue'])

/* 
  focus text area
*/

  const textAreaRef = ref(null )
  const focusTextArea = () => {
    textAreaRef.value.focus()
    }
    defineExpose({
      focusTextArea
  })

</script>