<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const $q = useQuasar();
const mapContainer = ref(null);
const map = ref(null);
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_KEY;

const longitude = computed(() => props.longitude);
const latitude = computed(() => props.latitude);

const darkMap = () => {
  const dark = $q.localStorage.getItem("dark-mode");
  return dark
    ? "mapbox://styles/mapbox/navigation-night-v1"
    : "mapbox://styles/mapbox/navigation-day-v1";
};

const createMap = (style) => {
  console.log("iniciou");
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: style, // Utiliza o estilo passado como parâmetro
    center: [longitude.value, latitude.value],
    zoom: 15,
  });

  // Adiciona os controles de navegação ao mapa
  map.value.addControl(new mapboxgl.NavigationControl());

  // Adiciona o marcador ao mapa
  new mapboxgl.Marker()
    .setLngLat([longitude.value, latitude.value])
    .addTo(map.value);

  console.log("finalizou");
};

onMounted(() => {
  createMap(darkMap());
});

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>

<style lang="scss" scoped>
.map-container {
  max-width: 500px;
  width: 100%;
  height: 400px; /* Adjust the height as needed */
}
</style>
