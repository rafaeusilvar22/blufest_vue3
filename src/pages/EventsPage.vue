<template>
  <q-page padding>
    <div class="row q-pt-sm col-md-12">
      <ChipGroup :category="category" @selectCategory="handleSetCategory" />
    </div>
    <table-content :fetchData="events" :load="load" />
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { category } from "src/constants/categoryEvents";
import useApi from "src/composables/useApi.js";
import getDateFormated from "src/utils/currentDate";

import ChipGroup from "src/components/ChipGroup.vue";
import TableContent from "src/components/Tables/TableContent.vue";

const { fetchEvents } = useApi();
const events = ref([]);
const load = ref(true);
const emitCategory = ref("");

onMounted(() => {
  funcFetchEvents();
});

const funcFetchEvents = async () => {
  events.value = await fetchEvents(
    "posts",
    emitCategory.value,
    getDateFormated()
  );
  load.value = false;
};

const handleSetCategory = (item) => {
  emitCategory.value = item.value;
  funcFetchEvents();
};
</script>
