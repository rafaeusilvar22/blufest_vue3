<template>
  <q-page padding>
    <div class="q-px-sm q-gutter-y-sm">
      <div class="text-h6 q-py-md">{{ $t("quick_acess.settings") }}</div>

      <div>
        <span class="text-weight-medium">{{ $t("Select language") }}</span>
        <set-language />
      </div>

      <div>
        <span class="text-weight-medium">{{ $t("theme") }}</span>
        <dark-mode />
      </div>

      <q-btn
        :label="$t('back')"
        no-caps
        outline
        class="q-mt-md"
        color="primary"
        @click="funBackPage()"
      />
    </div>
  </q-page>
</template>
<script setup>
import DarkMode from "src/components/Accessibility/DarkMode.vue";
import SetLanguage from "src/components/Accessibility/SetLanguage.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const funBackPage = () => {
  router.push({ name: "more" });
};
</script>
