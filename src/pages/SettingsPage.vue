<template>
  <q-page padding>
    <div class="q-px-sm q-gutter-y-sm">
      <div class="text-h6 q-pt-md">{{ $t("quick_acess.settings") }}</div>

      <q-separator />

      <div>
        <span class="text-weight-medium">{{ $t("Select language") }}</span>
        <set-language />
      </div>

      <q-separator />

      <div>
        <span class="text-weight-medium">{{ $t("theme") }}</span>
        <dark-mode />
      </div>

      <q-separator />

      <br />

      <font-size />

      <q-separator />

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
import { useRouter } from "vue-router";
import DarkMode from "src/components/Accessibility/DarkMode.vue";
import SetLanguage from "src/components/Accessibility/SetLanguage.vue";
import FontSize from "src/components/Accessibility/FontSize.vue";

const router = useRouter();

const funBackPage = () => {
  router.push({ name: "more" });
};
</script>
