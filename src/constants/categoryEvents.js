// import { useI18n } from "vue-i18n";
import { ref } from "vue";

// const { t } = useI18n();
// const i18nAll = ref(t("all"));

export const category = ref([
  { label: "Todos", value: "", icon: "flat/all.png", selected: false },
  {
    label: "Cultural",
    value: "Cultural",
    icon: "flat/guitar.png",
    selected: false,
  },
  {
    label: "Esportes",
    value: "Esportes",
    icon: "flat/sport.png",
    selected: false,
  },
  { label: "Festas", value: "Festas", icon: "flat/drink.png", selected: false },
  {
    label: "Turismo",
    value: "Turismo",
    icon: "flat/tour.png",
    selected: false,
  },
]);

export const categoryPlace = [
  {
    label: "Todos",
    id: 0,
    icon: "flat/all.png",
  },
  {
    label: "Academia",
    id: 1,
    icon: "flat/academy.png",
  },
  {
    label: "Açaí",
    id: 2,
    icon: "flat/acai.png",
  },
  {
    label: "Agências de Emprego",
    id: 3,
    icon: "flat/suitcase.png",
  },
  {
    label: "Bancos",
    id: 4,
    icon: "flat/bank.png",
  },
  {
    label: "Bares",
    id: 5,
    icon: "flat/drink.png",
  },
  {
    label: "Cafeterias",
    id: 6,
    icon: "flat/coffee.png",
  },
  {
    label: "Casas Noturnas",
    id: 7,
    icon: "flat/ball-discotheque.png",
  },
  {
    label: "Caixas Eletrônicos",
    id: 8,
    icon: "flat/cash-machine.png",
  },
  {
    label: "Hospitais e Postos de Saúde",
    id: 9,
    icon: "flat/hospital.png",
  },
  {
    label: "Hotéis e Pousadas",
    id: 10,
    icon: "flat/hotel.png",
  },
  {
    label: "Restaurantes",
    id: 12,
    icon: "flat/restaurant.png",
  },
  {
    label: "Pizzarias",
    id: 13,
    icon: "flat/pizza.png",
  },
  {
    label: "Hamburguerias",
    id: 14,
    icon: "flat/hamburguer.png",
  },
];

export const categoryTourism = [
  { label: "Todos", value: 0, icon: "flat/all.png" },
  { label: "Cultural", value: "cultural", icon: "flat/cultural.png" },
  { label: "Ecoturismo", value: "eco", icon: "flat/eco-amigavel.png" },
  { label: "Religioso", value: "religiao", icon: "flat/rezar.png" },
];
