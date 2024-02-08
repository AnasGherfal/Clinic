import Layout from "../../layout";
import { Outlet } from "react-router-dom";

const user = () => {
  return (
    <Layout>
      <Outlet/>
    </Layout>
  );
};

export default user;