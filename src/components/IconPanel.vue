<template>
  <v-card class="ma-2" variant="outlined">
    <v-card-title>
      <v-icon class="mr-2">dashboard</v-icon>{{ title }}
    </v-card-title>
    <v-card-text>
      <v-chip-group>
        <v-chip prepend-icon="home">Home</v-chip>
        <v-chip prepend-icon="settings">Settings</v-chip>
        <v-chip prepend-icon="info">Info</v-chip>
      </v-chip-group>
      <v-list>
        <v-list-item v-for="n in 4" :key="n" prepend-icon="check">Item {{ n }}</v-list-item>
      </v-list>
      <v-row>
        <v-col v-for="s in ['x-small','small','default','large','x-large']" :key="s">
          <v-icon :size="s">favorite</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup>
defineProps({ title: { type: String, default: 'Panel' } })
</script>
