import { create } from 'zustand';

/**
 * Client-only UI state (D1).
 *
 * Request-derived facts (locale, isMobile, isNative, env) do NOT belong here --
 * they come from the root loader via `useRootData()`, which keeps the server and
 * the client in agreement and avoids hydration mismatches.
 */
interface UiState {
  activeDialog: string | null;
  openDialog: (id: string) => void;
  closeDialog: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeDialog: null,
  openDialog: (id) => set({ activeDialog: id }),
  closeDialog: () => set({ activeDialog: null }),
}));
