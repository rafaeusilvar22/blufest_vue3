<template>
  <q-page padding style="margin-top: 100px">
    <div
      class="bottom-nav"
      :class="[
        $q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-grey-7',
        $q.platform.is.ios ? 'q-pb-xs' : '',
      ]"
    >
      <div
        v-for="(item, index) in infoNavBottom"
        :key="index"
        :class="[
          buttonActive(index),
          $q.dark.isActive ? 'case-icon-before case-icon' : 'case-icon',
          { 'cursor-pointer': true },
        ]"
        @click="goRoute(index, item)"
      >
        <div class="icon-bg" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="custom-svg"
          :fill="iconActive(index)"
          width="25"
          height="25"
          v-html="icons[item.icon]"
        ></svg>
      </div></div
  ></q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// const routeName = ref();

const router = useRouter();
const infoNavBottom = [
  { name: "Inicio", route: "events", icon: "home" },
  { name: "Locais", route: "places", icon: "place" },
  { name: "Turismo", route: "tourism", icon: "tourism" },
  { name: "More", route: "about", icon: "more" },
];

const icons = {
  home: `<path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"/>`, // SVG para o ícone "place"
  place: `<path d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,6Zm8.66,3.157-.719-.239A8,8,0,0,0,12,0,7.993,7.993,0,0,0,4.086,9.092a5.045,5.045,0,0,0-2.548,1.3A4.946,4.946,0,0,0,0,14v4.075a5.013,5.013,0,0,0,3.6,4.8l2.87.9A4.981,4.981,0,0,0,7.959,24a5.076,5.076,0,0,0,1.355-.186l5.78-1.71a2.987,2.987,0,0,1,1.573,0l2.387.8A4,4,0,0,0,24,19.021V13.872A5.015,5.015,0,0,0,20.66,9.156ZM7.758,3.762a5.987,5.987,0,0,1,8.484,0,6.037,6.037,0,0,1,.011,8.5L12.7,15.717a.992.992,0,0,1-1.389,0L7.758,12.277A6.04,6.04,0,0,1,7.758,3.762ZM22,19.021a1.991,1.991,0,0,1-.764,1.572,1.969,1.969,0,0,1-1.626.395L17.265,20.2a5.023,5.023,0,0,0-2.717-.016L8.764,21.892a3,3,0,0,1-1.694-.029l-2.894-.9A3.013,3.013,0,0,1,2,18.075V14a2.964,2.964,0,0,1,.92-2.163,3.024,3.024,0,0,1,1.669-.806A8.021,8.021,0,0,0,6.354,13.7l3.567,3.453a2.983,2.983,0,0,0,4.174,0l3.563-3.463a7.962,7.962,0,0,0,1.813-2.821l.537.178A3.006,3.006,0,0,1,22,13.872Z"/>`,
  tourism: `<path d="M13.987,6.108c-.039.011-7.228,2.864-7.228,2.864a2.76,2.76,0,0,0,.2,5.212l2.346.587.773,2.524A2.739,2.739,0,0,0,12.617,19h.044a2.738,2.738,0,0,0,2.532-1.786s2.693-7.165,2.7-7.2a3.2,3.2,0,0,0-3.908-3.907ZM15.97,9.467,13.322,16.51a.738.738,0,0,1-.692.49c-.1-.012-.525-.026-.675-.378l-.908-2.976a1,1,0,0,0-.713-.679l-2.818-.7a.762.762,0,0,1-.027-1.433l7.06-2.8a1.149,1.149,0,0,1,1.094.32A1.19,1.19,0,0,1,15.97,9.467ZM12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/>`, // SVG para o ícone "place"
  more: `<circle cx="2" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="22" cy="12" r="2"/>`,
};
const clickedIndex = ref(0);

onMounted(() => {});

// mounted() {
//   if (this.routeName === "/") {
//     this.clickedIndex = 2;
//   }
// },

const goRoute = (index, item) => {
  router.push({ name: item.route });
  changeColor(index);
};
const changeColor = (index) => {
  clickedIndex.value = index;
};

const buttonActive = (index) => {
  return index === clickedIndex.value ? "active" : "inactive";
};

const iconActive = (index) => {
  return index === clickedIndex.value ? "#ffffff" : "#8A8A8A";
};

// const textActive = (index) => {
//   return index === clickedIndex.value ? "none" : "block";
// };

//   this.$router.push(button.route).catch((err) => {
//     // Ignore o erro do vuex ao navegar para a página em que já está.
//     if (
//       err.name !== "NavigationDuplicated" &&
//       !err.message.includes(
//         "Avoided redundant navigation to current location"
//       )
//     ) {
//       // Mas imprima quaisquer outros erros no console
//       console.log(err);
//     }
//   });
</script>

<style lang="scss" scoped>
/* BOTTOM NAVIGATION */
.bottom-nav {
  width: 80%;
  height: 40px;
  background-color: #ffffff;
  padding: 0 7px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-radius: 20px;
  margin-bottom: 10px;
  justify-content: space-between;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .custom-svg {
    z-index: 1;
  }
  .case-icon {
    position: relative;
    display: grid;
    justify-content: center;
    align-items: center;
    place-items: center;
    width: 64px;
    height: 25px;
    border-radius: 100%;

    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 22px;
      width: 28px;
      top: 6px;
      z-index: -2;
    }

    &::before {
      left: -21px;
      border-radius: 0 0 28px 0;
    }

    &::after {
      right: -21px;
      border-radius: 0 0 0 28px;
    }

    &.active {
      animation: bounce 600ms both;

      .icon-bg {
        opacity: 1;
      }

      .icon {
        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2%)
          hue-rotate(101deg) brightness(105%) contrast(101%);
      }

      .icon-title {
        animation: bounce-in 400ms;
      }
    }

    &.inactive {
      animation: bounce-reverse 400ms both;

      .icon-bg {
        opacity: 0;
      }

      .icon-title {
        animation: bounce-in-reverse 400ms both;
      }
    }
  }

  .title-bottom-nav {
    font-size: 11px;
  }
  .icon-bg {
    background-image: linear-gradient(-20deg, #546b40 0%, #546b40 100%);
    border-radius: 100%;
    height: 45px;
    width: 45px;
    position: absolute;
    transition: all 200ms ease;
  }

  .icon-bg-dark-mode {
    background-image: linear-gradient(-20deg, #8a8a8a 0%, #8a8a8a 100%);
  }

  .icon {
    width: 22px;
    flex: none;
    z-index: 0;
    transition: all 200ms ease;
  }

  .icon-title {
    text-align: center;
    font-size: 11px;
    color: $blue;
    position: absolute;
    bottom: -16px;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-30px);
  }

  100% {
    transform: translateY(-20px);
  }
}

@keyframes bounce-reverse {
  0% {
    transform: translateY(-28px);
  }

  50% {
    transform: translateY(-30px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes bounce-in-reverse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
