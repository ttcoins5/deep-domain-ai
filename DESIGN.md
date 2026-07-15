# 深域万象 Design System

## 1. Atmosphere & Identity

这是一个明亮、克制而聚焦的 AI 视觉创作平台。主体验是左侧首页与九项能力直达导航：用户从灵感、图片或商品素材开始，选择一项能力后即进入对应工作台，不需要先判断所属模块。签名视觉是带有真实外贸商品、Listing 信息卡片和 A+ Content 版式的跨境电商首屏。

影像采用统一的外贸 / Amazon 商品内容语言：亮白底、浅冷灰面板、真实商品主图、细节图、场景图、卖点卡和 A+ Content 信息块共同构成主视觉。所有案例图保持干净棚拍光、真实商品纹理、可上架的零售感和充足留白；不使用绿色瓶器、显眼品牌标识、奢侈编辑片布景、艺术静物摆件或彼此冲突的滤镜。

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

### Source workspace reference

九项能力工作台以用户提供的 `ai-product-catalog` 页面为运行时参考：56px 全局顶栏下是一张白色的双栏工作卡；左侧为可滚动的输入配置，右侧为结果预览。其可复用的工作台状态采用 `#0062FF` 作为单一主操作蓝、`#E5E7EB` 作为输入与分隔线、`#F8FAFC` 作为上传与空状态底色、`#0B0D14` 作为主要文本。主操作、比例和规划模式的选中态使用蓝底白字；未选中态为白底细灰边。

规则：紫蓝色只用于交互和当前状态；图片承担卡片的视觉重量；不在组件中引入未列出的颜色。

## 3. Typography

- Primary: `"PingFang SC", "Microsoft YaHei", Inter, system-ui, sans-serif`
- Display: 52px / 700 / 1.12，首页标题；移动端 34px。
- H1: 32px / 700 / 1.25，工作台标题。
- H2: 22px / 700 / 1.35，分区标题。
- Body: 14px / 400 / 1.55，默认文本；最小可读字号 13px。
- Caption: 12px / 500 / 1.4，元信息与工具名。

## 4. Spacing & Layout

采用 4px 基数。`--space-1` 至 `--space-8` 分别为 4、8、12、16、20、24、28、32px。桌面侧栏展开宽 220px，可收起为 76px 的图标栏，内容区最小宽度 0；首页宽屏为主叙事双栏、前置功能案例、页面底部的九项能力 3×3 平铺卡片与三步使用方式；内容区较窄时能力卡降为两列，手机端为单列。工作台在桌面为 240px / minmax(0, 1fr) / 300px 三栏，平板以下改为单列。

## 5. Components

### Sidebar navigation
- **Structure**: logo、桌面折叠控制、首页和九项能力直达按钮；能力不再分组或显示分组标题。
- **States**: active 使用 `--accent-soft` 和 `--accent`；首页后留出一个 8px 节奏间隔，再进入能力入口；hover 为淡灰表面；桌面收起后保留完整 42px 品牌图形，箭头反转；键盘焦点为 3px 紫色环。
- **Accessibility**: 原生 button、当前首页或当前工作台的入口使用 `aria-current=page`、48px 最小命中区域；折叠控制用 `aria-expanded` 和动态可访问名称说明当前动作。侧栏使用动态视口高度，并在较矮窗口自身滚动，移动端保持完整抽屉导航。

### Commerce feature card
- **Structure**: button > product image + capability title + concise production outcome。
- **States**: hover 上移 2px 并加深阴影；active 缩放 0.99；focus-visible 显示焦点环。
- **Accessibility**: 每张卡是具名按钮，图片为装饰以避免重复朗读。

### Platform landing
- **Structure**: 平台价值主张与主视觉、前置的十二张可点击瀑布流案例卡、页面底部的九项平铺能力说明卡与三步使用方式。
- **States**: 左侧九项能力和九项说明卡可直接打开相关创作工作台；案例卡打开含示例图、标签与可复制提示词的详情弹窗；首屏仅承担定位与说明。
- **Accessibility**: 首屏使用语义化标题层级；首页与全部可操作能力均为原生具名 button。

### Prompt case studies
- **Structure**: 无额外标题的十二张可点击案例卡，按照首图原始比例组成错落瀑布流；每张卡展示品牌或类目、案例名称与交付标签。详情使用统一 dialog，依序展示标题、来源与模型、标签、一张或多张完整示例图片、上方英文提示词与下方中文提示词，并提供中英文一起复制的操作。
- **States**: hover 上移 4px、图片轻微放大并移动箭头；active 缩放 0.99；点击打开详情；Escape、遮罩、关闭按钮均可关闭；复制按钮有成功与失败反馈。
- **Responsive**: 宽屏三列平衡瀑布流，平板两列，手机单列；卡片按实时高度分配到当前最短列，并在列内均匀消化余量，使多列底部尽量齐平。案例图与详情图均按原始比例完整显示，提示词保留自然换行，避免中文标题与交付清单出现孤字。

### Ecommerce imagery
- **Structure**: 首屏使用同一跨境电商素材套件；功能卡覆盖商品主图、A+ Content、虚拟模特、珠宝礼盒与 3C 详情页；人物和商品均采用无品牌、可商用的虚构主体。
- **Crop**: 核心商品保留在画面中央 60% 安全区，允许桌面横裁与手机竖向容器使用 `object-fit: cover`，不把商品关键轮廓、模特面部、信息卡片边缘贴近裁切线。
- **Consistency**: 同屏图片统一亮白背景、浅灰信息卡、柔和棚拍光与少量蓝色功能强调；案例图必须像同一个跨境电商内容系统产出，避免艺术大片、奢侈杂志或无关图库感。

### Creation workspace
- **Structure**: 每个能力均进入同一套「工作台标题栏 + 左侧滚动配置 + 右侧预览」框架。配置按上传素材、任务标题、目标平台 / 市场 / 语言、比例、创作要求、AI 分析和智能 / 自定义规划排序；右侧依次提供空状态和生成完成态。
- **States**: idle、has-file、ratio-selected、smart/custom mode、analysis-complete、generating、complete、error（仅客户端文件类型提示）。九项能力共用该状态模型，但标题、提示、默认示例、生成动作和结果说明按能力变化。
- **Responsive**: 宽屏为约 47:53 的双栏；1020px 以下将配置与预览堆叠，配置卡不再依赖页面高度；窄屏下标题栏的次要动作隐藏、比例改为三列，确保所有九项能力都可操作。
- **Accessibility**: 可键盘触发上传、进度通过 `aria-live` 播报、比例与模式选择使用原生 button 和明确的选中状态，所有标签与输入关联。

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
