<template>
  <div
    class="bottom-nav"
    :class="[$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-grey-7']"
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
      <q-tooltip
        :transition-duration="1900"
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
        transition-show="scale"
        transition-hide="scale"
        :class="[
          $q.dark.isActive
            ? 'bg-transparent text-white'
            : 'bg-transparent text-grey-7',
        ]"
      >
        <strong>{{ item.name }}</strong>
      </q-tooltip>
      <div
        class="icon-bg"
        :class="[$q.dark.isActive ? 'bg-dark-mode' : 'bg-white-mode']"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="custom-svg"
        :fill="iconActive(index)"
        width="25"
        height="25"
        v-html="icons[item.icon]"
      ></svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const infoNavBottom = [
  { name: "Inicio", route: "events", icon: "home" },
  { name: "Locais", route: "places", icon: "place" },
  { name: "Turismo", route: "tourism", icon: "tourism" },
  { name: "Mais", route: "more", icon: "more" },
];

const icons = {
  home: `<path d="m8,12h-2c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2Zm-2,4v-2h2v2s-2,0-2,0ZM19,2h-1v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm-14,2h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Z"/>`, // SVG para o ícone "event"
  place: `<path d="M23.955,21.319a1,1,0,0,0-1.252-.658l-1.3.4-.931-2.737A4.953,4.953,0,0,0,22.8,12.607L20.957,7.132A3.023,3.023,0,0,0,17.28,5.11L13.428,6.184A2.966,2.966,0,0,0,12,7.078a2.966,2.966,0,0,0-1.428-.894L6.719,5.11A3.008,3.008,0,0,0,3.052,7.1L1.185,12.657a4.956,4.956,0,0,0,2.364,5.682l-.944,2.728L1.3,20.661A1,1,0,1,0,.7,22.571l2.16.671c.015,0,.024.017.039.023s.052.006.078.013l2.181.677a1,1,0,0,0,.594-1.91L4.516,21.66l.935-2.7A4.982,4.982,0,0,0,6.01,19,5,5,0,0,0,10.8,15.392L12,11.836l1.183,3.5A5,5,0,0,0,17.99,19a4.917,4.917,0,0,0,.581-.04l.918,2.7-1.244.386a1,1,0,0,0,.594,1.91l2.175-.675c.026-.007.053,0,.079-.013s.026-.019.042-.025l2.162-.671A1,1,0,0,0,23.955,21.319ZM13.357,8.592a.989.989,0,0,1,.608-.482l3.851-1.073A1,1,0,0,1,18.08,7a1.023,1.023,0,0,1,.972.739L19.813,10H13.49l-.215-.637A1,1,0,0,1,13.357,8.592ZM5.918,7a1.007,1.007,0,0,1,.265.036L10.035,8.11a1,1,0,0,1,.7,1.223L10.51,10H4.187l.77-2.29A1.008,1.008,0,0,1,5.918,7Zm2.974,7.8a3,3,0,0,1-5.5.669A2.949,2.949,0,0,1,3.1,13.245L3.514,12H9.836Zm7.632,1.808a3.022,3.022,0,0,1-1.431-1.859L14.164,12h6.323l.4,1.194a3,3,0,0,1-4.366,3.418Z"/><path d="M15.553,3.9A1,1,0,0,0,16.9,3.447l1-2a1,1,0,1,0-1.79-.894l-1,2A1,1,0,0,0,15.553,3.9Z"/><path d="M7.105,3.447A1,1,0,1,0,8.9,2.553l-1-2a1,1,0,0,0-1.79.894Z"/><path d="M12,4a1,1,0,0,0,1-1V1a1,1,0,0,0-2,0V3A1,1,0,0,0,12,4Z"/>`,
  tourism: `<path d="M13.987,6.108c-.039.011-7.228,2.864-7.228,2.864a2.76,2.76,0,0,0,.2,5.212l2.346.587.773,2.524A2.739,2.739,0,0,0,12.617,19h.044a2.738,2.738,0,0,0,2.532-1.786s2.693-7.165,2.7-7.2a3.2,3.2,0,0,0-3.908-3.907ZM15.97,9.467,13.322,16.51a.738.738,0,0,1-.692.49c-.1-.012-.525-.026-.675-.378l-.908-2.976a1,1,0,0,0-.713-.679l-2.818-.7a.762.762,0,0,1-.027-1.433l7.06-2.8a1.149,1.149,0,0,1,1.094.32A1.19,1.19,0,0,1,15.97,9.467ZM12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/>`, // SVG para o ícone "tourism"
  more: `<circle cx="2" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="22" cy="12" r="2"/>`,
};
const clickedIndex = ref(Number);

onMounted(() => {
  if (route.name === "events") {
    clickedIndex.value = 0;
  } else {
    clickedIndex.value = Number;
  }
});

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
  return index === clickedIndex.value ? "#546b40" : "#8A8A8A";
};
</script>

<style lang="scss" scoped>
.bg-transparent {
  background: transparent;
}
.bottom-nav {
  width: 60%;
  height: 50px;
  background-color: #ffffff;
  padding: 0 7px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-radius: 25px;
  margin-top: -65px;
  justify-content: space-around;
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
    width: 0px;
    margin: 0 20px;
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
    }

    &.inactive {
      animation: bounce-reverse 400ms both;

      .icon-bg {
        opacity: 0;
      }
    }
  }

  .title-bottom-nav {
    font-size: 11px;
  }
  .icon-bg {
    // background-image: linear-gradient(-20deg, #546b40 0%, #546b40 100%);
    border-radius: 100%;
    height: 45px;
    width: 45px;
    position: absolute;
    transition: all 200ms ease;
  }

  .bg-white-mode {
    background-image: linear-gradient(-20deg, #e7e7e7 0%, #e7e7e7 100%);
  }
  .bg-dark-mode {
    background-image: linear-gradient(-20deg, #252525 0%, #252525 100%);
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
    transform: translateX(0px);
  }

  50% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0px);
  }
}

// @keyframes bounce-reverse {
//   0% {
//     transform: translateY(-28px);
//   }

//   50% {
//     transform: translateY(-30px);
//   }

//   100% {
//     transform: translateY(0px);
//   }
// }

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
