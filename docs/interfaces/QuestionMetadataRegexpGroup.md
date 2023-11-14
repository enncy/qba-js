[qba-js](../README.md) / [Exports](../modules.md) / QuestionMetadataRegexpGroup

# Interface: QuestionMetadataRegexpGroup

题目信息解析组，用于解析题目中的信息，例如题目类型、题目分数、题目索引等

## Table of contents

### Properties

- [groups](QuestionMetadataRegexpGroup.md#groups)
- [regexp](QuestionMetadataRegexpGroup.md#regexp)

## Properties

### groups

• **groups**: [keyof [`QuestionMetadata`](QuestionMetadata.md), `number`][]

第一个是对应的信息字段，第二个是所在的正则结果组的位置
例如: [ ['type', 1] ] 表示将正则结果组的第一个元素赋值给 type 属性

#### Defined in

[interface.ts:33](https://github.com/enncy/qba-js/blob/2e7d93f/src/interface.ts#L33)

___

### regexp

• **regexp**: `RegExp`

正则表达式

#### Defined in

[interface.ts:28](https://github.com/enncy/qba-js/blob/2e7d93f/src/interface.ts#L28)
