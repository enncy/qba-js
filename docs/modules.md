[qba-js](README.md) / Exports

# qba-js

## Table of contents

### Functions

- [parse](modules.md#parse)
- [writeToFile](modules.md#writetofile)

### Namespaces

- [handlers](modules/handlers.md)

### Variables

- [default\_title\_metadata\_regexp\_group](modules.md#default_title_metadata_regexp_group)

### Interfaces

- [AnalysisResult](interfaces/AnalysisResult.md)
- [AnalysisResultWthMetadata](interfaces/AnalysisResultWthMetadata.md)
- [HandledQuestionMetadata](interfaces/HandledQuestionMetadata.md)
- [Handler](interfaces/Handler.md)
- [QuestionMetadata](interfaces/QuestionMetadata.md)
- [QuestionMetadataRegexpGroup](interfaces/QuestionMetadataRegexpGroup.md)

## Functions

### parse

▸ **parse**(`content`, `options?`): [`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

解析题库

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | 题库文本 |
| `options?` | `Object` | - |
| `options.handlers?` | [`Handler`](interfaces/Handler.md)[] | 处理器 - 可用的默认处理器 : [qba.handlers](modules/handlers.md) |
| `options.title_metadata_regexp_group?` | [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[] | 题目信息解析组 可以自定义题目信息解析组 **`Example`** 如果题目为以下的格式 ``` 1. xxxxx [多选题] ``` 则需要自定义为： ```js parse(`1. xxxxx [多选题]...`,{ title_metadata_regexp_group:[ { regexp: /(\[..题\])$/, groups: [['type', 1]] }, { regexp: /^(\d+)\./, groups: [['index', 1]] } ] }) ``` **`Default`** ```ts default_title_metadata_regexp_group ``` |

#### Returns

[`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

#### Defined in

[index.ts:290](https://github.com/enncy/qba-js/blob/f1a46036c23c61113167cbd0147088318d9f6b08/src/index.ts#L290)

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
| `options.answerSplit?` | `string` | 答案分隔符，当 type 为 xlsx 时有效 **`Default`** ```ts '' ``` |
| `options.optionSplit?` | `string` | 选项分隔符，当 type 为 xlsx 时有效 **`Default`** ```ts '\n' ``` |

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

[index.ts:360](https://github.com/enncy/qba-js/blob/f1a46036c23c61113167cbd0147088318d9f6b08/src/index.ts#L360)

## Variables

### default\_title\_metadata\_regexp\_group

• `Const` **default\_title\_metadata\_regexp\_group**: [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[]

默认的题目信息解析组

#### Defined in

[regexp.ts:6](https://github.com/enncy/qba-js/blob/f1a46036c23c61113167cbd0147088318d9f6b08/src/regexp.ts#L6)
