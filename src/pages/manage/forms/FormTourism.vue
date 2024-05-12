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

            <q-select
              outlined
              clearable
              class="col-md-8 col-xs-12 col-sm-12"
              :options="categoryTourism"
              v-model="form.category"
              option-label="label"
              option-value="value"
              emit-value
              map-options
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-img :src="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="mdi-shape-outline" />
              </template>
            </q-select>
            <q-input
              v-model="form.address"
              :label="$t('place')"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[
                (val) => (val && val.length > 0) || 'Endereço Obrigatorio',
              ]"
            />

            <div class="col-md-8 col-xs-12 col-sm-12">
              <q-input
                outlined
                :label="$t('description')"
                type="textarea"
                v-model="form.description"
              />
            </div>

            <q-input
              v-model="form.latitude"
              label="Latitude"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-compass-rose" />
              </template>
            </q-input>

            <q-input
              v-model="form.longitude"
              label="Longitude"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-compass-rose" />
              </template>
            </q-input>

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
                color="white"
                class="float-right text-black"
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

import { categoryTourism } from "src/constants/categories";

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
  img_url: [],
  category: "",
  latitude: "",
  longitude: "",
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

// Função buscar evento atraves do id
const getItem = async () => {
  try {
    const data = await getById("tourism", props.id);

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
    img.value = await uploadImg(form.value.img_url, "tourism");

    form.value.img_url = img.value;

    await post("tourism", form.value);
    notifySucess(t("published"));
    router.push({ name: "manageTourism" });
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

    await update("tourism", form.value);
    notifySucess(t("update item"));
    router.push({ name: "manageTourism" });
  } catch (error) {
    console.log(error);
  }
};

const handleReturnRoute = () => {
  router.push({ name: "manageTourism" });
};

const onSubmit = () => {
  if (form.value.id) {
    handleUpdateItem();
  } else {
    handleRegisterItem();
  }
};
</script>
