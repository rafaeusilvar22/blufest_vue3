<template>
  <q-btn
    v-if="canShare"
    flat
    padding="none"
    :color="$q.dark.isActive ? 'white' : 'grey-8'"
    @click="shareApp(data)"
  >
    <svg
      :fill="$q.dark.isActive ? 'white' : 'grey'"
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path
        d="M17,19c0,2.76-2.24,5-5,5H5C2.24,24,0,21.76,0,19v-7C0,9.24,2.24,7,5,7h1c.55,0,1,.45,1,1s-.45,1-1,1h-1c-1.65,0-3,1.35-3,3v7c0,1.65,1.35,3,3,3h7c1.65,0,3-1.35,3-3,0-.55,.45-1,1-1s1,.45,1,1Zm6.13-13.11L17.72,.3c-.38-.4-1.02-.41-1.41-.02s-.41,1.02-.02,1.41l5.14,5.3H13c-2.76,0-5,2.24-5,5v5c0,.55,.45,1,1,1s1-.45,1-1v-5c0-1.65,1.35-3,3-3h8.42l-5.14,5.3c-.38,.4-.38,1.03,.02,1.41,.19,.19,.45,.28,.7,.28s.52-.1,.72-.3l5.4-5.57c1.17-1.17,1.17-3.07,.01-4.23Z"
      />
    </svg>
  </q-btn>
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
