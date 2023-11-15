import {
	AnalysisResult,
	AnalysisResultWthMetadata,
	HandledQuestionMetadata,
	Handler,
	QuestionMetadata,
	QuestionMetadataRegexpGroup
} from './interface';
import { default_title_metadata_regexp_group } from './regexp';
import { utils, writeFile } from 'xlsx';

const STANDARD_ANSWER_START = ['正确答案', '标准答案', '答案解析', '答案'];
const MY_ANSWER_START = ['我的答案'];
const TITLE_START_REGEXP = /^\d{1,5}[:：、. \n]/;
const ANSWER_AREA_REGEXP = /([(（[{【)]\s*)([A-J]+)(\s*[】}\]）)])/;
const ONE_LINE_OPTIONS = /[A-J].{1,}?(?:[ \n])/g;

/**
 * 题库解析
 * @param content 题库文本
 */
export function analysis(content: string): AnalysisResult[] {
	const results: AnalysisResult[] = [];

	const lines = content
		.split('\n')
		.map((l) => l.trim())
		.filter(String);

	let count = 0;
	// 是否开始保存答案区域
	let save = false;
	// 答案区域组
	const saveGroup: string[][] = [];
	// 答案区域
	let saveLines: string[] = [];

	const startSaveGroup = (popCount: number) => {
		save = false;
		// 存储答案区域
		if (saveLines.length) {
			while (popCount > 0) {
				popCount--;
				saveLines.pop();
			}
			saveGroup.push(saveLines);
			saveLines = [];
		}
	};

	// 遍历每一行
	while (count < lines.length) {
		const result: AnalysisResult = {
			title: '',
			options: [],
			answers: [],
			complete: false,
			answerArea: []
		};

		const line = lines[count];
		const nextLine = lines[count + 1] || '';

		// 如果此行是A开头，开始尝试提取选项，题目
		if (line.match(/^A/) && nextLine.match(/^B/)) {
			// 如果此时到达了题目，那么保存答案区域则结束
			const title = getTitleFromPreviousLine(lines, count);
			// 因为保存区域会将题目也进行保存，所以这里需要排除掉题目的这几行，传递一个 title.length
			startSaveGroup(title.length);
			// 此时上一部分将作为题目
			result.title = title.join('\n');
			// 此时的选项为当前行和下一行，
			result.options = [line, nextLine];

			count += 2;

			// 如果后续的行也是选项，那么继续添加
			let start = 'B'.charCodeAt(0);
			while (true) {
				const line = lines[count];
				if (line && line.match(/^[C-J]/) && line.charCodeAt(0) === start + 1) {
					result.options.push(line);
					start++;
					count++;
				} else {
					// 抵消最后的数量增加
					count--;
					save = true;
					break;
				}
			}
		}
		// 如果选项全部挤在一行
		else if (line.match(/^A/) && ((line + '\n').match(ONE_LINE_OPTIONS)?.length ?? 0) >= 2) {
			const title = getTitleFromPreviousLine(lines, count);
			startSaveGroup(title.length);
			// 提取选项
			result.options = ((line + '\n').match(ONE_LINE_OPTIONS) || []).map((s) => String(s).trim());
			// 此时上一部分将作为题目
			result.title = title.join('\n');
			save = true;
		} else if (line.match(TITLE_START_REGEXP)) {
			startSaveGroup(0);
		} else if (
			/**
			 * 如果此行是 `正确答案` 区域的开始，并且没有选项。
			 * 这个算法会导致如果 我的答案` 在 `正确答案` 的下方，那么答案区域中也会包含 `我的答案`
			 * 如果 `我的答案` 在 `正确答案` 的上方，那么题目中会包含 `我的答案`
			 * 解决方法：
			 * 1.  排除掉我的答案在正确答案上方的情况
			 * ```js
			 * content = content.replace(/我的答案[\s\S]+?(正确答案|标准答案|答案解析)/g, '$1')
			 * console.log(qba.parse(content))
			 * ```
			 * 
			 * 2. 解析完成后 ， 删除我的答案之后的所有文本
			 * ```js
			 * const results = qba.parse(content).map(r=>{
			 	   const index = r.answers.findIndex(a=>a.includes('我的答案'))
			 	   	   r.answers.length =index=== -1 ?  r.answers.length :index
			 	   	   return r
			 	   })
			 * ```
			 *
			 */
			STANDARD_ANSWER_START.some((i) => line.includes(i)) &&
			// 因为我的答案，这四个字也包含答案2个字，所以需要排除
			MY_ANSWER_START.every((i) => line.includes(i) === false) &&
			save === false
		) {
			const title = getTitleFromPreviousLine(lines, count);
			startSaveGroup(title.length);
			// 此时上一部分将作为题目
			result.title = title.join('\n');
			save = true;
			// 因为是已经开始答案区域了，所以这一行也得加入
			saveLines.push(line);
			// 如果已经是最后一行了
			if (count === lines.length - 1) {
				saveGroup.push(saveLines);
			}
		} else {
			if (save) {
				saveLines.push(line);
				// 如果已经是最后一行了
				if (count === lines.length - 1) {
					saveGroup.push(saveLines);
				}
			}
		}

		// 提取答案，这里的答案是指题目中括号中的答案，如果没有，则在后续处理答案区域组时再提取
		if (result.title.match(ANSWER_AREA_REGEXP)) {
			result.answers = (result.title.match(ANSWER_AREA_REGEXP)?.[2] || '').split('');
		}

		if (result.title) {
			if (result.answers.length) {
				result.complete = true;
			}
			results.push(result);
		}

		count++;
	}

	startSaveGroup(0);

	count = 0;

	// 如果题目提取失败，则证明答案在答案区域组中
	while (count < results.length) {
		const result = results[count];
		if (result.complete === false) {
			let i = 0;
			let answerStart = false;
			let answers: string[] = [];
			const answerArea = saveGroup.shift();

			// 下一个循环
			if (!answerArea) {
				count++;
				continue;
			}
			result.answerArea = answerArea;

			while (i < answerArea.length) {
				const line = answerArea[i];
				if (MY_ANSWER_START.some((i) => line.includes(i))) {
					// 如果已经提取出了答案，证明我的答案在正确答案后面，此时无需处理了，直接退出循环
					if (answerStart && answers.length) {
						break;
					}
				} else if (STANDARD_ANSWER_START.some((i) => line.includes(i))) {
					// 如果答案以ABCD的形式存在，那么直接提取
					if (line.match(/[A-J]{1,10}/)) {
						answers = line.match(/[A-J]{1,10}/)?.[0].split('') || [];
						break;
					}
					answerStart = true;
					answers.push(line);
				} else {
					// 按行提取（多为填空题）
					if (answerStart) {
						answers.push(line);
					}
				}
				i++;
			}

			// 把“正确答案”字段删除，只留下答案内容
			result.answers = answers
				.map((a) => {
					if (STANDARD_ANSWER_START.some((i) => a.includes(i))) {
						for (const sas of STANDARD_ANSWER_START) {
							a = a.replace(new RegExp(sas + '[:：、，。 \\n]'), '').trim();
						}
					}
					return a;
				})
				.filter(String);
			result.complete = !!result.answers.length;
		}

		count++;
	}

	return results;
}

/**
 * 解析题目的题干
 * @param lines   题库文本
 * @param index   当前行索引
 * @returns
 */
function getTitleFromPreviousLine(lines: string[], index: number) {
	let i = 1;
	const titles: string[] = [];
	while (lines[index - i]) {
		const previousLine = lines[index - i];
		titles.push(previousLine);
		if (previousLine.match(TITLE_START_REGEXP)) {
			break;
		}
		i++;
	}

	return titles.reverse();
}

/**
 * 处理题目信息
 * @param results 解析结果
 */
export function handleQuestionMetadata(
	results: AnalysisResultWthMetadata[],
	options?: {
		/** 题目信息解析组 */
		title_metadata_regexp_group?: QuestionMetadataRegexpGroup[];
	}
): AnalysisResultWthMetadata[] {
	for (const result of results) {
		const title_metadata_regexp_group = options?.title_metadata_regexp_group ?? default_title_metadata_regexp_group; // 如果没有指定，则使用默认的题目信息解析组
		// 开始解析题目信息
		for (const item of title_metadata_regexp_group) {
			const match = result.title.match(item.regexp);

			if (match) {
				const metadata: QuestionMetadata & HandledQuestionMetadata = Object.create({});
				for (const group of item.groups) {
					metadata[group[0]] = match[group[1]];
				}
				metadata.handled_title = result.title.replace(item.regexp, '').trim();
				metadata.hit_regexp = item.regexp;
				result.metadata = metadata;
				break;
			}
		}
	}

	return results;
}

/**
 * 解析题库
 * @param content 题库文本
 */
export function parse(
	content: string,
	options?: {
		/**
		 * 处理器
		 */
		handlers?: Handler[];
		/**
		 * 题目信息解析组
		 * 可以自定义题目信息解析组
		 *
		 * @example
		 * 如果题目为以下的格式
		 * ```
		 * 1. xxxxx [多选题]
		 * ```
		 * 则需要自定义为：
		 * ```js
		 * parse(`1. xxxxx [多选题]...`,{
		 *    title_metadata_regexp_group:[
		 *		   {
		 *		   	   regexp: /(\[..题\])$/,
		 *		   	   groups: [['type', 1]]
		 *		   },
		 *		   {
		 *		   	   regexp: /^(\d+)\./,
		 *		   	   groups: [['index', 1]]
		 *		   }
		 *    ]
		 * })
		 * ```
		 *
		 * @default default_title_metadata_regexp_group
		 */
		title_metadata_regexp_group?: QuestionMetadataRegexpGroup[];
	}
): AnalysisResultWthMetadata[] {
	// 前置处理器
	for (const handler of options?.handlers || []) {
		content = handler.before ? handler.before(content) : content;
	}
	const results = analysis(content);
	let handledResults = handleQuestionMetadata(results, {
		title_metadata_regexp_group: options?.title_metadata_regexp_group || default_title_metadata_regexp_group
	});
	// 后置处理器
	for (const handler of options?.handlers || []) {
		handledResults = handler.after ? handler.after(handledResults) : handledResults;
	}
	return handledResults;
}

/**
 * 导出结果文件
 *
 * @example
 *
 * ```js
 * const results = qba.parse('...')
 * // web
 * qba.writeToFile(results,'result.xlsx','xlsx')
 * // nodejs
 * qba.writeToFile(results,'./xxx/result.xlsx','xlsx')
 * ```
 *
 * @param results 			解析结果
 * @param pathOrName 		文件路径或者文件名
 * @param type 				文件类型
 * @param options 			选项
 */
export function writeToFile(
	results: AnalysisResultWthMetadata[],
	pathOrName: string,
	type: 'json' | 'xlsx' | 'txt' | 'markdown',
	options?: {
		/**
		 * 选项分隔符，当 type 为 xlsx 时有效
		 * @default '\n'
		 */
		optionSplit?: string;
		/**
		 * 答案分隔符，当 type 为 xlsx 时有效
		 * @default ''
		 */
		answerSplit?: string;
	}
) {
	const res = results.map((r) => ({
		title: r.metadata?.handled_title,
		type: r.metadata?.type,
		options: r.options,
		answers: r.answers
	}));

	if (type === 'json') {
		saveFile(pathOrName, JSON.stringify(res, null, 4));
	} else if (type === 'markdown' || type === 'txt') {
		const content = res
			.map((r) => `【${r.type}】${r.title}\n${r.options.join('\n')} \n正确答案：\n${r.answers.join('\n')}\n-------`)
			.join('\n');
		saveFile(pathOrName, content);
	} else if (type === 'xlsx') {
		const data = results.map((r) => ({
			题目: r.metadata?.handled_title,
			类型: r.metadata?.type,
			选项: r.options.join(options?.optionSplit ?? '\n'),
			答案: r.answers.join(options?.answerSplit ?? '')
		}));
		const sheet = utils.json_to_sheet(data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, sheet, 'Sheet1');
		writeFile(workbook, pathOrName);
	} else {
		throw new Error('不支持的文件类型 : ' + type);
	}
}

function saveFile(filename: string, data: string) {
	if (typeof window.require === 'undefined') {
		const a = document.createElement('a');
		const blob = new Blob([data], { type: 'octet/stream' });
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	} else {
		const fs = require('fs') as typeof import('fs');
		fs.writeFileSync(filename, data);
	}
}
