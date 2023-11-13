import { QuestionMetadataRegexpGroup } from './interface';

/**
 * 默认的题目信息解析组
 */
export const default_title_metadata_regexp_group: QuestionMetadataRegexpGroup[] = [
	{
		regexp: /(^\d{1,4})\s*[:：、.,) ]\s*[(（[【{]\s*(.{2,4}题)\s*，\s*(.+)分\s*[}】\]）)]/,
		groups: [
			['index', 1],
			['type', 2],
			['score', 3]
		]
	},
	{
		regexp: /[(（[【{]\s*(.{2,4}题)\s*，\s*(.+)分\s*[}】\]）)]/,
		groups: [
			['type', 1],
			['score', 2]
		]
	},
	{
		regexp: /(^\d{1,4})\s*[:：、.,) ]\s*[(（[【{]\s*(.{2,4}题)\s*[}】\]）)]/,
		groups: [
			['index', 1],
			['type', 2]
		]
	},
	{
		regexp: /[(（[【{]\s*(.{2,4})题\s*[}】\]）)]/,
		groups: [['type', 1]]
	},
	{
		regexp: /(^\d{1,4})\s*[:：、.,) ]/,
		groups: [['index', 1]]
	}
];
