import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: () => <DataTable<User> data={data} columns={columns} selectable />,
};

export const Loading: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} />,
};
