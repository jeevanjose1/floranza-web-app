"use client";

import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = { children: ReactNode };

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus: false, // Disable automatic refetching when window regains focus
        refetchOnReconnect: false, // Disable automatic refetching when reconnecting
        refetchOnMount: false,
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
