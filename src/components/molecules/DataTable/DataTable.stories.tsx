import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTable } from "./DataTable";
import { Select } from "../../atoms/Select/Select";
import { FilterIcon } from "../../atoms/Icons/FilterIcon";
import { fn } from "storybook/test";

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

const data = Array.from({ length: 38 }, (_, index) => {
  const firstNames = [
    "Alex",
    "Sarah",
    "Mike",
    "Emma",
    "David",
    "Lisa",
    "Ryan",
    "Katie",
    "Tom",
    "Sofia",
    "James",
    "Maya",
    "Chris",
    "Nina",
    "Ben",
    "Zoe",
    "Luke",
    "Grace",
    "Noah",
    "Ivy",
  ];
  const lastNames = [
    "Turner",
    "Wilson",
    "Chen",
    "Davis",
    "Brown",
    "Garcia",
    "Miller",
    "Lee",
    "Anderson",
    "Rodriguez",
    "Taylor",
    "Patel",
    "White",
    "Johnson",
    "Clark",
    "Martinez",
    "Thompson",
    "Kim",
    "Jackson",
    "Williams",
  ];
  const domains = [
    "example.com",
    "domain.org",
    "company.net",
    "service.io",
    "platform.com",
    "tech.co",
    "startup.dev",
    "business.net",
    "corp.com",
    "agency.org",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

  return {
    id: index + 1,
    name: `${firstName} ${lastName}`,
    email,
  };
});

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    caption: "List of users",
    headers: [
      { label: "ID", field: "id" },
      {
        label: "Name",
        field: "name",
        sortable: true,
        filter: (
          <Select
            mode="primary"
            multiselect={true}
            before={<FilterIcon />}
            after={null}
            onChoose={fn()}
            options={["tes1", "test2", "test3", "test4"].map((item) => ({
              value: item,
              label: item,
            }))}
          >
            Filter by name
          </Select>
        ),
      },
      { label: "Email", field: "email", sortable: true },
    ],
    rows: data,
    total: data.length,
  },
};
