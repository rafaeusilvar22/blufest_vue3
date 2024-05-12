<template>
  <q-page padding>
    <form @submit="onSubmit">
      <q-card>
        <q-card-section class="text-h6">
          {{ $t("form") }}
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <q-input
              :label="$t('name')"
              v-model="form.title"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[
                (val) => (val && val.length > 0) || 'Título obrigatório',
              ]"
            />

            <select-form
              class="col-md-8 col-xs-12 col-sm-12"
              :options="optionsCategoryEvents"
              :definedCategory="form.category"
              @selectOption="handleCategoryEvents"
            />

            <q-input
              v-model="form.address"
              :label="$t('place')"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[
                (val) => (val && val.length > 0) || 'Endereço Obrigatorio',
              ]"
            />

            <q-input
              v-model="form.profile_instagram"
              :label="$t('instagram profile')"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
            />

            <q-input
              v-model="form.ticket"
              :label="$t('ticket link')"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
            />

            <div class="col-md-8 col-xs-12 col-sm-12">
              <q-input
                outlined
                :label="$t('description')"
                type="textarea"
                v-model="form.description"
              />
            </div>

            <q-file
              v-if="!previewUrl"
              outlined
              type="file"
              :label="$t('image')"
              v-model="form.img_url"
              @input="onFileChange"
              accept="image/*"
              class="col-md-8 col-xs-12 col-sm-12"
            />

            <div
              class="col-md-8 col-xs-12 col-sm-12 q-gutter-md row items-start q-pb-sm"
            >
              <q-date v-model="form.date" mask="YYYY-MM-DD" color="primary" />

              <div
                v-if="previewUrl"
                class="col-md-8 col-xs-12 col-sm-12 text-left"
              >
                <img
                  v-if="previewUrl"
                  :src="previewUrl"
                  :ratio="16 / 9"
                  width="300px"
                />

                <div class="row q-pt-sm">
                  <div class="col-md-4">
                    <q-btn
                      :label="$t('change image')"
                      icon="mdi-image-edit-outline"
                      color="primary"
                      class="full-width"
                      @click="updateImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-12 q-gutter-md">
              <q-btn
                :label="form.id ? $t('update') : $t('register')"
                color="primary"
                class="float-right"
                type="submit"
              />
              <q-btn
                flat
                label="Cancelar"
                :class="[
                  $q.dark.isActive ? 'text-white' : 'text-primary',
                  { 'float-right': true },
                ]"
                @click="handleReturnRoute"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </form>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import userApi from "src/composables/useApi";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";

import { optionsCategoryEvents } from "src/constants/optionsCategory";
import SelectForm from "src/components/Selects/SelectForm.vue";

const { getById, update, post, uploadImg } = userApi();

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});

const { t } = useI18n();
const { notifySucess, notifyError } = useNotify();
const router = useRouter();
const previewUrl = ref(null);
const img = ref("");
const form = ref({
  title: "",
  description: "",
  profile_instagram: "",
  ticket: "",
  img_url: [],
  category: "",
  date: "",
});

onMounted(() => {
  if (props.id) {
    getItem();
  }
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) {
    return false;
  }
  if (!file.type.match("image.*")) {
    return false;
  }
  const reader = new FileReader();

  reader.onload = function (e) {
    previewUrl.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const updateImg = () => {
  previewUrl.value = "";
  form.value.img_url = [];
};

// função recebe do filho (select) o valor da categoria e atribui para
// form -> category
const handleCategoryEvents = (item) => {
  form.value.category = item;
};

// Função buscar evento atraves do id
const getItem = async () => {
  try {
    const data = await getById("posts", props.id);

    if (props.id) {
      previewUrl.value = data.img_url;
      form.value = {
        ...data,
      };
      delete form.value.img_url;
    }
  } catch (error) {
    console.log(error);
  }
};

const handleRegisterItem = async () => {
  try {
    img.value = await uploadImg(form.value.img_url, "posts");

    form.value.img_url = img.value;

    await post("posts", form.value);
    notifySucess(t("published"));
    router.push({ name: "manageEvents" });
  } catch {
    notifyError(t("error registering"));
  }
};

// Função atualizar evento
const handleUpdateItem = async () => {
  try {
    // img.value = await updateImgBucket(
    //   form.value.img_url,
    //   category.value[0].table
    // );

    // form.value.img_url = img.value;

    await update("posts", form.value);
    notifySucess(t("update item"));
    router.push({ name: "manageEvents" });
  } catch (error) {
    console.log(error);
  }
};

const handleReturnRoute = () => {
  router.push({ name: "manageEvents" });
};

const onSubmit = () => {
  if (form.value.id) {
    handleUpdateItem();
  } else {
    handleRegisterItem();
  }
};
</script>
