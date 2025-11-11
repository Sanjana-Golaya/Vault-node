
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import {ClerkProvider} from '@clerk/clerk-react';
import { StrictMode } from "react";

  const PUBLISH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISH_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
    <ClerkProvider publishableKey={PUBLISH_KEY}>
      <App/>
  </ClerkProvider>
  </StrictMode>
);
  