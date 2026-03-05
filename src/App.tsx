import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "~/components";
import { CarDetailPage, HomePage, NotFoundPage } from "~/pages";
import { fetchCars } from "~/service/mocks";
import { useAppStore } from "~/store";

async function carsLoader() {
  const cars = await fetchCars();
  useAppStore.getState().setCars(cars);
  return null;
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: carsLoader,
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
