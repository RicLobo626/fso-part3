import { useEffect } from "react";

export const AlertBar = ({ alert, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 4000);

    return () => clearTimeout(timeout);
  });

  if (!alert) return null;

  return (
    <div
      className={`alert alert--${alert.type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {alert.message}
    </div>
  );
};
