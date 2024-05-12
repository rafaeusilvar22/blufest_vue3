const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "events",
        component: () => import("pages/EventsPage.vue"),
      },
      {
        path: "places",
        name: "places",
        component: () => import("pages/PlacesPage.vue"),
      },
      {
        path: "tourism",
        name: "tourism",
        component: () => import("pages/TourismPage.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        path: "details/:id",
        name: "event",
        component: () => import("pages/DetailsPage.vue"),
      },
      {
        path: "details-place/:id",
        name: "place",
        component: () => import("pages/DetailsPlace.vue"),
      },
      {
        path: "detailtourism/:id",
        name: "detailtourism",
        component: () => import("pages/DetailsTourism.vue"),
      },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "manageEvents",
        name: "manageEvents",
        component: () => import("pages/manage/ManageEvents.vue"),
      },
      {
        path: "managePlaces",
        name: "managePlaces",
        component: () => import("pages/manage/ManagePlaces.vue"),
      },
      {
        path: "manageTourism",
        name: "manageTourism",
        component: () => import("pages/manage/ManageTourism.vue"),
      },
      {
        path: "form-event/:id?",
        name: "form-event",
        component: () => import("src/pages/manage/forms/FormEvent.vue"),
        props: true,
      },
      {
        path: "form-place/:id?",
        name: "form-place",
        component: () => import("src/pages/manage/forms/FormPlace.vue"),
        props: true,
      },
      {
        path: "form-tourism/:id?",
        name: "form-tourism",
        component: () => import("src/pages/manage/forms/FormTourism.vue"),
        props: true,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "loginDefault",
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/auth/RegisterPage.vue"),
      },
      {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("pages/auth/EmailConfirmation.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("pages/auth/ForgotPassword.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("pages/auth/ResetPassword.vue"),
      },
    ],
    meta: {
      requiresAuth: false,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
