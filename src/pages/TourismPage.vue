<template>
  <q-page padding>
    <div class="row q-pt-sm col-md-12">
      <ChipGroup
        :category="categoryTourism"
        @selectCategory="handleSetCategory"
      />
    </div>
    <table-content :fetchData="tourism" :load="load" />
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { categoryTourism } from "src/constants/categoryEvents";
import useApi from "src/composables/useApi.js";

import ChipGroup from "src/components/ChipGroup.vue";
import TableContent from "src/components/Tables/TableContent.vue";

const { listPlace } = useApi();
const tourism = ref([]);
const load = ref(true);
const selectItemCategory = ref(0);

onMounted(() => {
  funcFetchTourism();
});

const funcFetchTourism = async () => {
  tourism.value = await listPlace(
    "tourism",
    "category",
    selectItemCategory.value
  );
  load.value = false;
};

const handleSetCategory = (item) => {
  selectItemCategory.value = item.value;
  funcFetchTourism();
};
</script>
