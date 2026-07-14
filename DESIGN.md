# 深域万象 Design System

## 1. Atmosphere & Identity

这是一个明亮、克制而聚焦的电商商品图 AI 平台。主体验是左侧三项核心导航与商品图工作区：用户从商品图、场景和模特素材开始，在同一条链路里获得一组可上架的视觉资产。签名视觉是带有真实商品图层的珠光首屏，以及清晰的能力介绍与工作流。

## 2. Color

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| App canvas | `--canvas` | `#F7F8FC` | 页面底色 |
| Surface | `--surface` | `#FFFFFF` | 侧栏、卡片、弹窗 |
| Surface soft | `--surface-soft` | `#F2F3FA` | 激活导航、工作台面板 |
| Text primary | `--ink` | `#111827` | 标题、正文 |
| Text secondary | `--muted` | `#6B7280` | 说明、元信息 |
| Border | `--line` | `#E8EAF2` | 分隔线、输入框 |
| Accent | `--accent` | `#6957FF` | 当前状态、主要动作、焦点 |
| Accent deep | `--accent-deep` | `#5144E8` | hover / active |
| Accent soft | `--accent-soft` | `#F0EEFF` | 标签、选中背景 |
| Success | `--success` | `#1C9A68` | 完成状态 |
| Warning | `--warning` | `#BE7517` | 演示提醒 |

规则：紫蓝色只用于交互和当前状态；图片承担卡片的视觉重量；不在组件中引入未列出的颜色。

## 3. Typography

- Primary: `"PingFang SC", "Microsoft YaHei", Inter, system-ui, sans-serif`
- Display: 52px / 700 / 1.12，首页标题；移动端 34px。
- H1: 32px / 700 / 1.25，工作台标题。
- H2: 22px / 700 / 1.35，分区标题。
- Body: 14px / 400 / 1.55，默认文本；最小可读字号 13px。
- Caption: 12px / 500 / 1.4，元信息与工具名。

## 4. Spacing & Layout

采用 4px 基数。`--space-1` 至 `--space-8` 分别为 4、8、12、16、20、24、28、32px。桌面侧栏宽 250px，内容区最小宽度 0；首页宽屏为主叙事双栏、三项能力介绍与三步工作流，平板以下改为单列。工作台在桌面为 240px / minmax(0, 1fr) / 300px 三栏，平板以下改为单列。

## 5. Components

### Sidebar navigation
- **Structure**: logo、首页 / AI 图像 / AI 电商三项主路由、商品图上新快捷卡。
- **States**: active 使用 `--accent-soft` 和 `--accent`；hover 为淡灰表面；键盘焦点为 3px 紫色环。
- **Accessibility**: 原生 button、`aria-current=page`、44px 最小命中区域。

### Commerce feature card
- **Structure**: button > product image + capability title + concise production outcome。
- **States**: hover 上移 2px 并加深阴影；active 缩放 0.99；focus-visible 显示焦点环。
- **Accessibility**: 每张卡是具名按钮，图片为装饰以避免重复朗读。

### Commerce landing
- **Structure**: 商品图价值主张、双动作入口、带编号的商品视觉预览、三项能力介绍、三步上架工作流。
- **States**: 主动作进入对应创作工作台；次动作进入 AI 电商能力矩阵。
- **Accessibility**: 首屏语义化标题层级，所有转化动作均为原生 button。

### Catalog case studies
- **Structure**: 案例库标题、简短交付说明、箱包 / 3C / 珠宝 / 个护四张可点击案例卡；每张卡展示类目、上新目标、视觉交付与对应工作台入口。
- **States**: hover 上移 4px、商品图放大并移动箭头；active 缩放 0.99；focus-visible 使用全局焦点环。
- **Responsive**: 宽屏采用 7:5 的错列双栏，平板为等宽双栏，手机端收为单列，避免中文标题与交付清单出现孤字。

### Creation workspace
- **Structure**: left tool rail、prompt/upload stage、right settings panel、生成结果区。
- **States**: idle、has-file、generating、complete、error（仅客户端文件类型提示）。
- **Accessibility**: 可键盘触发上传、进度通过 `aria-live` 播报、所有标签与输入关联。

### Modal
- **Structure**: dialog > title + body + close button。
- **States**: open/closed；Escape 与遮罩点击关闭。
- **Accessibility**: `role=dialog`、`aria-modal=true`、焦点回到触发元素。

## 6. Motion & Interaction

- Micro: 140ms `cubic-bezier(.2,.8,.2,1)`，按钮和标签。
- Standard: 240ms `cubic-bezier(.22,1,.36,1)`，卡片、视图和弹窗。
- 只使用 `opacity`、`transform` 与 `filter` 动画。`prefers-reduced-motion` 下移除位移动效。

## 7. Depth & Surface

使用 mixed 策略：白色侧栏和卡片以 1px 柔和边线分层，只有可点击的图片卡和弹窗使用低对比蓝灰投影。圆角：12px（控件）、14px（工具卡）、18px（大面板）。

## 8. Accessibility Constraints & Accepted Debt

### Constraints

WCAG 2.2 AA：正文最小对比度 4.5:1，所有交互元素有可见焦点，所有核心流程可键盘操作，尊重 reduced motion。

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| 现网真实模型、登录和计费 API | 本地原型 | 用户要求的是可交互 HTML 移植，不包含后端凭据与服务接入 | 接入正式 API 时移除演示状态 |
