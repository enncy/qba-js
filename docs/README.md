qba-js / [Exports](modules.md)

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

## 标准题目格式

qba-js 解析时需要题库文本为 `标准题目格式` :

```
【题号】.题目类型【题目】
选项
【答案】
```
`题号` `题目` `答案` 都是必要内容，尽管表达的文本可能不同（比如答案，qbajs 可以对 “正确答案”，“标准答案”，等文本也视作“答案”）

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

## 处理特殊格式的题库文本

```js
// word 文档处理器
const DocHandler: Handler = {
	before(content) {
		return (
			content
				// 替换中文标点
				.replace(/．/g, '.')
				// word 格式问题
				.replace(/窗体底端/g, '')
				.replace(/窗体顶端/g, '')
				// 处理题目选项前面有点号的格式问题，例如: A. 选项XXX
				.replace(//g, '')
		);
	}
};
// 超星题库文本处理器
const CXQuestionBankHandler: Handler = {
	before(content) {
		const res = content
			/**
				 * 处理以下问题
				 * 	七、坚持统筹推进各领域安全
					题量: xx 满分: xxx.x
					最终成绩xx分
					重做 (剩余 x 次)
					本次成绩xx分
				 */
			.replace(/.、.+\n题量.+满分.+\n最终成绩\d+分\n重做\s*\(剩余\s*\d+\s*次\)\s*\n本次成绩\d+分/g, '')
			// 冗余问题
			.replace(/第\d+次作答\n/g, '\n')
			.replace(/必做[\s\S]+?题量.+\n/g, '\n')
			.replace(/\n专题.\n/g, '\n')
			.replace(/\n知识点.\n/g, '\n')
			.replace(/必做练习\n/g, '\n')
			// 小节问题，例如 一. 单选题（共17题）
			.replace(/.+题（共\d+题）\n/g, '\n')
			// 处理同时有我的答案和正确答案的问题
			.replace(/\n我的答案.\s*[A-Z]+\n正确答案.\s*([A-Z]+)\n/g, '\n正确答案: $1\n')
			// 答案格式
			.replace(/答案解析：P\d+/g, '')
			.replace(/正确答案为.([A-Z]+)/g, '正确答案：$1')
			.replace(/\[正确答案\]([A-Z]+)/g, '正确答案：$1')
			// 多填空问题
			.replace(/\n第一空./g, '')
			.replace(/\n第二空./g, '#')
			.replace(/\n第三空./g, '#')
			.replace(/\n第四空./g, '#')
			.replace(/\n第五空./g, '#')
			.replace(/\n第六空./g, '#')
			.replace(/\n第七空./g, '#')
			.replace(/\n第八空./g, '#')
			.replace(/\n第九空./g, '#')
			.replace(/\n第十空./g, '#')
			// 题号和题目类型分行的问题
			.replace(/\n(\d+)\n【..题】/g, '1、')
			.replace(/\n(\d+)\n【..题】\n/g, '1、')
			// 处理选项后方换行的问题
			.replace(/\n([A-Z])[.。、， ]\n/g, '$1、')
			// 处理【...专题】问题
			.replace(/[\[【】\]](.+专题)[\[【】\]]/g, '$1');
		return res;
	}
};

const results = qba.parse(content, {
	// 使用自定义处理器，吧输入内容处理成 标准题目格式
	handlers: [DocHandler, CXQuestionBankHandler].concat(Object.entries(qba.handlers).map((e) => e[1]))
})
```

## API 文档

[https://github.com/enncy/qba-js/blob/main/docs/modules.md](https://github.com/enncy/qba-js/blob/main/docs/modules.md)
