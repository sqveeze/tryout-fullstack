import { yupResolver } from "@hookform/resolvers/yup";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ECurrency } from "@types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

export interface ICommissionCalculatorData {
  date: Date;
  amount: number;
  currency: any;
  client_id: string;
}

interface ICommissionCalculatorForm {
  onSubmit: (data: ICommissionCalculatorData) => void;
  isLoading: boolean;
}

export const CommissionCalculatorForm: React.FC<ICommissionCalculatorForm> = ({
  onSubmit,
  isLoading,
}): JSX.Element => {
  const validationSchema = Yup.object({
    date: Yup.date().required("Please pick a date").nullable(),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be greater than 0"),
    currency: Yup.string()
      .oneOf([ECurrency.EUR, ECurrency.HUF, ECurrency.USD])
      .required("Please select a currency"),
    client_id: Yup.string().required("Client id is required"),
  }).required();

  const defaultValues = {
    date: new Date(),
    amount: 0,
    currency: "EUR",
    client_id: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICommissionCalculatorData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onFormSubmit = (data: ICommissionCalculatorData) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} data-testid="calculator-form">
      <div className="row g-2 align-items-center">
        <div className="col-12">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                error={errors?.date?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                label="Date"
                data-testid="calculator-date"
              />
            )}
            name="date"
          />
        </div>
        <div className="col-12">
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <NumberInput
                error={errors?.amount?.message}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                label="Amount"
                precision={2}
                min={1}
                data-testid="calculator-amount"
              />
            )}
            name="amount"
          />
        </div>
        <div className="col-12">
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Select
                error={errors?.currency?.message}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                label="Currency"
                data={[
                  { value: "USD", label: "USD" },
                  { value: "EUR", label: "EUR" },
                  { value: "HUF", label: "HUF" },
                ]}
                data-testid="calculator-currency"
              />
            )}
            name="currency"
          />
        </div>
        <div className="col-12">
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                error={errors?.client_id?.message}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                label="Client Id"
                data-testid="calculator-client-id"
              />
            )}
            name="client_id"
          />
        </div>
        <div className="col-12">
          <Button
            data-testid="calculator-button"
            type="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
