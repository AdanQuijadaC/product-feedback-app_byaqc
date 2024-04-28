import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import FeedbackDetail from "../pages/FeedbackDetail";
import FeedbackEdit from "../pages/FeedbackEdit";
import FeedbackNew from "../pages/FeedbackNew";
import Roadmap from "../pages/Roadmap";
import PrivateLayouts from "../layouts/PrivateLayouts";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayouts></PrivateLayouts>,
    children: [
      {
        index: true,
        element: <Index></Index>,
      },
      {
        path: "feedback/:id/detail",
        element: <FeedbackDetail></FeedbackDetail>,
      },
      {
        path: "feedback/:id/edit",
        element: <FeedbackEdit></FeedbackEdit>,
      },
      {
        path: "feedback/new",
        element: <FeedbackNew></FeedbackNew>,
      },
      {
        path: "roadmap",
        element: <Roadmap></Roadmap>,
      },
    ],
  },
]);
