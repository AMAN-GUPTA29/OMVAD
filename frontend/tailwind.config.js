/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/context/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}",
    "./src/App.jsx",
    "./src/main.jsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^(bg|text|border|ring|shadow|hover:bg|hover:text|dark:bg|dark:text|dark:border|dark:ring|dark:shadow|dark:hover:bg|dark:hover:text)-(white|gray|primary)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^(p|m|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)$/,
    },
    {
      pattern: /^(rounded|rounded-t|rounded-b|rounded-l|rounded-r)-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    },
    {
      pattern: /^(flex|grid|block|inline-block|inline|hidden)$/,
    },
    {
      pattern: /^(items|justify|content|self|place)-(start|end|center|between|around|evenly|stretch)$/,
    },
    {
      pattern: /^(space|gap)-(x|y)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)$/,
    },
    {
      pattern: /^(w|h|min-w|min-h|max-w|max-h)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64|full|screen)$/,
    },
    {
      pattern: /^(opacity|z)-(0|10|20|30|40|50|60|70|80|90|100|auto)$/,
    },
    {
      pattern: /^(transition|duration|ease|delay)-(all|colors|opacity|shadow|transform|none|75|100|150|200|300|500|700|1000)$/,
    },
  ],
} 