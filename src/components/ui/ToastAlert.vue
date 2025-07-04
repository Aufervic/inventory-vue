<template>
  <div
    v-if="visible"
    :class="['toast', 'align-items-center', 'text-white', `bg-${tipo}`, 'position-fixed', 'bottom-0', 'end-0', 'm-4', 'show']"
    role="alert"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ texto }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="visible = false"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  texto: String,
  tipo: {
    type: String,
    default: 'danger'
  },
  autoHide: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 3000
  },
  keyRefresh: {
    type: [String, Number], // cualquier valor que cambie
    required: false
  }
})

const visible = ref(false)

watch(() => props.keyRefresh, () => {
  visible.value = false
  setTimeout(() => {
    visible.value = true
    if (props.autoHide) {
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  }, 10)
})
</script>
