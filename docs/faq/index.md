# 常见问题

## lock 文件冲突如何解决

在合并代码的时候，可能会出现`pnpm-lock.yml`文件冲突，此时解决这个文件的冲突会非常麻烦，解决方式：

- 直接不做任何手动解决，直接合并
- 重新执行`pnpm install`，此时会生成一份新的`pnpm-lock.yml`文件，这个文件已经被合并过
- 提交代码即可

## 为什么我们需要将 prettier 与 ESLint 一起使用？

答案很简单: **prettier 格式的代码要好得多**

它从头开始删除所有格式并以一致的样式重新打印代码。这允许开发人员忘记格式化代码，而不是浪费时间在代码审查中讨论代码风格。

例如，我们有这么长的代码字符串

```js
// prettier-ignore
const example = ['1', 'long string', 'another string', 0123456789, '1', 'long string', 'another string'];
```

如果我们尝试用 ESLint 格式化这个字符串，它只会在控制台中抛出一个错误：

```js
eslint example.ts --fix

output:
error    This line has a length of 105. Maximum allowed is 80
```

这个例子表明，linter 并不总是有助于代码格式化。因此，开发人员可以根据个人考虑以不同的方式自行格式化代码。

如果我们使用 Prettier 保存并格式化文件，该字符串将被重新打印为：

```js
const example = [
  '1',
  'long string',
  'another string',
  0123456789,
  '1',
  'long string',
  'another string',
]
```

## git 修改文件名后大小写问题

git 会忽略文件名大小写修改，需要使用 `git mv` 来进行修改
