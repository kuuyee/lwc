# Git 工作流

## 版本概念

当我们`master`稳定并已经提供给第三方使用时，我们需要有明确的版本号，每当版本发布的时候，需要打 git tag：`v1.x.x`，这样才能持续迭代产品，做到一键回退。同理，后台最好也需要有个接口版本号概念。

## 分支命名规范

### 命名规则

### 非个人分支

- `master` 生产环境（正式使用）
- `dev` 测试环境，一般用于联调，或者提供给测试同学
- `release` 预发环境，数据于生产环境一致，一般仅作为上线前集成测试用

### 个人分支

#### 新功能

格式为：`feat/{name}_{feature-name}_[{create_time}]`，其中：

- `{name}` 为名字拼音
- `{feature-name}` 为功能名称，小写
- `{create_time}` 为时间，不需要年份，可以忽略

```bash
# 正例
feat/shisan_table_upload_0808
feat/shisan_table_upload
feat/shisan_psd_parse_0808
feat/shisan_psd_parse

# 反例
feat/lint_0808
feat/shisan_0808
psd_line_0808
feat/shisan_psdLine
```

#### bug 修复

- `fix/{name}_{bug-name}_[{create_time}]`

- `{name}` 为名字拼音
- `{bug-name}` bug 名称，小写
- `{create_time}` 时间，不需要年份，可以忽略

```bash
# 正例
fix/shisan_table_upload_0808
fix/shisan_table_upload
fix/shisan_psd_parse_0808
fix/shisan_psd_parse

# 反例
fix/lint_0808
fix/shisan_0808
psd_line_0808
fix/shisan_psdLine
```

## 工作流

初 `master`、`dev`、`release` 3 个分支固定外，当我们需要开发新的功能或者修复某一个 bug 时候，一般的流程是：

- 从 `dev` 分支切出一个特性分支，命名规则参考上方分支命名规范，然后在这个分支内进行开发：

```bash
# 确保当前在dev分支
git checkout dev

# 同步最新的dev分支代码
git pull --rebase origin dev

# 从 dev 分支切出一个特性分支，在这个分支开发你的代码
git checkou -b feat/shisan_table_upload

```

- 将代码提 push 到仓库：

```bash
# 本地提交代码
git add -A
git commit -m "feat(table): 新增表格上传功能"

# 提交到仓库
git push origin feat/shisan_table_upload
```

- 创建 pull request 请求：

当你开发的代码被提交到远程仓库对应的分支后，即可打开仓库，创建一个 pr，将目标源选择合并到`dev`分支（这一步在浏览器操作）

- 等待其他人审核或者同意合并，并在浏览器的 git 仓库进行合并操作即可

## Commit 书写规范

规范基本格式如下参考 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
<type>(<scope>): <subject>
# 空一行
<body>
```

需要注意的是，commit 中如果包含了不符合规范的信息，将会被拒绝提交。

### Type

（必填）类型必须是以下其中一种：

- feat: 新功能、新特性
- fix: 修复 Bug，可以是测试提出 bug，也可以是自测发现的 bug
- docs: 文档修改
- style: 不影响代码功能的修改
- refactor: 代码重构
- perf: 更改代码，以提高性能
- test: 新增或修正单元测试
- build: 影响项目构建或依赖项修改
- chore: 其他修改
- revert: 版本回滚
- ci: 对 CI 配置文件和脚本的更改

举个例子，当我们完成了特性代码编写，我们可以提交以下 commit message：

```bash
feat(table): 添加了上传功能
```

合并冲突时：

```bash
chore: 合并分支，解决冲突
```

### Scope

（可选）Scope 指本次提交的影响范围，可以是指定提交更改位置的任何内容。如：

```bash
feat(table): 添加了一个新功能
```

### Subject

（必填）Subject 可以填写 Commit 的描述：

- 不必首字母大写
- 不必使用句号或者句点结尾

### Body

（可选）Commit 的具体修改内容，可以多行显示。

当想对提交信息补充更详细的内容时，可以使用多个 -m 符号表示多段文本：

```bash
git commit -m "feat: 添加了上传功能" -m "其它一些说明"

# commit message
feat: 添加了上传功能

其它一些说明
```

Commit 提交规范，是一种对代码提交描述的约束。有以下好处：

- 规范化提交信息可以促进提交者提交有意义的，粒度合适的 commit
- 版本库不只是存放代码的仓库，它记录项目的开发日志，它应该要清晰表达每次提交的做了什么，这些记录应该要帮助后来者快速地阅读与了解代码，也方便其他协作者 review 代码
- 格式统一的提交信息还有助于自动化生成 CHANGELOG

### 校验工具

校验工具由 `husky` 提供，可以自行安装，一个项目只需要安装一次即可
