import { useAuth } from "@/contexts/AuthContext";
import { useGlobalError } from "@/contexts/GlobalErrorContext";
import { useState } from "react";
import { SharedLoader } from "./SharedLoader";
import { SharedMessage } from "./SharedMessage";
import { FontAwesome } from "@expo/vector-icons";

const GlobalErrorHandler = () => {
  const { error, hideError } = useGlobalError();
  const { logoutFirebase, logoutHandler } = useAuth();
  const [loading, setLoading] = useState(false);

  const logoutConfirm = async () => {
    setLoading("logout");
    // await logoutFirebase();
    try {
      // 2. Čekamo da se završi kompletan API poziv i brisanje storage-a
      await logoutFirebase();

      console.log("logoutFirebase je završen, sada gasim loader...");
    } catch (error) {
      console.log("Greška tokom logout procesa:", error);
    } finally {
      // 3. TEK OVDE gasimo loader (unutar finally bloka, što garantuje
      // da će se izvršiti čak i ako server baci grešku)
      setLoading(null);
      hideError();

      // setTimeout(() => {
      //   logoutHandler();
      // }, 100);
    }
  };
  if (!error) return null;

  if (loading === "logout") {
    return <SharedLoader isOpen={loading === "logout"} />;
  }

  return (
    <SharedMessage
      isOpen={!!error}
      title={error?.title}
      buttonText="OK"
      icon={<FontAwesome name={"close"} size={64} color="white" />}
      onConfirm={logoutConfirm}
      onClose={logoutConfirm}
    />
  );
};

export default GlobalErrorHandler;
