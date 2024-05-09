const verifyRoute = (route, defineRoutes) => {
  const routeDefinitions = {
    events: {
      title: "Evento",
      toEventFormRoute: "formEvents",
      returnEventManage: "manageEvents",
      toDetailsPage: "event",
      tableEvent: "posts",
      pathDetailsPage: "details",
    },
    places: {
      title: "Local",
      toPlaceFormRoute: "formPlaces",
      returnPlaceManage: "managePlaces",
      toDetailsPage: "place",
      tablePlace: "places",
      pathDetailsPage: "details-place",
    },
    tourism: {
      title: "Turismo",
      toEventFormRoute: "formTourism",
      returnEventManage: "manageTourism",
      toDetailsPage: "detailtourism",
      tableEvent: "tourism",
      pathDetailsPage: "detailtourism",
    },
    // Adicione mais definições de rota conforme necessário
  };

  const routeName = route.name;
  const definition = routeDefinitions[routeName];

  if (definition) {
    defineRoutes.value = [definition];
  }
};

export default verifyRoute;
