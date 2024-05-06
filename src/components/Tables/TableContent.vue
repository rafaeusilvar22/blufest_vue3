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
      hide-header
    >
      <template v-slot:top>
        <q-input
          class="col-xs-12 col-sm-6"
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
      <template v-slot:item="props">
        <div class="q-px-md q-pb-md col-xs-12 col-sm-6 col-md-3">
          <q-card
            :class="[$q.dark.isActive ? '' : 'bg-grey-1', { fit: true }]"
            @click="handleDetailData(props.row)"
          >
            <q-img :ratio="1" :src="props.row.img_url">
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
                <ButtonCanShare :shareData="props.row" />
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
  </q-page>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { columns } from "src/constants/columnsTable";
import verifyRoute from "src/utils/routeVerifier.js";
import ButtonCanShare from "src/components/buttons/ButtonCanShare.vue";

const props = defineProps({
  fetchData: {
    type: Object,
  },
  load: {
    type: Boolean,
  },
});

const router = useRouter();
const route = useRoute();
const filter = ref("");
const canShare = ref(false);
const defineRoutes = ref(null);

onMounted(() => {
  verifyRoute(route, defineRoutes); // Usa a função de verificação de rota no hook 'onMounted'
  console.log(defineRoutes.value[0].toDetailsPage);
});

const fetchData = computed(() => {
  return props.fetchData;
});
const load = computed(() => {
  return props.load;
});

const handleDetailData = (course) => {
  // Armazenar a posição do scroll antes de navegar para a próxima página
  router.scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: window.pageYOffset };
    }
  };
  router.push({
    name: defineRoutes.value[0].toDetailsPage,
    params: { id: course.id },
  });
};
</script>
