<template>
  <div>
    <q-select
      outlined
      :options="props.options"
      v-model="setOptions"
      :label="$t('categories')"
      @update:model-value="handleSelectOption(setOptions)"
    />
  </div>
</template>
<script setup>
import { onUpdated, ref } from "vue";

const emit = defineEmits(["selectOption"]);
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  definedCategory: {
    type: String,
    required: true,
  },
});
const setOptions = ref(props.definedCategory);

onUpdated(() => {
  console.log(setOptions.value);
});

const handleSelectOption = (option) => {
  emit("selectOption", option.value);
};
</script>
