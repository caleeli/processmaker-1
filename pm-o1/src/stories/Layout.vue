<template>
  <div class="all">
    <my-header :user="user" @logo="toggleSidebar" />

    <main class="flex flex-row flex-1">
      <Sidebar :value="sidebar" :menu="menu" @input="setSide" />
      <section class="flex-1 flex flex-col overflow-hidden">
        <slot />
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import './page.css';
import MyHeader from './Header.vue';
import Sidebar from './Sidebar.vue';
import Menu from "./Menu";

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
</style>