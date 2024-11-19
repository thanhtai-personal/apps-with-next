"use client";

import { AppStore, appStore } from "@/store";

export const useAppStore = appStore.useStore as () => AppStore;