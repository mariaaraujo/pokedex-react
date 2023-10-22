import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/Home";

function Router() {

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
