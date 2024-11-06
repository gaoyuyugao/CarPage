<script setup>
import Header from './components/WebHeader.vue';
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="app-container">
    <Header />
<!--    <div style="margin-top: 50px"></div>-->
    <RouterView />

  </div>
</template>

<style scoped>
.app-container {
  position: absolute; /* 设置绝对定位 */
  top: 50%; /* 顶部距离视口的50% */
  left: 50%; /* 左边距离视口的50% */
  transform: translate(-50%, -50%); /* 向左和向上移动自身宽度和高度的50% */
  margin: 0 auto;
  width: 420px; /* 固定宽度 */
  height: 640px; /* 固定高度 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

}
@media (max-width: 768px) {
  .app-container {
    position: relative; /* 在小屏幕上设置为相对定位 */
    top: 0;
    left: 0;
    transform: none;
    max-width: 100%; /* 在小屏幕上设置为全屏 */
    padding: 0.5rem;
    box-shadow: none; /* 在小屏幕上移除阴影 */
  }
}
</style>














































<!-- <template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
