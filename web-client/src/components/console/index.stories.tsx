import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';

const meta = {
  title: "Console",
  component: Index,
  argTypes:{
    colorError: {control: "color"}
  }
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    content: "Hello world!",
    style: {
      "height": "200px",
      "fontSize": "0.75rem"
    }
  }
};

export const CompilationError: Story = {
  args: {
    content: "Compilation error > #inc_clude, line 1",
    displayError: true,
    colorError: "#ff0000",

    style: {
      "height": "200px",
      "fontSize": "0.75rem"
    }
  }
};