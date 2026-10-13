export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "instagram_click"
  | "map_click"
  | "category_selected"
  | "service_added"
  | "service_removed"
  | "booking_started"
  | "booking_validation_failed"
  | "booking_submitted"
  | "language_switched";

/** Never pass personal data (names, phones, emails, notes) as params. */
export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", event: string, params?: AnalyticsParams) => void;
  }
}

export function track(event: AnalyticsEvent, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, params ?? {});
}
