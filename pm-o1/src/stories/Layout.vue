<template>
  <div ref="layout" class="all">
    <my-header :user="user" @logo="toggleSidebar" />

    <main class="flex flex-row flex-1 overflow-hidden">
      <Sidebar :value="sidebar" :menu="menu" @input="setSide" />
      <transition name="blur" appear>
        <section class="flex-1 flex flex-col overflow-hidden">
          <slot />
        </section>
      </transition>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import './page.css';
import MyHeader from './Header.vue';
import Sidebar from './Sidebar.vue';
import Menu from "./Menu";

const layout = ref(null);

defineProps<{
  user: { avatar: string, firstname: string, lastname: string, fullname: string } | null,
  menu: Menu[],
}>();

// this.$refs.sidebar
const sidebar = ref(window.innerWidth > 768);

const toggleSidebar = () => {
  sidebar.value = !sidebar.value;
};

const setSide = (value: boolean) => {
  sidebar.value = value;
};
</script>

<style>
.all {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Transition classes */
.blur-enter-from,
.blur-appear-from {
  filter: blur(10px);
  opacity: 0.1;
  transform: scale(1.05);
}

.blur-enter-active,
.blur-appear-active {
  transition: filter 150ms, opacity 150ms, transform 150ms;
}

.blur-enter-to,
.blur-appear-to {
  filter: blur(0);
  opacity: 1;
  transform: scale(1);
}
</style>