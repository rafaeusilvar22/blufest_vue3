<template>
  <q-page padding>
    <skeleton-details-page v-if="load" />
    <div v-else class="row col justify-center">
      <q-img
        class="q-px-sm"
        :src="courseData.img_url"
        style="max-height: 30rem; max-width: 400px"
      />

      <div
        class="column q-gutter-y-sm q-px-sm q-py-md self-center"
        style="max-width: 450px"
      >
        <div>
          <q-badge
            class="text-capitalize"
            outline
            color="primary"
            :label="courseData.category"
          />
        </div>

        <div class="text-h6 text-weight-bold">
          {{ courseData.title }}
        </div>

        <div class="row items-baseline">
          <q-icon name="mdi-calendar-month-outline" class="q-pr-xs" />
          <div class="text-capitalize col text-caption">
            {{ courseData.date }}
          </div>
        </div>

        <div class="row items-baseline">
          <q-icon name="mdi-map-marker-outline" class="q-pr-xs" />
          <div class="col text-caption">
            {{ courseData.address }}
          </div>
        </div>

        <div
          class="row q-gutter-md"
          :class="$q.dark.isActive ? 'text-white' : 'text-grey-7'"
          :color="$q.dark.isActive ? 'white' : 'grey-7'"
        >
          <div v-if="courseData.profile_instagram">
            <q-btn
              flat
              class="no-padding"
              size="md"
              outline
              icon="mdi-instagram"
              :href="
                'https://www.instagram.com/' + courseData.profile_instagram
              "
            />
          </div>

          <div v-if="courseData.ticket">
            <q-btn
              flat
              class="no-padding"
              size="md"
              outline
              icon="mdi-ticket-confirmation-outline"
              :href="courseData.ticket"
            />
          </div>
        </div>

        <div class="text-body2" v-html="courseData.description" />

        <q-btn
          label="Voltar"
          class="full-width q-mt-md"
          color="primary"
          outline
          @click="funBackPage()"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import userApi from "src/composables/useApi";
import SkeletonDetailsPage from "src/components/SkeletonDetailsPage.vue";

const { getById } = userApi();
const router = useRouter();
const route = useRoute();

const load = ref(true);
const courseData = ref([]);

onMounted(() => {
  passingParamsId();
});

const passingParamsId = () => {
  if (route.params.id) {
    getDetails(route.params.id);
  } else {
    router.push({ name: "" });
  }
};

const getDetails = async (id) => {
  try {
    const data = await getById("posts", id);
    courseData.value = data;
    load.value = false;
  } catch (error) {
    console.log(error);
    load.value = false;
  }
};

const funBackPage = () => {
  router.push({ name: "events" });
};
</script>
