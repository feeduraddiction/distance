import { Outlet } from "react-router";
import classes from "./styles.module.scss";

export const Layout = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );
};
