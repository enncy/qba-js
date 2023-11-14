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
