import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Contact, { loader as getContactLoader } from "./routes/contact";
import { action as deleteContactAction } from "./routes/destroy";
import EditContact, { action as updateContactAction } from "./routes/edit";
import Root, {
  loader as contactsLoader,
  action as createContactAction,
} from "./routes/root";

const routerRedi = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: contactsLoader,
    action: createContactAction,
    children: [
      {
        path: "contacts/:contactId",
        loader: getContactLoader,
        element: <Contact />,
      },
      {
        path: "contacts/:contactId/edit",
        loader: getContactLoader,
        action: updateContactAction,
        element: <EditContact />,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteContactAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routerRedi} />
  </StrictMode>
);
