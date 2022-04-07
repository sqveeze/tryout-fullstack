import { render, screen } from "@testing-library/react";
import React from "react";

import { TestWrapper } from "../src/components";
import Home from "../src/pages/index";

describe("Home", () => {
  it("renders a title", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const title = screen.getByTestId("calculator-title");

    expect(title).toBeInTheDocument();
  });
  it("renders the form", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const form = screen.getByTestId("calculator-form");

    expect(form).toBeInTheDocument();
  });
});
