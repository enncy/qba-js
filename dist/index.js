(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.qba = {}));
})(this, function(exports2) {
  "use strict";
  const title_metadata_regexps = [
    {
      regexp: /(^\d{1,4})\s*[:：、.,) ]\s*[(（[【{]\s*(.{2,4}题)\s*，\s*(.+)分\s*[}】\]）)]/,
      groups: [
        ["index", 1],
        ["type", 2],
        ["score", 3]
      ]
    },
    {
      regexp: /[(（[【{]\s*(.{2,4}题)\s*，\s*(.+)分\s*[}】\]）)]/,
      groups: [
        ["type", 1],
        ["score", 2]
      ]
    },
    {
      regexp: /(^\d{1,4})\s*[:：、.,) ]\s*[(（[【{]\s*(.{2,4}题)\s*[}】\]）)]/,
      groups: [
        ["index", 1],
        ["type", 2]
      ]
    },
    {
      regexp: /[(（[【{]\s*(.{2,4})题\s*[}】\]）)]/,
      groups: [["type", 1]]
    },
    {
      regexp: /(^\d{1,4})\s*[:：、.,) ]/,
      groups: [["index", 1]]
    }
  ];
  function analysis(content) {
    var _a, _b, _c;
    const results = [];
    const lines = content.split("\n").map((l) => l.trim()).filter(String);
    let count = 0;
    let save = false;
    const saveGroup = [];
    let saveLines = [];
    while (count < lines.length) {
      const result = {
        title: "",
        options: [],
        answers: [],
        complete: false
      };
      const line = lines[count];
      const nextLine = lines[count + 1] || "";
      if (line.match(/^A/) && nextLine.match(/^B/)) {
        save = false;
        if (saveLines.length) {
          saveLines.pop();
          saveGroup.push(saveLines);
          saveLines = [];
        }
        result.title = getTitleFromPreviousLine(lines, count).join("\n");
        result.options = [line, nextLine];
        count += 2;
        let start = "B".charCodeAt(0);
        while (true) {
          const line2 = lines[count];
          if (line2 && line2.match(/^[C-J]/) && line2.charCodeAt(0) === start + 1) {
            result.options.push(line2);
            start++;
            count++;
          } else {
            count--;
            save = true;
            break;
          }
        }
      } else if (line.match(/^A/) && (((_a = (line + "\n").match(/[A-J].{1,}?(?:[ \n])/g)) == null ? void 0 : _a.length) ?? 0) >= 2) {
        save = false;
        if (saveLines.length) {
          saveLines.pop();
          saveGroup.push(saveLines);
          saveLines = [];
        }
        result.options = ((line + "\n").match(/[A-J].+?(?:[ \n])/g) || []).map((s) => String(s).trim());
        result.title = getTitleFromPreviousLine(lines, count).join("\n");
        save = true;
      } else {
        if (save) {
          saveLines.push(line);
          if (count === lines.length - 1) {
            saveGroup.push(saveLines);
          }
        }
      }
      const ANSWER_REGEXP = /([(（[{【)]\s*)([A-J]+)(\s*[】}\]）)])/;
      if (result.title.match(ANSWER_REGEXP)) {
        result.answers = (((_b = result.title.match(ANSWER_REGEXP)) == null ? void 0 : _b[2]) || "").split("");
      }
      if (result.title) {
        if (result.answers.length) {
          result.complete = true;
        }
        results.push(result);
      }
      count++;
    }
    count = 0;
    while (count < results.length) {
      const result = results[count];
      if (result.complete === false) {
        let i = 0;
        let answerStart = false;
        let answers = [];
        const answerArea = saveGroup[count];
        if (!answerArea) {
          count++;
          continue;
        }
        while (i < answerArea.length) {
          const line = answerArea[i];
          if (line.includes("我的答案")) {
            if (answerStart && answers.length) {
              break;
            }
          } else if (["答案", "正确答案", "标准答案", "答案解析"].some((i2) => line.includes(i2))) {
            if (line.match(/[A-J]{1,10}/)) {
              answers = ((_c = line.match(/[A-J]{1,10}/)) == null ? void 0 : _c[0].split("")) || [];
              break;
            }
            answerStart = true;
            answers.push(line);
          } else {
            if (answerStart) {
              answers.push(line);
            }
          }
          i++;
        }
        results[count].answers = answers;
      }
      count++;
    }
    return results;
  }
  function getTitleFromPreviousLine(lines, index) {
    let i = 1;
    const titles = [];
    while (true) {
      const previousLine = lines[index - i];
      titles.push(previousLine);
      if (previousLine.match(/^[0-9]{1,3}[:：、. ]/)) {
        break;
      }
      i++;
    }
    return titles.reverse();
  }
  function handleQuestionMetadata(results) {
    for (const result of results) {
      for (const item of title_metadata_regexps) {
        const match = result.title.match(item.regexp);
        if (match) {
          const metadata = /* @__PURE__ */ Object.create({});
          for (const group of item.groups) {
            metadata[group[0]] = match[group[1]];
          }
          metadata.title = result.title.replace(item.regexp, "").trim();
          metadata.hit_regexp = item.regexp;
          result.metadata = metadata;
          break;
        }
      }
    }
    return results;
  }
  function parse(content) {
    const results = analysis(content);
    const handledResults = handleQuestionMetadata(results);
    return handledResults;
  }
  exports2.analysis = analysis;
  exports2.handleQuestionMetadata = handleQuestionMetadata;
  exports2.parse = parse;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
