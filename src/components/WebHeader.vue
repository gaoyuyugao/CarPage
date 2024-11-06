<template>
    <header class="header">
      <img :src="logo" alt="Logo" />
    </header>
</template>

<style scoped>
  .header {
  display: flex;
  background-color: #e0e3eb;
  font-size: 1.2rem;
  }
  img {
  height: 70px; /* 根据需要调整图片大小 */
  margin-right: 0.5rem;
  }
</style>

<script setup>
import logo from '@/assets/background4.jpg';
</script>
