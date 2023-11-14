import { AnalysisResultWthMetadata, Handler } from '../interface';

/**
 * 处理带有 `我的答案` 多余字段的试卷
 *
 * @example
 *
 * 以下内容会被处理
 *
 * ```txt
 * n. 题目区域
 * 我的答案：
 * xxxxx
 * 正确答案：
 * xxxxx
 *
 * ```
 *
 * 转换成
 *
 * ```txt
 * n. 题目区域
 * 正确答案：
 * xxxxx
 * ```
 *
 */
export const MyAnswerHandler: Handler = {
	before(content: string): string {
		return content.replace(/我的答案[\s\S]+?(正确答案|标准答案|答案解析)/g, '$1');
	},
	after(results: AnalysisResultWthMetadata[]): AnalysisResultWthMetadata[] {
		return results.map((r) => {
			/**
			 * 后续处理 @see {analysis}
			 */
			const index = r.answers.findIndex((a) => a.includes('我的答案'));
			r.answers.length = index === -1 ? r.answers.length : index;
			return r;
		});
	}
};
