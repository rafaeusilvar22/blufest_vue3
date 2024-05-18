<template>
  <q-page>
    <q-table
      grid
      flat
      bordered
      :rows="fetchData"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :loading="load"
      v-model:pagination="pagination"
      hide-pagination
      hide-header
    >
      <template v-slot:loading>
        <LogoLoading />
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center text-primary q-gutter-sm">
          <q-icon v-if="!load" size="2em" name="sentiment_dissatisfied" />
          <span>{{ load ? "" : "Sem resultados" }} </span>
        </div>
      </template>

      <template v-slot:top>
        <q-input
          class="col-xs-12 col-sm-6"
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

      <template v-slot:item="props">
        <div class="q-px-md q-pb-md col-xs-12 col-sm-6 col-md-3">
          <q-card :class="[$q.dark.isActive ? '' : 'bg-grey-1', { fit: true }]">
            <q-img
              :ratio="1"
              :src="props.row.img_url"
              @click="handleDetailData(props.row)"
            >
              <template #loading>
                <q-skeleton class="full-width full-height" square />
              </template>
            </q-img>

            <q-card-section>
              <div class="row no-wrap justify-between items-start">
                <div class="text-subtitle1 ellipsis">
                  {{ props.row.title }}
                </div>
                <q-btn
                  v-if="canShare"
                  flat
                  icon="mdi-share-variant-outline"
                  padding="none"
                  :color="$q.dark.isActive ? 'white' : 'grey-8'"
                  @click="shareApp(props.row)"
                />
                <ButtonCanShare :shareData="props.row" :details="details" />
              </div>

              <div
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-7'"
                :color="$q.dark.isActive ? 'white' : 'grey-7'"
              >
                <div class="q-py-xs row items-baseline">
                  <q-icon name="mdi-map-marker-outline" class="q-pr-xs" />
                  <div class="col text-caption ellipsis">
                    {{ props.row.address }}
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <div
      v-if="!load && fetchData.length >= 9"
      :class="[$q.platform.is.mobile ? 'q-mb-xl' : '']"
      class="row justify-center"
    >
      <q-pagination
        v-model="pagination.page"
        color="primary"
        :max="pagesNumber"
        :input="true"
        size="sm"
      />
    </div>
  </q-page>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import LogoLoading from "src/components/Loading/LogoLoading.vue";
import { columns } from "src/constants/columnsTable";
import verifyRoute from "src/utils/routeVerifier.js";
import ButtonCanShare from "components/Buttons/ButtonCanShare.vue";

const props = defineProps({
  fetchData: {
    type: Object,
  },
  load: {
    type: Boolean,
  },
  details: {
    type: Object,
  },
});

const router = useRouter();
const route = useRoute();
const filter = ref("");
const canShare = ref(false);
const defineRoutes = ref(null);

// Recupera a posição de rolagem do localStorage ao entrar no componente
//const scrollPosition = sessionStorage.getItem("scrollPositionTableContent");

onMounted(() => {
  verifyRoute(route, defineRoutes); // Usa a função de verificação de rota no hook 'onMounted'
});

// onUpdated(() => {
//   if (scrollPosition !== null) {
//     window.scrollTo(0, parseInt(scrollPosition));
//   }
// });

// onBeforeRouteLeav hook fornecido pelo Vue Router que permite executar ações antes de sair de uma rota.
// Ele é útil quando você precisa executar alguma lógica específica antes de deixar uma determinada página,
// como validar formulários, limpar estados ou, como no nosso caso, armazenar informações relevantes antes de sair de um componente.
// onBeforeRouteLeave((to, from, next) => {
//   sessionStorage.setItem("scrollPositionTableContent", window.scrollY);
//   next();
// });

const fetchData = computed(() => {
  return props.fetchData;
});
const load = computed(() => {
  return props.load;
});

const handleDetailData = (course) => {
  router.push({
    name: defineRoutes.value[0].toDetailsPage,
    params: { id: course.id },
  });
};

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: xx if getting data from a server
});

const pagesNumber = computed(() =>
  Math.ceil(fetchData.value.length / pagination.value.rowsPerPage)
);
</script>
