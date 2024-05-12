<template>
  <div>
    <q-select
      outlined
      :options="props.options"
      v-model="setOptions"
      :label="$t('categories')"
      option-label="label"
      option-value="value"
      map-options
      @update:model-value="handleSelectOption(setOptions)"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-img :src="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:prepend>
        <q-icon name="mdi-shape-outline" />
      </template>
    </q-select>
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
const setOptions = ref();

onUpdated(() => {
  setOptions.value = props.definedCategory;
});

const handleSelectOption = (option) => {
  emit("selectOption", option.value);
};
</script>
