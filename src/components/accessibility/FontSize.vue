<template>
  <div>
    <div>
      <span class="text-weight-medium"
        >Tamanho da fonte: {{ currentFontSizeLabel }}</span
      >
    </div>
    <q-slider v-model="baseFontSize" :min="16" :max="20" markers />
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useFontSize } from "src/composables/useFontSize";

const { baseFontSize } = useFontSize();
const arrayMarkerLabel = [
  { value: 16, label: "Padrão" },
  { value: 17, label: "Médio" },
  { value: 18, label: "Grande" },
  { value: 19, label: "Muito grande" },
  { value: 20, label: "Enorme" },
];

// Propriedade computada para obter o rótulo do tamanho da fonte atual
const currentFontSizeLabel = computed(() => {
  const marker = arrayMarkerLabel.find(
    (item) => item.value === baseFontSize.value
  );
  return marker ? marker.label : "Padrão";
});
</script>
src/composables/useFontSize
