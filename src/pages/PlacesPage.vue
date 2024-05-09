<template>
  <q-page padding>
    <div class="row justify-end q-pt-sm q-px-md">
      <q-btn
        no-caps
        outline
        rounded
        :color="$q.dark.isActive ? 'white' : 'primary'"
        :label="selectItemCategory.label"
      >
        <img
          class="q-pl-xs"
          style="height: auto; max-width: 20px"
          :src="selectItemCategory.icon"
        />

        <q-menu>
          <div class="q-pa-sm" style="max-width: 350px">
            <ChipGroup
              :category="categoryPlace"
              :itemActive="selectItemCategory.id"
              @selectCategory="handleSetCategory"
            />
          </div>
        </q-menu>
      </q-btn>
    </div>

    <table-content :fetchData="places" :load="load" />
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import useApi from "src/composables/useApi.js";
import { categoryPlace } from "src/constants/categoryEvents";

import ChipGroup from "src/components/ChipGroup.vue";
import TableContent from "src/components/Tables/TableContent.vue";

import setInitialPositionScrollBehavior from "src/utils/functions";

const { listPlace } = useApi();
const places = ref([]);
const load = ref(true);

const selectItemCategory = ref({});

onMounted(() => {
  selectItemCategory.value = getStoredCategory();
  fetchEvents();
});

const getStoredCategory = () => {
  const storedCategory = sessionStorage.getItem("defineCategoryLocalStorage");

  if (storedCategory) {
    return JSON.parse(storedCategory);
  } else {
    return {
      label: "Bares",
      id: 5,
      icon: "flat/drink.png",
    };
  }
};

const fetchEvents = async () => {
  places.value = await listPlace(
    "places",
    "category_id",
    selectItemCategory.value.id
  );
  load.value = false;
};

const handleSetCategory = (item) => {
  sessionStorage.setItem(
    "defineCategoryLocalStorage",
    JSON.stringify({ ...item })
  );

  selectItemCategory.value = JSON.parse(
    sessionStorage.getItem("defineCategoryLocalStorage")
  );

  setInitialPositionScrollBehavior();
  fetchEvents();
};
</script>
