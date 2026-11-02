import { readFileSync } from 'node:fs'

export const name = 'doran-creative-web-design'
export const inject = ['skills', 'systemPrompt']

const skillBody = readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8')
  .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  .trim()

const rules = `网页 / UI 设计任务必须加载 doran-creative-web-design 技能。
结构层 / 特效层 / 3D 层分离，视觉面积约 80/15/5。
同一视口最多一个全屏 GPU 特效，禁止整页包裹 WebGL 或 Canvas UI。
文字可读性、键盘可访问性、点击可用性优先于视觉效果。
必须提供 prefers-reduced-motion 和移动端降级；移动端默认不加载 Three.js。
交付前逐项核对技能验收清单，未通过不得声称完成。`

export function apply(ctx) {
  ctx.effect(() => ctx.skills.register({
    name: 'doran-creative-web-design',
    description: '按 shadcn/ui + Canvas UI + ThreeUI 三层体系做网页设计的技能包。',
    whenToUse: '网页、Landing Page、官网、Dashboard、作品集、Canvas/WebGL/Three.js UI 任务。',
    content: skillBody,
    invocation: {
      modelInvocable: true,
      userInvocable: true
    }
  }))

  ctx.effect(() => ctx.systemPrompt.section({
    name: 'doran-creative-web-design-rules',
    order: 900,
    text: rules
  }))
}
