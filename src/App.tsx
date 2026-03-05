import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "~/components";
import { CarDetailPage, HomePage, NotFoundPage } from "~/pages";
import { fetchCars } from "~/service/mocks";
import type { Car } from "~/types";

/**
 * Client-side route loader: fetches mock car data and returns it to the route.
 * Using the router loader (the clientLoader equivalent in library/SPA mode)
 * keeps data fetching at the route level — mirroring how a real service call
 * would be wired up. Store seeding is intentionally deferred to RootLayout so
 * that all Zustand hook calls occur inside React components, never outside the
 * component tree.
 */
async function carsLoader(): Promise<{ cars: Car[] }> {
  const cars = await fetchCars();
  return { cars };
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
