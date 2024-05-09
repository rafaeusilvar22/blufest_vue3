<template>
  <q-btn
    v-if="canShare"
    flat
    icon="mdi-share-variant-outline"
    padding="none"
    :color="$q.dark.isActive ? 'white' : 'grey-8'"
    @click="shareApp(data)"
  />
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import verifyRoute from "src/utils/routeVerifier.js";

const props = defineProps({
  shareData: {
    type: Object,
  },
});

const route = useRoute();
const canShare = ref(false);
const defineRoutes = ref(null);

const data = computed(() => {
  return props.shareData;
});

onMounted(() => {
  if (!navigator.canShare) {
    canShare.value = false;
  } else {
    canShare.value = true;
  }
  verifyRoute(route, defineRoutes); // Usa a função de verificação de rota no hook 'onMounted'
});

const shareApp = async (d) => {
  const shareData = {
    title: `Veja esse ${defineRoutes.value[0].title} no BlumenauFest`,
    text: d.name,
    url:
      window.location.origin +
      `/#/${defineRoutes.value[0].pathDetailsPage}/` +
      d.id,
  };

  try {
    await navigator.share(shareData);
  } catch (err) {
    // $notifyDanger("Não foi possível compartilhar o app!");
  }
};
</script>
