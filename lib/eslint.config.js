import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ['dist/', 'node_modules/', '**/*.d.ts']
	},
	{
		files: ['src/**/*.ts'],
		ignores: ['src/**/*.test.ts', 'src/**/__tests__/**/*.ts'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// TypeScript specific rules
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-unused-vars': ['error', {
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_'
			}],

			// General code quality
			'no-console': 'warn',
			'prefer-const': 'error',
			'no-var': 'error',
			'eqeqeq': ['error', 'always'],
		}
	},
	{
		files: ['src/**/*.test.ts', 'src/**/__tests__/**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.test.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		}
	}
);
