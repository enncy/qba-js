qba-js / [Exports](modules.md)

# qba

题库解析器

## 使用方法

```bash
# 下载依赖
npm install qba-js
```

```js
const qba = require('qba-js');
const content = `...题库文本...`;
console.log(qba.parse(content));
```

## 对于特定平台的试卷详情页面解析

**cx**

```js
const qba = require('qba-js');
const content = `...题库文本...`;
console.log(qba.parse(content, { handlers: [qba.CXHandler] }));
```
