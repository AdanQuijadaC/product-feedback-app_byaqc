import { Outlet } from "react-router-dom";
import { UseContextGlobalProvider } from "../context/UseGlobalContextProvider";

function PrivateLayouts() {
  return (
    <UseContextGlobalProvider>
      <Outlet></Outlet>
    </UseContextGlobalProvider>
  );
}
export default PrivateLayouts;
