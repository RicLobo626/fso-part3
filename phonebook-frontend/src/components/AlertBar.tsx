import { useEffect } from "react";
import { Alert } from "src/types";

type Props = {
  alert: Alert;
  onClose: () => void;
};

export const AlertBar = ({ alert, onClose }: Props) => {
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
