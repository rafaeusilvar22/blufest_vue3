<template>
  <q-page :class="[$q.dark.isActive ? 'bg-dark' : 'bg-primary']">
    <div
      class="full-width row column justify-center items-center q-py-xl q-gutter-y-md"
    >
      <img
        width="54"
        :src="
          $q.dark.isActive
            ? 'icons/icon-130x130-dark-mode.png'
            : 'icons/favicon-128x128.png'
        "
      />
      <div class="text-white text-weight-medium">{{ getTimeOfDay() }} :)</div>
    </div>
    <div
      :class="[
        { 'quick-access bg-grey-4 q-px-md': true },
        $q.dark.isActive ? 'bg-grey-10' : 'bg-grey-4',
      ]"
    >
      <div
        :class="[
          { 'q-pt-xl q-pb-lg text-center text-h6': true },
          $q.dark.isActive ? 'text-white' : 'text-primary',
        ]"
      >
        {{ $t("Quick access") }}
      </div>

      <div class="row justify-center q-gutter-x-lg q-gutter-y-lg">
        <div
          v-for="(item, index) in buttonsQuickAcess"
          :key="index"
          class="row column col-4 text-center q-gutter-y-sm"
        >
          <q-btn
            :class="[
              {
                'q-pa-md row justify-center items-center': true,
              },
              $q.dark.isActive ? 'bg-252525' : 'bg-white',
            ]"
            @click="goToRoute(item)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :fill="[$q.dark.isActive ? 'white' : '#546b40']"
              class="custom-svg"
              width="25"
              height="25"
              v-html="icons[item.icon]"
            ></svg>
          </q-btn>
          <span :class="[$q.dark.isActive ? 'text-white' : 'text-primary']">
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { icons } from "src/constants/iconSvg";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const { t } = useI18n();
const router = useRouter();
const $q = useQuasar();
const buttonsQuickAcess = ref([
  {
    title: t("quick_acess.Publicize event"),
    icon: "home",
    url: "https://api.whatsapp.com/send?phone=5591985751211&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20publicar%20meu%20evento%20no%20app%20Blufest",
  },
  {
    title: t("quick_acess.Promote location"),
    icon: "place",
    url: "https://api.whatsapp.com/send?phone=5591985751211&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20publicar%20meu%local%20no%20app%20Blufest",
  },
  { title: t("quick_acess.About the app"), icon: "info", route: "about" },
  {
    title: t("quick_acess.Follow on instagram"),
    icon: "instagram",
    url: "https://www.instagram.com/appblufest/",
  },
  {
    title: "Abaeté Tech",
    icon: "abaetetech",
    url: "https://abaetetech.com.br/",
  },
  { title: t("quick_acess.Share app"), icon: "share", url: "" },
  { title: t("quick_acess.settings"), icon: "settings", route: "settings" },
  {
    title: t("quick_acess.Rate app"),
    icon: "star",
    url: $q.platform.is.android
      ? "https://play.google.com/store/apps/details?id=br.com.blufest.app.twa&pcampaignid=web_share"
      : "https://apps.apple.com/br/app/blufest/id6465289468",
  },
]);

const goToRoute = ({ route, url }) => {
  if (route) {
    router.push({ name: route });
  } else if (url) {
    window.open(url);
  } else {
    console.log();
    shareApp();
  }
};

const shareApp = async () => {
  const shareData = {
    title: "Conheça o aplicativo Blufest",
    url: window.location.origin,
  };

  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log(err);
  }
};

const getTimeOfDay = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return t("time.good morning");
  } else if (hours >= 12 && hours < 18) {
    return t("time.good afternoon");
  } else {
    return t("time.goodnight");
  }
};
</script>
<style lang="scss" scoped>
.quick-access {
  width: 100%;
  height: 100vh;
  border-radius: 70px 70px 0 0;
}
.bg-252525 {
  background: #252525;
}
</style>
