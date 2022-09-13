import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SWRConfig } from "swr";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0,
        shouldRetryOnError: false,
        provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
