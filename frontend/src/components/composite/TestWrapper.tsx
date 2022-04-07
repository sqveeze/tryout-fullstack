import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const TestWrapper: React.FC = ({ children }): JSX.Element => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};
