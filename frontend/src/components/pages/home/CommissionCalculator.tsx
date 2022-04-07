import { Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ICalculationResponse } from "@types";
import { apiClient, V1_CALCULATE_COMMISSION } from "@utils";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";

import {
  CommissionCalculatorForm,
  ICommissionCalculatorData,
} from "../../forms/CommissionCalculatorForm";

export const CommissionCalculator: React.FC = (): JSX.Element => {
  const router = useRouter();

  const {
    mutateAsync: calculateCommission,
    isLoading: isCalculateCommissionLoading,
  } = useMutation(async (values: ICommissionCalculatorData) => {
    const { date, amount, currency, client_id } = values;

    const formatDate = moment(date).format("YYYY-MM-DD");

    const { data } = await apiClient.post<ICalculationResponse>(
      V1_CALCULATE_COMMISSION,
      {
        date: formatDate,
        amount,
        currency,
        client_id: +client_id,
      }
    );

    return data;
  });

  const onSubmit = async (data: ICommissionCalculatorData) => {
    try {
      const result = await calculateCommission(data);

      showNotification({
        title: "🤑 Success",
        message:
          "Commission calculation successful, redirecting to result page...",
        color: "lime",
      });

      await router.push({
        pathname: "/result",
        query: {
          result: JSON.stringify(result),
        },
      });
    } catch (error) {
      showNotification({
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
          <Title data-testid="calculator-title" order={2}>
            Commission Calculator
          </Title>
        </div>
        <div className="col-12">
          <CommissionCalculatorForm
            onSubmit={onSubmit}
            isLoading={isCalculateCommissionLoading}
          />
        </div>
      </div>
    </>
  );
};
