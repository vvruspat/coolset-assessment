import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Button } from "./Button";
import { ChevronLeftIcon } from "../Icons/ChevronLeftIcon";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    mode: {
      control: { type: "select" },
      options: ["primary", "transparent", "icon"],
    },
    before: { control: "text" },
    after: { control: "text" },
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    mode: "primary",
    children: "Primary button",
  },
};

export const Transparent: Story = {
  args: {
    mode: "transparent",
    children: "Transparent button",
  },
};

export const Icon: Story = {
  args: {
    mode: "icon",
    children: <ChevronLeftIcon />,
  },
};
