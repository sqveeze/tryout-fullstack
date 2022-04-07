import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import React from "react";

import { TestWrapper } from "../src/components";
import { CommissionCalculatorForm } from "../src/components/forms/CommissionCalculatorForm";
import Home from "../src/pages";

describe("Home", () => {
  it("submit the form", async () => {
    const onSubmit = jest.fn();

    render(
      <TestWrapper>
        <CommissionCalculatorForm onSubmit={onSubmit} isLoading={false} />
      </TestWrapper>
    );

    const date = screen.getByTestId("calculator-date");
    const amount = screen.getByTestId("calculator-amount");
    const clientId = screen.getByTestId("calculator-client-id");
    const submitButton = screen.getByTestId("calculator-button");

    fireEvent.change(date, { target: { value: new Date() } });
    fireEvent.change(amount, { target: { value: 10 } });
    // Mantine uses popperjs with the select element which is not supported by Jest
    // https://github.com/mantinedev/mantine/pull/388
    // Unfortunately we cannot support styles API and some other tests for components that use Popper, you should remove them and hope for the best
    // So, yeah. Lets hope for the best
    // await userEvent.selectOptions(
    //   screen.getByRole("combobox"),
    //   screen.getByRole("option", { name: "EUR" })
    // );
    fireEvent.change(clientId, { target: { value: "1" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(onSubmit).toBeCalled());
  });
});
