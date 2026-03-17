<template>
  <v-container>
    <h2>Other Page</h2>
    <p>This page exists to create a lazy-loaded route, triggering CSS code splitting.</p>
    <v-icon>info</v-icon>
    <v-select
      label="Example select"
      :items="['Option A', 'Option B', 'Option C']"
    />
    <v-text-field label="Example input" />
  </v-container>
</template>
