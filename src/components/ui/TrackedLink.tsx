"use client";

import type { AnchorHTMLAttributes } from "react";
import { track, type AnalyticsEvent, type AnalyticsParams } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  params?: AnalyticsParams;
  external?: boolean;
};

export function TrackedLink({ event, params, external, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(clickEvent) => {
        track(event, params);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}
