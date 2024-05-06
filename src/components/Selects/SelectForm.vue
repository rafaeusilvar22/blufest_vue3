<template>
  <div>
    <q-select
      outlined
      :options="props.options"
      v-model="setOptions"
      :label="$t('categories')"
      @update:model-value="handleSelectOption()"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
  },
  definedCategory: {
    type: String,
  },
});

const emit = defineEmits(["selectOption"]);

const setOptions = ref(props.definedCategory);

const handleSelectOption = () => {
  emit("selectOption", setOptions.value.value);
};
</script>
