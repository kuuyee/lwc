# 代码规范

现有项目已经集成了相关的规范工具，所以这里不在详细列出，只要求能遵循项目内的代码规范配置:

- 必须使用`prettier`来进行带代码格式化，减少不必要的争论

## 为什么要使用 Prettier

- 不需要去修复 ESLint 报告的风格问题
- 保存文件的时候可以自动统一风格
- 成员不需要为规则去争论

## prettier 规则统一

```ts
module.exports = {
  /**
   * 2个缩进
   * @default 2
   */
  tabWidth: 2,

  /**
   * 超过120个字符换行
   * @default 80
   */
  printWidth: 80,

  /**
   * 使用单引号代替双引号
   * @default false
   */
  singleQuote: true,

  /**
   * 在对象或数组最后一个元素后面是否加逗号
   * @default es5
   */
  trailingComma: 'all',

  /**
   * 箭头函数参数需要有括号
   */
  arrowParens: 'always',

  /**
   * 不需要分号
   */
  semi: false,
}
```
