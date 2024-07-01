'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface QueryClientProviderCustomProps {
  children: ReactNode;
}

const queryClient = new QueryClient()

const QueryClientProviderCustom = ({ children }: QueryClientProviderCustomProps) => {
  return ( 
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
 
export default QueryClientProviderCustom;
