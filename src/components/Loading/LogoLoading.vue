<template>
  <img
    class="pulse"
    width="60"
    :src="
      $q.dark.isActive
        ? 'icons/icon-130x130-dark-mode.png'
        : 'icons/favicon-128x128.png'
    "
  />
</template>
<style scoped lang="scss">
.pulse {
  animation: pulse 0.7s infinite;
  margin: 0 auto;
  display: table;
  margin-top: 50px;
  animation-direction: alternate;
  -webkit-animation-name: pulse;
  animation-name: pulse;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    -webkit-filter: brightness(100%);
  }
  100% {
    -webkit-transform: scale(1.1);
    -webkit-filter: brightness(200%);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1.2);
    filter: brightness(100%);
  }
  100% {
    transform: scale(1.1);
    filter: brightness(90%);
  }
}
</style>
