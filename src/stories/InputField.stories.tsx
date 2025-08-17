import { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This is a helper text",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    errorMessage: "Invalid email",
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "Can't type here",
    disabled: true,
  },
};
