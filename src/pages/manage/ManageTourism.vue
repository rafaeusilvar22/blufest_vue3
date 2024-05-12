<template>
  <q-page padding>
    <div class="q-pl-md text-h6">{{ $t("manage tourism") }}</div>
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
const category = [{ route: "form-tourism", table: "tourism" }];

onMounted(() => {
  funcFetchTourism();
});

const funcFetchTourism = async () => {
  fetchData.value = await listPlace("tourism", "category", 0);
  loading.value = false;
};

const handleCourseDeleted = (deletedCourseId) => {
  // Atualize os dados após a exclusão do curso
  fetchData.value = fetchData.value.filter(
    (course) => course.id !== deletedCourseId
  );
  notifySucess("Evento excluído");
};
</script>
