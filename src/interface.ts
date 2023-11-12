/**
 * 题目信息
 */
export type QuestionMetadata = {
	/** 题目类型 */
	type?: string;
	/** 题目分数 */
	score?: string;
	/** 题目索引 */
	index?: string;
};

/**
 * 处理过的题目信息
 */
export type HandledQuestionMetadata = {
	/** 处理过的题目 */
	title: string;
	/** 命中的正则表达式  */
	hit_regexp: RegExp;
};

/**
 * 题库解析结果
 */
export type AnalysisResult = {
	title: string;
	options: string[];
	answers: string[];
	/** 是否解析完成 */
	complete: boolean;
};
