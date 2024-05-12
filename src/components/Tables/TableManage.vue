<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      flat
      bordered
      title="Eventos"
      :rows="rows"
      :columns="columnsManage"
      row-key="id"
      :filter="filter"
      hide-header
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-left>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:top-right>
        <q-btn
          label="Novo"
          dense
          icon="mdi-plus"
          color="primary"
          class="q-ml-md"
          :to="{ name: definedCategory[0].route }"
        />
      </template>

      <template v-slot:body-cell-img_url="props">
        <q-td :props="props">
          <q-avatar v-if="props.row.img_url" square>
            <q-img :src="props.row.img_url" :ratio="4 / 3" width="4rem">
            </q-img>
          </q-avatar>
          <template #loading>
            <q-skeleton height="150px" width="150px" square />
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn flat round icon="more_vert">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="handleEditCourse(props.row)"
                >
                  <q-item-section>Editar</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="deleteCourse(props.row)"
                >
                  <q-item-section>Excluir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useApi from "src/composables/useApi.js";

import { columnsManage } from "src/constants/columnsTable";

const emit = defineEmits(["course-deleted"]);
const props = defineProps({
  category: {
    type: Object,
  },
  data: {
    type: Object,
  },
  load: {
    type: Boolean,
  },
});

const { remove } = useApi();
const router = useRouter();

const definedCategory = computed(() => {
  return props.category;
});
const rows = computed(() => {
  return props.data;
});

const loading = computed(() => {
  return props.load;
});
const filter = ref("");

const handleEditCourse = (course) => {
  router.push({
    name: definedCategory.value[0].route,
    params: { id: course.id },
  });
};

const deleteCourse = async (item) => {
  try {
    await remove(definedCategory.value[0].table, item.id);
    emit("course-deleted", item.id);
  } catch (error) {
    console.log(error);
  }
};
</script>
