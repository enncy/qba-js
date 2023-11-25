import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		/** @ts-ignore 输出路径 */
		outDir: './dist/',
		/** 清空输出路径 */
		emptyOutDir: true,
		/** 是否压缩代码 */
		minify: false,
		/** 打包库， 全局名字为 qba */
		lib: {
			entry: './src/export.ts',
			name: 'qba',
			fileName: (format) => 'index' + (format === 'umd' ? '.js' : '.' + format + '.js'),
			formats: ['umd', 'es']
		}
	},
	plugins: []
});
