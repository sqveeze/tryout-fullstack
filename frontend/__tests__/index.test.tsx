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
  it("renders the input elements", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const date = screen.getByTestId("calculator-date");
    const amount = screen.getByTestId("calculator-amount");
    const currency = screen.getByTestId("calculator-currency");
    const clientId = screen.getByTestId("calculator-client-id");

    expect(date).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(clientId).toBeInTheDocument();
  });

  it("renders the form submit button", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const button = screen.getByTestId("calculator-button");

    expect(button).toBeInTheDocument();
  });
});
