import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "~/components";
import { CarDetailPage, HomePage, NotFoundPage } from "~/pages";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cars/:id" element={<CarDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
