<template>
  <q-option-group
    :options="localeOptions"
    type="radio"
    v-model="locale"
    @update:model-value="handleSetLanguage"
  >
    <template v-slot:label="opt">
      <div class="row items-center q-gutter-x-sm">
        <span class="">{{ opt.label }}</span>
        <img :src="opt.icon" width="25px" alt="" />
      </div>
    </template>
  </q-option-group>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";

const { locale } = useI18n({ useScope: "global" });
const { t } = useI18n();

const localeOptions = ref([]);

const updateLocaleOptions = () => {
  localeOptions.value = [
    { value: "pt", label: t("portuguese"), icon: "flat/brasil.png" },
    { value: "en-US", label: t("english"), icon: "flat/eua.png" },
  ];
};

// Inicializa as opções de idioma
updateLocaleOptions();

watch(locale, () => {
  updateLocaleOptions();
});

const handleSetLanguage = () => {
  localStorage.setItem("selectedLanguage", locale.value);
};
</script>
