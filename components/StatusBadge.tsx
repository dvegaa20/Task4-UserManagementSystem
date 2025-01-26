import clsx from "clsx";
import React from "react";
import { Status } from "@/types";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "active",
        "bg-red-700": status === "blocked",
      })}
    >
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "active",
          "text-red-500": status === "blocked",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
