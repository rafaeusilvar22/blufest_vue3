<template>
  <q-page padding>
    <div class="q-pl-md text-h6">{{ $t("manage events") }}</div>
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
import getDateFormated from "src/utils/currentDate";
import TableManage from "src/components/Tables/TableManage.vue";

const { notifySucess } = useNotify();
const { fetchEvents } = userApi();
const fetchData = ref([]);
const loading = ref(true);
const category = [{ route: "formEvents", table: "posts" }];

onMounted(() => {
  funcFetchEvents();
});

const funcFetchEvents = async () => {
  const data = await fetchEvents("posts", "", getDateFormated());
  fetchData.value = data;
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
