import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Select } from "./Select";
import { FilterIcon } from "../Icons/FilterIcon";

const meta = {
  title: "Atoms/Select",
  component: Select,
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
    options: { control: "object" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    mode: "primary",
    children: "Primary Select",
    multiselect: false,
    onChoose: fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const Transparent: Story = {
  args: {
    mode: "transparent",
    children: "Transparent Select",
    multiselect: false,
    onChoose: fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const Icon: Story = {
  args: {
    mode: "icon",
    children: <FilterIcon />,
    multiselect: false,
    onChoose: fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
