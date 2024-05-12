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
  details: {
    type: Object,
  },
});

const canShare = ref(false);

const data = computed(() => {
  return props.shareData;
});

onMounted(() => {
  if (!navigator.canShare) {
    canShare.value = false;
  } else {
    canShare.value = true;
  }
});

const shareApp = async (d) => {
  const shareData = {
    title: `Veja esse ${props.details[0]} no BlumenauFest`,
    text: d.name,
    url: window.location.origin + `/#/${props.details.param_url}/` + d.id,
  };

  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log(err);
  }
};
</script>
