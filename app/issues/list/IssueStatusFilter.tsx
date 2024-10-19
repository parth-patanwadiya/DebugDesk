"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || " "}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        // Conditionally add 'status' only if it's not empty or " "
        if (status && status !== " ") {
          params.append("status", status);
        }

        // if (status) params.append("status", status);

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        // Navigate based on whether there are any parameters
        if (params.toString() === "") {
          router.push("/issues/list");
        } else {
          router.push(`/issues/list?${params.toString()}`);
        }

        // if (params.size === 0) {
        //   router.push("/issues/list");
        // } else {
        //   router.push(`/issues/list?${params.toString()}`);
        // }
      }}
    >
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
