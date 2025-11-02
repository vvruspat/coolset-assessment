import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Button } from "./Button";

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
      options: ["primary", "transparent"],
    },
    before: { control: "text" },
    after: { control: "text" },
    children: { control: "text" },
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
