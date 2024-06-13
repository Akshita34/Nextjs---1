"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const reSetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, reSetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined) throw new error("Context was outside provider");
  return context;
}

export { ReservationProvider, useReservation };
