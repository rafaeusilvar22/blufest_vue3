## Documentação do Método de Ajuste de Tamanho de Fonte

Objetivo
Implementar uma funcionalidade que permita ajustar dinamicamente o tamanho da fonte em uma aplicação Vue.js utilizando Quasar Framework. A configuração do tamanho da fonte será persistida no localStorage, garantindo que o ajuste seja mantido entre recarregamentos da página.

Componentes Envolvidos
useFontSize Composable: Função de composição que gerencia o tamanho da fonte e a persistência no localStorage.
FontSizeControl Component: Componente que permite ao usuário ajustar o tamanho da fonte utilizando um QSlider.
MainLayout.vue: Componente principal do layout que aplica o tamanho da fonte ao ser montado.

Funções
baseFontSize: Estado reativo que mantém o tamanho base da fonte.
updateFontSizes: Função que atualiza as variáveis CSS com os tamanhos de fonte baseados em baseFontSize.
Watcher: Observa mudanças em baseFontSize e atualiza o localStorage e as variáveis CSS.

Componente:
Funções:
sizeLabel: Computed property que converte o valor de baseFontSize em um rótulo descritivo.
q-slider: Componente do Quasar que permite ajustar o valor de baseFontSize.
