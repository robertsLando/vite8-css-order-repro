<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Vite 8 CSS Order Repro</v-toolbar-title>
      <v-btn to="/" prepend-icon="home">Home</v-btn>
      <v-btn to="/other" prepend-icon="settings">Other</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
