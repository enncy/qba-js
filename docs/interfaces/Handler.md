[qba-js](../README.md) / [Exports](../modules.md) / Handler

# Interface: Handler

处理器

## Table of contents

### Methods

- [after](Handler.md#after)
- [before](Handler.md#before)

## Methods

### after

▸ **after**(`results`): [`AnalysisResultWthMetadata`](AnalysisResultWthMetadata.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | [`AnalysisResultWthMetadata`](AnalysisResultWthMetadata.md)[] |

#### Returns

[`AnalysisResultWthMetadata`](AnalysisResultWthMetadata.md)[]

#### Defined in

[interface.ts:74](https://github.com/enncy/qba-js/blob/1365671/src/interface.ts#L74)

___

### before

▸ **before**(`content`): `string`

题库文本必须满足一定的格式才能被成功解析
格式:

{数字}{任意分隔字符}{题目}
{选项}/{答案}

如果题库文本不满足格式，则需要在此处进行处理

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | 题库文本 |

#### Returns

`string`

#### Defined in

[interface.ts:73](https://github.com/enncy/qba-js/blob/1365671/src/interface.ts#L73)
