import { Status } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="3">
      {containers.map((container) => (
        // <Card key={container.label}>
        //   <Flex direction="column" gap="1">
        //     <Link
        //       className="font-medium"
        //       href={`issues/list?status=${container.status}`}
        //     >
        //       {container.label}
        //     </Link>
        //     <Text size="7" className="font-bold">
        //       {container.value}
        //     </Text>
        //   </Flex>
        // </Card>
        <Box width="175px" key={container.label}>
          <Card asChild>
            <Link href={`issues/list?status=${container.status}`}>
              <Text as="div" size="2" weight="medium" align="center">
                {container.label}
              </Text>
              <Text as="div" color="gray" size="7" weight="bold" align="center">
                {container.value}
              </Text>
            </Link>
          </Card>
        </Box>
      ))}
    </Flex>
  );
};

export default IssueSummary;
