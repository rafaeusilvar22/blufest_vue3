<template>
  <q-page padding>
    <div class="q-pl-md text-h6">{{ $t("manage places") }}</div>
    <table-manage
      :data="fetchData"
      :load="loading"
      :category="category"
      @course-deleted="handleCourseDeleted"
    />
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import useNotify from "src/composables/useNotify";
import userApi from "src/composables/useApi";
import TableManage from "src/components/Tables/TableManage.vue";

const { notifySucess } = useNotify();
const { listPlace } = userApi();
const fetchData = ref([]);
const loading = ref(true);
const category = [{ route: "form-place", table: "places", query: "place" }];

onMounted(() => {
  funcFetchPlaces();
});

const funcFetchPlaces = async () => {
  const data = await listPlace("places", "category_id", 0);
  fetchData.value = data;
  loading.value = false;
};

const handleCourseDeleted = (deletedCourseId) => {
  // Atualize os dados após a exclusão do local
  fetchData.value = fetchData.value.filter(
    (course) => course.id !== deletedCourseId
  );
  notifySucess("Evento excluído");
};
</script>
