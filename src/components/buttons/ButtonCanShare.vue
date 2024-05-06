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

const props = defineProps({
  shareData: {
    type: Object,
  },
});

const data = computed(() => {
  return props.shareData;
});

const canShare = ref(false);

onMounted(() => {
  if (!navigator.canShare) {
    canShare.value = false;
  } else {
    canShare.value = true;
  }
});

const shareApp = async (d) => {
  const shareData = {
    title: "Veja esse Evento no BlumenauFest",
    text: d.name,
    url: window.location.origin + "/#/event/" + d.id,
  };

  try {
    await navigator.share(shareData);
  } catch (err) {
    // $notifyDanger("Não foi possível compartilhar o app!");
  }
};
</script>
