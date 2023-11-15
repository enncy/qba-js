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

- [AnswersChangeToOptionContentHandler](modules.md#answerschangetooptioncontenthandler)
- [MyAnswerHandler](modules.md#myanswerhandler)
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
| `options.handlers?` | [`Handler`](interfaces/Handler.md)[] | 处理器 |
| `options.title_metadata_regexp_group?` | [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[] | 题目信息解析组 可以自定义题目信息解析组 **`Example`** 如果题目为以下的格式 ``` 1. xxxxx [多选题] ``` 则需要自定义为： ```js parse(`1. xxxxx [多选题]...`,{ title_metadata_regexp_group:[ { regexp: /(\[..题\])$/, groups: [['type', 1]] }, { regexp: /^(\d+)\./, groups: [['index', 1]] } ] }) ``` **`Default`** ```ts default_title_metadata_regexp_group ``` |

#### Returns

[`AnalysisResultWthMetadata`](interfaces/AnalysisResultWthMetadata.md)[]

#### Defined in

[index.ts:285](https://github.com/enncy/qba-js/blob/ba24dcc/src/index.ts#L285)

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

[index.ts:355](https://github.com/enncy/qba-js/blob/ba24dcc/src/index.ts#L355)

## Variables

### AnswersChangeToOptionContentHandler

• `Const` **AnswersChangeToOptionContentHandler**: [`Handler`](interfaces/Handler.md)

答案处理器
 将纯ABCD的答案转换为选项内容，并且把选项之前的字母去掉
```
answers:["A","B"]
```
转换成
```
answers:["选项1内容","选项2内容"]
```

#### Defined in

[handlers/common.ts:14](https://github.com/enncy/qba-js/blob/ba24dcc/src/handlers/common.ts#L14)

___

### MyAnswerHandler

• `Const` **MyAnswerHandler**: [`Handler`](interfaces/Handler.md)

处理带有 `我的答案` 多余字段的试卷

**`Example`**

以下内容会被处理

```txt
n. 题目区域
我的答案：
xxxxx
正确答案：
xxxxx

```

转换成

```txt
n. 题目区域
正确答案：
xxxxx
```

#### Defined in

[handlers/my.answer.handler.ts:28](https://github.com/enncy/qba-js/blob/ba24dcc/src/handlers/my.answer.handler.ts#L28)

___

### default\_title\_metadata\_regexp\_group

• `Const` **default\_title\_metadata\_regexp\_group**: [`QuestionMetadataRegexpGroup`](interfaces/QuestionMetadataRegexpGroup.md)[]

默认的题目信息解析组

#### Defined in

[regexp.ts:6](https://github.com/enncy/qba-js/blob/ba24dcc/src/regexp.ts#L6)
