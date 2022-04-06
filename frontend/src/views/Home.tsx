import Head from "next/head";
import React from "react";

import { CommissionCalculator } from "../components/pages/home/CommissionCalculator";

export const HomeView: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>TryOut - Home</title>
      </Head>
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <CommissionCalculator />
          </div>
        </div>
      </div>
    </>
  );
};
