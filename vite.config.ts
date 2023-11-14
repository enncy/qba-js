import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		/** @ts-ignore 输出路径 */
		outDir: './dist/',
		/** 清空输出路径 */
		emptyOutDir: false,
		/** 是否压缩代码 */
		minify: true,
		/** 打包库， 全局名字为 OCS */
		lib: {
			entry: './src/export.ts',
			name: 'qba',
			fileName: () => 'index.js',
			formats: ['umd']
		}
	},
	plugins: []
});
