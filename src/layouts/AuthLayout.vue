<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="[$q.dark.isActive ? 'bg-dark' : 'bg-white']">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
        <adjustment-menu :signOut="false" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import AdjustmentMenu from "src/components/AdjustmentMenu.vue";
</script>
