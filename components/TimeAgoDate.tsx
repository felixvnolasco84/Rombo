"use client";

import { formatter } from "@/lib/utils";
import React from "react";
import TimeAgo from "react-timeago";

type TimeAgoDateProps = {
  date: string | number | Date;
};

export default function TimeAgoDate({ date }: TimeAgoDateProps) {
  return <TimeAgo date={date} formatter={formatter} />;
}
