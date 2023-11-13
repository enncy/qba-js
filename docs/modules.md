[qba-js](README.md) / Exports

# qba-js

## Table of contents

### Functions

- [parse](modules.md#parse)
- [writeToFile](modules.md#writetofile)

### Interfaces

- [AnalysisResult](interfaces/AnalysisResult.md)
- [AnalysisResultWthMetadata](interfaces/AnalysisResultWthMetadata.md)
- [HandledQuestionMetadata](interfaces/HandledQuestionMetadata.md)
- [Handler](interfaces/Handler.md)
- [QuestionMetadata](interfaces/QuestionMetadata.md)
- [QuestionMetadataRegexpGroup](interfaces/QuestionMetadataRegexpGroup.md)

### Variables

- [CXHandler](modules.md#cxhandler)
- [default\_title\_metadata\_regexp\_group](modules.md#default_title_metadata_regexp_group)

## Functions

### parse

▸ **parse**(`content`, `options?`): [`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

解析题库

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | 题库文本 |
| `options?` | `Object` | - |
| `options.handlers?` | [`Handler`](interfaces/Handler.md)[] | 处理器 **`See`** |
| `options.title_metadata_regexp_group?` | [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[] | 题目信息解析组 **`Default`** ```ts {@link default_title_metadata_regexp_group} ``` |

#### Returns

[`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

#### Defined in

[index.ts:272](https://github.com/enncy/qba-js/blob/6b0ea66/src/index.ts#L272)

___

### writeToFile

▸ **writeToFile**(`results`, `pathOrName`, `type`, `options?`): `void`

导出结果文件

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | [`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[] | 解析结果 |
| `pathOrName` | `string` | 文件路径或者文件名 |
| `type` | ``"json"`` \| ``"xlsx"`` \| ``"txt"`` \| ``"markdown"`` | 文件类型 |
| `options?` | `Object` | 选项 |
| `options.answerSplit?` | `string` | 答案分隔符，当 type 为 xlsx 时有效 **`Default`** ```ts '\n' ``` |
| `options.optionsSplit?` | `string` | 选项分隔符，当 type 为 xlsx 时有效 **`Default`** ```ts '\n' ``` |

#### Returns

`void`

**`Example`**

```js
const results = qba.parse('...')
// web
qba.writeToFile(results,'result.xlsx','xlsx')
// nodejs
qba.writeToFile(results,'./xxx/result.xlsx','xlsx')
```

#### Defined in

[index.ts:321](https://github.com/enncy/qba-js/blob/6b0ea66/src/index.ts#L321)

## Variables

### CXHandler

• `Const` **CXHandler**: [`Handler`](interfaces/Handler.md)

CX试卷处理器

#### Defined in

[handlers/cx.ts:6](https://github.com/enncy/qba-js/blob/6b0ea66/src/handlers/cx.ts#L6)

___

### default\_title\_metadata\_regexp\_group

• `Const` **default\_title\_metadata\_regexp\_group**: [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[]

默认的题目信息解析组

#### Defined in

[regexp.ts:6](https://github.com/enncy/qba-js/blob/6b0ea66/src/regexp.ts#L6)
