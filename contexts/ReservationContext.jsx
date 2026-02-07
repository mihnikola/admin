// /app/contexts/ReservationContext.tsx
import { createContext, useState } from "react";



// Create the context with a default value of null
const ReservationContext = createContext(null);

// ReservationProvider component to wrap around the app and provide context
export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState(null);

  const updateReservation = (data) => {
    setReservation(data);
  };

  return (
    <ReservationContext.Provider value={{ reservation, updateReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext;
