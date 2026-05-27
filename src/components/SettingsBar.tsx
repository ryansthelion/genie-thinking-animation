import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { VERSIONS, type PrototypeVersion } from "../versions/types";
import "./SettingsBar.css";

type SettingsBarProps = {
  version: PrototypeVersion;
  onVersionChange: (version: PrototypeVersion) => void;
  onRefresh: () => void;
};

function formatVersionLabel(version: PrototypeVersion): string {
  return version === "Version 1" ? "Version 1 (latest)" : version;
}

export function SettingsBar({
  version,
  onVersionChange,
  onRefresh,
}: SettingsBarProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header
      className="settings-bar"
      ref={rootRef}
      data-node-id="10252:7721"
      data-name="Bar"
    >
      <p className="settings-bar__title" data-node-id="10252:7723">
        Genie Thinking Animations
      </p>

      <div className="settings-bar__actions">
        <div className="settings-bar__menu" data-node-id="10252:7726">
          <button
            type="button"
            className="settings-bar__version-trigger"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={menuId}
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            <span className="settings-bar__version-label">
              {formatVersionLabel(version)}
            </span>
            <ChevronDownIcon />
          </button>

          {open ? (
            <ul
              id={menuId}
              role="listbox"
              className="settings-bar__dropdown"
              aria-label="Version"
            >
              {VERSIONS.map((item) => (
                <li key={item} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={item === version}
                    className="settings-bar__dropdown-item"
                    data-selected={item === version ? "true" : "false"}
                    onClick={() => {
                      onVersionChange(item);
                      setOpen(false);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          className="settings-bar__button-default"
          onClick={() => {
            setOpen(false);
            onRefresh();
          }}
        >
          Refresh
        </button>
      </div>
    </header>
  );
}
