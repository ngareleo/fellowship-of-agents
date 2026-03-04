import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { useAppStore } from "~/store";
import { mockCars } from "~/service/mocks";

// Seed the store with mock data before the app renders.
// We use getState() to access the store outside of a React component.
useAppStore.getState().setCars(mockCars);

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
