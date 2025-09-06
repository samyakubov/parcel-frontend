import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import security from "eslint-plugin-security"

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
			"src/components/ui/**",
		],
	},
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		plugins: {
			security,
		},
		rules: {
			indent: ["error", "tab"],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "never"],
			"no-empty": ["error", {
				allowEmptyCatch: true,
			}],
			"eol-last": ["error", "always"],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			eqeqeq: "error",
			"space-infix-ops": "warn",
			"space-before-blocks": "error",
			"keyword-spacing": ["error", {
				before: true,
				after: true,
			}],
			"no-trailing-spaces": "error",
			"prefer-const": "error",
			"max-len": ["error", {
				code: 140,
			}],
			"require-await": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/prefer-as-const": "error",
			"no-eval": "error",
			"no-duplicate-imports": "error",
			"no-var": "error",
			"prefer-spread": "error",
			"@typescript-eslint/no-empty-interface": "error",
			"max-depth": ["warn", 3],
			"no-nested-ternary": "error",
			complexity: ["warn", 9],
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-non-null-assertion": "error",
			"max-params": ["warn", 6],
			"max-lines-per-function": ["warn", {
				max: 40,
				skipBlankLines: true,
				skipComments: true,
			}],
			"@typescript-eslint/naming-convention": ["error", {
				selector: "variable",
				format: ["camelCase", "UPPER_CASE", "PascalCase"],
			}, {
				selector: "function",
				format: ["camelCase", "PascalCase"],
			}, {
				selector: "parameter",
				format: ["camelCase"],
				leadingUnderscore: "allow",
			}, {
				selector: "enumMember",
				format: ["UPPER_CASE"],
			}, {
				selector: "typeLike",
				format: ["PascalCase"],
			}],
			"security/detect-buffer-noassert": "warn",
			"security/detect-child-process": "warn",
			"security/detect-disable-mustache-escape": "warn",
			"security/detect-eval-with-expression": "warn",
			"security/detect-no-csrf-before-method-override": "warn",
			"security/detect-non-literal-fs-filename": "warn",
			"security/detect-non-literal-regexp": "warn",
			"security/detect-non-literal-require": "warn",
			"security/detect-possible-timing-attacks": "warn",
			"security/detect-pseudoRandomBytes": "warn",
			"security/detect-unsafe-regex": "warn",
		},
	},
]

export default eslintConfig
