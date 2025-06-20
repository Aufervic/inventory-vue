<template>
  <footer class="text-center py-2 bg-light border-top">
    <small>
      © {{ year }} - Aufervic Inventario
      <i class="bi bi-cpu me-1"></i>
    </small>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>