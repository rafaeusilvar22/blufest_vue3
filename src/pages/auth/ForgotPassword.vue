<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">{{ $t("request_new_password") }}</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          label="email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('email_required')]"
          type="email"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            :label="$t('advance')"
            color="primary"
            class="full-width"
            outline
            type="submit"
            @click="handleAdvance()"
          />
        </div>
        <q-btn
          :label="$t('back')"
          color="primary"
          class="full-width"
          flat
          :to="{ name: 'login' }"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";

const router = useRouter();
const { sendPasswordRestEmail } = useAuthUser();
const { notifySucess } = useNotify();

const email = ref("");

const handleForgotPassword = async () => {
  try {
    await sendPasswordRestEmail(email.value);
  } catch (error) {
    alert(error);
  }
};

const handleAdvance = () => {
  if (email.value.length > 0 && email.value.includes("@")) {
    notifySucess("email enviado!");
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  }
};
</script>
