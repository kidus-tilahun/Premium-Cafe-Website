import { createRoot } from "react-dom/client";
import { configureApiClient } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.API_URL;
if (apiBaseUrl) {
  configureApiClient({ baseUrl: apiBaseUrl });
}

createRoot(document.getElementById("root")!).render(<App />);
