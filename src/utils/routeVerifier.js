const verifyRoute = (route, defineRoutes) => {
  const routeDefinitions = {
    events: {
      toEventFormRoute: "formEvents",
      returnEventManage: "manageEvents",
      toDetailsPage: "event",
      tableEvent: "posts",
    },
    places: {
      toPlaceFormRoute: "formPlaces",
      returnPlaceManage: "managePlaces",
      toDetailsPage: "place",
      tablePlace: "places",
    },
    tourism: {
      toEventFormRoute: "formTourism",
      returnEventManage: "manageTourism",
      toDetailsPage: "detailtourism",
      tableEvent: "tourism",
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
