"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "@/config/business";
import type { Dictionary } from "@/content/dictionaries";
import { getService } from "@/content/services";
import { track } from "@/lib/analytics";

interface BookingContextValue {
  locale: Locale;
  dict: Dictionary;
  selected: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string, source: string) => void;
  clear: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ locale, dict, children }: { locale: Locale; dict: Dictionary; children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback(
    (id: string, source: string) => {
      if (!getService(id)) return;
      const removing = selected.includes(id);
      track(removing ? "service_removed" : "service_added", { service_id: id, source });
      if (!removing && selected.length === 0) track("booking_started", { source });
      setSelected(removing ? selected.filter((item) => item !== id) : [...selected, id]);
    },
    [selected],
  );

  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo<BookingContextValue>(
    () => ({ locale, dict, selected, isSelected: (id) => selected.includes(id), toggle, clear }),
    [locale, dict, selected, toggle, clear],
  );

  return (
    <MotionConfig reducedMotion="user">
      <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
    </MotionConfig>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
