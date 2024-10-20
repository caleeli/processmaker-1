<template>
  <div class="all">
    <my-header :user="user" @logo="toggleSidebar" />

    <main class="flex flex-row flex-1">
      <Sidebar :value="sidebar" @input="setSide" />
      <section class="storybook-page">
        <h2>Pages in Storybook</h2>
        <p>
          We recommend building UIs with a
          <a href="https://componentdriven.org" target="_blank" rel="noopener noreferrer">
            <strong>component-driven</strong>
          </a>
          process starting with atomic components and ending with pages.
        </p>

      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import './page.css';
import MyHeader from './Header.vue';
import Sidebar from './Sidebar.vue';

//const user = ref<{ name: string } | null>(null);
defineProps<{ user: { avatar: string, firstname: string, lastname: string, fullname: string } | null }>();

// this.$refs.sidebar
const sidebar = ref(false);

const toggleSidebar = () => {
  sidebar.value = !sidebar.value;
  console.log('sidebar', sidebar.value);
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