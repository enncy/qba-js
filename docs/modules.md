[qba-js](README.md) / Exports

# qba-js

## Table of contents

### Functions

- [analysis](modules.md#analysis)
- [handleQuestionMetadata](modules.md#handlequestionmetadata)
- [parse](modules.md#parse)

### Interfaces

- [AnalysisResult](interfaces/AnalysisResult.md)
- [AnalysisResultWthMetadata](interfaces/AnalysisResultWthMetadata.md)
- [HandledQuestionMetadata](interfaces/HandledQuestionMetadata.md)
- [Handler](interfaces/Handler.md)
- [QuestionMetadata](interfaces/QuestionMetadata.md)
- [QuestionMetadataRegexpGroup](interfaces/QuestionMetadataRegexpGroup.md)

### Variables

- [CXHandler](modules.md#cxhandler)

## Functions

### analysis

▸ **analysis**(`content`): [`AnalysisResult`](interfaces/AnalysisResult.md)[]

题库解析

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | 题库文本 |

#### Returns

[`AnalysisResult`](interfaces/AnalysisResult.md)[]

___

### handleQuestionMetadata

▸ **handleQuestionMetadata**(`results`, `options?`): [`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

处理题目信息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | [`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[] | 解析结果 |
| `options?` | `Object` | - |
| `options.extra_title_metadata_regexp_group?` | [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md) | - |
| `options.title_metadata_regexp_group?` | [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[] | - |

#### Returns

[`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

___

### parse

▸ **parse**(`content`, `options?`): [`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

解析题库

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | 题库文本 |
| `options?` | `Object` | - |
| `options.handlers?` | [`Handler`](interfaces/Handler.md)[] | 处理器 |

#### Returns

[`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

## Variables

### CXHandler

• `Const` **CXHandler**: [`Handler`](interfaces/Handler.md)

CX试卷处理器
