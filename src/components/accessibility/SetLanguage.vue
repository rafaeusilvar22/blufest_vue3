<template>
  <q-select
    class="q-px-md"
    v-model="locale"
    :options="localeOptions"
    :label="$t('language')"
    dense
    borderless
    emit-value
    map-options
    options-dense
    behavior="menu"
    style="min-width: 150px"
    @update:model-value="handleSetLanguage()"
  />
</template>
<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });
const localeOptions = [
  { value: "pt", label: "Português" },
  { value: "en-US", label: "English" },
];

const handleSetLanguage = () => {
  localStorage.setItem("selectedLanguage", locale.value);
};
</script>
