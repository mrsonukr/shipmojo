// RecommendedActionsMenu.jsx
import React, { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

/**
 * props:
 * - open: boolean
 * - onClose: () => void
 * - items: Array<{ title: string; description: string; onClick?: () => void }>
 * - position?: { top?: number; left?: number }  // absolute anchor
 */
export default function RecommendedActionsMenu({
  open = false,
  onClose,
  items = [],
  position = { top: 40, left: 540 },
}) {
  const ref = useRef(null);

  // Close on outside click / Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }
    function handleEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Recommended Actions"
      className="fixed inset-0 z-50"
      style={{ pointerEvents: "none" }}
    >
      {/* Backdrop (click to close) */}
      <button
        aria-label="Close"
        className="absolute inset-0"
        onClick={onClose}
        style={{ pointerEvents: "auto" }}
      />

      {/* Popover panel */}
      <div
        ref={ref}
        className="absolute z-50 rounded-2xl bg-white shadow-[0_9px_17.5px_rgba(0,0,0,0.05)] transition-opacity duration-300"
        style={{
          top: position.top ?? 40,
          left: position.left ?? 540,
          transformOrigin: "187px 0px",
          pointerEvents: "auto",
        }}
      >
        <ul
          role="menu"
          tabIndex={-1}
          className="min-w-[340px] py-2"
        >
          <p
            className="px-4 py-3 text-lg font-semibold"
            tabIndex={0}
          >
            Recommended Actions
          </p>
          <hr className="border-t" />

          {items.map((it, idx) => (
            <li key={idx}>
              <button
                role="menuitem"
                className="w-full cursor-pointer px-4 py-3 flex items-center justify-between gap-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                onClick={() => {
                  it.onClick?.();
                  onClose?.();
                }}
              >
                <div className="min-w-0">
                  <p className="text-lg font-medium truncate">{it.title}</p>
                  <p className="text-sm text-gray-600">
                    {it.description}
                  </p>
                </div>
                <ChevronRight size={18} strokeWidth={1} className="shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
