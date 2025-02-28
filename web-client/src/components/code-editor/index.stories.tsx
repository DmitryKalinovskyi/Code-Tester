import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';

const meta = {
  title: "Code Editor",
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PythonDark: Story = {
  args: {
    language: "Python",
    theme: "Tokyo Night",

    style: {
      "height": "200px",
      "fontSize": "0.75rem"
    },

    indentWithTab: true,
    initialDoc: "print(\"Hello world!\")"
  }
};


export const CPlusPlusDark: Story = {
  args: {
    language: "C++",
    theme: "VCCode Dark",

    style: {
      "height": "200px",
      "fontSize": "0.75rem"
    },

    indentWithTab: true,
    initialDoc: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}\n"
  }
};

export const JavaLight: Story = {
  args: {
    language: "Java",
    theme: "VSCode Light",

    style: {
      "height": "200px",
      "fontSize": "0.75rem"
    },

    indentWithTab: true,
    initialDoc: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n"
  }
};