import { AnalysisResultWthMetadata, Handler } from '../interface';

/**
 * CX试卷处理器
 */
export const CXHandler: Handler = {
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
