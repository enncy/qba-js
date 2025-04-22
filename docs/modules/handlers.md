[qba-js](../README.md) / [Exports](../modules.md) / handlers

# Namespace: handlers

## Table of contents

### Variables

- [AnswersChangeToOptionContentHandler](handlers.md#answerschangetooptioncontenthandler)
- [MultipleLineMetadataHandler](handlers.md#multiplelinemetadatahandler)
- [MyAnswerHandler](handlers.md#myanswerhandler)
- [OptionsUnknownWordHandler](handlers.md#optionsunknownwordhandler)

## Variables

### AnswersChangeToOptionContentHandler

• `Const` **AnswersChangeToOptionContentHandler**: [`Handler`](../interfaces/Handler.md)

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

[handlers/common.ts:14](https://github.com/enncy/qba-js/blob/8bc3996f29e4928a9a205635c20e50a7083d485e/src/handlers/common.ts#L14)

___

### MultipleLineMetadataHandler

• `Const` **MultipleLineMetadataHandler**: [`Handler`](../interfaces/Handler.md)

当题目序号和题目类型，题目题干不在同一行时，处理成同一行方便解析。
```
1
【单选题】
xxxx题目xxxx
```
转换成
```
1. 【单选题】xxxx题目xxxx
```

#### Defined in

[handlers/common.ts:47](https://github.com/enncy/qba-js/blob/8bc3996f29e4928a9a205635c20e50a7083d485e/src/handlers/common.ts#L47)

___

### MyAnswerHandler

• `Const` **MyAnswerHandler**: [`Handler`](../interfaces/Handler.md)

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

[handlers/my.answer.handler.ts:28](https://github.com/enncy/qba-js/blob/8bc3996f29e4928a9a205635c20e50a7083d485e/src/handlers/my.answer.handler.ts#L28)

___

### OptionsUnknownWordHandler

• `Const` **OptionsUnknownWordHandler**: [`Handler`](../interfaces/Handler.md)

从 Word 文档中复制粘贴的文本中的选项可能会带有  “● A xxx” 这样的搜进格式，而圆圈就是下方的  ， 全文删除即可得到正确的选项 “A xxx”

#### Defined in

[handlers/common.ts:56](https://github.com/enncy/qba-js/blob/8bc3996f29e4928a9a205635c20e50a7083d485e/src/handlers/common.ts#L56)
