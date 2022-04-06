import { yupResolver } from "@hookform/resolvers/yup";
import { Button, NumberInput, Select, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNotifications } from "@mantine/notifications";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Yup from "yup";

import { V1_CALCULATE_COMMISSION } from "../../../utils/constants";
import { apiClient } from "../../../utils/networking";

interface ICommissionCalculatorData {
  date: Date;
  amount: number;
  currency: any;
  client_id: string;
}

export const CommissionCalculator: React.FC = (): JSX.Element => {
  const router = useRouter();
  const notification = useNotifications();

  const {
    mutateAsync: calculateCommission,
    isLoading: isCalculateCommissionLoading,
  } = useMutation(async (values: ICommissionCalculatorData) => {
    const { date, amount, currency, client_id } = values;

    const formatDate = moment(date).format("YYYY-MM-DD");

    return await apiClient
      .post(V1_CALCULATE_COMMISSION, {
        json: {
          date: formatDate,
          amount,
          currency,
          client_id: +client_id,
        },
      })
      .json<any>();
  });

  const validationSchema = Yup.object({
    date: Yup.date().required("Please pick a date").nullable(),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be greater than 0"),
    currency: Yup.string()
      .oneOf(["EUR", "USD", "HUF"])
      .required("Please select a currency"),
    client_id: Yup.string().required("Client id is required"),
  }).required();

  const defaultValues = {
    date: new Date(),
    amount: 0,
    currency: "",
    client_id: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICommissionCalculatorData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ICommissionCalculatorData) => {
    try {
      const result = await calculateCommission(data);

      notification.showNotification({
        title: "🤑 Success",
        message:
          "Commission calculation successful, redirecting to result page...",
        color: "lime",
      });

      reset();

      await router.push({
        pathname: "/result",
        query: {
          result: JSON.stringify(result),
        },
      });
    } catch (error) {
      notification.showNotification({
        title: "🚨 Error",
        message: "Something went wrong, please try again",
        color: "red",
      });
    }
  };

  return (
    <>
      <div className="row g-4 align-items-center">
        <div className="col-12">
          <Title order={2}>Commission Calculator</Title>
        </div>
        <div className="col-12">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    />
                  )}
                  name="client_id"
                />
              </div>
              <div className="col-12">
                <Button type="submit" loading={isCalculateCommissionLoading}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
