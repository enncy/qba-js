import { AnalysisResult, HandledQuestionMetadata, QuestionMetadata } from './interface';
import { regexps } from './regexp';

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

	// 遍历每一行
	while (count < lines.length) {
		const result: AnalysisResult = {
			title: '',
			options: [],
			answers: [],
			complete: false
		};

		const line = lines[count];
		const nextLine = lines[count + 1] || '';

		// 提取选项，题目
		if (line.match(/^A/) && nextLine.match(/^B/)) {
			// 如果此时到达了题目，那么保存答案区域则结束
			save = false;
			// 存储答案区域
			if (saveLines.length) {
				saveLines.pop();
				saveGroup.push(saveLines);
				saveLines = [];
			}

			// 此时上一部分将作为题目
			result.title = getTitleFromPreviousLine(lines, count).join('\n');
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
		else if (line.match(/^A/) && ((line + '\n').match(/[A-J].{1,}?(?:[ \n])/g)?.length ?? 0) >= 2) {
			save = false;
			// 存储答案区域
			if (saveLines.length) {
				saveLines.pop();
				saveGroup.push(saveLines);
				saveLines = [];
			}
			result.options = ((line + '\n').match(/[A-J].+?(?:[ \n])/g) || []).map((s) => String(s).trim());

			// 此时上一部分将作为题目
			result.title = getTitleFromPreviousLine(lines, count).join('\n');
			save = true;
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
		const ANSWER_REGEXP = /([(（[{【)]\s*)([A-J]+)(\s*[】}\]）)])/;

		if (result.title.match(ANSWER_REGEXP)) {
			result.answers = (result.title.match(ANSWER_REGEXP)?.[2] || '').split('');
		}

		if (result.title) {
			if (result.answers.length) {
				result.complete = true;
			}
			results.push(result);
		}

		count++;
	}

	count = 0;

	// 如果题目提取失败，则证明答案在答案区域组中
	while (count < results.length) {
		const result = results[count];
		if (result.complete === false) {
			let i = 0;
			let answerStart = false;
			let answers: string[] = [];
			const answerArea = saveGroup[count];
			// 下一个循环
			if (!answerArea) {
				count++;
				continue;
			}
			while (i < answerArea.length) {
				const line = answerArea[i];
				if (line.includes('我的答案')) {
					// 如果已经提取出了答案，证明我的答案在正确答案后面，此时无需处理了，直接退出循环
					if (answerStart && answers.length) {
						break;
					}
				} else if (['答案', '正确答案', '标准答案', '答案解析'].some((i) => line.includes(i))) {
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

			results[count].answers = answers;
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
	while (true) {
		const previousLine = lines[index - i];
		titles.push(previousLine);
		if (previousLine.match(/^[0-9]{1,3}[:：、. ]/)) {
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
	results: (AnalysisResult & {
		/** 题目信息 */
		metadata?: QuestionMetadata & HandledQuestionMetadata;
	})[]
) {
	for (const result of results) {
		for (const item of regexps) {
			const match = result.title.match(item.regexp);

			if (match) {
				const metadata: QuestionMetadata & HandledQuestionMetadata = Object.create({});
				for (const group of item.groups) {
					metadata[group[0]] = match[group[1]];
				}
				metadata.title = result.title.replace(item.regexp, '').trim();
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
export function parse(content: string) {
	const results = analysis(content);
	const handledResults = handleQuestionMetadata(results);
	return handledResults;
}
