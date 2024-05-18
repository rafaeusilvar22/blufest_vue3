<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="[$q.dark.isActive ? 'bg-dark' : 'bg-white']">
      <q-toolbar>
        <div class="col-1">
          <q-btn
            flat
            dense
            round
            class="gt-sm"
            icon="menu"
            aria-label="Menu"
            :color="$q.dark.isActive ? 'white' : 'primary'"
            @click="toggleLeftDrawer"
          />
        </div>

        <q-toolbar-title class="row justify-center col-10">
          <img
            width="30"
            :src="
              $q.dark.isActive
                ? 'icons/icon-130x130-dark-mode.png'
                : 'icons/favicon-128x128.png'
            "
          />
        </q-toolbar-title>
        <div class="row justify-end col-1">
          <adjustment-menu />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer
      class="lt-md"
      :class="[
        $q.platform.is.ios ? 'q-pb-xs' : '',
        $q.dark.isActive ? 'bg-dark' : 'bg-white',
      ]"
      style="background: transparent !important; height: 0px"
    >
      <!-- <q-tabs
        align="justify"
        dense
        no-caps
        indicator-color="transparent"
        active-color="primary"
        :class="[
          $q.dark.isActive
            ? 'bg-dark text-white'
            : 'bg-white text-weight-thin text-grey-7',
          $q.platform.is.ios ? 'q-pb-xs' : '',
        ]"
        ><q-route-tab
          v-for="(tab, index) in linksList"
          :key="index"
          :icon="tab.icon"
          :label="tab.title"
          exact
          :ripple="{ color: 'primary' }"
          content-class="text-weight-thin"
          :to="{ name: tab.route }"
          @click="setInitialPositionScrollBehavior()"
        >
        </q-route-tab>
      </q-tabs> -->
      <bottom-navigation v-if="visibledBottomNavigation" />
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> {{ $t("categories") }} </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          @click="setInitialPositionScrollBehavior()"
        />
      </q-list>

      <q-list v-if="isAdmin">
        <q-item-label header class="text-grey-8"> Admin </q-item-label>
        <EssentialLink
          v-for="link in adminRoute"
          :key="link.title"
          v-bind="link"
          @click="setInitialPositionScrollBehavior()"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { adminRoute } from "src/constants/adminRoute";
import useAuthUser from "src/composables/useAuthUser";

import EssentialLink from "components/EssentialLink.vue";
import AdjustmentMenu from "components/AdjustmentMenu.vue";
import BottomNavigation from "components/BottomNavigation.vue";
import { useRoute } from "vue-router";

const { user } = useAuthUser();
const { t } = useI18n();
const route = useRoute();
const isAdmin = ref(false);
const visibledBottomNavigation = ref(true);
const linksList = ref([
  {
    title: t("events"),
    icon: "home",
    route: "events",
  },
  {
    title: t("places"),
    icon: "restaurant",
    route: "places",
  },
  {
    title: t("tourism"),
    icon: "explore",
    route: "tourism",
  },
  {
    title: t("more"),
    icon: "more",
    route: "more",
  },
]);

onMounted(() => {
  verifyAdmin();
});

// https://vuejs.org/guide/essentials/watchers.html
watch(
  () => route.name,
  (r) => {
    verifyRoute(r);
  }
);

// Função para ocultar ou exibir bottom-navigation de acordo com a rota
const verifyRoute = (r) => {
  visibledBottomNavigation.value = linksList.value.some(
    (item) => item.route === r
  );
};

const verifyAdmin = () => {
  if (user.value) {
    isAdmin.value = true;
  }
};
const setInitialPositionScrollBehavior = () => {
  // window.scrollTo(0, 0);
};

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
