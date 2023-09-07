import { Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../schema/routes";
import { Search } from "./components/search";
import { Layout } from "./components/layout";
import { Results } from "./components/results";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Search />} path={RoutesEnum.HOME} />
        <Route element={<Results />} path={RoutesEnum.SEARCH_RESULTS} />
      </Route>
    </Routes>
  );
};
