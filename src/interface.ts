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
	handled_title: string;
	/** 命中的正则表达式  */
	hit_regexp: RegExp;
};

/**
 * 题目信息解析组
 */
export type QuestionMetadataRegexpGroup = {
	regexp: RegExp;
	/** 第一个是对应的信息字段，第二个是所在的正则结果组的位置 */
	groups: [keyof QuestionMetadata, number][];
};

/**
 * 题库解析结果
 */
export type AnalysisResult = {
	title: string;
	options: string[];
	answers: string[];
	answerArea: string[];
	/** 是否解析完成 */
	complete: boolean;
};
