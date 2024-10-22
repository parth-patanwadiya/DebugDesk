import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { title } from "process";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <LatestIssues />
      <Flex direction="column" gap="5" align="center">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Debug Desk - Dashboard",
  description: "View a summary of project issues",
};
