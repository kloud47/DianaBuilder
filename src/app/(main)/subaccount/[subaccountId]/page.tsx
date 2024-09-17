import BlurPage from "@/components/global/blur-page";
import PipelineValue from "@/components/global/pipeline-value";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { ClipboardIcon, Contact2, DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: { subaccountId: string };
  searchParams: { code: string };
};

const SubaccountPage = async ({ params, searchParams }: Props) => {
  let currency = "USD";
  let sessions;
  let totalClosedSessions;
  let totalPendingSessions = 0;
  let net = 0;
  let potentialIncome = 0;
  let closingRate = 0;
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000;
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000;

  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });

  if (!subaccountDetails) return;

  const funnels = await db.funnel.findMany({
    where: {
      subAccountId: params.subaccountId,
    },
    include: {
      FunnelPages: true,
    },
  });

  const funnelPerformanceMetrics = funnels.map((funnel) => ({
    ...funnel,
    totalFunnelVisits: funnel.FunnelPages.reduce(
      (total, page) => total + page.visits,
      0
    ),
  }));

  return (
    <BlurPage>
      <div className="relative h-full">
        {!subaccountDetails && (
          <div className="absolute -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Stripe</CardTitle>
                <CardDescription>
                  You need to connect your stripe account to see metrics
                </CardDescription>
                <Link
                  href={`/agency/${subaccountDetails?.id}/launchpad`}
                  className="p-2 w-fit bg-secondary rounded-md flex items-center gap-2"
                >
                  <ClipboardIcon />
                  Launch Pad
                </Link>
              </CardHeader>
            </Card>
          </div>
        )}
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="flex-1 relative">
              <CardHeader>
                <CardDescription>Income</CardDescription>
                <CardTitle className="text-4xl">
                  {net ? `${currency} ${net.toFixed(2)}` : `$0.00`}
                </CardTitle>
                <small className="text-xs text-muted-foreground">
                  For the year {currentYear}
                </small>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Total revenue generated as reflected in your stripe dashboard.
              </CardContent>
              <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="flex-1 relative">
              <CardHeader>
                <CardDescription>Potential Income</CardDescription>
                <CardTitle className="text-4xl">
                  {potentialIncome
                    ? `${currency} ${potentialIncome.toFixed(2)}`
                    : `$0.00`}
                </CardTitle>
                <small className="text-xs text-muted-foreground">
                  For the year {currentYear}
                </small>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                This is how much you can close.
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <PipelineValue subaccountId={params.subaccountId} />
          </div>
        </div>
      </div>
    </BlurPage>
  );
};
export default SubaccountPage;
