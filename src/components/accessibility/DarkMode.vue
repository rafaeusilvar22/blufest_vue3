<template>
  <q-toggle
    v-model="darkMode"
    class="text-caption"
    size="md"
    checked-icon="mdi-moon-waning-crescent"
    unchecked-icon="mdi-white-balance-sunny"
    :color="$q.dark.isActive ? 'primary' : 'white'"
    :label="$q.dark.isActive ? $t('dark_mode') : $t('light_mode')"
    @click="handleSetDarkMode(darkMode)"
  />
</template>
<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";

const $q = useQuasar();
const darkMode = ref(false);

onMounted(() => {
  verifyDarkMode();
});

const handleSetDarkMode = (darkValue) => {
  $q.dark.set(darkValue);
  $q.localStorage.set("dark-mode", darkValue);
};

const verifyDarkMode = () => {
  const darkModeLocalStorage = $q.localStorage.getItem("dark-mode");
  if (darkModeLocalStorage) {
    handleSetDarkMode(true);
    darkMode.value = true;
  } else {
    handleSetDarkMode(false);
    darkMode.value = false;
  }
};
</script>
