import { ref, watch, onMounted } from "vue";

export function useFontSize() {
  // Tente ler o valor armazenado no localStorage, se não existir use um valor padrão
  const storedFontSize = localStorage.getItem("baseFontSize");
  const baseFontSize = ref(storedFontSize ? parseFloat(storedFontSize) : 16);

  const updateFontSizes = () => {
    document.documentElement.style.setProperty(
      "--base-font-size",
      `${baseFontSize.value}px`
    );
    document.documentElement.style.setProperty(
      "--body2-font-size",
      `calc(${baseFontSize.value}px * 0.875)`
    );
    document.documentElement.style.setProperty(
      "--overline-font-size",
      `calc(${baseFontSize.value}px * 0.75)`
    );
    document.documentElement.style.setProperty(
      "--body1-font-size",
      `${baseFontSize.value}px`
    );
    document.documentElement.style.setProperty(
      "--subtitle1-font-size",
      `calc(${baseFontSize.value}px * 1.15)`
    );
    document.documentElement.style.setProperty(
      "--caption-font-size",
      `calc(${baseFontSize.value}px * 0.75)`
    );
    document.documentElement.style.setProperty(
      "--h1-font-size",
      `calc(${baseFontSize.value}px * 2.5)`
    );
    document.documentElement.style.setProperty(
      "--h2-font-size",
      `calc(${baseFontSize.value}px * 2)`
    );
    document.documentElement.style.setProperty(
      "--h3-font-size",
      `calc(${baseFontSize.value}px * 1.75)`
    );
    document.documentElement.style.setProperty(
      "--h4-font-size",
      `calc(${baseFontSize.value}px * 1.5)`
    );
    document.documentElement.style.setProperty(
      "--h5-font-size",
      `calc(${baseFontSize.value}px * 1.25)`
    );
    document.documentElement.style.setProperty(
      "--h6-font-size",
      `calc(${baseFontSize.value}px * 1.15)`
    );
  };

  watch(baseFontSize, (newSize) => {
    localStorage.setItem("baseFontSize", newSize);
    updateFontSizes();
  });

  onMounted(() => {
    updateFontSizes();
  });

  return {
    baseFontSize,
    updateFontSizes,
  };
}
