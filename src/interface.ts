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

export type AnalysisResultWthMetadata = AnalysisResult & {
	metadata?: (QuestionMetadata & HandledQuestionMetadata) | undefined;
};

/**
 * 处理器
 */
export interface Handler {
	/**
	 * 题库文本必须满足一定的格式才能被成功解析
	 * 格式:
	 *
	 * {数字}{任意分隔字符}{题目}
	 * {选项}/{答案}
	 *
	 * 如果题库文本不满足格式，则需要在此处进行处理
	 *
	 * @param content 题库文本
	 */
	before(content: string): string;
	after(results: AnalysisResultWthMetadata[]): AnalysisResultWthMetadata[];
}
