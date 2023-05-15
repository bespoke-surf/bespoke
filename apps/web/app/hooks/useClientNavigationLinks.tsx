import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export function useClientNavigationLinks() {
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    document.addEventListener(
      "click",
      (event) => {
        const target = (event.target as Partial<HTMLElement>).closest?.("a");
        if (!target) return;

        const url = new URL(target.href, location.origin);
        if (
          url.origin === window.location.origin &&
          // Ignore clicks with modifiers
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          // Ignore right clicks
          event.button === 0 &&
          // Ignore if `target="_blank"`
          [null, undefined, "", "self"].includes(target.target) &&
          !target.hasAttribute("download")
        ) {
          event.preventDefault();
          navigate(url.pathname + url.search + url.hash, {
            preventScrollReset: true,
          });
        }
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  });
}
