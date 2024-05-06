<template>
  <q-page class="row jusitfy-center" style="height: 80vh">
    <div class="col-xs-12 col-sm-6 flex container-logo">
      <div class="column self-center q-mx-auto">
        <img src="mono.png" :width="$q.screen.gt.sm ? '300' : '140'" />
      </div>
    </div>

    <q-form
      class="column q-gutter-y-xs q-pa-lg self-center q-mx-auto"
      @submit.prevent="handleLogin"
      style="min-width: 350px"
    >
      <p
        :class="[
          $q.screen.gt.sm ? 'text-h5' : 'text-h6',
          { 'text-center text-weight-bold': true },
        ]"
      >
        {{ $t("login") }}
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          label="email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'E-mail necessário']"
          type="email"
        />
        <q-input
          :label="$t('password')"
          v-model="form.password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Senha necessária']"
        />
        <div class="full-width q-pt-md">
          <q-btn
            :label="$t('login')"
            color="primary"
            class="full-width"
            outline
            type="subimit"
          />
        </div>
        <!-- <div class="full-width">
          <q-btn
            :label="register"
            color="primary"
            class="full-width"
            to="/register"
          />
        </div> -->
        <q-btn
          :label="$t('forgot_password')"
          color="primary"
          class="full-width"
          flat
          :to="{ name: 'forgot-password' }"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useNotify from "src/composables/useNotify";

const { t } = useI18n();
const router = useRouter();
const { login, user } = useAuthUser();
const { notifySucess, notifyError } = useNotify();

const loginSuccessfully = ref(t("login_successfully"));
const invalidCredentials = ref(t("invalid_credentials"));

const form = ref({
  email: "",
  password: "",
});

onMounted(() => {
  if (user.value) {
    router.push({ name: "events" });
  }
});

const handleLogin = async () => {
  try {
    await login(form.value);
    notifySucess(loginSuccessfully.value);
    router.push({ name: "events" });
  } catch (error) {
    notifyError(invalidCredentials.value);
  }
};
</script>
