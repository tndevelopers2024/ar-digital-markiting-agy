"use client";

import React, { createContext, useContext, useState } from "react";

interface ServiceContextType {
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
}

const ServiceContext = createContext<ServiceContextType>({
  selectedServiceId: "seo-local",
  setSelectedServiceId: () => {},
});

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("seo-local");

  return (
    <ServiceContext.Provider value={{ selectedServiceId, setSelectedServiceId }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext() {
  return useContext(ServiceContext);
}
