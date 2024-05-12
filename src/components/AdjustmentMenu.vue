<template>
  <q-btn
    flat
    round
    icon="mdi-cog"
    :color="$q.dark.isActive ? 'white' : 'primary'"
  >
    <q-menu>
      <div class="row justify-center no-wrap q-py-sm" style="min-width: 150px">
        <div class="column">
          <DarkMode v-if="false" />
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

          <SetLanguage />

          <q-btn
            v-close-popup
            v-if="props.signOut"
            flat
            size="md"
            class="text-caption text-capitalize"
            color="primary"
            :label="!!user ? $t('logout') : $t('login')"
            @click="handlePushLogin()"
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>
<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/useAuthUser";
import DarkMode from "components/Accessibility/DarkMode.vue";
import SetLanguage from "components/Accessibility/SetLanguage.vue";

const props = defineProps({
  signOut: {
    type: Boolean,
    default: true,
  },
});

const $q = useQuasar();
const router = useRouter();
const { user, logout } = useAuthUser();

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

const handlePushLogin = async () => {
  await logout();
  setTimeout(() => {
    router.push({ name: "login" });
  }, 2000);
};
</script>
