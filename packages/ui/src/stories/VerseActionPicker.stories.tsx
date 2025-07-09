import type { Meta } from "@storybook/react";
import { VerseActionPicker } from "../sdk";
import React from "react";

const meta: Meta<typeof VerseActionPicker> = {
  title: "Features/Verse Action Picker",
  component: VerseActionPicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export function Standard() {
  return <VerseActionPicker />;
}
