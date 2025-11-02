import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTable } from "./DataTable";

const meta = {
  title: "Atoms/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    caption: "List of users",
    headers: [
      { label: "ID", field: "id" },
      { label: "Name", field: "name", sortable: true },
      { label: "Email", field: "email", sortable: true },
    ],
    rows: [
      { id: 1, name: "John Doe", email: "test@mail.me" },
      { id: 2, name: "Jane Smith", email: "test1@mail.me" },
      { id: 3, name: "Sam Johnson", email: "test2@mail.me" },
    ],
  },
};
