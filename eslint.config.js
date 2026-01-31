import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // MELHORIA 1: Ignorar explicitamente arquivos de build e configs de raiz que não fazem parte do 'src'
  { 
    ignores: [
      "dist", 
      "node_modules", 
      "tailwind.config.ts", 
      "vite.config.ts", 
      "vitest.config.ts",
      "postcss.config.js"
    ] 
  },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommendedTypeChecked, 
    ],
    // MELHORIA 2: Focar apenas na pasta src para regras rigorosas de TS
    files: ["src/**/*.{ts,tsx}"], 
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // MELHORIA 3: Ajustado para avisar mas não bloquear o build por causa do padrão do Shadcn
      "react-refresh/only-export-components": "off", 
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // MELHORIA 4: Desabilitar regras que conflitam com componentes gerados (Shadcn)
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
);