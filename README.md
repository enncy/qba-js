# qba-js

题库解析器，将题库文本解析成表格或者可处理的数据

## 在线演示

[https://enncy.github.io/qba-js/](https://enncy.github.io/qba-js/)

## 引入方法

**jsdelivr-CDN引入**

```html
<script src="https://cdn.jsdelivr.net/npm/qba-js@latest/dist/index.min.js"></script>
```

**浏览器引入**

```html
<script src="./dist/index.js"></script>
```

**ES模块**

```html
<script type="module">
	import qba from './dist/index.es.js';
	// ...
</script>
```

**npm**

```bash
# 下载依赖
npm install qba-js
```

```js
// cjs nodejs 引入
const qba = require('qba-js');
// es import 引入
import qba from 'qba-js';
```

## 使用示例

```js
const content = `...题库文本...`;
const results = qba.parse(content);
console.log(results);
```

使用答案转换成内容处理器

```js
const content = `...题库文本...`;
const results = qba.parse(content, {
	handlers: [qba.handlers.AnswersChangeToOptionContentHandler]
});
console.log(results);
```

使用全部通用处理器

```js
const content = `...题库文本...`;
const results = qba.parse(content, {
	handlers: Object.entries(qba.handlers).map((e) => e[1])
});
console.log(results);
```

## API 文档

[https://github.com/enncy/qba-js/blob/main/docs/modules.md](https://github.com/enncy/qba-js/blob/main/docs/modules.md)
