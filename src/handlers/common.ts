import { Handler } from '../interface';

/**
 *  答案处理器
 *  将纯ABCD的答案转换为选项内容，并且把选项之前的字母去掉
 * ```
 * answers:["A","B"]
 * ```
 * 转换成
 * ```
 * answers:["选项1内容","选项2内容"]
 * ```
 */
export const AnswersChangeToOptionContentHandler: Handler = {
	after(results) {
		return results.map((result) => {
			const answers: string[] = [];
			//  必须每个答案都是单个纯英文字母，才能转换
			if (result.answers.every((a) => /^[A-J]$/.test(a))) {
				for (let index = 0; index < result.answers.length; index++) {
					const answer = result.answers[index];
					for (const option of result.options) {
						if (option.startsWith(answer)) {
							answers.push(option.replace(/^[A-J][:：.、，。 ]/, '').trim());
						}
					}
				}
				result.answers = answers;
			}
			return result;
		});
	}
};

/**
 * 当题目序号和题目类型，题目题干不在同一行时，处理成同一行方便解析。
 * ```
 * 1
 * 【单选题】
 * xxxx题目xxxx
 * ```
 * 转换成
 * ```
 * 1. 【单选题】xxxx题目xxxx
 * ```
 */
export const MultipleLineMetadataHandler: Handler = {
	before(content) {
		return content.replace(/(\d+).*?\n\s*[\[【(（{](.+?题)[})）】\]].*?\n/g, '$1. 【$2】');
	}
};

/**
 * 从 Word 文档中复制粘贴的文本中的选项可能会带有  “● A xxx” 这样的搜进格式，而圆圈就是下方的  ， 全文删除即可得到正确的选项 “A xxx”
 */
export const OptionsUnknownWordHandler: Handler = {
	before(content) {
		return content.replace(//g, '');
	}
};
