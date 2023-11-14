/**
 * 题目信息
 */
export interface QuestionMetadata {
	/** 题目类型 */
	type?: string;
	/** 题目分数 */
	score?: string;
	/** 题目索引 */
	index?: string;
}

/**
 * 处理过的题目信息
 */
export interface HandledQuestionMetadata {
	/** 处理过的题目 */
	handled_title: string;
	/** 命中的正则表达式  */
	hit_regexp: RegExp;
}

/**
 * 题目信息解析组，用于解析题目中的信息，例如题目类型、题目分数、题目索引等
 */
export interface QuestionMetadataRegexpGroup {
	/** 正则表达式 */
	regexp: RegExp;
	/**
	 * 第一个是对应的信息字段，第二个是所在的正则结果组的位置
	 * 例如: [ ['type', 1] ] 表示将正则结果组的第一个元素赋值给 type 属性
	 */
	groups: [keyof QuestionMetadata, number][];
}

/**
 * 题库解析结果
 */
export interface AnalysisResult {
	/** 题目 */
	title: string;
	/** 选项 */
	options: string[];
	/** 答案 */
	answers: string[];
	/** 答案区域 */
	answerArea: string[];
	/** 是否解析完成 */
	complete: boolean;
}

/** 解析结果 */
export interface AnalysisResultWthMetadata extends AnalysisResult {
	/** 题目信息 */
	metadata?: (QuestionMetadata & HandledQuestionMetadata) | undefined;
}

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
	before?: (content: string) => string;
	after?: (results: AnalysisResultWthMetadata[]) => AnalysisResultWthMetadata[];
}
