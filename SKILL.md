---
name: doran-creative-web-design
description: "网页与产品界面的视觉设计和实现规范：shadcn/ui 结构层 + Canvas UI 特效层 + ThreeUI 3D 层，按 80/15/5 配比、性能预算与验收清单落地。"
whenToUse: "当任务涉及网页设计、Landing Page、官网、Dashboard、作品集、Canvas/WebGL/Three.js UI、创意前端、组件选型或视觉审查时使用。"
---

# Doran Creative Web Design

## 0. 一句话原则

先让页面**可用、可读、可维护**，再用一层特效让它“贵”，最后才用 3D 制造空间感。顺序反过来就是灾难。

“最好看”没有唯一答案，不要用主观形容词交差；给出**视觉方向 + 参考 + 可执行的结构**，并让结果通过第 8 节验收清单。

## 1. 三层架构（默认）

| 层 | 首选 | 职责 | 视觉面积 |
|---|---|---|---|
| 结构层 | shadcn/ui | 导航、表单、弹窗、表格、排版、可访问性 | 约 80% |
| 特效层 | Canvas UI | 把 DOM 当纹理，加液态、玻璃、碎裂、力场、解密 | 约 15% |
| 3D 层 | ThreeUI | 3D Hero、WebGL 背景、完整 3D 模板 | 约 5% |

硬规则：

- **同一视口最多一个全屏 GPU 特效。** 不要同时铺 Canvas UI 和 ThreeUI。
- **禁止整页包裹 WebGL / Canvas UI。** 特效只放在 Hero、CTA 或一个过渡 section。
- 80/15/5 按**视觉面积**算，不是按代码量。
- 文字可读性和交互可用性永远高于视觉冲击。

## 2. 选型决策树

1. **B2B / SaaS 后台、表单密集型** → 只用 shadcn/ui + 主题定制。不要 Canvas UI，不要 ThreeUI。
2. **产品官网 / Landing Page** → shadcn/ui + 一个 Canvas UI section（Liquid / Glass）+ 可选 ThreeUI Hero。
3. **3D 产品站 / 作品集** → ThreeUI Hero + shadcn/ui 正文；需要自定义交互时用 react-three-fiber + drei。
4. **轻量创意页 / 博客** → Paper Shaders 或 OGL，避免引入整个 Three.js。
5. **纯视觉叙事 / 艺术项目** → Three.js + Theatre.js + Lenis，接受更长的加载时间，但必须做降级。

选型时先问三个问题：**页面第一目标是什么？移动端占比多少？团队能维护到什么程度？** 答不上来就不要上 3D。

## 3. 审美规则

### 3.1 颜色

- 一个强调色 + 一套中性灰，不要第二个强调色。
- 背景不要纯 `#000` / `#fff`；用带一点色相的近黑/近白。
- 用 OKLCH 定义 token，暗色模式单独校准，不要简单反色。
- 正文对比度 ≥ 4.5:1，大字号 ≥ 3:1。

### 3.2 字体

- 最多两个字体家族：一个 display，一个正文。
- 标题收紧字距（`tracking-tight`），正文 16–18px，行高 1.6 左右。
- 不要用系统默认字体直接交付；至少选 Geist、Inter、Satoshi 之一。
- 中文站点必须检查中文字体回退，避免中英混排字重跳变。

### 3.3 间距与形状

- 8pt 间距体系；section 垂直留白桌面 96–160px，移动端 64–96px。
- 全站一个 radius 体系；按钮、卡片、输入框的圆角逻辑要一致。
- 卡片不要同时用大圆角 + 重阴影 + 渐变边框；选一个特征就够。

### 3.4 动效

- 时长 200–400ms，缓动优先 `ease-out`；不要所有元素都做动画。
- 同一屏最多两个并行动画；滚动触发的动画只播放一次。
- 必须响应 `prefers-reduced-motion`。
- 动效服务于层级和反馈，不服务于“看起来厉害”。

## 4. 实现配方

### 4.1 安装与组合

```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog badge navigation-menu sheet
npx shadcn@latest add @canvas-ui/liquid-react
npm install @designcodeio/threeui
```

Canvas UI 通过 shadcn registry 分发，和 shadcn 共用 Tailwind token、暗色模式与 radius 变量；这是它适合作为特效层的关键原因。

### 4.2 结构层：shadcn/ui

- 默认样式偏中性，好看靠主题，不靠组件本身。
- 只定一个强调色，其余用中性 token；用 tweakcn 可视化调主题后导出 CSS 变量。
- 优先用 shadcn 的语义组件（Dialog、Sheet、NavigationMenu），不要自己写一套弹窗。
- 需要表单时用 react-hook-form + zod，错误态、焦点态、禁用态必须完整。

### 4.3 特效层：Canvas UI

```tsx
import { Liquid } from "@/components/canvasui/Liquid";

export function WowSection() {
  return (
    <Liquid>
      <section className="relative mx-auto max-w-6xl px-6 py-32">
        {/* 这里放正常的 shadcn 内容，DOM 仍然可点击、文字可选中 */}
      </section>
    </Liquid>
  );
}
```

- 只包裹一个 section，不要包裹 `layout` 或整页。
- 特效开启时检查按钮点击、文本选中、输入框聚焦是否正常。
- 非 Chrome 浏览器会降级为 GPU overlay；仍要给静态渐变兜底。
- 授权是 MIT + Commons Clause：可用于商业站点，不能转售组件本身。

### 4.4 3D 层：ThreeUI / R3F

```tsx
import { AtTheHorizon } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Hero3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <AtTheHorizon />
    </div>
  );
}
```

```tsx
<main className="relative z-10">
  <h1>...</h1>
  <Button>...</Button>
</main>
```

- 3D canvas 固定为背景层，加 `pointer-events-none`，内容层 `relative z-10`。
- 首屏之外的 3D 一律 `lazy()` + `IntersectionObserver` 延迟挂载。
- R3F 用 `frameloop="demand"`，`dpr={[1, 1.5]}`，卸载时释放 WebGL context。
- ThreeUI 的 GitHub 仓库只有 Community 部分（MIT）；Pro 组件闭源付费，不要误当成全量开源。

## 5. 性能与降级

- 首屏关键路径不包含 Three.js；3D 独立 chunk 懒加载。
- 一个页面最多一个 WebGL context；不要在列表里给每个卡片开 canvas。
- 标签页隐藏或区块滚出视口时暂停渲染。
- 移动端默认关闭 3D，用静态图或 CSS 渐变替代；至少提供 `poster`。
- 字体使用 `font-display: swap`，避免 FOIT；图片给宽高，避免 CLS。
- 上线前在 4G 节流 + 中端安卓真机各跑一次。

## 6. 反模式（出现即打回）

- 整页包 WebGL / 整页包 Canvas UI。
- 同时引入 Magic UI、Aceternity、React Bits、Canvas UI 多套动效库。
- shadcn 默认样式直接上线，没有任何主题定制。
- 特效层盖住文字、按钮或表单，导致点不到。
- 移动端不降级，3D 直接吃掉首屏。
- 彩虹渐变、过量 glow、无意义粒子堆叠。
- 用 `div` 拼按钮，丢失键盘和语义。
- 只做桌面截图，不检查 375px 宽度。
- 404、空状态、加载态没有设计。
- 交付时只说“很好看”，没有验收记录。

## 7. 交付流程

1. **视觉方向**：一句话定位 + 3 个参考站 + 明确“不做什么”。
2. **Design tokens**：颜色、字体、间距、radius、动效时长，先给 token 再写页面。
3. **Section map**：每节写清目标、组件、是否使用特效/3D。
4. **实现**：默认 shadcn；只在一个 section 引入 Canvas UI；3D 只放 Hero。
5. **验收**：逐项跑第 8 节；不通过就修，不要口头声明完成。
6. **交付说明**：写清依赖、授权、降级策略和已知限制。

### 输出模板

```text
视觉方向：
参考：
Palette：--background / --foreground / --accent / --muted
Type：Display __ / Body __
Sections：
  1. Hero — ThreeUI __ + shadcn Button
  2. Features — shadcn Card
  3. Wow — Canvas UI Liquid 包裹 CTA
  4. Pricing / FAQ — shadcn
降级：移动端关闭 3D；reduced-motion 关闭 shader
```

## 8. 验收清单（必须全部通过）

- [ ] 首屏 3 秒内主标题和 CTA 可读；3D 未加载时页面不空白。
- [ ] 同一视口只有一个全屏 GPU 特效。
- [ ] 所有按钮、链接、输入框可点击/可聚焦；特效层没有拦截事件。
- [ ] 键盘 Tab 顺序合理，focus ring 可见。
- [ ] 正文对比度达到 WCAG AA；暗色模式单独检查。
- [ ] `prefers-reduced-motion` 下动效关闭或显著减弱。
- [ ] 375px / 768px / 1440px 三档无横向滚动、无文字溢出。
- [ ] 移动端 3D 降级为静态图或渐变，不加载 Three.js。
- [ ] WebGL context 在卸载/路由切换时释放，console 无报错。
- [ ] 全站颜色来自 token，没有散落的硬编码色值。
- [ ] 字体加载无闪烁，图片有宽高，CLS 可接受。
- [ ] 404、空状态、加载态、错误态都有设计。
- [ ] 依赖授权已确认（Canvas UI 的 Commons Clause、ThreeUI Pro 的闭源范围）。

## 9. 参考库

**结构 / 组件**
- shadcn/ui — https://github.com/shadcn-ui/ui
- COSS（原 Origin UI）— https://github.com/origin-space/originui
- tweakcn（shadcn 主题编辑器）— https://github.com/jnsahaj/tweakcn

**Canvas / 特效**
- Canvas UI — https://github.com/DavidHDev/canvas-ui
- Paper Shaders — https://github.com/paper-design/shaders
- OGL — https://github.com/oframe/ogl
- Curtains.js — https://github.com/martinlaxenaire/curtainsjs
- PixiJS — https://github.com/pixijs/pixijs
- Zdog — https://github.com/metafizzy/zdog

**3D / 动效**
- ThreeUI — https://github.com/MengTo/threeui
- three.js — https://github.com/mrdoob/three.js
- react-three-fiber — https://github.com/pmndrs/react-three-fiber
- drei — https://github.com/pmndrs/drei
- uikit（3D 里的 UI 布局）— https://github.com/pmndrs/uikit
- Theatre.js — https://github.com/theatre-js/theatre
- Lenis — https://github.com/darkroomengineering/lenis

**整站参考（抄气质，不抄代码）**
- Dub — https://github.com/dubinc/dub
- Twenty — https://github.com/twentyhq/twenty
- Plane — https://github.com/makeplane/plane
- Cal.com — https://github.com/calcom/cal.com
- Excalidraw — https://github.com/excalidraw/excalidraw
