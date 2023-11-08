import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';
import { defineConfig } from 'vite';

function getHTMLFilesRecursively(dir, base = '') {
	const files = readdirSync(dir);

	const htmlFiles = {};

	files.forEach((file) => {
		const filePath = join(dir, file);
		const fileStat = statSync(filePath);

		if (fileStat.isDirectory()) {
			const subDir = join(base, file);
			const subFiles = getHTMLFilesRecursively(filePath, subDir);
			Object.assign(htmlFiles, subFiles);
		} else if (file.endsWith('.html')) {
			const name = join(base, file).replace('.html', '');
			htmlFiles[name] = filePath;
		}
	});

	return htmlFiles;
}

const pagesDir = resolve(__dirname, 'views');
const inputEntries = getHTMLFilesRecursively(pagesDir);

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				...inputEntries,
			},
		},
	},
});
