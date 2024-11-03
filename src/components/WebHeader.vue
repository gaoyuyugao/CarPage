<template>
    <header class="header">
      <img :src="logo" alt="Logo" />
    </header>
</template>
  
<style scoped>
  .header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #e0e3eb;
  font-size: 1.2rem;
  }
  img {
  height: 30px; /* 根据需要调整图片大小 */
  margin-right: 0.5rem;
  }
</style>

<script setup>
import logo from '@/assets/logo.png';
</script>