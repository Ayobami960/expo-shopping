import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import * as Sentry from "@sentry/react";

// Clerk key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

// Sentry init
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  enableLogs: true,
  integrations: [
    Sentry.replayIntegration()
  ],
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0
});

// ✅ ONE root, ONE container
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
