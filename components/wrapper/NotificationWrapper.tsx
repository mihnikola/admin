import useNotifications from "@/services/useNotifications";

export default function NotificationWrapper({ children }) {
  useNotifications();

  return <>{children}</>;
}
