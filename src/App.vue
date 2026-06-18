<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Vite 8 CSS Order Repro</v-toolbar-title>
      <v-btn to="/" prepend-icon="home">Home</v-btn>
      <v-btn to="/other" prepend-icon="settings">Other</v-btn>
    </v-app-bar>
    <v-main>
      <!-- Eager use of the shared icon-heavy component, also imported by every
           lazy route. This is what pushes Rolldown to extract the Vuetify
           component CSS into a separate eager chunk linked before index.css. -->
      <IconPanel title="App shell" />
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup>
import IconPanel from './components/IconPanel.vue'
</script>
