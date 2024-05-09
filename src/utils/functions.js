const setInitialPositionScrollBehavior = () => {
  sessionStorage.setItem("scrollPositionTableContent", window.scrollY);
};

export default setInitialPositionScrollBehavior;
