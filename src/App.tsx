import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "~/components";
import { CarDetailPage, HomePage, NotFoundPage } from "~/pages";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars/:id", element: <CarDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
