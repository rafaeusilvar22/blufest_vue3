<template>
  <q-page padding>
    <div class="row q-pt-sm col-md-12">
      <ChipGroup
        :category="categoryEvent"
        @selectCategory="handleSetCategory"
      />
    </div>
    <table-content :fetchData="events" :load="load" :details="detailsEvent" />
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { categoryEvent } from "src/constants/categories";
import useApi from "src/composables/useApi.js";
import getDateFormated from "src/utils/currentDate";

import ChipGroup from "src/components/ChipGroup.vue";
import TableContent from "src/components/Tables/TableContent.vue";

const { fetchEvents } = useApi();
const events = ref([]);
const detailsEvent = {
  title: "Evento",
  param_url: "details",
};
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
src/constants/categories
