import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { queryClient } from "@/queries";
import { LocaleContext } from "@/hooks";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { Locale } from "@/types";

// Eagerly import the shared style module so its Linaria CSS is part of the main
// chunk (see README "Desktop / mobile split"). Only the components are lazy.
import "./pages/home/styles";

const HomePage = lazy(() => import("./pages/home"));

/**
 * Declarative Mode: plain BrowserRouter, no `@react-router/dev`, no loaders.
 * All data flows through TanStack Query.
 */
export function App({ locale }: { locale: Locale }) {
  return (
    <LocaleContext.Provider value={locale}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary componentName="App">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<div>404 - not found</div>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </LocaleContext.Provider>
  );
}
