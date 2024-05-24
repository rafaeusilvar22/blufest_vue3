<template>
  <q-page padding>
    <skeleton-details-page v-if="load" />
    <div v-else class="row justify-evenly q-gutter-y-md">
      <q-img
        class="col-sm-5 col-12"
        :src="courseData.img_url"
        ratio="1"
        style="max-height: 30rem; max-width: 440px"
      />

      <div class="col-sm-5 col-12 q-gutter-y-md">
        <div class="text-h6 text-weight-bold">
          {{ courseData.title }}
        </div>

        <div class="row items-baseline">
          <q-icon name="mdi-map-marker-outline" class="q-pr-xs" />
          <div class="col text-caption">
            {{ courseData.address }}
          </div>
        </div>

        <div
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
        </div>
        <div class="text-body2" v-html="courseData.description" />

        <map-box
          :longitude="courseData.longitude"
          :latitude="courseData.latitude"
        />

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
import MapBox from "src/components/MapBox.vue";

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
    const data = await getById("places", id);
    courseData.value = data;
    console.log(courseData.value);

    load.value = false;
  } catch (error) {
    console.log(error);
    load.value = false;
  }
};

const funBackPage = () => {
  router.push({ name: "places" });
};
</script>
<style scoped>
.gap-10 {
  gap: 10px;
}
</style>
