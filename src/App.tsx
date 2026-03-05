import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "~/components";
import { CarDetailPage, HomePage, NotFoundPage } from "~/pages";
import { fetchCars } from "~/service/mocks";
import { useAppStore } from "~/store";

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
  const setCars = useAppStore((s) => s.setCars);

  useEffect(() => {
    fetchCars().then(setCars);
  }, [setCars]);

  return <RouterProvider router={router} />;
}
