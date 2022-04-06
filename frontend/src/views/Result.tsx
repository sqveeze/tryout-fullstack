import { Paper, Text, Title } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export const ResultView: React.FC = (): JSX.Element => {
  const router = useRouter();

  const [result, setResult] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (router.isReady) {
      const { query } = router;

      if (!query?.result) {
        router.push("/");
      } else {
        setResult(JSON.parse(query.result as string));
      }
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>TryOut - Calculation Result</title>
      </Head>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12">
            <Title order={2}>Calculation Result</Title>
          </div>
          <div className="col-12">
            <Paper>
              <div className="row">
                <div className="col-12">
                  <Text>Currency: {result?.currency}</Text>
                </div>
                <div className="col-12">
                  <Text>Amount: {result?.amount}</Text>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};
