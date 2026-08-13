export type ExerciseType = 'number' | 'choice' | 'expression'

export interface MathExercise {
  id: string
  topic: string
  difficulty: 'basic' | 'advanced'
  type: ExerciseType
  prompt: string
  /** KaTeX formula shown with the prompt */
  formula?: string
  options?: { id: string; label: string }[]
  /** number exercises: numeric answer with tolerance; choice: option id; expression: normalized string */
  answer: number | string
  tolerance?: number
  solution: string[]
}

export interface MathLesson {
  id: string
  trackId: string
  title: string
  duration: number
  prerequisites: string[]
  objectives: string[]
  intuition: string[]
  principles: { title: string; body: string; formula?: string }[]
  examples: { prompt: string; steps: string[]; answer: string }[]
  exercises: MathExercise[]
  quiz: MathExercise[]
  resources: { title: string; provider: string; url: string; kind: 'video' | 'article' }[]
  /** Optional interactive graph shown after principles */
  interactiveGraph?: {
    formula: string
    xMin: number
    xMax: number
    yMin: number
    yMax: number
    title: string
    annotations?: { x: number; label: string }[]
    fillArea?: boolean
    derivatives?: { x: number }[]
  }
  commonMistakes?: { mistake: string; correction: string }[]
  keyFormulas?: { name: string; formula: string; usage: string }[]
  detailedNotes?: string[]
}

export interface MathTrack {
  id: string
  title: string
  description: string
  order: number
}

export const mathTracks: MathTrack[] = [
  { id: 'bridge', title: '第一阶 · 高中数学衔接', description: '补齐函数、三角与代数运算的坚实基础。', order: 1 },
  { id: 'precalc', title: '第二阶 · 预备微积分', description: '极限思想与数列，为微积分铺路。', order: 2 },
  { id: 'calc1', title: '第三阶 · 一元微积分', description: '导数、微分与积分的完整旅程。', order: 3 },
  { id: 'calc2', title: '第四阶 · 多元微积分', description: '偏导数、重积分与多元极值。', order: 4 },
  { id: 'linalg', title: '第五阶 · 线性代数', description: '向量、矩阵与线性空间的结构之美。', order: 5 },
  { id: 'prob-stats', title: '第六阶 · 概率论与数理统计', description: '随机性建模、统计推断与假设检验。', order: 6 },
  { id: 'ode', title: '第七阶 · 常微分方程', description: '从变化率到方程：建模世界的动力学。', order: 7 },
]

export const mathLessons: MathLesson[] = [
  // ── 第一阶：高中数学衔接 ─────────────────────────────────────────────
  {
    id: 'bridge-functions',
    trackId: 'bridge',
    title: '函数与图像',
    duration: 40,
    prerequisites: [],
    objectives: ['理解函数的定义与三要素', '会画常见函数的图像', '掌握函数单调性与奇偶性的判断'],
    intuition: [
      '函数本质上是一台"输入—输出机器"：给定一个 x，按照固定规则产出唯一的 y。图像就是把这台机器的所有行为画在坐标系里，让规律一眼可见。',
      '单调性描述函数"上坡还是下坡"，奇偶性描述图像的对称方式——偶函数关于 y 轴对称，奇函数关于原点对称。这些几何直觉后面会成为判断极限与积分对称性的利器。',
    ],
    principles: [
      {
        title: '函数的定义',
        body: '设 A、B 是非空数集，如果按照某种对应关系 f，使集合 A 中的任意一个数 x，在集合 B 中都有唯一确定的数 y 与之对应，就称 f 为从 A 到 B 的函数。',
        formula: 'f: A \\to B,\\quad y = f(x)',
      },
      {
        title: '单调性的判定',
        body: '在区间 I 上，若任意 x₁ < x₂ 都有 f(x₁) < f(x₂)，则 f 在 I 上单调递增；反之单调递减。判断时常用作差法或（学完导数后）求导法。',
        formula: 'x_1 < x_2 \\Rightarrow f(x_1) < f(x_2) \\iff f \\text{ 单调递增}',
      },
      {
        title: '奇偶性',
        body: '定义域关于原点对称时：f(−x) = f(x) 为偶函数；f(−x) = −f(x) 为奇函数。',
        formula: 'f(-x) = f(x)\\ (\\text{偶}),\\qquad f(-x) = -f(x)\\ (\\text{奇})',
      },
    ],
    examples: [
      {
        prompt: '判断 f(x) = x³ + x 的奇偶性。',
        steps: ['计算 f(−x) = (−x)³ + (−x) = −x³ − x。', '观察 f(−x) = −(x³ + x) = −f(x)。', '定义域 ℝ 关于原点对称。'],
        answer: 'f(x) 是奇函数。',
      },
      {
        prompt: '已知 f(x + 1) = x² + 2x + 3，求 f(x) 的表达式。',
        steps: ['令 t = x + 1，则 x = t − 1。', '代入：f(t) = (t−1)² + 2(t−1) + 3。', '展开：f(t) = t² − 2t + 1 + 2t − 2 + 3。', '化简得 f(t) = t² + 2，即 f(x) = x² + 2。'],
        answer: 'f(x) = x² + 2',
      },
    ],
    exercises: [
      {
        id: 'bf-ex1', topic: 'functions', difficulty: 'basic', type: 'choice',
        prompt: '函数 f(x) = x² 在区间 [0, +∞) 上的单调性是？',
        options: [
          { id: 'a', label: '单调递增' },
          { id: 'b', label: '单调递减' },
          { id: 'c', label: '先增后减' },
          { id: 'd', label: '不单调' },
        ],
        answer: 'a',
        solution: ['任取 0 ≤ x₁ < x₂，则 x₂² − x₁² = (x₂−x₁)(x₂+x₁) > 0。', '故 f 在 [0, +∞) 单调递增。'],
      },
      {
        id: 'bf-ex2', topic: 'functions', difficulty: 'basic', type: 'number',
        prompt: '已知 f(x) = 2x + 3，求 f(4) 的值。', formula: 'f(4) = 2 \\times 4 + 3 = ?',
        answer: 11, tolerance: 0.0001,
        solution: ['直接代入：2 × 4 + 3 = 11。'],
      },
      {
        id: 'bf-ex3', topic: 'functions', difficulty: 'advanced', type: 'choice',
        prompt: '已知 f(x) 是定义在 ℝ 上的奇函数，且当 x > 0 时 f(x) = x² − 2x，则当 x < 0 时 f(x) = ？',
        options: [
          { id: 'a', label: '−x² − 2x' },
          { id: 'b', label: '−x² + 2x' },
          { id: 'c', label: 'x² + 2x' },
          { id: 'd', label: 'x² − 2x' },
        ],
        answer: 'a',
        solution: ['x < 0 时 −x > 0，f(−x) = (−x)² − 2(−x) = x² + 2x。', '由奇函数 f(x) = −f(−x) = −x² − 2x。'],
      },
      {
        id: 'bf-ex4', topic: 'functions', difficulty: 'basic', type: 'number',
        prompt: '函数 f(x) = x² − 4x + 5 在 x = 2 处取得最小值，求最小值。',
        answer: 1, tolerance: 0.0001,
        solution: ['f(2) = 4 − 8 + 5 = 1。'],
      },
      {
        id: 'bf-ex5', topic: 'functions', difficulty: 'advanced', type: 'choice',
        prompt: '下列函数中，既是偶函数又在 (0, +∞) 上单调递增的是？',
        options: [
          { id: 'a', label: 'y = x³' },
          { id: 'b', label: 'y = x²' },
          { id: 'c', label: 'y = x + 1' },
          { id: 'd', label: 'y = 1/x' },
        ],
        answer: 'b',
        solution: ['y = x² 为偶函数，在 (0, +∞) 单调递增。y = x³ 为奇函数；y = x + 1 非奇非偶；y = 1/x 在 (0, +∞) 单调递减。'],
      },
      {
        id: 'bf-ex6', topic: 'functions', difficulty: 'advanced', type: 'choice',
        prompt: '若函数 f(x) 满足 f(x+2)=f(x) 且 f(1)=3，则 f(5)=？',
        options: [
          { id: 'a', label: '3' },
          { id: 'b', label: '6' },
          { id: 'c', label: '9' },
          { id: 'd', label: '1' },
        ],
        answer: 'a',
        solution: ['f(x) 周期为 2，f(5)=f(3)=f(1)=3。'],
      },
      {
        id: 'bf-ex7', topic: 'functions', difficulty: 'basic', type: 'number',
        prompt: '已知 f(x) = x² + 1，g(x) = 2x，求 f(g(3)) 的值。',
        answer: 37, tolerance: 0.0001,
        solution: ['g(3) = 2×3 = 6。', 'f(6) = 6² + 1 = 37。'],
      },
      {
        id: 'bf-ex8', topic: 'functions', difficulty: 'advanced', type: 'expression',
        prompt: '已知 f(x − 1) = x² − 3x + 2，求 f(x) 的表达式。',
        answer: 'x^2 - x',
        solution: ['令 t = x − 1，则 x = t + 1。', 'f(t) = (t+1)² − 3(t+1) + 2 = t² + 2t + 1 − 3t − 3 + 2。', '化简得 f(t) = t² − t，即 f(x) = x² − x。'],
      },
    ],
    quiz: [
      {
        id: 'bf-q1', topic: 'functions', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x² − 1，则 f(f(1)) = ？',
        answer: -1, tolerance: 0.0001,
        solution: ['f(1) = 0，f(0) = −1。'],
      },
      {
        id: 'bf-q2', topic: 'functions', difficulty: 'basic', type: 'choice',
        prompt: '下列函数中为偶函数的是？',
        options: [
          { id: 'a', label: 'f(x) = x³' },
          { id: 'b', label: 'f(x) = cos x' },
          { id: 'c', label: 'f(x) = sin x' },
          { id: 'd', label: 'f(x) = x + 1' },
        ],
        answer: 'b',
        solution: ['cos(−x) = cos x，故为偶函数；sin 与 x³ 为奇函数，x+1 非奇非偶。'],
      },
    ],
    interactiveGraph: {
      formula: 'x*x',
      xMin: -4,
      xMax: 4,
      yMin: -1,
      yMax: 16,
      title: '拖动滑块观察 y = x² 的图像（修改公式可画其他函数）',
      annotations: [{ x: 0, label: '最低点 (0,0)' }],
    },
    detailedNotes: [
      '函数本质上是一种"映射"（mapping）：定义域中的每一个输入 x，都有且仅有一个输出 y。函数的图像是定义域与值域之间的对应关系在坐标平面上的可视化表示。',
      '函数的单调性描述了在某一区间内，函数值随自变量增大而"只增不减"或"只减不增"的规律。严格单调递增要求 x₁ < x₂ 时有 f(x₁) < f(x₂)；严格单调递减则是 f(x₁) > f(x₂)。注意单调性是针对区间而言的，一个函数可能在不同的区间具有不同的单调性。',
      '奇偶性是描述函数图像对称性的重要概念。偶函数的图像关于 y 轴对称（如 y = x², y = cos x），奇函数的图像关于原点对称（如 y = x³, y = sin x）。判断奇偶性的前提是定义域关于原点对称，否则既非奇函数也非偶函数。',
    ],
    keyFormulas: [
      { name: '函数三要素', formula: 'f: A \\to B,\\quad y = f(x)', usage: '理解函数的输入输出关系，判断一个对应关系是否是函数' },
      { name: '单调递增条件', formula: 'x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)', usage: '证明或判断函数在区间上的单调性，常用作差法或求导法' },
      { name: '奇函数判定', formula: 'f(-x) = -f(x)', usage: '验证函数是否关于原点对称。注意必须先确认定义域关于原点对称' },
      { name: '偶函数判定', formula: 'f(-x) = f(x)', usage: '验证函数是否关于 y 轴对称。偶函数的图像只需画出一半，另一半由对称得到' },
      { name: '函数复合', formula: 'f(g(x)) \\neq g(f(x)) \\ \\text{（一般）}', usage: '先计算内层函数的值，再代入外层函数。复合顺序不可随意交换' },
    ],
    commonMistakes: [
      { mistake: '把 f(x+1) 的表达式直接当作 f(x) 的表达式', correction: '需要先做变量替换。令 t = x + 1，求出 f(t) 后再把 t 换成 x。这是函数表示中最常见的错误之一' },
      { mistake: '判断单调性时只看几个离散点而非整个区间', correction: '单调性是区间上的整体性质。几个点的大小关系不足以判定单调性，需要分析导数符号或用作差法严格证明' },
      { mistake: '在判断奇偶性前忘记检查定义域是否关于原点对称', correction: '若定义域不对称（如 [0, +∞)），则函数既非奇函数也非偶函数，后续讨论无意义' },
    ],
    resources: [
      { title: '【高中数学】函数的概念与性质', provider: 'Bilibili · 一数', url: 'https://search.bilibili.com/all?keyword=%E5%87%BD%E6%95%B0%E7%9A%84%E6%A6%B5%E5%BF%B5%E4%B8%8E%E6%80%A7%E8%B4%A8', kind: 'video' },
      { title: 'Functions — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions', kind: 'video' },
    ],
  },
  {
    id: 'bridge-trig',
    trackId: 'bridge',
    title: '三角函数与恒等变换',
    duration: 45,
    prerequisites: ['bridge-functions'],
    objectives: ['掌握弧度制与单位圆', '熟记基本恒等式', '会用和差倍角公式化简'],
    intuition: [
      '三角函数是把"圆周运动"翻译成函数语言：角度是转过的弧长，sin 与 cos 是单位圆上点的纵、横坐标。理解单位圆，所有公式都水到渠成。',
      '和差角公式是三角世界的"乘法分配律"：它把复合角度拆成基本角度的组合，是化简与求值的核心工具。',
    ],
    principles: [
      {
        title: '弧度制',
        body: '长度等于半径的弧所对的圆心角为 1 弧度。π 弧度 = 180°。',
        formula: '1\\ \\text{rad} = \\frac{180^\\circ}{\\pi} \\approx 57.3^\\circ',
      },
      {
        title: '基本恒等式',
        body: '同角三角函数的基本关系由单位圆方程直接给出。',
        formula: '\\sin^2 x + \\cos^2 x = 1,\\qquad \\tan x = \\frac{\\sin x}{\\cos x}',
      },
      {
        title: '和角公式',
        body: '两角和的正弦与余弦公式，是三角化简的基石。',
        formula: '\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta',
      },
    ],
    examples: [
      {
        prompt: '求 sin 75° 的值。',
        steps: ['75° = 45° + 30°。', 'sin75° = sin45°cos30° + cos45°sin30°。', '= (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4。'],
        answer: '(√6 + √2)/4 ≈ 0.966',
      },
      {
        prompt: '已知 sin α = 1/3，α ∈ (π/2, π)，求 cos α 和 tan α。',
        steps: ['α 在第二象限，cos α < 0。', '由 sin²α + cos²α = 1 得 cos²α = 1 − 1/9 = 8/9。', 'cos α = −√(8/9) = −2√2/3。', 'tan α = sin α/cos α = (1/3)/(−2√2/3) = −1/(2√2) = −√2/4。'],
        answer: 'cos α = −2√2/3，tan α = −√2/4',
      },
    ],
    exercises: [
      {
        id: 'bt-ex1', topic: 'trigonometry', difficulty: 'basic', type: 'number',
        prompt: '把 120° 化为弧度（取 π ≈ 3.1416，结果保留三位小数）。',
        answer: 2.094, tolerance: 0.001,
        solution: ['120° × π/180° = 2π/3 ≈ 2.094。'],
      },
      {
        id: 'bt-ex2', topic: 'trigonometry', difficulty: 'basic', type: 'choice',
        prompt: '若 sin α = 3/5 且 α 为锐角，则 cos α = ？',
        options: [
          { id: 'a', label: '4/5' },
          { id: 'b', label: '3/4' },
          { id: 'c', label: '−4/5' },
          { id: 'd', label: '5/3' },
        ],
        answer: 'a',
        solution: ['cos α = √(1 − 9/25) = 4/5（锐角取正）。'],
      },
      {
        id: 'bt-ex3', topic: 'trigonometry', difficulty: 'advanced', type: 'number',
        prompt: '求 cos 15° 的值（保留三位小数）。',
        answer: 0.966, tolerance: 0.001,
        solution: ['cos15° = cos(45°−30°) = cos45°cos30° + sin45°sin30° = (√6+√2)/4 ≈ 0.966。'],
      },
      {
        id: 'bt-ex4', topic: 'trigonometry', difficulty: 'basic', type: 'number',
        prompt: '求 tan(π/4) 的值。',
        answer: 1, tolerance: 0.0001,
        solution: ['tan(π/4) = sin(π/4)/cos(π/4) = (√2/2)/(√2/2) = 1。'],
      },
      {
        id: 'bt-ex5', topic: 'trigonometry', difficulty: 'advanced', type: 'number',
        prompt: '化简 sin(π + α) + sin(π − α)。',
        answer: 0, tolerance: 0.0001,
        solution: ['sin(π + α) = −sin α，sin(π − α) = sin α，两者相加为 0。'],
      },
      {
        id: 'bt-ex6', topic: 'trigonometry', difficulty: 'advanced', type: 'choice',
        prompt: '若 sin α = 3/5 且 α ∈ (π/2, π)，则 tan α = ？',
        options: [
          { id: 'a', label: '−3/4' },
          { id: 'b', label: '3/4' },
          { id: 'c', label: '−4/3' },
          { id: 'd', label: '4/3' },
        ],
        answer: 'a',
        solution: ['α 在第二象限，cos α < 0。', 'cos α = −√(1 − 9/25) = −4/5。', 'tan α = sin α/cos α = (3/5)/(−4/5) = −3/4。'],
      },
      {
        id: 'bt-ex7', topic: 'trigonometry', difficulty: 'basic', type: 'number',
        prompt: '计算 sin²(π/6) + cos²(π/3) 的值。',
        answer: 0.5, tolerance: 0.001,
        solution: ['sin(π/6) = 1/2，cos(π/3) = 1/2。', '(1/2)² + (1/2)² = 1/4 + 1/4 = 1/2。'],
      },
      {
        id: 'bt-ex8', topic: 'trigonometry', difficulty: 'advanced', type: 'number',
        prompt: '若 tan α = 2，求 (sin α + cos α)/(sin α − cos α) 的值。',
        answer: 3, tolerance: 0.0001,
        solution: ['分子分母同除 cos α：原式 = (tan α + 1)/(tan α − 1)。', '代入 tan α = 2 得 (2+1)/(2−1) = 3。'],
      },
    ],
    quiz: [
      {
        id: 'bt-q1', topic: 'trigonometry', difficulty: 'basic', type: 'choice',
        prompt: 'sin² x + cos² x 的值恒等于？',
        options: [
          { id: 'a', label: '0' },
          { id: 'b', label: '1' },
          { id: 'c', label: '2' },
          { id: 'd', label: '与 x 有关' },
        ],
        answer: 'b',
        solution: ['由单位圆定义立得。'],
      },
      {
        id: 'bt-q2', topic: 'trigonometry', difficulty: 'basic', type: 'number',
        prompt: 'tan 45° = ？',
        answer: 1, tolerance: 0.0001,
        solution: ['tan45° = sin45°/cos45° = 1。'],
      },
    ],
    resources: [
      { title: '三角函数系统复习', provider: 'Bilibili · 一数', url: 'https://search.bilibili.com/all?keyword=%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0%20%E7%B3%BB%E7%BB%9F%E5%A4%8D%E4%B9%A0', kind: 'video' },
      { title: 'Unit circle — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/trigonometry/unit-circle-trig-func', kind: 'video' },
    ],
    interactiveGraph: {
      formula: 'Math.sin(x)',
      xMin: -6.283,
      xMax: 6.283,
      yMin: -2,
      yMax: 2,
      title: 'y = sin x 的图像：观察周期性、奇偶性与振幅',
      annotations: [
        { x: 1.571, label: 'π/2' },
        { x: 3.142, label: 'π' },
      ],
    },
    detailedNotes: [
      '三角函数源于对周期现象的数学描述。单位圆定义法将三角比推广为任意角的三角函数：角 α 的终边与单位圆的交点坐标为 (cos α, sin α)。这种定义自然地将三角函数的定义域从锐角拓展到全体实数，同时也揭示了正弦、余弦的值域为 [-1, 1]。',
      '弧度制是高等数学中处理三角函数的"自然语言"。1 弧度定义为长度等于半径的弧所对的圆心角。弧度的引入使得 sin x/x → 1（x → 0）这样的极限公式具有简洁的形式，也使得导数公式 (sin x)′ = cos x 干净无系数。',
      '三角恒等变换的核心思路是"拆角"和"统一函数名"。遇到不同角度的三角表达式，尝试将角度统一为基本角；遇到不同函数名，尝试借助平方关系和商数关系统一为正弦或余弦。',
    ],
    keyFormulas: [
      { name: '弧度与角度换算', formula: '\\pi\\ \\text{rad} = 180^\\circ', usage: '在弧度制与角度制之间切换，极限和求导中角度必须以弧度表示' },
      { name: '平方恒等式', formula: '\\sin^2 x + \\cos^2 x = 1', usage: '已知正弦求余弦（或反之）时最常用的工具。注意根据所在象限决定正负号' },
      { name: '和角公式（正弦）', formula: '\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta', usage: '将复合角拆分为已知角的和差，用于化简和求值' },
      { name: '和角公式（余弦）', formula: '\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta', usage: '注意余弦和角公式中加号对应减号，这是初学者最易出错的地方' },
      { name: '商数关系', formula: '\\tan x = \\frac{\\sin x}{\\cos x}', usage: '将正切、余切等统一为正弦和余弦处理' },
    ],
    commonMistakes: [
      { mistake: '计算 sin(x+y) 时直接写成 sin x + sin y', correction: '三角函数的和角公式不是简单的分配律。sin(α+β) = sinα cosβ + cosα sinβ' },
      { mistake: '从 sin²α+cos²α=1 推出 cos α=√(1−sin²α) 而忘记符号', correction: '开方时必须根据 α 所在象限确定正负号。如 α∈(π/2,π) 时 cos α 取负值' },
      { mistake: '在微积分计算中使用角度制而非弧度制', correction: '求导和积分中三角函数的角度必须使用弧度制。lim(x→0) sin x/x = 1 仅在 x 以弧度表示时成立' },
    ],
  },
  {
    id: 'bridge-algebra',
    trackId: 'bridge',
    title: '代数运算与不等式',
    duration: 40,
    prerequisites: ['bridge-functions'],
    objectives: ['熟练因式分解与配方', '掌握一元二次不等式解法', '理解均值不等式'],
    intuition: [
      '因式分解是把复杂多项式"拆成零件"的过程——看到结构，计算就化繁为简。配方则是把二次式写成"平方 + 常数"，最值问题立刻现形。',
      '均值不等式告诉你：和定则积有最大，积定则和有最小。它是求最值问题中性价比最高的工具。',
    ],
    principles: [
      {
        title: '配方法',
        body: '任意二次三项式都可写成完全平方与常数之和，顶点与最值一目了然。',
        formula: 'ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 + \\frac{4ac - b^2}{4a}',
      },
      {
        title: '一元二次不等式',
        body: '先求对应方程的根，再结合抛物线开口方向确定解集：大于取两边，小于取中间（a > 0 时）。',
        formula: 'ax^2+bx+c>0\\ (a>0) \\Rightarrow x<x_1 \\text{ 或 } x>x_2',
      },
      {
        title: '均值不等式',
        body: '对正数 a、b，算术平均值不小于几何平均值，当且仅当 a = b 时取等号。',
        formula: '\\frac{a+b}{2} \\ge \\sqrt{ab}\\quad (a,b>0)',
      },
    ],
    examples: [
      {
        prompt: '解不等式 x² − 5x + 6 < 0。',
        steps: ['因式分解：(x−2)(x−3) < 0。', '根为 2 和 3，抛物线开口向上。', '小于零取两根之间。'],
        answer: '2 < x < 3',
      },
      {
        prompt: '已知 a, b 均为正数且 a + b = 8，求 1/a + 1/b 的最小值。',
        steps: ['1/a + 1/b = (a + b)/(ab) = 8/(ab)。', '由均值不等式，ab ≤ ((a+b)/2)² = 16，当 a = b = 4 时取等。', '分母最大时分式最小，故 8/(ab) ≥ 8/16 = 1/2。'],
        answer: '1/2，当 a = b = 4 时取得',
      },
    ],
    exercises: [
      {
        id: 'ba-ex1', topic: 'algebra', difficulty: 'basic', type: 'choice',
        prompt: 'x² − 7x + 12 因式分解的结果是？',
        options: [
          { id: 'a', label: '(x−3)(x−4)' },
          { id: 'b', label: '(x+3)(x+4)' },
          { id: 'c', label: '(x−2)(x−6)' },
          { id: 'd', label: '(x−1)(x−12)' },
        ],
        answer: 'a',
        solution: ['3 × 4 = 12 且 3 + 4 = 7，故为 (x−3)(x−4)。'],
      },
      {
        id: 'ba-ex2', topic: 'algebra', difficulty: 'basic', type: 'number',
        prompt: '用配方法求 f(x) = x² − 6x + 13 的最小值。',
        answer: 4, tolerance: 0.0001,
        solution: ['f(x) = (x−3)² + 4，最小值为 4。'],
      },
      {
        id: 'ba-ex3', topic: 'algebra', difficulty: 'advanced', type: 'number',
        prompt: '已知 x > 0，求 x + 4/x 的最小值。',
        answer: 4, tolerance: 0.0001,
        solution: ['由均值不等式 x + 4/x ≥ 2√(x·4/x) = 4，当 x = 2 时取等。'],
      },
      {
        id: 'ba-ex4', topic: 'algebra', difficulty: 'basic', type: 'number',
        prompt: '解不等式 x² − 9 < 0。',
        answer: -3, tolerance: 0.0001,
        solution: ['x² − 9 < 0 ⇒ (x−3)(x+3) < 0 ⇒ −3 < x < 3。本题答案填左端点 −3。'],
      },
      {
        id: 'ba-ex5', topic: 'algebra', difficulty: 'advanced', type: 'number',
        prompt: '正数 x、y 满足 x + y = 8，求 xy 的最大值。',
        answer: 16, tolerance: 0.0001,
        solution: ['xy ≤ ((x+y)/2)² = 16，当 x = y = 4 时取等。'],
      },
      {
        id: 'ba-ex6', topic: 'algebra', difficulty: 'advanced', type: 'choice',
        prompt: '若 x > 0，不等式 x + 9/x ≥ k 对所有 x > 0 恒成立，则 k 的最大值是？',
        options: [
          { id: 'a', label: '6' },
          { id: 'b', label: '9' },
          { id: 'c', label: '3' },
          { id: 'd', label: '18' },
        ],
        answer: 'a',
        solution: ['由均值不等式 x + 9/x ≥ 2√(x·9/x) = 6，当 x = 3 时取等。', '故 k 的最大值为 6。'],
      },
      {
        id: 'ba-ex7', topic: 'algebra', difficulty: 'basic', type: 'number',
        prompt: '已知 a > 0, b > 0, ab = 9，求 a + b 的最小值。',
        answer: 6, tolerance: 0.0001,
        solution: ['由均值不等式：a + b ≥ 2√(ab) = 2√9 = 6，当 a = b = 3 时取等。'],
      },
      {
        id: 'ba-ex8', topic: 'algebra', difficulty: 'advanced', type: 'expression',
        prompt: '化简分式 (x² − 1)/(x + 1)，其中 x ≠ −1。',
        answer: 'x - 1',
        solution: ['x² − 1 = (x − 1)(x + 1)。', '约去公因式 x + 1，得 x − 1。'],
      },
    ],
    quiz: [
      {
        id: 'ba-q1', topic: 'algebra', difficulty: 'basic', type: 'choice',
        prompt: '不等式 x² − 4 > 0 的解集是？',
        options: [
          { id: 'a', label: 'x > 2 或 x < −2' },
          { id: 'b', label: '−2 < x < 2' },
          { id: 'c', label: 'x > 2' },
          { id: 'd', label: 'x < −2' },
        ],
        answer: 'a',
        solution: ['(x−2)(x+2) > 0，取两边。'],
      },
      {
        id: 'ba-q2', topic: 'algebra', difficulty: 'basic', type: 'number',
        prompt: '正数 a、b 满足 a + b = 10，则 ab 的最大值是？',
        answer: 25, tolerance: 0.0001,
        solution: ['ab ≤ ((a+b)/2)² = 25，a = b = 5 时取等。'],
      },
    ],
    resources: [
      { title: '基本不等式专题', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%9F%BA%E6%9C%AC%E4%B8%8D%E7%AD%89%E5%BC%8F', kind: 'video' },
      { title: 'Quadratic inequalities — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring', kind: 'article' },
    ],
    interactiveGraph: {
      formula: 'x*x - 4*x + 5',
      xMin: -1,
      xMax: 5,
      yMin: -1,
      yMax: 8,
      title: 'y = x² − 4x + 5：配方得 (x−2)² + 1，顶点在 (2,1)',
      annotations: [
        { x: 2, label: '顶点 (2,1)' },
      ],
    },
    detailedNotes: [
      '因式分解是代数运算中最基本也最重要的技能之一。其本质是"逆用乘法分配律"：将多项式写成若干个因式的乘积。常见的分解方法包括提取公因式、十字相乘法、分组分解法和公式法（平方差、完全平方等）。',
      '一元二次不等式的解法核心是"先求根，再看开口"。将不等式化为标准形式 ax²+bx+c > 0（或 < 0），解出对应方程的两个根，然后结合抛物线开口方向确定解集。口诀"大于取两边，小于取中间"仅适用于 a > 0 的情形。',
      '均值不等式（AM-GM）是一类重要的最值工具。对正数而言，算术平均 ≥ 几何平均，等号成立当且仅当各数相等。运用均值不等式求最值时，关键是构造"和定"或"积定"的条件。',
    ],
    keyFormulas: [
      { name: '配方法（一般形式）', formula: 'ax^2+bx+c = a(x+\\frac{b}{2a})^2 + \\frac{4ac-b^2}{4a}', usage: '求二次函数极值、顶点、最值，将一般式化为顶点式' },
      { name: '平方差公式', formula: 'a^2 - b^2 = (a-b)(a+b)', usage: '常用的因式分解公式，也适用于含三角、对数的表达式' },
      { name: '一元二次不等式（a>0）', formula: 'ax^2+bx+c > 0 \\Rightarrow x < x_1 \\text{ 或 } x > x_2', usage: '大于取两根之外。a<0 时两边同乘 −1 改变不等号方向' },
      { name: '均值不等式（两数）', formula: '\\frac{a+b}{2} \\ge \\sqrt{ab}\\quad (a,b>0)', usage: '求 a+b 的最小值或 ab 的最大值，前提是正数且能构造定值' },
      { name: '均值不等式（n 数）', formula: '\\frac{x_1+\\cdots+x_n}{n} \\ge \\sqrt[n]{x_1\\cdots x_n}', usage: '推广到 n 个正数的最值问题' },
    ],
    commonMistakes: [
      { mistake: '解 x²−4>0 时写 −2<x<2', correction: '大于取两边。x²−4>0 ⇔ (x−2)(x+2)>0 ⇔ x<−2 或 x>2。开口向上的抛物线大于零在两根之外' },
      { mistake: '对负数使用均值不等式', correction: '均值不等式仅适用于非负数。若题目中出现负数，需先判断是否能通过变形转化为正数问题' },
      { mistake: '因式分解不彻底，留下还可以继续分解的因子', correction: '分解后检查每个因式是否还能继续分解。例如 x⁴−1 分解为 (x²+1)(x+1)(x−1) 才算彻底' },
    ],
  },
  {
    id: 'bridge-analytic-geometry',
    trackId: 'bridge',
    title: '直线与圆的方程',
    duration: 45,
    prerequisites: ['bridge-algebra'],
    objectives: ['掌握直线的点斜式与一般式', '会用点到直线距离公式', '理解圆的标准方程与位置关系'],
    intuition: [
      '解析几何把"几何问题"翻译成"代数问题"：直线、圆这样的图形，都可以写成一个方程。于是"两线是否相交""点到线多远"统统变成解方程、算距离。',
      '斜率是直线的"性格指标"：正斜率向上走，负斜率向下走，斜率相等则平行，斜率相乘为 −1 则垂直。圆的标准方程则直接"暴露"圆心与半径。',
    ],
    principles: [
      {
        title: '直线方程',
        body: '过点 (x₁, y₁) 且斜率为 k 的直线为点斜式；展开即得一般式 Ax + By + C = 0。',
        formula: 'y - y_1 = k(x - x_1)',
      },
      {
        title: '点到直线距离',
        body: '点 (x₀, y₀) 到直线 Ax + By + C = 0 的距离公式，分子为代入绝对值，分母为系数平方和开根。',
        formula: 'd = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}',
      },
      {
        title: '圆的标准方程',
        body: '圆心 (a, b)、半径 r 的圆满足：到圆心的距离恒等于 r。',
        formula: '(x-a)^2 + (y-b)^2 = r^2',
      },
    ],
    examples: [
      {
        prompt: '求过点 (1, 2) 且斜率为 3 的直线与 x 轴的交点。',
        steps: ['点斜式：y − 2 = 3(x − 1)。', '令 y = 0：−2 = 3(x − 1) ⇒ x = 1/3。'],
        answer: '交点 (1/3, 0)',
      },
      {
        prompt: '求点 (2, 3) 到直线 3x + 4y − 8 = 0 的距离。',
        steps: ['代入距离公式：d = |3×2 + 4×3 − 8| / √(3² + 4²)。', '分子 = |6 + 12 − 8| = 10，分母 = 5。', 'd = 10/5 = 2。'],
        answer: '距离为 2',
      },
    ],
    exercises: [
      {
        id: 'baex-ex1', topic: 'analytic-geometry', difficulty: 'basic', type: 'number',
        prompt: '求点 (1, 1) 到直线 y = 0 的距离。',
        answer: 1, tolerance: 0.0001,
        solution: ['即到 x 轴的距离，|1 − 0| = 1。'],
      },
      {
        id: 'baex-ex2', topic: 'analytic-geometry', difficulty: 'basic', type: 'choice',
        prompt: '圆心 (0, 0)、半径 5 的圆的标准方程是？',
        options: [
          { id: 'a', label: 'x² + y² = 25' },
          { id: 'b', label: 'x² + y² = 5' },
          { id: 'c', label: 'x + y = 25' },
          { id: 'd', label: 'x² − y² = 25' },
        ],
        answer: 'a',
        solution: ['(x−0)² + (y−0)² = 5²，即 x² + y² = 25。'],
      },
      {
        id: 'baex-ex3', topic: 'analytic-geometry', difficulty: 'advanced', type: 'number',
        prompt: '求点 (3, 4) 到直线 x + y = 0 的距离（保留三位小数）。',
        answer: 4.95, tolerance: 0.01,
        solution: ['d = |3 + 4| / √(1 + 1) = 7/√2 ≈ 4.950。'],
      },
      {
        id: 'baex-ex4', topic: 'analytic-geometry', difficulty: 'basic', type: 'number',
        prompt: '过点 (2, 3) 斜率为 2 的直线，其 y 轴截距是？',
        answer: -1, tolerance: 0.0001,
        solution: ['y − 3 = 2(x − 2)，令 x = 0 得 y = 3 − 4 = −1。'],
      },
      {
        id: 'baex-ex5', topic: 'analytic-geometry', difficulty: 'advanced', type: 'choice',
        prompt: '直线 y = 2x + 1 与 y = 2x − 3 的关系是？',
        options: [
          { id: 'a', label: '平行' },
          { id: 'b', label: '垂直' },
          { id: 'c', label: '相交但不垂直' },
          { id: 'd', label: '重合' },
        ],
        answer: 'a',
        solution: ['两直线斜率相等（均为 2），截距不同，故平行。'],
      },
      {
        id: 'baex-ex6', topic: 'analytic-geometry', difficulty: 'basic', type: 'number',
        prompt: '圆心 (1, −2)、半径 3 的圆，其方程中 (x−1)² + (y+2)² = ？',
        answer: 9, tolerance: 0.0001,
        solution: ['半径平方 r² = 3² = 9。'],
      },
      {
        id: 'baex-ex7', topic: 'analytic-geometry', difficulty: 'advanced', type: 'number',
        prompt: '求直线 y = x 与圆 x² + y² = 2 的交点中，x 坐标的值（两交点 x 相同，取该值）。',
        answer: 1, tolerance: 0.0001,
        solution: ['代入 y = x：2x² = 2 ⇒ x² = 1 ⇒ x = ±1。取正根 x = 1。'],
      },
      {
        id: 'baex-ex8', topic: 'analytic-geometry', difficulty: 'advanced', type: 'number',
        prompt: '直线 y = x + b 与圆 x² + y² = 1 相切，求 b（取正根，保留三位小数）。',
        answer: 1.414, tolerance: 0.001,
        solution: ['相切条件：圆心到直线距离 = 半径。直线化为 x − y + b = 0。', 'd = |b|/√2 = 1 ⇒ |b| = √2 ≈ 1.414。'],
      },
    ],
    quiz: [
      {
        id: 'baex-q1', topic: 'analytic-geometry', difficulty: 'basic', type: 'choice',
        prompt: '两直线垂直的斜率条件是？',
        options: [
          { id: 'a', label: '斜率之积为 −1' },
          { id: 'b', label: '斜率相等' },
          { id: 'c', label: '斜率之积为 1' },
          { id: 'd', label: '斜率无关' },
        ],
        answer: 'a',
        solution: ['k₁·k₂ = −1 时两直线垂直（斜率存在的情形）。'],
      },
      {
        id: 'baex-q2', topic: 'analytic-geometry', difficulty: 'basic', type: 'number',
        prompt: '点 (0, 0) 到直线 3x + 4y − 5 = 0 的距离是？',
        answer: 1, tolerance: 0.0001,
        solution: ['d = |−5| / √(9+16) = 5/5 = 1。'],
      },
    ],
    interactiveGraph: {
      formula: 'Math.sqrt(Math.max(4 - (x-1)*(x-1), 0)) - 2',
      xMin: -3,
      xMax: 5,
      yMin: -5,
      yMax: 1,
      title: '上半圆 (x−1)² + (y+2)² = 4：圆心 (1,−2)、半径 2',
      annotations: [{ x: 1, label: '圆心 (1,−2)' }],
    },
    keyFormulas: [
      { name: '点斜式', formula: 'y - y_1 = k(x - x_1)', usage: '已知斜率和一点写直线方程' },
      { name: '点到直线距离', formula: 'd = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}', usage: '距离类问题的通用工具' },
      { name: '圆的标准方程', formula: '(x-a)^2 + (y-b)^2 = r^2', usage: '直接读出圆心与半径' },
    ],
    commonMistakes: [
      { mistake: '求两点连线的斜率时把 Δy/Δx 写反', correction: '斜率 = 纵坐标差 ÷ 横坐标差 = (y₂−y₁)/(x₂−x₁)，顺序要一致' },
      { mistake: '点到直线距离中分子漏掉绝对值', correction: '分子是代入后的绝对值 |Ax₀+By₀+C|，可负可正，取绝对值才是距离' },
      { mistake: '把 x² + y² + Dx + Ey + F = 0 当作标准方程直接读圆心', correction: '需先配方成 (x−a)²+(y−b)²=r² 才能读出圆心与半径' },
    ],
    detailedNotes: [
      '解析几何的核心思想是"用代数研究几何"：把图形表示为方程，几何关系（平行、垂直、相切、相交）转化为方程或不等式之间的关系。',
      '斜率不存在（竖直直线）的情形要单独处理：此时方程为 x = 常数，不能用点斜式。',
      '直线与圆的位置关系有三种：相交（距离 < 半径）、相切（距离 = 半径）、相离（距离 > 半径），都可统一用"圆心到直线的距离与半径比较"来判断。',
    ],
    resources: [
      { title: '直线与圆（解析几何入门）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E7%9B%B4%E7%BA%BF%E4%B8%8E%E5%9C%86%20%E8%A7%A3%E6%9E%90%E5%87%A0%E4%BD%95', kind: 'video' },
      { title: 'Circles — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/geometry-home/cc-geometry-circles', kind: 'video' },
    ],
  },

  {
    id: 'bridge-inequality',
    trackId: 'bridge',
    title: '不等式：性质、区间与解法',
    duration: 35,
    prerequisites: ['bridge-algebra'],
    objectives: [
      '掌握不等式的基本性质并会做等价变形',
      '会解一元一次、一元二次与分式不等式',
      '能用区间表示解集并理解含绝对值的不等式',
    ],
    intuition: [
      '不等式描述"谁更大"的关系。解不等式就是在数轴上找出所有让命题成立的自变量取值——它往往不是孤立的点，而是一整段区间，这正是"解集"的意义。',
      '一元二次不等式与二次函数图像是同一件事的两面：开口方向与零点把 x 轴分成若干段，图像在 x 轴上方的段就是 "> 0" 的解。',
      '分式不等式不能随便两边乘以分母，因为分母符号不定会改变不等号方向——这是它与等式最本质的不同。',
    ],
    principles: [
      {
        title: '不等式的基本性质',
        body: '不等式两边同加（减）同一个数，不等号方向不变；同乘（除）一个正数方向不变，同乘（除）一个负数方向反向。',
        formula: 'a < b \\iff a + c < b + c;\\quad a < b,\\ c > 0 \\Rightarrow ac < bc;\\quad c < 0 \\Rightarrow ac > bc',
      },
      {
        title: '一元二次不等式的解法',
        body: '先把右边化为 0，解对应方程得零点，再由开口方向与图像在 x 轴的上方/下方位置确定解区间。',
        formula: 'ax^2 + bx + c > 0\\ (a>0)\\iff x < x_1 \\text{ 或 } x > x_2;\\quad ax^2 + bx + c < 0 \\iff x_1 < x < x_2',
      },
      {
        title: '分式不等式与绝对值不等式',
        body: '分式不等式移项通分化为商的形式后转成整式不等式组（分母不为 0）；|f(x)| < a 等价于 −a < f(x) < a。',
        formula: '\\frac{f(x)}{g(x)} > 0 \\iff f(x)g(x) > 0,\\ g(x) \\neq 0;\\qquad |f(x)| < a \\iff -a < f(x) < a',
      },
    ],
    examples: [
      {
        prompt: '解不等式 x² − 5x + 6 < 0。',
        steps: [
          '对应方程 x² − 5x + 6 = 0 因式分解得 (x−2)(x−3) = 0，零点是 x = 2 和 x = 3。',
          'a = 1 > 0，抛物线开口向上，函数值小于 0 的部分在两根之间。',
          '所以解集为开区间 (2, 3)。',
        ],
        answer: 'x ∈ (2, 3)',
      },
      {
        prompt: '解分式不等式 (x + 1) / (x − 2) ≥ 0。',
        steps: [
          '转化为 (x+1)(x−2) ≥ 0 且 x ≠ 2。',
          '零点为 x = −1 和 x = 2，开口向上的抛物线 ≥ 0 取两根之外。',
          '但 x = 2 时分母为 0，需排除。',
          '故解集为 (−∞, −1] ∪ (2, +∞)。',
        ],
        answer: 'x ∈ (−∞, −1] ∪ (2, +∞)',
      },
    ],
    exercises: [
      {
        id: 'bi-e1', topic: 'inequality', difficulty: 'basic', type: 'choice',
        prompt: '已知 a > b，c < 0，则下列不等式正确的是？',
        options: [
          { id: 'a', label: 'ac > bc' },
          { id: 'b', label: 'ac < bc' },
          { id: 'c', label: 'ac = bc' },
          { id: 'd', label: '无法判断' },
        ],
        answer: 'b',
        solution: ['两边同乘负数 c < 0，不等号方向必须反向，故 ac < bc。'],
      },
      {
        id: 'bi-e2', topic: 'inequality', difficulty: 'basic', type: 'choice',
        prompt: '不等式 2x − 6 > 0 的解集是？',
        options: [
          { id: 'a', label: '(−∞, 3)' },
          { id: 'b', label: '(3, +∞)' },
          { id: 'c', label: '[3, +∞)' },
          { id: 'd', label: '(−∞, −3]' },
        ],
        answer: 'b',
        solution: ['移项得 2x > 6，两边除以正数 2 得 x > 3，即 (3, +∞)。'],
      },
      {
        id: 'bi-e3', topic: 'inequality', difficulty: 'advanced', type: 'choice',
        prompt: '不等式 x² − 4 ≤ 0 的解集是？',
        options: [
          { id: 'a', label: '(−∞, −2] ∪ [2, +∞)' },
          { id: 'b', label: '[−2, 2]' },
          { id: 'c', label: '(−2, 2)' },
          { id: 'd', label: 'ℝ' },
        ],
        answer: 'b',
        solution: ['方程 x² = 4 的零点为 ±2，开口向上，≤ 0 在两根之间，且端点可取，故为 [−2, 2]。'],
      },
      {
        id: 'bi-e4', topic: 'inequality', difficulty: 'advanced', type: 'number',
        prompt: '解不等式 x² − 6x + 8 > 0，其解集可写为 (−∞, a) ∪ (b, +∞)，求 a + b 的值。',
        formula: 'x^2 - 6x + 8 > 0',
        answer: 6,
        solution: ['x² − 6x + 8 = (x−2)(x−4)，零点为 2 与 4。', '开口向上，> 0 取两根之外，即 a = 2, b = 4。', '故 a + b = 6。'],
      },
    ],
    quiz: [
      {
        id: 'bi-q1', topic: 'inequality', difficulty: 'basic', type: 'choice',
        prompt: '不等式 |x| < 3 的解集是？',
        options: [
          { id: 'a', label: '(−3, 3)' },
          { id: 'b', label: '[−3, 3]' },
          { id: 'c', label: '(−∞, −3) ∪ (3, +∞)' },
          { id: 'd', label: '(−∞, 3)' },
        ],
        answer: 'a',
        solution: ['|x| < 3 等价于 −3 < x < 3，两端取不到，故为开区间 (−3, 3)。'],
      },
    ],
    resources: [
      { title: '一元二次不等式（高一数学）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E4%B8%80%E5%85%83%E4%BA%8C%E6%AC%A1%E4%B8%8D%E7%AD%89%E5%BC%8F', kind: 'video' },
      { title: 'Inequalities — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-and-inequalities', kind: 'video' },
    ],
    interactiveGraph: {
      formula: 'x^2 - 5*x + 6',
      xMin: -1,
      xMax: 6,
      yMin: -3,
      yMax: 8,
      title: 'y = x² − 5x + 6：两零点之间函数值小于 0',
      annotations: [{ x: 2, label: '零点 2' }, { x: 3, label: '零点 3' }],
      fillArea: true,
    },
    commonMistakes: [
      { mistake: '两边乘以负数时忘记变号。', correction: '乘除负数必须反向不等号，先判断系数符号再动手。' },
      { mistake: '分式不等式直接两边乘以分母。', correction: '分母符号不确定，需移项通分后转化为整式不等式组。' },
    ],
    keyFormulas: [
      { name: '二次不等式口诀', formula: '大于取两边，小于取中间', usage: 'a > 0 时解 ax² + bx + c 与 0 的关系。' },
      { name: '绝对值不等式', formula: '|f| < a ⇔ −a < f < a', usage: '含绝对值不等式的统一解法。' },
    ],
    detailedNotes: [
      '解不等式前先看最高次项系数是否为正，必要时整体乘 −1 并变号。',
      '分式不等式的解集端点：分子零点可包含，分母零点必须排除。',
    ],
  },

  {
    id: 'bridge-logic-sets',
    trackId: 'bridge',
    title: '集合与常用逻辑用语',
    duration: 35,
    prerequisites: ['bridge-algebra'],
    objectives: [
      '掌握集合的表示与交、并、补运算',
      '理解子集、真子集与集合相等的判定',
      '掌握充分、必要与充要条件的判断',
    ],
    intuition: [
      '集合是数学的"容器"：用花括号把满足某条件的事物装起来。交、并、补就像集合之间的"与、或、非"，是所有后续课程的语言基础。',
      '充分必要条件是"谁推出谁"的问题：A 推出 B，则 A 是 B 的充分条件、B 是 A 的必要条件。用集合包含关系去记：小集合推出大集合。',
      '空集是任何集合的子集，这个"小到极致"的特例经常在判定里出现，别漏掉它。',
    ],
    principles: [
      {
        title: '集合的运算',
        body: '交集取公共元素，并集取全部元素，补集是在全集中去掉 A 的元素。',
        formula: 'x \\in A \\cap B \\iff x \\in A \\land x \\in B;\\quad x \\in A \\cup B \\iff x \\in A \\lor x \\in B',
      },
      {
        title: '充分与必要条件',
        body: '若 A ⊆ B，则 x ∈ A 必然推出 x ∈ B，故 A 是 B 的充分条件，B 是 A 的必要条件。',
        formula: 'A \\subseteq B \\iff \\forall x\\ (x \\in A \\Rightarrow x \\in B)',
      },
      {
        title: '充要条件',
        body: 'A = B 时互相包含，两个方向都能推出，此时 A 是 B 的充要条件。',
        formula: 'A = B \\iff A \\subseteq B \\land B \\subseteq A',
      },
    ],
    examples: [
      {
        prompt: '设 U = {1, 2, 3, 4, 5}，A = {1, 2, 3}，B = {2, 3, 4}，求 A ∪ B 与 ∁U(A ∩ B)。',
        steps: [
          'A ∪ B 取全部元素（去重）：{1, 2, 3, 4}。',
          'A ∩ B 取公共元素：{2, 3}。',
          '∁U(A ∩ B) 是在 U 中去掉 {2, 3}：{1, 4, 5}。',
        ],
        answer: 'A ∪ B = {1, 2, 3, 4}，∁U(A ∩ B) = {1, 4, 5}',
      },
      {
        prompt: '判断 "x > 2" 是 "x > 1" 的什么条件。',
        steps: [
          '把条件看作集合：(2, +∞) ⊆ (1, +∞)。',
          'x > 2 推出 x > 1，但 x > 1 不能推出 x > 2。',
          '故 x > 2 是 x > 1 的充分不必要条件。',
        ],
        answer: '充分不必要条件',
      },
    ],
    exercises: [
      {
        id: 'bl-e1', topic: 'sets', difficulty: 'basic', type: 'choice',
        prompt: 'A = {1, 2, 3}，B = {2, 3, 4}，则 A ∩ B = ？',
        options: [
          { id: 'a', label: '{1, 2, 3, 4}' },
          { id: 'b', label: '{2, 3}' },
          { id: 'c', label: '{1, 4}' },
          { id: 'd', label: '∅' },
        ],
        answer: 'b',
        solution: ['交集取两个集合的公共元素，只有 2 和 3。'],
      },
      {
        id: 'bl-e2', topic: 'logic', difficulty: 'basic', type: 'choice',
        prompt: '"x = 0" 是 "xy = 0" 的什么条件？',
        options: [
          { id: 'a', label: '充分不必要' },
          { id: 'b', label: '必要不充分' },
          { id: 'c', label: '充要' },
          { id: 'd', label: '既不充分也不必要' },
        ],
        answer: 'a',
        solution: ['x = 0 推出 xy = 0（充分）；但 xy = 0 时可能是 y = 0 而 x ≠ 0（不必要）。'],
      },
      {
        id: 'bl-e3', topic: 'sets', difficulty: 'advanced', type: 'choice',
        prompt: '设 A = {x | x² − 1 = 0}，则 A 的子集个数是？',
        options: [
          { id: 'a', label: '2' },
          { id: 'b', label: '3' },
          { id: 'c', label: '4' },
          { id: 'd', label: '8' },
        ],
        answer: 'c',
        solution: ['A = {1, −1} 有两个元素，子集个数为 2² = 4。'],
      },
      {
        id: 'bl-e4', topic: 'sets', difficulty: 'advanced', type: 'number',
        prompt: '集合 A = {1, 2, a}，若 3 ∈ A，则 a = ？',
        answer: 3,
        solution: ['3 ∈ A 意味着 3 是 A 的元素之一，A 中只有 a 未被指定，故 a = 3。'],
      },
    ],
    quiz: [
      {
        id: 'bl-q1', topic: 'logic', difficulty: 'basic', type: 'choice',
        prompt: '设 p: x > 3，q: x > 5，则 p 是 q 的什么条件？',
        options: [
          { id: 'a', label: '充分不必要' },
          { id: 'b', label: '必要不充分' },
          { id: 'c', label: '充要' },
          { id: 'd', label: '既不充分也不必要' },
        ],
        answer: 'b',
        solution: ['(5, +∞) ⊆ (3, +∞)，x > 5 推出 x > 3，故 q 推出 p；但 p 推不出 q。所以 p 是 q 的必要不充分条件。'],
      },
    ],
    resources: [
      { title: '集合与常用逻辑用语', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E9%9B%86%E5%90%88%20%E9%80%BB%E8%BE%91%E7%94%A8%E8%AF%AD', kind: 'video' },
      { title: 'Sets — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/probability-library/probability-sample-spaces', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '忘记空集是任何集合的子集。', correction: '求子集个数或判断包含关系时，始终把 ∅ 计入。' },
      { mistake: '必要条件方向记反。', correction: '用"A 推出 B，A 充分、B 必要"的口诀定位方向。' },
    ],
    keyFormulas: [
      { name: '子集个数', formula: 'n 个元素 → 2ⁿ 个子集', usage: '集合子集/真子集计数。' },
      { name: '德摩根律', formula: '∁U(A∪B) = ∁UA ∩ ∁UB', usage: '补集与并/交的交换技巧。' },
    ],
  },

  // ── 第二阶：预备微积分 ─────────────────────────────────────────────
  {
    id: 'precalc-sequences',
    trackId: 'precalc',
    title: '数列与数学归纳法',
    duration: 45,
    prerequisites: ['bridge-algebra'],
    objectives: ['掌握等差等比数列通项与求和', '理解递推思想', '会用数学归纳法证明'],
    intuition: [
      '数列是"离散版的函数"：自变量只取正整数。等差数列每次走相同的步长，等比数列每次乘相同的倍数——它们分别是线性增长与指数增长的离散化身。',
      '数学归纳法像推倒多米诺骨牌：验证第一块会倒，再证明"前一块倒则后一块必倒"，于是所有骨牌都会倒。',
    ],
    principles: [
      {
        title: '等差数列',
        body: '公差为 d 的等差数列，通项与前 n 项和都有简洁公式。',
        formula: 'a_n = a_1 + (n-1)d,\\qquad S_n = \\frac{n(a_1 + a_n)}{2}',
      },
      {
        title: '等比数列',
        body: '公比为 q（q ≠ 1）的等比数列求和公式是级数理论的起点。',
        formula: 'a_n = a_1 q^{n-1},\\qquad S_n = a_1\\frac{1-q^n}{1-q}',
      },
      {
        title: '数学归纳法',
        body: '证明对一切正整数 n 成立的命题 P(n)：①验证 P(1) 成立；②假设 P(k) 成立，推出 P(k+1) 成立。',
        formula: 'P(1) \\land \\big(P(k) \\Rightarrow P(k+1)\\big) \\Rightarrow \\forall n,\\ P(n)',
      },
    ],
    examples: [
      {
        prompt: '用归纳法证明 1 + 2 + … + n = n(n+1)/2。',
        steps: ['n = 1 时左边 = 1 = 右边，成立。', '假设 n = k 时成立，即和为 k(k+1)/2。', 'n = k+1 时，和 = k(k+1)/2 + (k+1) = (k+1)(k+2)/2，成立。'],
        answer: '由归纳法，命题对一切正整数 n 成立。',
      },
      {
        prompt: '用归纳法证明前 n 个正奇数之和等于 n²：1 + 3 + 5 + … + (2n−1) = n²。',
        steps: ['n = 1 时：左边 = 1 = 1²，成立。', '假设 n = k 时成立：1+3+…+(2k−1) = k²。', 'n = k+1 时：左边 = k² + (2(k+1)−1) = k² + 2k + 1 = (k+1)²。', '由归纳法，命题对一切正整数 n 成立。'],
        answer: '前 n 个正奇数之和为 n²。',
      },
    ],
    exercises: [
      {
        id: 'ps-ex1', topic: 'sequences', difficulty: 'basic', type: 'number',
        prompt: '等差数列首项为 2，公差为 3，第 10 项是？',
        answer: 29, tolerance: 0.0001,
        solution: ['a₁₀ = 2 + 9 × 3 = 29。'],
      },
      {
        id: 'ps-ex2', topic: 'sequences', difficulty: 'basic', type: 'number',
        prompt: '等比数列首项为 1，公比为 2，前 8 项和是？',
        answer: 255, tolerance: 0.0001,
        solution: ['S₈ = (2⁸ − 1)/(2 − 1) = 255。'],
      },
      {
        id: 'ps-ex3', topic: 'sequences', difficulty: 'advanced', type: 'choice',
        prompt: '数列满足 a₁ = 1，aₙ₊₁ = 2aₙ + 1，则 a₅ = ？',
        options: [
          { id: 'a', label: '31' },
          { id: 'b', label: '15' },
          { id: 'c', label: '32' },
          { id: 'd', label: '63' },
        ],
        answer: 'a',
        solution: ['逐项：1, 3, 7, 15, 31。也可由 aₙ + 1 = 2ⁿ 得 aₙ = 2ⁿ − 1。'],
      },
      {
        id: 'ps-ex4', topic: 'sequences', difficulty: 'basic', type: 'number',
        prompt: '等差数列 3, 7, 11, ... 的前 10 项和是？',
        answer: 210, tolerance: 0.0001,
        solution: ['a₁=3, d=4，a₁₀=3+9×4=39，S₁₀=10×(3+39)/2=210。'],
      },
      {
        id: 'ps-ex5', topic: 'sequences', difficulty: 'advanced', type: 'number',
        prompt: '无穷等比数列 1, 1/2, 1/4, ... 的和是？',
        answer: 2, tolerance: 0.0001,
        solution: ['S = a₁/(1−q) = 1/(1−1/2) = 2。'],
      },
      {
        id: 'ps-ex6', topic: 'sequences', difficulty: 'advanced', type: 'choice',
        prompt: '等差数列中 a₃ = 7，a₇ = 19，则公差 d = ？',
        options: [
          { id: 'a', label: '3' },
          { id: 'b', label: '4' },
          { id: 'c', label: '2' },
          { id: 'd', label: '6' },
        ],
        answer: 'a',
        solution: ['a₇ − a₃ = 4d = 12 ⇒ d = 3。'],
      },
      {
        id: 'ps-ex7', topic: 'sequences', difficulty: 'basic', type: 'number',
        prompt: '求等差数列 2, 5, 8, ... 的前 20 项和。',
        answer: 610, tolerance: 0.0001,
        solution: ['a₁ = 2，d = 3，a₂₀ = 2 + 19×3 = 59。', 'S₂₀ = 20×(2+59)/2 = 610。'],
      },
      {
        id: 'ps-ex8', topic: 'sequences', difficulty: 'advanced', type: 'expression',
        prompt: '数列满足 a₁ = 1，aₙ₊₁ = aₙ + 2n + 1，求通项 aₙ 的表达式。',
        answer: 'n^2',
        solution: ['写出前几项：a₁ = 1，a₂ = 1+3 = 4，a₃ = 4+5 = 9，a₄ = 9+7 = 16。', '猜测 aₙ = n²。', '验证：n² + 2n + 1 = (n+1)²，递推成立。'],
      },
    ],
    quiz: [
      {
        id: 'ps-q1', topic: 'sequences', difficulty: 'basic', type: 'number',
        prompt: '1 + 3 + 5 + … + 99（前 50 个奇数之和）= ？',
        answer: 2500, tolerance: 0.0001,
        solution: ['前 n 个奇数之和为 n²，n = 50 时为 2500。'],
      },
      {
        id: 'ps-q2', topic: 'sequences', difficulty: 'basic', type: 'choice',
        prompt: '数学归纳法的第一步是？',
        options: [
          { id: 'a', label: '验证 n = 1（起点）成立' },
          { id: 'b', label: '假设 n = k 成立' },
          { id: 'c', label: '证明 n = k+1 成立' },
          { id: 'd', label: '对所有 n 同时验证' },
        ],
        answer: 'a',
        solution: ['先验证基础情形，再做归纳递推。'],
      },
    ],
    resources: [
      { title: '数列通项与求和专题', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%95%B0%E5%88%97%E9%80%9A%E9%A1%B9%E6%B1%82%E5%92%8C', kind: 'video' },
      { title: 'Sequences — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:series', kind: 'video' },
    ],
    detailedNotes: [
      '数列本质上是定义在正整数集上的函数 aₙ = f(n)。与连续函数不同，数列只在离散的整数点上取值。等差和等比数列是两种最基本的数列类型，分别对应线性增长和指数增长的离散形式。',
      '数学归纳法是证明关于正整数命题的最强大工具。它由两步组成：(1) 验证基础情形 n=1（或某个初始值）成立；(2) 假设 n=k 时命题成立，推导 n=k+1 时也成立。两步缺一不可——没有第一步，多米诺骨牌不会开始倒下；没有第二步，骨牌不会传递。',
      '递推数列（如 aₙ₊₁ = paₙ + q 型）的处理思路是"化为等比"或"找不动点"。对于形如 aₙ₊₁ = aₙ + f(n) 的累加型递推，可以通过逐项相加找到通项公式。',
    ],
    keyFormulas: [
      { name: '等差数列通项', formula: 'a_n = a_1 + (n-1)d', usage: '已知首项 a₁ 和公差 d，求第 n 项；或由已知两项反求公差' },
      { name: '等差数列求和', formula: 'S_n = \\frac{n(a_1 + a_n)}{2}', usage: '梯形公式的离散版：首尾相加乘项数除二' },
      { name: '等比数列通项', formula: 'a_n = a_1 q^{n-1}', usage: '已知首项 a₁ 和公比 q，求第 n 项。注意 q=1 时退化为常数列' },
      { name: '等比数列求和 (q≠1)', formula: 'S_n = a_1\\frac{1-q^n}{1-q}', usage: '利用"乘 q 相减"推导，注意分母不能为零' },
      { name: '数学归纳法逻辑', formula: 'P(1) \\land [P(k) \\Rightarrow P(k+1)] \\Rightarrow \\forall n\\ P(n)', usage: '验证基础 + 归纳递推 = 对所有正整数成立' },
    ],
    commonMistakes: [
      { mistake: '等比数列求和时分母写为 1−q 但实际 q>1 时代入公式结果正确但易混淆', correction: '使用 S_n = a₁(qⁿ−1)/(q−1) 与 S_n = a₁(1−qⁿ)/(1−q) 是等价的，选择哪个取决于 q>1 还是 q<1 便于计算' },
      { mistake: '数学归纳法只做归纳步骤，忘记验证 n=1 的基础情形', correction: '没有基础情形（奠基），归纳推理就像悬在半空。必须确保第一步自身成立，后续的"推倒"才有意义' },
      { mistake: '把递推式 aₙ₊₁ = 2aₙ + 1 直接写成 aₙ = 2ⁿ − 1 而不加验证', correction: '需要先观察模式或解特征方程。对于此类线性递推，可设 aₙ + c = 2(aₙ₋₁ + c)，解得 c = 1 后化为等比数列' },
    ],
  },
  {
    id: 'precalc-limits',
    trackId: 'precalc',
    title: '极限的思想',
    duration: 50,
    prerequisites: ['precalc-sequences'],
    objectives: ['建立极限的直观理解', '会计算基本极限', '理解连续与两个重要极限'],
    intuition: [
      '极限不问"到达没有"，只问"无限接近什么"。就像你永远走不完与墙之间的一半又一半，但你清楚地知道目标是那堵墙。',
      '两个重要极限 sin x/x → 1 与 (1+1/n)ⁿ → e 是微积分的两根支柱：前者撑起三角函数的求导，后者定义了自然常数 e。',
    ],
    principles: [
      {
        title: '极限的直观定义',
        body: '当 x 无限接近 a 时，若 f(x) 无限接近常数 L，则称 L 为 f(x) 在 x → a 时的极限。',
        formula: '\\lim_{x \\to a} f(x) = L',
      },
      {
        title: '极限运算法则',
        body: '和、差、积、商（分母极限非零）的极限等于极限的和、差、积、商，可逐项计算。',
        formula: '\\lim [f(x) \\pm g(x)] = \\lim f(x) \\pm \\lim g(x)',
      },
      {
        title: '两个重要极限',
        body: '三角与指数的两个基准极限，务必熟记。',
        formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1,\\qquad \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e',
      },
    ],
    examples: [
      {
        prompt: '求 lim(x→2) (x² − 4)/(x − 2)。',
        steps: ['直接代入得 0/0，需要化简。', '分子因式分解：(x−2)(x+2)/(x−2) = x + 2。', '代入 x = 2 得 4。'],
        answer: '4',
      },
      {
        prompt: '求 lim(x→0) (1 − cos x)/x²。',
        steps: ['直接代入得 0/0 型。', '利用三角恒等式 1−cos x = 2sin²(x/2)。', '原式 = lim 2sin²(x/2)/x² = lim 2·[sin(x/2)/(x/2)]²·(1/4)。', '= 2·1²·(1/4) = 1/2。'],
        answer: '1/2',
      },
    ],
    exercises: [
      {
        id: 'pl-ex1', topic: 'limits', difficulty: 'basic', type: 'number',
        prompt: '求 lim(x→0) sin x / x 的值。',
        answer: 1, tolerance: 0.0001,
        solution: ['第一重要极限，值为 1。'],
      },
      {
        id: 'pl-ex2', topic: 'limits', difficulty: 'basic', type: 'number',
        prompt: '求 lim(x→3) (2x + 1) 的值。',
        answer: 7, tolerance: 0.0001,
        solution: ['多项式连续，直接代入：2×3+1 = 7。'],
      },
      {
        id: 'pl-ex3', topic: 'limits', difficulty: 'advanced', type: 'number',
        prompt: '求 lim(x→∞) (3x² + x) / (x² + 5) 的值。',
        answer: 3, tolerance: 0.0001,
        solution: ['分子分母同除 x²：(3 + 1/x)/(1 + 5/x²) → 3。'],
      },
      {
        id: 'pl-ex4', topic: 'limits', difficulty: 'basic', type: 'number',
        prompt: '求 lim(x→0) (x² + 3x)/x。',
        answer: 3, tolerance: 0.0001,
        solution: ['(x² + 3x)/x = x + 3 → 3（x→0）。'],
      },
      {
        id: 'pl-ex5', topic: 'limits', difficulty: 'advanced', type: 'choice',
        prompt: '数列 aₙ = (1 + 1/n)ⁿ 当 n→∞ 时的极限是？',
        options: [
          { id: 'a', label: 'e' },
          { id: 'b', label: '1' },
          { id: 'c', label: '0' },
          { id: 'd', label: '∞' },
        ],
        answer: 'a',
        solution: ['第二重要极限：lim(1 + 1/n)ⁿ = e。'],
      },
      {
        id: 'pl-ex6', topic: 'limits', difficulty: 'basic', type: 'number',
        prompt: '求 lim(x→1) (x² + x − 2)/(x − 1) 的值。',
        answer: 3, tolerance: 0.0001,
        solution: ['分子因式分解：(x−1)(x+2)/(x−1) = x+2（x≠1）。', '代入 x=1 得 3。'],
      },
      {
        id: 'pl-ex7', topic: 'limits', difficulty: 'advanced', type: 'choice',
        prompt: 'lim(x→0) (eˣ − 1)/x 的值是？',
        options: [
          { id: 'a', label: '1' },
          { id: 'b', label: 'e' },
          { id: 'c', label: '0' },
          { id: 'd', label: '不存在' },
        ],
        answer: 'a',
        solution: ['这是 eˣ 在 x=0 处的导数定义，等价于重要极限变体，值为 1。'],
      },
      {
        id: 'pl-ex8', topic: 'limits', difficulty: 'advanced', type: 'expression',
        prompt: '求 lim(x→0⁺) (|x|/x) 的值（右极限）。',
        answer: '1',
        solution: ['x > 0 时 |x| = x，故 |x|/x = 1，右极限为 1。'],
      },
    ],
    quiz: [
      {
        id: 'pl-q1', topic: 'limits', difficulty: 'basic', type: 'number',
        prompt: 'lim(x→0) tan x / x = ？',
        answer: 1, tolerance: 0.0001,
        solution: ['tan x / x = (sin x / x)·(1/cos x) → 1×1 = 1。'],
      },
      {
        id: 'pl-q2', topic: 'limits', difficulty: 'basic', type: 'choice',
        prompt: '函数在某点极限存在，是该点连续的？',
        options: [
          { id: 'a', label: '必要不充分条件' },
          { id: 'b', label: '充分不必要条件' },
          { id: 'c', label: '充要条件' },
          { id: 'd', label: '无关条件' },
        ],
        answer: 'a',
        solution: ['连续要求极限存在且等于函数值，故极限存在是必要不充分条件。'],
      },
    ],
    interactiveGraph: {
      formula: '(x*x-4)/(x-2)',
      xMin: -1,
      xMax: 5,
      yMin: -1,
      yMax: 7,
      title: '观察 y = (x²−4)/(x−2)：x=2 处有可去间断点，极限为 4',
      annotations: [{ x: 2, label: 'x=2 处无定义，但极限=4' }],
    },
    resources: [
      { title: '极限的概念（高数入门）', provider: 'Bilibili · 宋浩老师', url: 'https://search.bilibili.com/all?keyword=%E5%AE%8B%E6%B5%A9%20%E6%9E%81%E9%99%90', kind: 'video' },
      { title: 'Limits and continuity — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new', kind: 'video' },
    ],
  },
  {
    id: 'precalc-exp-log',
    trackId: 'precalc',
    title: '指数与对数函数',
    duration: 40,
    prerequisites: ['bridge-functions'],
    objectives: ['理解指数函数的爆炸式增长', '掌握对数运算法则', '会用换底公式'],
    intuition: [
      '指数函数描述"利滚利"式的增长：每一步都把当前总量乘上固定倍数。对数则是它的逆运算——回答"要乘多少次才能达到目标"。',
      '对数把乘法变成加法、把幂变成乘法，这把"运算降一级"的特性，让它成为处理大数与增长问题的瑞士军刀。',
    ],
    principles: [
      {
        title: '指数函数',
        body: 'a > 0 且 a ≠ 1 时，y = aˣ 过定点 (0,1)；a > 1 单调递增，0 < a < 1 单调递减。',
        formula: 'y = a^x \\quad (a>0,\\ a \\ne 1)',
      },
      {
        title: '对数运算法则',
        body: '积的对数等于对数之和，幂的对数等于指数乘对数。',
        formula: '\\log_a(MN) = \\log_a M + \\log_a N,\\quad \\log_a M^k = k\\log_a M',
      },
      {
        title: '换底公式',
        body: '任何底的对数都可以换算成常用底（如 e 或 10）的比值。',
        formula: '\\log_a b = \\frac{\\ln b}{\\ln a}',
      },
    ],
    examples: [
      {
        prompt: '计算 log₂ 8 + log₃ 27。',
        steps: ['8 = 2³，故 log₂ 8 = 3。', '27 = 3³，故 log₃ 27 = 3。', '合计 6。'],
        answer: '6',
      },
      {
        prompt: '解方程 2ˣ⁺¹ = 32。',
        steps: ['32 = 2⁵。', '方程化为 2ˣ⁺¹ = 2⁵。', '指数相等：x + 1 = 5。', 'x = 4。'],
        answer: 'x = 4',
      },
    ],
    exercises: [
      {
        id: 'pe-ex1', topic: 'exponentials', difficulty: 'basic', type: 'number',
        prompt: '计算 log₂ 32 的值。',
        answer: 5, tolerance: 0.0001,
        solution: ['32 = 2⁵。'],
      },
      {
        id: 'pe-ex2', topic: 'exponentials', difficulty: 'basic', type: 'choice',
        prompt: '函数 y = 2ˣ 的图像必过哪个定点？',
        options: [
          { id: 'a', label: '(0, 1)' },
          { id: 'b', label: '(1, 0)' },
          { id: 'c', label: '(0, 0)' },
          { id: 'd', label: '(1, 1)' },
        ],
        answer: 'a',
        solution: ['2⁰ = 1，故过 (0,1)。'],
      },
      {
        id: 'pe-ex3', topic: 'exponentials', difficulty: 'advanced', type: 'number',
        prompt: '已知 ln 2 ≈ 0.693，用换底公式求 log₂ 10（保留两位小数）。',
        answer: 3.32, tolerance: 0.01,
        solution: ['log₂ 10 = ln 10 / ln 2 ≈ 2.303 / 0.693 ≈ 3.32。'],
      },
      {
        id: 'pe-ex4', topic: 'exponentials', difficulty: 'basic', type: 'number',
        prompt: '计算 2³ × 2⁴。',
        answer: 128, tolerance: 0.0001,
        solution: ['2³ × 2⁴ = 2⁷ = 128。'],
      },
      {
        id: 'pe-ex5', topic: 'exponentials', difficulty: 'advanced', type: 'number',
        prompt: '若 eˣ = 5，求 x（保留两位小数）。',
        answer: 1.61, tolerance: 0.01,
        solution: ['x = ln 5 ≈ 1.609，保留两位小数 1.61。'],
      },
      {
        id: 'pe-ex6', topic: 'exponentials', difficulty: 'basic', type: 'choice',
        prompt: '方程 3ˣ = 81 的解是？',
        options: [
          { id: 'a', label: 'x = 4' },
          { id: 'b', label: 'x = 3' },
          { id: 'c', label: 'x = 27' },
          { id: 'd', label: 'x = log₈₁ 3' },
        ],
        answer: 'a',
        solution: ['81 = 3⁴，故 3ˣ = 3⁴，x = 4。'],
      },
      {
        id: 'pe-ex7', topic: 'exponentials', difficulty: 'advanced', type: 'number',
        prompt: '解方程 log₂(x+1) + log₂(x−1) = 3，求 x（x > 1）。',
        answer: 3, tolerance: 0.0001,
        solution: ['log₂[(x+1)(x−1)] = 3 ⇒ log₂(x²−1) = 3。', 'x²−1 = 2³ = 8 ⇒ x² = 9。', 'x > 1，故 x = 3。'],
      },
      {
        id: 'pe-ex8', topic: 'exponentials', difficulty: 'basic', type: 'expression',
        prompt: '用对数运算法则化简 ln(a²b³)（用 ln a 和 ln b 表示）。',
        answer: '2*ln(a)+3*ln(b)',
        solution: ['ln(a²b³) = ln(a²) + ln(b³) = 2 ln a + 3 ln b。'],
      },
    ],
    quiz: [
      {
        id: 'pe-q1', topic: 'exponentials', difficulty: 'basic', type: 'number',
        prompt: 'lg 1000 = ？',
        answer: 3, tolerance: 0.0001,
        solution: ['1000 = 10³。'],
      },
      {
        id: 'pe-q2', topic: 'exponentials', difficulty: 'basic', type: 'choice',
        prompt: 'ln e² 的值是？',
        options: [
          { id: 'a', label: '2' },
          { id: 'b', label: 'e' },
          { id: 'c', label: '1' },
          { id: 'd', label: 'e²' },
        ],
        answer: 'a',
        solution: ['ln e² = 2 ln e = 2。'],
      },
    ],
    interactiveGraph: {
      formula: 'Math.pow(2,x)',
      xMin: -3,
      xMax: 4,
      yMin: -1,
      yMax: 12,
      title: '指数增长：y = 2ˣ 的图像，观察过定点 (0,1) 与爆炸式增长',
      annotations: [{ x: 0, label: '过定点 (0,1)' }],
    },
    resources: [
      { title: '指数与对数函数精讲', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%8C%87%E6%95%B0%E5%AF%B9%E6%95%B0%E5%87%BD%E6%95%B0', kind: 'video' },
      { title: 'Logarithms — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs', kind: 'video' },
    ],
  },
  {
    id: 'precalc-complex',
    trackId: 'precalc',
    title: '复数与欧拉公式',
    duration: 50,
    prerequisites: ['precalc-exp-log', 'bridge-trig'],
    objectives: ['理解复数的代数与三角形式', '掌握复平面与模辐角', '会用欧拉公式统一指数与三角'],
    intuition: [
      '负数不能开平方？复数说：那就定义 i² = −1。加上这一条，方程 x² = −1 有了解，代数从此"封闭"。复数把平面上的点写成 z = x + iy，加减是平移，乘除是缩放旋转。',
      '欧拉公式 e^{iθ} = cos θ + i sin θ 是数学最优雅的等式之一：指数与三角函数在复数域握手。它让"旋转"变成"乘法"，是信号处理与量子力学的地基。',
    ],
    principles: [
      {
        title: '虚数单位与代数形式',
        body: 'i² = −1，复数 z = a + bi（a 为实部，b 为虚部），在复平面上对应点 (a, b)。',
        formula: 'z = a + bi,\\quad i^2 = -1',
      },
      {
        title: '三角形式与欧拉公式',
        body: '模 r 与辐角 θ 给出三角形式；由欧拉公式与指数形式等价。',
        formula: 'z = r(\\cos\\theta + i\\sin\\theta) = r\\,e^{i\\theta}',
      },
      {
        title: '复数乘法即旋转',
        body: '两复数相乘：模长相乘，辐角相加。这是欧拉形式最直观的结论。',
        formula: 'r_1e^{i\\theta_1}\\,\\cdot\\, r_2e^{i\\theta_2} = r_1 r_2\\, e^{i(\\theta_1+\\theta_2)}',
      },
    ],
    examples: [
      {
        prompt: '计算 (1 + 2i)(3 − i) 并化简。',
        steps: ['展开：1×3 + 1×(−i) + 2i×3 + 2i×(−i)。', '= 3 − i + 6i − 2i²。', 'i² = −1，故 −2i² = +2。', '合并：3 + 2 + (−1 + 6)i = 5 + 5i。'],
        answer: '5 + 5i',
      },
      {
        prompt: '把 z = 1 + i 写成三角形式（求模与辐角）。',
        steps: ['模 r = √(1² + 1²) = √2。', '辐角 tan θ = 1/1 = 1，θ = π/4。', 'z = √2(cos(π/4) + i sin(π/4)) = √2·e^{iπ/4}。'],
        answer: 'z = √2 e^{iπ/4}',
      },
    ],
    exercises: [
      {
        id: 'pc-ex1', topic: 'complex', difficulty: 'basic', type: 'number',
        prompt: '计算 (1 + i)² 的实部。',
        answer: 0, tolerance: 0.0001,
        solution: ['(1+i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i，实部为 0。'],
      },
      {
        id: 'pc-ex2', topic: 'complex', difficulty: 'basic', type: 'choice',
        prompt: 'i²⁰²⁴ 的值是？（注意 2024 是 4 的倍数）',
        options: [
          { id: 'a', label: '1' },
          { id: 'b', label: 'i' },
          { id: 'c', label: '−1' },
          { id: 'd', label: '−i' },
        ],
        answer: 'a',
        solution: ['i 的幂以 4 为周期：i⁴ = 1，2024 是 4 的倍数，故 i²⁰²⁴ = 1。'],
      },
      {
        id: 'pc-ex3', topic: 'complex', difficulty: 'advanced', type: 'number',
        prompt: '求复数 z = 3 + 4i 的模 |z|。',
        answer: 5, tolerance: 0.0001,
        solution: ['|z| = √(9 + 16) = 5。'],
      },
      {
        id: 'pc-ex4', topic: 'complex', difficulty: 'basic', type: 'number',
        prompt: '计算 i² 的值。',
        answer: -1, tolerance: 0.0001,
        solution: ['由定义 i² = −1。'],
      },
      {
        id: 'pc-ex5', topic: 'complex', difficulty: 'advanced', type: 'number',
        prompt: '用欧拉公式求 e^{iπ} 的值。',
        answer: -1, tolerance: 0.0001,
        solution: ['e^{iπ} = cos π + i sin π = −1 + 0 = −1（欧拉恒等式）。'],
      },
      {
        id: 'pc-ex6', topic: 'complex', difficulty: 'basic', type: 'choice',
        prompt: '复数 z = 2i 在复平面上的位置是？',
        options: [
          { id: 'a', label: '虚轴正半轴上' },
          { id: 'b', label: '实轴正半轴上' },
          { id: 'c', label: '原点' },
          { id: 'd', label: '第三象限' },
        ],
        answer: 'a',
        solution: ['z = 0 + 2i，实部 0、虚部 2，位于虚轴正半轴。'],
      },
      {
        id: 'pc-ex7', topic: 'complex', difficulty: 'advanced', type: 'number',
        prompt: '计算 (cos(π/3) + i sin(π/3))² 的辐角主值（弧度）。',
        answer: 2.094, tolerance: 0.001,
        solution: ['复数相乘辐角相加：(π/3) + (π/3) = 2π/3 ≈ 2.094。'],
      },
      {
        id: 'pc-ex8', topic: 'complex', difficulty: 'advanced', type: 'expression',
        prompt: '化简 (3 + 2i) − (1 − 4i)，写出结果（形如 a+bi，无空格）。',
        answer: '2+6i',
        solution: ['实部：3 − 1 = 2；虚部：2 − (−4) = 6。结果为 2 + 6i。'],
      },
    ],
    quiz: [
      {
        id: 'pc-q1', topic: 'complex', difficulty: 'basic', type: 'choice',
        prompt: '欧拉公式 e^{iθ} 等于？',
        options: [
          { id: 'a', label: 'cos θ + i sin θ' },
          { id: 'b', label: 'cos θ − i sin θ' },
          { id: 'c', label: 'sin θ + i cos θ' },
          { id: 'd', label: 'e·i·θ' },
        ],
        answer: 'a',
        solution: ['欧拉公式：e^{iθ} = cos θ + i sin θ。'],
      },
      {
        id: 'pc-q2', topic: 'complex', difficulty: 'basic', type: 'choice',
        prompt: '方程 x² + 1 = 0 在复数范围内的根是？',
        options: [
          { id: 'a', label: 'x = ±i' },
          { id: 'b', label: 'x = ±1' },
          { id: 'c', label: 'x = i（仅一个）' },
          { id: 'd', label: '无解' },
        ],
        answer: 'a',
        solution: ['x² = −1 ⇒ x = ±i，两个共轭虚根。'],
      },
    ],
    interactiveGraph: {
      formula: 'Math.cos(x)',
      xMin: -6.283,
      xMax: 6.283,
      yMin: -2,
      yMax: 2,
      title: '欧拉公式的实部：e^{iθ} 的实部 cos θ，辐角 θ 每转 2π 回到起点',
      annotations: [
        { x: 3.142, label: 'θ=π' },
        { x: 6.283, label: 'θ=2π' },
      ],
    },
    keyFormulas: [
      { name: '虚数单位', formula: 'i^2 = -1', usage: '定义复数域的基础' },
      { name: '欧拉公式', formula: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta', usage: '指数与三角的统一，复平面旋转' },
      { name: '复数乘法（极坐标）', formula: 'r_1e^{i\\theta_1} r_2e^{i\\theta_2} = r_1r_2 e^{i(\\theta_1+\\theta_2)}', usage: '模相乘、辐角相加，快速算幂与积' },
    ],
    commonMistakes: [
      { mistake: '把 i² 当作 1', correction: '定义 i² = −1，这是复数唯一的核心约定' },
      { mistake: '求 |a+bi| 时忘记开方，写成 a² + b²', correction: '模是 √(a²+b²)，不是 a²+b²' },
      { mistake: '辐角判断象限失误', correction: '辐角需由 (a, b) 所在象限决定，tanθ=b/a 不够，还要看实部虚部符号' },
    ],
    detailedNotes: [
      '复数域是实数域的扩张，核心约定只有一条 i² = −1。由此代数基本定理成立：任何多项式在复数域都有根。',
      '复平面的几何直觉极强：加法是向量平移，乘法是"模相乘、辐角相加"的旋转缩放。这也解释了为什么 e^{iθ} 描述单位圆上的匀速旋转。',
      '欧拉恒等式 e^{iπ} + 1 = 0 把数学中最基本的五个常数（e, π, i, 1, 0）联结在一起，是数学之美的经典代表。',
    ],
    resources: [
      { title: '复数的几何意义与欧拉公式', provider: 'Bilibili · 3Blue1Brown 中字', url: 'https://search.bilibili.com/all?keyword=%E5%A4%8D%E6%95%B0%20%E6%AC%A7%E6%8B%89%E5%85%AC%E5%BC%8F', kind: 'video' },
      { title: 'Complex numbers — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:complex', kind: 'video' },
    ],
  },

  {
    id: 'precalc-induction',
    trackId: 'precalc',
    title: '数学归纳法与递推',
    duration: 40,
    prerequisites: ['precalc-sequences'],
    objectives: [
      '理解数学归纳法的两步结构：奠基与递推',
      '会用归纳法证明与正整数有关的恒等式',
      '会用归纳法证明不等式与整除性问题',
    ],
    intuition: [
      '数学归纳法像"推倒第一块多米诺骨牌"：先证明 n = 1 成立（奠基），再证明"若第 k 块倒，则第 k + 1 块也倒"（递推），于是所有骨牌都会倒。',
      '第二步必须真正用上归纳假设 P(k) 去推出 P(k+1)；只是把要证的结论再写一遍、没有用假设的论证是空转。',
      '数列的递推式与归纳法天然契合：递推式给出"从前一项到后一项"的规则，归纳法给出"从 P(k) 到 P(k+1)"的引擎。',
    ],
    principles: [
      {
        title: '数学归纳法原理',
        body: '若命题 P(1) 为真，且对任意正整数 k，由 P(k) 为真可推出 P(k+1) 为真，则 P(n) 对一切正整数 n 为真。',
        formula: 'P(1)\\ \\text{真}\\ \\land\\ \\forall k\\ (P(k) \\Rightarrow P(k+1))\\ \\Longrightarrow\\ \\forall n\\ P(n)',
      },
      {
        title: '归纳步骤的代数变形',
        body: '从求和式出发，把前 k 项用归纳假设替换，再补上第 k+1 项，向目标式变形。',
        formula: '\\sum_{i=1}^{k+1} a_i = \\sum_{i=1}^{k} a_i + a_{k+1} = \\frac{k(k+1)}{2} + (k+1)',
      },
      {
        title: '递推式的结构',
        body: '首项加递推关系唯一确定数列；归纳法正是对这种"有限次向前推算"的严格化。',
        formula: 'a_1 \\text{ 给定},\\quad a_{n+1} = f(a_n)',
      },
    ],
    examples: [
      {
        prompt: '证明 1 + 2 + ⋯ + n = n(n+1)/2 对一切正整数 n 成立。',
        steps: [
          '奠基：n = 1 时左边为 1，右边 1×2/2 = 1，成立。',
          '假设 n = k 时 1 + 2 + ⋯ + k = k(k+1)/2。',
          'n = k+1 时：左边 = k(k+1)/2 + (k+1) = (k+1)(k+2)/2，正是右边的形式。',
          '由归纳法原理，命题对一切正整数成立。',
        ],
        answer: '证毕：1 + 2 + ⋯ + n = n(n+1)/2',
      },
      {
        prompt: '证明前 n 个正奇数之和 1 + 3 + 5 + ⋯ + (2n−1) = n²。',
        steps: [
          '奠基：n = 1 时左边 1，右边 1² = 1，成立。',
          '假设 n = k 时 1 + 3 + ⋯ + (2k−1) = k²。',
          'n = k+1 时：左边 = k² + (2k+1) = k² + 2k + 1 = (k+1)²，成立。',
          '由归纳法，命题成立。',
        ],
        answer: '1 + 3 + 5 + ⋯ + (2n−1) = n²',
      },
    ],
    exercises: [
      {
        id: 'pi-e1', topic: 'induction', difficulty: 'basic', type: 'choice',
        prompt: '数学归纳法证明的第一步通常验证哪一项？',
        options: [
          { id: 'a', label: 'n = 0' },
          { id: 'b', label: 'n = 1' },
          { id: 'c', label: 'n = k' },
          { id: 'd', label: 'n = k + 1' },
        ],
        answer: 'b',
        solution: ['奠基验证命题的最小起始值，对正整数通常为 n = 1。'],
      },
      {
        id: 'pi-e2', topic: 'induction', difficulty: 'basic', type: 'number',
        prompt: '用归纳法证明 1 + 2 + ⋯ + n = n(n+1)/2 时，n = 1 时右边的计算结果是多少？',
        formula: '\\frac{1 \\times (1+1)}{2} = ?',
        answer: 1,
        solution: ['n = 1 时代入公式：1×2/2 = 1，与左边一致。'],
      },
      {
        id: 'pi-e3', topic: 'induction', difficulty: 'advanced', type: 'choice',
        prompt: '要证明 n! > 2ⁿ（n ≥ 4），奠基应验证哪一项？',
        options: [
          { id: 'a', label: 'n = 0' },
          { id: 'b', label: 'n = 1' },
          { id: 'c', label: 'n = 4' },
          { id: 'd', label: 'n = 2' },
        ],
        answer: 'c',
        solution: ['命题只在 n ≥ 4 时成立，故奠基从 n = 4 开始验证。'],
      },
      {
        id: 'pi-e4', topic: 'induction', difficulty: 'advanced', type: 'number',
        prompt: '用公式 1 + 3 + 5 + ⋯ + (2n−1) = n²，求前 5 个正奇数之和。',
        formula: '1 + 3 + 5 + 7 + 9 = n^2, \\ n = 5',
        answer: 25,
        solution: ['n = 5 时和为 5² = 25。'],
      },
    ],
    quiz: [
      {
        id: 'pi-q1', topic: 'induction', difficulty: 'basic', type: 'choice',
        prompt: '数学归纳法中，"假设 P(k) 成立"这一步通常被称为？',
        options: [
          { id: 'a', label: '归纳奠基' },
          { id: 'b', label: '归纳假设' },
          { id: 'c', label: '归纳结论' },
          { id: 'd', label: '数学原理' },
        ],
        answer: 'b',
        solution: ['第二步开头的假设正是归纳假设，是连接 k 与 k+1 的桥梁。'],
      },
    ],
    resources: [
      { title: '数学归纳法（数列与不等式证明）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%95%B0%E5%AD%A6%E5%BD%92%E7%BA%B3%E6%B3%95', kind: 'video' },
      { title: 'Proof by induction — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/proof-by-induction', kind: 'article' },
    ],
    commonMistakes: [
      { mistake: '只验证了奠基就宣称证毕。', correction: '必须完成"假设 P(k) 推出 P(k+1)"的递推步骤。' },
      { mistake: '第二步没有真正使用归纳假设。', correction: '先写出 P(k) 的形式，再向 P(k+1) 的目标式作代数变形。' },
    ],
    keyFormulas: [
      { name: '等差数列求和', formula: 'S_n = n(a_1 + a_n)/2', usage: '归纳法最常验证的恒等式之一。' },
      { name: '平方和公式', formula: '1² + 2² + ⋯ + n² = n(n+1)(2n+1)/6', usage: '归纳法证明的典型练习。' },
    ],
  },
  {
    id: 'precalc-trig-identities',
    trackId: 'precalc',
    title: '三角恒等变换',
    duration: 40,
    prerequisites: ['bridge-trig'],
    objectives: [
      '掌握同角三角函数的基本关系',
      '掌握两角和差与二倍角公式并能互推',
      '会化简三角式、求值并证明恒等式',
    ],
    intuition: [
      '三角恒等式是"同一个角的不同写法"：sin²θ + cos²θ = 1 说明 (sinθ, cosθ) 永远站在单位圆上，这是所有三角公式的几何源头。',
      '两角和公式把"两个角相加"拆成"各自的正弦余弦的混合"，二倍角公式则是把角度减半、次数降低的"分治"技巧。',
      '化简的目标是"向单一角、单一函数靠拢"：先用公式把角度与次数降下来，再合并同类项。',
    ],
    principles: [
      {
        title: '同角三角函数关系',
        body: '同一个角的正弦平方加余弦平方恒为 1；正切等于正弦比余弦。',
        formula: '\\sin^2\\theta + \\cos^2\\theta = 1,\\qquad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}',
      },
      {
        title: '两角和与差公式',
        body: 'sin(α±β) 展开后正弦余弦交叉相乘；cos(α±β) 展开后同名相乘，β 取负时中间变号。',
        formula: '\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta;\\quad \\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta',
      },
      {
        title: '二倍角与降幂公式',
        body: '令 β = α 得二倍角公式；反写得到降幂公式，常用于积分与化简。',
        formula: '\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha;\\quad \\cos 2\\alpha = 2\\cos^2\\alpha - 1 = 1 - 2\\sin^2\\alpha',
      },
    ],
    examples: [
      {
        prompt: '已知 sinθ = 3/5，θ 在第二象限，求 cosθ。',
        steps: [
          '由 sin²θ + cos²θ = 1，得 cos²θ = 1 − 9/25 = 16/25。',
          '第二象限 cosθ < 0，取负根，cosθ = −4/5。',
        ],
        answer: 'cosθ = −4/5',
      },
      {
        prompt: '化简 sin(α + β)cosβ − cos(α + β)sinβ。',
        steps: [
          '对照两角差公式：sin(α − β) = sinαcosβ − cosαsinβ。',
          '把 (α+β) 看作 α，β 看作 β，正好是 sin[(α+β) − β] 的展开。',
          '化简得 sin α。',
        ],
        answer: 'sin α',
      },
    ],
    exercises: [
      {
        id: 'pt-e1', topic: 'trig', difficulty: 'basic', type: 'choice',
        prompt: 'sin²30° + cos²30° = ？',
        options: [
          { id: 'a', label: '0' },
          { id: 'b', label: '1/2' },
          { id: 'c', label: '1' },
          { id: 'd', label: '2' },
        ],
        answer: 'c',
        solution: ['同角关系 sin²θ + cos²θ = 1 对任意角恒成立，故为 1。'],
      },
      {
        id: 'pt-e2', topic: 'trig', difficulty: 'basic', type: 'number',
        prompt: '已知 sinθ = 1/2 且 θ 在第一象限，求 cosθ 的值（保留三位小数）。',
        formula: '\\cos\\theta = \\sqrt{1 - \\sin^2\\theta}',
        answer: 0.866,
        tolerance: 0.001,
        solution: ['cos²θ = 1 − 1/4 = 3/4，第一象限取正，cosθ = √3/2 ≈ 0.866。'],
      },
      {
        id: 'pt-e3', topic: 'trig', difficulty: 'advanced', type: 'choice',
        prompt: 'sin 75° = ？',
        options: [
          { id: 'a', label: '(√6 − √2)/4' },
          { id: 'b', label: '(√6 + √2)/4' },
          { id: 'c', label: '√3/2' },
          { id: 'd', label: '(√2 − √6)/4' },
        ],
        answer: 'b',
        solution: ['sin75° = sin(45°+30°) = sin45°cos30° + cos45°sin30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6+√2)/4。'],
      },
      {
        id: 'pt-e4', topic: 'trig', difficulty: 'advanced', type: 'number',
        prompt: '利用二倍角公式求 sin15°·cos15° 的值。',
        formula: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta \\Rightarrow \\sin15^\\circ\\cos15^\\circ = \\frac{\\sin 30^\\circ}{2}',
        answer: 0.25,
        tolerance: 0.001,
        solution: ['sin15°cos15° = (1/2)sin30° = (1/2)(1/2) = 1/4 = 0.25。'],
      },
    ],
    quiz: [
      {
        id: 'pt-q1', topic: 'trig', difficulty: 'basic', type: 'choice',
        prompt: '若 tanθ = 1 且 θ ∈ (0, π)，则 θ = ？',
        options: [
          { id: 'a', label: 'π/6' },
          { id: 'b', label: 'π/4' },
          { id: 'c', label: 'π/3' },
          { id: 'd', label: '3π/4' },
        ],
        answer: 'b',
        solution: ['tan(π/4) = 1；tan(3π/4) = −1，故在 (0, π) 内取 π/4。'],
      },
    ],
    resources: [
      { title: '三角恒等变换（两角和差与二倍角）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E4%B8%89%E8%A7%92%E6%81%92%E7%AD%89%E5%8F%98%E6%8D%A2', kind: 'video' },
      { title: 'Trigonometric identities — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/trigonometry/trig-equations-and-identities', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '象限搞错导致开方取错符号。', correction: '先判断角所在象限再决定 cosθ 的正负，开方后必写符号。' },
      { mistake: 'sin(α+β) 与 cos(α+β) 的中间符号混淆。', correction: '口诀：sin 是"异号相同"，cos 是"同名相减"。' },
    ],
    keyFormulas: [
      { name: '两角和', formula: 'sin(α+β) = sinαcosβ + cosαsinβ', usage: '求非特殊角的正弦值。' },
      { name: '二倍角', formula: 'cos2α = 2cos²α − 1 = 1 − 2sin²α', usage: '降幂与化简。' },
    ],
    detailedNotes: [
      '遇到"sin²θ 与 cosθ"并存时，优先用同角关系或降幂公式统一变量。',
      '给值求值问题：先确定角的范围，再看目标式对应哪个公式。',
    ],
  },
  // ── 第三阶：一元微积分 ─────────────────────────────────────────────
  {
    id: 'calc1-derivatives',
    trackId: 'calc1',
    title: '导数与变化率',
    duration: 55,
    prerequisites: ['precalc-limits'],
    objectives: ['理解导数的定义与几何意义', '熟记基本求导公式', '掌握四则与链式法则'],
    intuition: [
      '导数是"瞬间变化率"：把平均速度的时间窗口无限缩小，得到的极限就是瞬时速度。几何上，它是曲线在该点切线的斜率。',
      '链式法则处理"套娃函数"：变化率沿链条逐层相乘——外层的放大倍数乘以内层的放大倍数。',
    ],
    principles: [
      {
        title: '导数的定义',
        body: '函数在一点的导数是差商当增量趋于零时的极限。',
        formula: "f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}",
      },
      {
        title: '基本求导公式',
        body: '幂函数、指数、对数与三角函数的导数是所有计算的零件。',
        formula: "(x^n)' = nx^{n-1},\\quad (e^x)' = e^x,\\quad (\\sin x)' = \\cos x",
      },
      {
        title: '链式法则',
        body: '复合函数求导：外层求导乘内层求导。',
        formula: '\\frac{d}{dx} f(g(x)) = f\'(g(x)) \\cdot g\'(x)',
      },
    ],
    examples: [
      {
        prompt: '求 y = sin(x²) 的导数。',
        steps: ['外层 sin u，导数 cos u；内层 u = x²，导数 2x。', "y' = cos(x²) · 2x。"],
        answer: "y' = 2x·cos(x²)",
      },
      {
        prompt: '求 y = x·ln x 的导数。',
        steps: ['识别为两个函数的乘积：u = x，v = ln x。', 'u′ = 1，v′ = 1/x。', '用乘积法则：y′ = u′v + uv′。', "y′ = 1·ln x + x·(1/x) = ln x + 1。"],
        answer: "y′ = ln x + 1",
      },
    ],
    exercises: [
      {
        id: 'cd-ex1', topic: 'derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x³，则 f′(2) = ？',
        answer: 12, tolerance: 0.0001,
        solution: ["f'(x) = 3x²，f'(2) = 12。"],
      },
      {
        id: 'cd-ex2', topic: 'derivatives', difficulty: 'basic', type: 'choice',
        prompt: '(ln x)′ = ？（x > 0）',
        options: [
          { id: 'a', label: '1/x' },
          { id: 'b', label: 'x' },
          { id: 'c', label: 'eˣ' },
          { id: 'd', label: 'ln x' },
        ],
        answer: 'a',
        solution: ['对数函数求导公式：(ln x)′ = 1/x。'],
      },
      {
        id: 'cd-ex3', topic: 'derivatives', difficulty: 'advanced', type: 'number',
        prompt: 'y = e^(2x) 在 x = 0 处的导数值是？',
        answer: 2, tolerance: 0.0001,
        solution: ["y' = 2e^(2x)，x = 0 时为 2。"],
      },
      {
        id: 'cd-ex4', topic: 'derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x³ − 3x² + 2，求 f′(1)。',
        answer: -3, tolerance: 0.0001,
        solution: ["f'(x) = 3x² − 6x，f'(1) = 3 − 6 = −3。"],
      },
      {
        id: 'cd-ex5', topic: 'derivatives', difficulty: 'advanced', type: 'number',
        prompt: 'y = ln(x² + 1)，求 y′(0)。',
        answer: 0, tolerance: 0.0001,
        solution: ['y′ = 2x/(x²+1)，x=0 时为 0。'],
      },
      {
        id: 'cd-ex6', topic: 'derivatives', difficulty: 'advanced', type: 'choice',
        prompt: '函数 y = cos(3x) 的导数是？',
        options: [
          { id: 'a', label: '−3 sin(3x)' },
          { id: 'b', label: '3 sin(3x)' },
          { id: 'c', label: '−sin(3x)' },
          { id: 'd', label: 'sin(3x)' },
        ],
        answer: 'a',
        solution: ['链式法则：y′ = −sin(3x)·3 = −3 sin(3x)。'],
      },
      {
        id: 'cd-ex7', topic: 'derivatives', difficulty: 'advanced', type: 'number',
        prompt: 'f(x) = x·e^x，求 f′(0)。',
        answer: 1, tolerance: 0.0001,
        solution: ['用乘积法则：f′(x) = 1·e^x + x·e^x = e^x(1 + x)。', 'f′(0) = e^0·(1 + 0) = 1。'],
      },
      {
        id: 'cd-ex8', topic: 'derivatives', difficulty: 'advanced', type: 'number',
        prompt: 'y = x/(x² + 1)，求 y′(0)。',
        answer: 1, tolerance: 0.0001,
        solution: ['用商法则：f′(x) = [(x²+1)·1 − x·2x]/(x²+1)² = (1 − x²)/(x²+1)²。', 'y′(0) = 1/1 = 1。'],
      },
      {
        id: 'cd-ex9', topic: 'derivatives', difficulty: 'basic', type: 'choice',
        prompt: 'f(x) = x^5 的导数是？',
        options: [
          { id: 'a', label: '5x⁴' },
          { id: 'b', label: 'x⁴' },
          { id: 'c', label: '5x⁵' },
          { id: 'd', label: 'x⁵/5' },
        ],
        answer: 'a',
        solution: ['幂法则：(x^n)′ = n·x^(n−1)，故 (x⁵)′ = 5x⁴。'],
      },
    ],
    quiz: [
      {
        id: 'cd-q1', topic: 'derivatives', difficulty: 'basic', type: 'choice',
        prompt: '导数 f′(x₀) 的几何意义是？',
        options: [
          { id: 'a', label: '曲线在该点切线的斜率' },
          { id: 'b', label: '曲线在该点的函数值' },
          { id: 'c', label: '曲线下的面积' },
          { id: 'd', label: '两点连线的斜率' },
        ],
        answer: 'a',
        solution: ['导数是切线斜率，割线斜率的极限。'],
      },
      {
        id: 'cd-q2', topic: 'derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x² + 3x，f′(1) = ？',
        answer: 5, tolerance: 0.0001,
        solution: ["f'(x) = 2x + 3，f'(1) = 5。"],
      },
    ],
    interactiveGraph: {
      formula: 'x*x*x/3 - x',
      xMin: -3,
      xMax: 3,
      yMin: -3,
      yMax: 3,
      title: '导数与切线：拖动滑块改变 a、b，观察 y = x³/3 − x 的极值点',
      annotations: [
        { x: -1, label: '极大值' },
        { x: 1, label: '极小值' },
      ],
      fillArea: true,
      derivatives: [{ x: -1 }, { x: 1 }],
    },
    resources: [
      { title: '微积分的本质 · 导数篇', provider: 'Bilibili · 3Blue1Brown', url: 'https://search.bilibili.com/all?keyword=3Blue1Brown%20%E5%BE%AE%E7%A7%AF%E5%88%86%E7%9A%84%E6%9C%AC%E8%B4%A8', kind: 'video' },
      { title: 'Derivative rules — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new', kind: 'video' },
    ],
  },
  {
    id: 'calc1-applications',
    trackId: 'calc1',
    title: '导数的应用：单调、极值与最值',
    duration: 50,
    prerequisites: ['calc1-derivatives'],
    objectives: ['用导数判断单调区间', '会求极值点与最值', '了解洛必达法则'],
    intuition: [
      '导数是函数的"仪表盘"：导数为正，函数爬坡；导数为负，函数下坡；导数为零且变号的地方，就是山峰或谷底。',
      '洛必达法则处理 0/0 或 ∞/∞ 型极限的"终极武器"：分子分母分别求导后再取极限，往往立刻柳暗花明。',
    ],
    principles: [
      {
        title: '单调性定理',
        body: '在区间内 f′(x) > 0 则 f 单调递增；f′(x) < 0 则单调递减。',
        formula: "f'(x) > 0 \\Rightarrow f \\text{ 递增};\\qquad f'(x) < 0 \\Rightarrow f \\text{ 递减}",
      },
      {
        title: '极值判定',
        body: 'f′(x₀) = 0 且 f′ 在 x₀ 两侧变号，则 x₀ 为极值点；左正右负为极大值，左负右正为极小值。',
        formula: "f'(x_0) = 0\\ \\text{且变号} \\Rightarrow x_0 \\text{ 为极值点}",
      },
      {
        title: '洛必达法则',
        body: '0/0 或 ∞/∞ 型极限，可对分子分母分别求导再求极限。',
        formula: "\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}\\quad (\\tfrac{0}{0}\\ \\text{或}\\ \\tfrac{\\infty}{\\infty})",
      },
    ],
    examples: [
      {
        prompt: '求 f(x) = x³ − 3x 的极值。',
        steps: ["f'(x) = 3x² − 3 = 3(x−1)(x+1)。", 'x = −1 左侧 f′ > 0、右侧 f′ < 0，为极大值 f(−1) = 2。', 'x = 1 为极小值 f(1) = −2。'],
        answer: '极大值 2（x = −1），极小值 −2（x = 1）',
      },
      {
        prompt: '用洛必达法则求 lim(x→0) (1 − cos x) / x²。',
        steps: ['直接代入得 0/0 型。', '第一次洛必达：分子导数为 sin x，分母导数为 2x，仍为 0/0。', '第二次洛必达：分子导数为 cos x，分母导数为 2。', '代入 x→0 得 cos 0 / 2 = 1/2。'],
        answer: '1/2',
      },
    ],
    exercises: [
      {
        id: 'ca-ex1', topic: 'extrema', difficulty: 'basic', type: 'choice',
        prompt: 'f(x) = x² − 4x + 5 的单调递减区间是？',
        options: [
          { id: 'a', label: '(−∞, 2)' },
          { id: 'b', label: '(2, +∞)' },
          { id: 'c', label: '(−∞, 0)' },
          { id: 'd', label: '处处递减' },
        ],
        answer: 'a',
        solution: ["f'(x) = 2x − 4 < 0 ⟺ x < 2。"],
      },
      {
        id: 'ca-ex2', topic: 'extrema', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = −x² + 6x − 5 的最大值是？',
        answer: 4, tolerance: 0.0001,
        solution: ["f'(x) = −2x + 6 = 0 得 x = 3，f(3) = 4。"],
      },
      {
        id: 'ca-ex3', topic: 'extrema', difficulty: 'advanced', type: 'number',
        prompt: '用洛必达法则求 lim(x→0) (eˣ − 1) / x。',
        answer: 1, tolerance: 0.0001,
        solution: ['0/0 型，分子分母求导：eˣ/1 → 1。'],
      },
      {
        id: 'ca-ex4', topic: 'extrema', difficulty: 'basic', type: 'number',
        prompt: '求 f(x) = x³ − 12x 的极大值。',
        answer: 16, tolerance: 0.0001,
        solution: ["f'(x)=3x²−12=0，x=±2。x=−2 左侧 f' > 0 右侧 f' < 0，为极大值点，f(−2)=16。"],
      },
      {
        id: 'ca-ex5', topic: 'extrema', difficulty: 'advanced', type: 'choice',
        prompt: 'f(x) = x⁴ − 4x³ 的极值点个数是？',
        options: [
          { id: 'a', label: '2' },
          { id: 'b', label: '3' },
          { id: 'c', label: '1' },
          { id: 'd', label: '0' },
        ],
        answer: 'c',
        solution: ["f'(x)=4x³−12x²=4x²(x−3)，驻点 x=0（不变号）、x=3（极小）。故极值点 1 个。答案为 1，对应选项 c。"],
      },
      {
        id: 'ca-ex6', topic: 'extrema', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x² − 6x + 8，求 f(x) 的最小值。',
        answer: -1, tolerance: 0.0001,
        solution: ['f′(x) = 2x − 6 = 0 得 x = 3。', 'f(3) = 9 − 18 + 8 = −1。'],
      },
      {
        id: 'ca-ex7', topic: 'extrema', difficulty: 'advanced', type: 'number',
        prompt: '用洛必达法则求 lim(x→0) (sin 3x)/x 的值。',
        answer: 3, tolerance: 0.0001,
        solution: ['0/0 型，分子分母分别求导。', 'lim(x→0) (3 cos 3x)/1 = 3·1 = 3。'],
      },
      {
        id: 'ca-ex8', topic: 'extrema', difficulty: 'advanced', type: 'choice',
        prompt: '已知 f′(x) = 3x² − 3，则 f 的极大值点 x = ？',
        options: [
          { id: 'a', label: 'x = −1' },
          { id: 'b', label: 'x = 1' },
          { id: 'c', label: 'x = 0' },
          { id: 'd', label: 'x = 2' },
        ],
        answer: 'a',
        solution: ['f′(x) = 3(x−1)(x+1)，x=−1 处 f′ 由正变负，为极大值点。x=1 处由负变正，为极小值点。'],
      },
    ],
    quiz: [
      {
        id: 'ca-q1', topic: 'extrema', difficulty: 'basic', type: 'choice',
        prompt: '若 f′(x₀) = 0 且 f″(x₀) > 0，则 x₀ 是？',
        options: [
          { id: 'a', label: '极小值点' },
          { id: 'b', label: '极大值点' },
          { id: 'c', label: '拐点' },
          { id: 'd', label: '无法判断' },
        ],
        answer: 'a',
        solution: ['二阶导数为正，函数下凸，驻点为极小值点。'],
      },
      {
        id: 'ca-q2', topic: 'extrema', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x³ − 12x 在 x = 2 处取得极值，f(2) = ？',
        answer: -16, tolerance: 0.0001,
        solution: ['f(2) = 8 − 24 = −16。'],
      },
    ],
    interactiveGraph: {
      formula: 'x*x*x - 3*x',
      xMin: -3,
      xMax: 3,
      yMin: -6,
      yMax: 6,
      title: '极值点观察：y = x³ − 3x 的极大、极小值在哪里？',
      annotations: [
        { x: -1, label: '极大' },
        { x: 1, label: '极小' },
      ],
      fillArea: true,
    },
    resources: [
      { title: '导数应用：单调性与极值', provider: 'Bilibili · 宋浩老师', url: 'https://search.bilibili.com/all?keyword=%E5%AE%8B%E6%B5%A9%20%E5%AF%BC%E6%95%B0%E5%BA%94%E7%94%A8', kind: 'video' },
      { title: 'Applying derivatives — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new', kind: 'video' },
    ],
  },
  {
    id: 'calc1-integrals',
    trackId: 'calc1',
    title: '积分与微积分基本定理',
    duration: 60,
    prerequisites: ['calc1-derivatives'],
    objectives: ['理解定积分的面积意义', '掌握牛顿-莱布尼茨公式', '会计算基本积分'],
    intuition: [
      '定积分是"无穷小求和"：把曲线下方面切成无数细条，每条的面积加起来，取极限就是总面积。',
      '微积分基本定理是整座大厦的拱顶石：求面积（积分）与求变化率（求导）互为逆运算——先积分再求导，回到原函数。',
    ],
    principles: [
      {
        title: '定积分的定义',
        body: '分割、近似、求和、取极限，得到曲线下的精确面积。',
        formula: '\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i)\\, \\Delta x',
      },
      {
        title: '牛顿-莱布尼茨公式',
        body: '若 F 是 f 的一个原函数，则定积分等于原函数在端点的差。',
        formula: '\\int_a^b f(x)\\,dx = F(b) - F(a)',
      },
      {
        title: '基本积分公式',
        body: '幂函数积分升幂并除以新指数；1/x 的积分是 ln|x|。',
        formula: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C\\ (n \\ne -1)',
      },
    ],
    examples: [
      {
        prompt: '计算 ∫₀² x² dx。',
        steps: ['原函数 F(x) = x³/3。', 'F(2) − F(0) = 8/3 − 0 = 8/3。'],
        answer: '8/3 ≈ 2.667',
      },
      {
        prompt: '计算 ∫₀^(π/2) cos x dx。',
        steps: ['cos x 的原函数是 sin x。', '代入上限：sin(π/2) = 1。', '代入下限：sin(0) = 0。', '结果 = 1 − 0 = 1。'],
        answer: '1',
      },
    ],
    exercises: [
      {
        id: 'ci-ex1', topic: 'integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∫₀¹ 2x dx 的值。',
        answer: 1, tolerance: 0.0001,
        solution: ['原函数 x²，代入得 1 − 0 = 1。'],
      },
      {
        id: 'ci-ex2', topic: 'integrals', difficulty: 'basic', type: 'choice',
        prompt: '∫ cos x dx = ？',
        options: [
          { id: 'a', label: 'sin x + C' },
          { id: 'b', label: '−sin x + C' },
          { id: 'c', label: 'cos x + C' },
          { id: 'd', label: '−cos x + C' },
        ],
        answer: 'a',
        solution: ['(sin x)′ = cos x，故 ∫ cos x dx = sin x + C。'],
      },
      {
        id: 'ci-ex3', topic: 'integrals', difficulty: 'advanced', type: 'number',
        prompt: '计算 ∫₁ᵉ (1/x) dx 的值。',
        answer: 1, tolerance: 0.0001,
        solution: ['原函数 ln x，ln e − ln 1 = 1。'],
      },
      {
        id: 'ci-ex4', topic: 'integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∫₀² (3x² + 2x) dx 的值。',
        answer: 12, tolerance: 0.0001,
        solution: ['原函数 x³ + x²，代入 2 得 8 + 4 = 12，代入 0 得 0。'],
      },
      {
        id: 'ci-ex5', topic: 'integrals', difficulty: 'advanced', type: 'number',
        prompt: '求 ∫₀^(π/2) sin x dx 的值。',
        answer: 1, tolerance: 0.0001,
        solution: ['原函数 −cos x，−cos(π/2) + cos 0 = 0 + 1 = 1。'],
      },
      {
        id: 'ci-ex6', topic: 'integrals', difficulty: 'advanced', type: 'choice',
        prompt: '∫ x^(-1) dx = ？',
        options: [
          { id: 'a', label: 'ln|x| + C' },
          { id: 'b', label: 'x⁰/0 + C' },
          { id: 'c', label: 'x⁻²/(-2) + C' },
          { id: 'd', label: 'eˣ + C' },
        ],
        answer: 'a',
        solution: ['幂函数积分公式在 n = −1 时不适用，单独记 ∫(1/x)dx = ln|x| + C。'],
      },
      {
        id: 'ci-ex7', topic: 'integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∫₀³ (x²) dx 的值。',
        answer: 9, tolerance: 0.0001,
        solution: ['原函数 x³/3，F(3) − F(0) = 27/3 − 0 = 9。'],
      },
      {
        id: 'ci-ex8', topic: 'integrals', difficulty: 'advanced', type: 'number',
        prompt: '计算 ∫₀¹ e^(2x) dx 的值（保留三位小数）。',
        answer: 3.195, tolerance: 0.001,
        solution: ['原函数 (1/2)·e^(2x)。', 'F(1) − F(0) = (1/2)(e² − 1) ≈ (7.389 − 1)/2 ≈ 3.195。'],
      },
      {
        id: 'ci-ex9', topic: 'integrals', difficulty: 'advanced', type: 'choice',
        prompt: '∫(0→π) sin x dx 的值是？',
        options: [
          { id: 'a', label: '2' },
          { id: 'b', label: '0' },
          { id: 'c', label: '1' },
          { id: 'd', label: '−2' },
        ],
        answer: 'a',
        solution: ['原函数 −cos x，−cos π + cos 0 = −(−1) + 1 = 2。'],
      },
    ],
    quiz: [
      {
        id: 'ci-q1', topic: 'integrals', difficulty: 'basic', type: 'number',
        prompt: '∫₀^π sin x dx = ？',
        answer: 2, tolerance: 0.0001,
        solution: ['原函数 −cos x，−cos π + cos 0 = 1 + 1 = 2。'],
      },
      {
        id: 'ci-q2', topic: 'integrals', difficulty: 'basic', type: 'choice',
        prompt: '微积分基本定理连接了哪两个概念？',
        options: [
          { id: 'a', label: '导数与积分' },
          { id: 'b', label: '极限与连续' },
          { id: 'c', label: '数列与级数' },
          { id: 'd', label: '微分与差分' },
        ],
        answer: 'a',
        solution: ['它表明微分与积分互为逆运算。'],
      },
    ],
    interactiveGraph: {
      formula: 'x*x',
      xMin: 0,
      xMax: 3,
      yMin: -1,
      yMax: 10,
      title: '定积分的几何意义：y = x² 在 [0,2] 下的面积等于 8/3',
      annotations: [
        { x: 0, label: 'a=0' },
        { x: 2, label: 'b=2' },
      ],
      fillArea: true,
    },
    resources: [
      { title: '微积分的本质 · 积分篇', provider: 'Bilibili · 3Blue1Brown', url: 'https://search.bilibili.com/all?keyword=3Blue1Brown%20%E7%A7%AF%E5%88%86', kind: 'video' },
      { title: 'Integrals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new', kind: 'video' },
    ],
  },

  {
    id: 'calc1-mean-value',
    trackId: 'calc1',
    title: '微分中值定理与函数形态',
    duration: 40,
    prerequisites: ['calc1-derivatives'],
    objectives: [
      '掌握罗尔定理与拉格朗日中值定理的条件和结论',
      '会用中值定理证明等式与不等式',
      '会用导数判断单调性、极值与凹凸性',
    ],
    intuition: [
      '中值定理说：在光滑曲线上，总有一点切线平行于两端点的连线。它把"整体平均变化率"与"局部瞬时变化率"联系了起来。',
      '导数符号决定函数走向：f′ > 0 上坡、f′ < 0 下坡；f″ 决定拐弯方向（凹凸）。这给"看图"配上了一套严格的代数判据。',
      '极值点出现在导数变号处：像登山者，到了山顶（极值）必然是"先上坡后下坡"，即导数由正变负。',
    ],
    principles: [
      {
        title: '罗尔定理',
        body: '函数在闭区间连续、开区间可导、端点值相等，则内部存在一点导数为 0。',
        formula: 'f(a) = f(b) \\Rightarrow \\exists\\ \\xi \\in (a,b):\\ f\'(\\xi) = 0',
      },
      {
        title: '拉格朗日中值定理',
        body: '连续可导的函数在区间内部存在一点，其瞬时变化率等于两端点的平均变化率。',
        formula: '\\exists\\ \\xi \\in (a,b):\\ f\'(\\xi) = \\frac{f(b) - f(a)}{b - a}',
      },
      {
        title: '单调性与极值',
        body: 'f′ > 0 时单调递增，f′ < 0 时单调递减；驻点处导数变号则取极值。',
        formula: 'f\'(x) > 0 \\Rightarrow f\\ \\uparrow;\\qquad f\'(x_0) = 0,\\ f\' \\text{ 在 } x_0 \\text{ 两侧变号} \\Rightarrow x_0 \\text{ 为极值点}',
      },
    ],
    examples: [
      {
        prompt: '对 f(x) = x² 在区间 [1, 3] 上应用拉格朗日中值定理，求 ξ。',
        steps: [
          'f′(x) = 2x，两端点平均变化率 = (9 − 1)/(3 − 1) = 4。',
          '令 2ξ = 4，得 ξ = 2。',
          'ξ = 2 ∈ (1, 3)，满足定理要求。',
        ],
        answer: 'ξ = 2',
      },
      {
        prompt: '讨论 f(x) = x³ − 3x 的单调区间与极值。',
        steps: [
          'f′(x) = 3x² − 3 = 3(x − 1)(x + 1)，驻点为 x = ±1。',
          'x < −1 时 f′ > 0，−1 < x < 1 时 f′ < 0，x > 1 时 f′ > 0。',
          '递增区间为 (−∞, −1) ∪ (1, +∞)，递减区间为 (−1, 1)。',
          'x = −1 取极大值 2，x = 1 取极小值 −2。',
        ],
        answer: '增 (−∞, −1) ∪ (1, +∞)，减 (−1, 1)；极大值 2，极小值 −2',
      },
    ],
    exercises: [
      {
        id: 'cm-e1', topic: 'mean-value', difficulty: 'basic', type: 'choice',
        prompt: '拉格朗日中值定理的结论是？',
        options: [
          { id: 'a', label: '存在一点导数等于平均变化率' },
          { id: 'b', label: '存在一点导数为 0' },
          { id: 'c', label: '函数在区间内取得最大值' },
          { id: 'd', label: '函数在区间内单调' },
        ],
        answer: 'a',
        solution: ['定理结论正是存在 ξ 使 f′(ξ) 等于平均变化率。'],
      },
      {
        id: 'cm-e2', topic: 'mean-value', difficulty: 'basic', type: 'number',
        prompt: 'f(x) = x² 在 [1, 3] 上的平均变化率是多少？',
        formula: '\\frac{f(3) - f(1)}{3 - 1} = \\frac{9 - 1}{2}',
        answer: 4,
        solution: ['(9 − 1)/2 = 4。'],
      },
      {
        id: 'cm-e3', topic: 'monotonicity', difficulty: 'advanced', type: 'choice',
        prompt: '对于 f(x) = x³ 在 ℝ 上，下列说法正确的是？',
        options: [
          { id: 'a', label: '存在极大值' },
          { id: 'b', label: '在整个实数域上单调递增' },
          { id: 'c', label: '先增后减' },
          { id: 'd', label: '存在极小值' },
        ],
        answer: 'b',
        solution: ['f′(x) = 3x² ≥ 0 且仅在 x = 0 处为 0，故 f 在 ℝ 上单调递增、无极值。'],
      },
      {
        id: 'cm-e4', topic: 'extremum', difficulty: 'advanced', type: 'number',
        prompt: 'f(x) = x² − 4x 的极小值点在 x = ？',
        answer: 2,
        solution: ['f′(x) = 2x − 4，令其为 0 得 x = 2；f″(x) = 2 > 0，故为极小值点。'],
      },
    ],
    quiz: [
      {
        id: 'cm-q1', topic: 'rolle', difficulty: 'basic', type: 'choice',
        prompt: 'f(x) = x² − 2x 在 [0, 2] 上满足罗尔定理条件，则使 f′(ξ) = 0 的 ξ = ？',
        options: [
          { id: 'a', label: '0' },
          { id: 'b', label: '1' },
          { id: 'c', label: '2' },
          { id: 'd', label: '不存在' },
        ],
        answer: 'b',
        solution: ['f′(x) = 2x − 2 = 0 ⇒ x = 1，且 f(0) = f(2) = 0，满足罗尔定理。'],
      },
    ],
    resources: [
      { title: '拉格朗日中值定理（高等数学）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E4%B8%AD%E5%80%BC%E5%AE%9A%E7%90%86', kind: 'video' },
      { title: 'Mean value theorem — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-2', kind: 'video' },
    ],
    interactiveGraph: {
      formula: 'x^3 - 3*x',
      xMin: -2.5,
      xMax: 2.5,
      yMin: -4,
      yMax: 4,
      title: 'y = x³ − 3x：x = −1 极大、x = 1 极小',
      annotations: [{ x: -1, label: '极大' }, { x: 1, label: '极小' }],
    },
    commonMistakes: [
      { mistake: '忽略了定理要求函数在闭区间连续、开区间可导。', correction: '用中值定理前先检查连续性、可导性与端点条件。' },
      { mistake: '极值点只找驻点，漏掉导数不存在的点。', correction: '极值点候选 = 驻点 ∪ 导数不存在的点，逐个用变号判断。' },
    ],
    keyFormulas: [
      { name: '拉格朗日中值', formula: 'f′(ξ) = [f(b) − f(a)]/(b − a)', usage: '证明不等式与恒等式。' },
      { name: '极值判定', formula: 'f′(x₀) = 0 且 f″(x₀) > 0 → 极小', usage: '二阶导数判定法。' },
    ],
  },

  {
    id: 'calc1-integration-methods',
    trackId: 'calc1',
    title: '不定积分的换元与分部',
    duration: 45,
    prerequisites: ['calc1-integrals'],
    objectives: [
      '理解原函数与不定积分的概念',
      '掌握第一、第二换元法',
      '掌握分部积分法并能选择正确的积分策略',
    ],
    intuition: [
      '求导是"拆"，求积分是"拼"：换元法先替换再还原，分部积分把难积的乘积拆成易积的和。',
      '换元法的核心是"凑微分"：把被积函数改写成 f(g(x))·g′(x) 的形式，令 u = g(x)，就变成简单的 ∫f(u)du。',
      '分部积分选 u 有口诀"反对幂指三"：对数、反三角、幂、指数、三角，排前面的优先当 u，因为求导会变简单。',
    ],
    principles: [
      {
        title: '不定积分与基本公式',
        body: '不定积分是求导的逆运算，结果含任意常数 C。幂函数、三角与指数函数都有对应的反求导公式。',
        formula: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C;\\quad \\int \\cos x\\,dx = \\sin x + C;\\quad \\int e^x\\,dx = e^x + C',
      },
      {
        title: '第一换元法（凑微分）',
        body: '识别出 f(g(x))·g′(x) 的结构后，整体代入 u = g(x)。',
        formula: '\\int f(g(x))\\,g\'(x)\\,dx = \\int f(u)\\,du,\\quad u = g(x)',
      },
      {
        title: '分部积分法',
        body: '用于幂×三角、幂×指数、幂×对数等乘积积分。',
        formula: '\\int u\\,dv = uv - \\int v\\,du',
      },
    ],
    examples: [
      {
        prompt: '求 ∫ 2x·cos(x²) dx。',
        steps: [
          '令 u = x²，则 du = 2x dx。',
          '原式 = ∫ cos u du = sin u + C。',
          '回代得 sin(x²) + C。',
        ],
        answer: 'sin(x²) + C',
      },
      {
        prompt: '求 ∫ x·eˣ dx。',
        steps: [
          '取 u = x、dv = eˣdx，则 du = dx、v = eˣ。',
          '由分部积分：∫x eˣ dx = x eˣ − ∫eˣ dx。',
          '= x eˣ − eˣ + C = eˣ(x − 1) + C。',
        ],
        answer: 'eˣ(x − 1) + C',
      },
    ],
    exercises: [
      {
        id: 'im-e1', topic: 'indefinite-integral', difficulty: 'basic', type: 'choice',
        prompt: '∫ 2x dx = ？',
        options: [
          { id: 'a', label: 'x² + C' },
          { id: 'b', label: 'x²' },
          { id: 'c', label: '2' },
          { id: 'd', label: '2x² + C' },
        ],
        answer: 'a',
        solution: ['(x² + C)′ = 2x，反求导结果带任意常数 C。'],
      },
      {
        id: 'im-e2', topic: 'indefinite-integral', difficulty: 'basic', type: 'number',
        prompt: '若 F(x) = x³ + C 是 ∫ 3x² dx 的原函数，且 F(1) = 2，求 C 的值。',
        formula: 'F(1) = 1^3 + C = 2',
        answer: 1,
        solution: ['代入 F(1) = 1 + C = 2，得 C = 1。'],
      },
      {
        id: 'im-e3', topic: 'substitution', difficulty: 'advanced', type: 'choice',
        prompt: '∫ x·sin(x²) dx 用哪种方法最合适？',
        options: [
          { id: 'a', label: '第一换元法（凑微分）' },
          { id: 'b', label: '分部积分法' },
          { id: 'c', label: '直接查表' },
          { id: 'd', label: '无法积分' },
        ],
        answer: 'a',
        solution: ['x dx = (1/2)d(x²)，正好凑成 sin(x²) 的微分形式。'],
      },
      {
        id: 'im-e4', topic: 'substitution', difficulty: 'advanced', type: 'expression',
        prompt: '求 ∫ e^(2x) dx，把结果写成一个表达式（如 e^(2x)/2）。',
        formula: '\\int e^{2x}\\,dx',
        answer: 'e^(2x)/2',
        solution: ['令 u = 2x，du = 2dx，∫e^u·(1/2)du = (1/2)e^u + C = e^(2x)/2 + C。'],
      },
    ],
    quiz: [
      {
        id: 'im-q1', topic: 'indefinite-integral', difficulty: 'basic', type: 'choice',
        prompt: '对 x > 0，∫ (1/x) dx = ？',
        options: [
          { id: 'a', label: 'ln x + C' },
          { id: 'b', label: '1/x² + C' },
          { id: 'c', label: 'x + C' },
          { id: 'd', label: 'eˣ + C' },
        ],
        answer: 'a',
        solution: ['(ln x)′ = 1/x，故 ∫(1/x)dx = ln x + C。'],
      },
    ],
    resources: [
      { title: '换元积分法与分部积分法', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%8D%A2%E5%85%83%E7%A7%AF%E5%88%86%20%E5%88%86%E9%83%A8%E7%A7%AF%E5%88%86', kind: 'video' },
      { title: 'Integration techniques — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/integral-calculus/ic-integration', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '凑微分时忘了补常数因子（如 ∫cos(2x)dx 少了 1/2）。', correction: '换元后检查 dx 与 du 的系数关系，别忘了反乘回去。' },
      { mistake: '分部积分选错 u、dv，越积越复杂。', correction: '按"反对幂指三"选 u，让求导后更简单的一侧当 u。' },
    ],
    keyFormulas: [
      { name: '线性性质', formula: '∫(af + bg) = a∫f + b∫g', usage: '不定积分逐项计算。' },
      { name: '对数积分', formula: '∫dx/x = ln|x| + C', usage: '分母为一次式的积分。' },
    ],
    detailedNotes: [
      '做完换元或分部后，务必把结果重新求导验证。',
      '不定积分答案常写成多种等价形式，判题接受归一化后的文本比较。',
    ],
  },

  {
    id: 'calc1-definite-integral',
    trackId: 'calc1',
    title: '定积分与微积分基本定理',
    duration: 45,
    prerequisites: ['calc1-integration-methods'],
    objectives: [
      '理解定积分的定义与其几何意义',
      '掌握牛顿—莱布尼茨公式',
      '会计算常见定积分（含换元与分部）',
    ],
    intuition: [
      '定积分是把曲线下面积切成无数小条再求和：分割、近似、求和、取极限，这就是黎曼和。',
      '微积分基本定理是最漂亮的桥：面积的"变化率"正是曲边本身的高度，所以求面积可以反着找原函数、算端点之差，而不必真的做无穷求和。',
      '定积分对区间可拆分、对常数可提出，这些性质让复杂区间问题变成若干简单区间之和。',
    ],
    principles: [
      {
        title: '定积分的定义',
        body: '把 [a, b] 分成 n 份，取每份内一点算函数值，乘以小区间长度后求和，再令 n → ∞ 取极限。',
        formula: '\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\, \\Delta x',
      },
      {
        title: '微积分基本定理（牛顿—莱布尼茨公式）',
        body: '连续函数 f 在 [a, b] 上的定积分，等于其任一原函数 F 在端点处的差。',
        formula: '\\int_a^b f(x)\\,dx = F(b) - F(a),\\qquad F\'(x) = f(x)',
      },
      {
        title: '定积分的基本性质',
        body: '线性性、区间可加性、以及交换上下限改变符号。',
        formula: '\\int_a^b c\\,f = c\\int_a^b f;\\qquad \\int_a^b f = \\int_a^c f + \\int_c^b f',
      },
    ],
    examples: [
      {
        prompt: '计算 ∫₀¹ x² dx。',
        steps: [
          '找原函数：F(x) = x³/3。',
          '由牛顿—莱布尼茨公式：F(1) − F(0) = 1/3 − 0 = 1/3。',
        ],
        answer: '1/3',
      },
      {
        prompt: '计算 ∫₀^π sin x dx。',
        steps: [
          '原函数为 F(x) = −cos x。',
          'F(π) − F(0) = −cosπ − (−cos0) = 1 + 1 = 2。',
        ],
        answer: '2',
      },
    ],
    exercises: [
      {
        id: 'di-e1', topic: 'definite-integral', difficulty: 'basic', type: 'choice',
        prompt: '由牛顿—莱布尼茨公式，∫₂³ x dx = ？',
        options: [
          { id: 'a', label: '5/2' },
          { id: 'b', label: '5' },
          { id: 'c', label: '1/2' },
          { id: 'd', label: '9' },
        ],
        answer: 'a',
        solution: ['∫₂³ x dx = [x²/2]₂³ = 9/2 − 4/2 = 5/2。'],
      },
      {
        id: 'di-e2', topic: 'definite-integral', difficulty: 'basic', type: 'number',
        prompt: '计算 ∫₀² 3 dx 的值。',
        answer: 6,
        solution: ['∫₀² 3 dx = 3·(2 − 0) = 6，即底 2、高 3 的矩形面积。'],
      },
      {
        id: 'di-e3', topic: 'definite-integral', difficulty: 'advanced', type: 'choice',
        prompt: '∫₀^(π/2) cos x dx = ？',
        options: [
          { id: 'a', label: '1' },
          { id: 'b', label: '0' },
          { id: 'c', label: '−1' },
          { id: 'd', label: 'π/2' },
        ],
        answer: 'a',
        solution: ['∫cos x dx = sin x，sin(π/2) − sin 0 = 1 − 0 = 1。'],
      },
      {
        id: 'di-e4', topic: 'definite-integral', difficulty: 'advanced', type: 'number',
        prompt: '计算 ∫₁² (2x + 1) dx 的值。',
        formula: '\\int_1^2 (2x+1)\\,dx',
        answer: 4,
        solution: ['∫(2x+1)dx = x² + x，代入端点：(4+2) − (1+1) = 4。'],
      },
    ],
    quiz: [
      {
        id: 'di-q1', topic: 'definite-integral', difficulty: 'basic', type: 'choice',
        prompt: '若 ∫₀¹ f(x)dx = 3，∫₁² f(x)dx = 5，则 ∫₀² f(x)dx = ？',
        options: [
          { id: 'a', label: '2' },
          { id: 'b', label: '8' },
          { id: 'c', label: '15' },
          { id: 'd', label: '无法确定' },
        ],
        answer: 'b',
        solution: ['由区间可加性：∫₀² f = ∫₀¹ f + ∫₁² f = 3 + 5 = 8。'],
      },
    ],
    resources: [
      { title: '微积分基本定理（牛顿—莱布尼茨公式）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%BE%AE%E7%A7%AF%E5%88%86%E5%9F%BA%E6%9C%AC%E5%AE%9A%E7%90%86', kind: 'video' },
      { title: 'Definite integrals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-7', kind: 'video' },
    ],
    interactiveGraph: {
      formula: 'x^2',
      xMin: -0.2,
      xMax: 1.2,
      yMin: -0.2,
      yMax: 1.2,
      title: 'y = x² 在 [0,1] 上的定积分为 1/3',
      fillArea: true,
    },
    commonMistakes: [
      { mistake: '原函数忘了加区间端点代入时的括号运算。', correction: '写 [F(x)]ₐᵇ 再逐端点代入相减，避免符号错误。' },
      { mistake: '换元法算定积分后忘记更换积分上下限。', correction: '用换元法算定积分时，要么换限后直接用，要么换元后回代原限。' },
    ],
    keyFormulas: [
      { name: '牛顿—莱布尼茨', formula: '∫ₐᵇ f = F(b) − F(a)', usage: '定积分的核心算法。' },
      { name: '区间可加性', formula: '∫ₐᵇ f = ∫ₐᶜ f + ∫꜀ᵇ f', usage: '拆分区间的计算技巧。' },
    ],
    detailedNotes: [
      '定积分结果是一个数值，与积分变量名称无关（∫ₐᵇ f(x)dx = ∫ₐᵇ f(u)du）。',
      '被积函数为偶函数时对称区间积分有化简公式。',
    ],
  },

  {
    id: 'calc1-integral-applications',
    trackId: 'calc1',
    title: '定积分的几何与物理应用',
    duration: 40,
    prerequisites: ['calc1-definite-integral'],
    objectives: [
      '会用定积分求平面图形面积',
      '会用切片法求旋转体体积',
      '会用定积分求弧长与变力做功',
    ],
    intuition: [
      '面积 = ∫(上 − 下)dx：把区域切成竖条，每条"高"是两条曲线的差，再把所有竖条的面积加总。',
      '旋转体体积用"切片法"：把旋转体切成一个个薄圆盘（πR²），再把所有圆盘"摞"起来积分。',
      '物理量的共性都是"微元累加"：做功 = 力随位移积分，弧长 = 沿切线段长度的积分。',
    ],
    principles: [
      {
        title: '平面图形面积',
        body: '由 y = f(x) 与 y = g(x) 围成的区域，面积等于两函数之差的绝对值在区间上的积分。',
        formula: 'S = \\int_a^b \\bigl| f(x) - g(x) \\bigr|\\,dx',
      },
      {
        title: '旋转体体积（绕 x 轴）',
        body: '横截面是半径为 f(x) 的圆盘，体积为圆盘面积沿 x 轴的积分。',
        formula: 'V = \\pi \\int_a^b \\bigl[ f(x) \\bigr]^2\\,dx',
      },
      {
        title: '平面曲线弧长',
        body: '用切线微分 ds = √(1 + f′²)dx 沿曲线累加。',
        formula: 'L = \\int_a^b \\sqrt{1 + \\bigl[ f\'(x) \\bigr]^2}\\,dx',
      },
    ],
    examples: [
      {
        prompt: '求抛物线 y = x 与 y = x² 围成的平面图形面积。',
        steps: [
          '求交点：x = x² ⇒ x = 0 或 x = 1。',
          '在 (0, 1) 上 x > x²，面积 = ∫₀¹ (x − x²) dx。',
          '= [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6。',
        ],
        answer: '1/6',
      },
      {
        prompt: '求 y = x²（0 ≤ x ≤ 1）绕 x 轴旋转所得旋转体体积。',
        steps: [
          'V = π∫₀¹ (x²)² dx = π∫₀¹ x⁴ dx。',
          '= π · [x⁵/5]₀¹ = π/5。',
        ],
        answer: 'π/5',
      },
    ],
    exercises: [
      {
        id: 'ia-e1', topic: 'area', difficulty: 'basic', type: 'choice',
        prompt: '由 x = 0、x = 1、y = 0、y = x 围成的图形面积是？',
        options: [
          { id: 'a', label: '1/2' },
          { id: 'b', label: '1' },
          { id: 'c', label: '2' },
          { id: 'd', label: '1/3' },
        ],
        answer: 'a',
        solution: ['∫₀¹ x dx = [x²/2]₀¹ = 1/2。'],
      },
      {
        id: 'ia-e2', topic: 'area', difficulty: 'basic', type: 'number',
        prompt: 'y = 1、y = 0、x = 0、x = 2 围成的矩形面积是多少？',
        answer: 2,
        solution: ['矩形底 2、高 1，面积 = 2 × 1 = 2。'],
      },
      {
        id: 'ia-e3', topic: 'area', difficulty: 'advanced', type: 'choice',
        prompt: 'y = x² 与 x 轴在 [0, 1] 上围成的面积为？',
        options: [
          { id: 'a', label: '1/3' },
          { id: 'b', label: '1/2' },
          { id: 'c', label: '1' },
          { id: 'd', label: '2' },
        ],
        answer: 'a',
        solution: ['∫₀¹ x² dx = [x³/3]₀¹ = 1/3。'],
      },
      {
        id: 'ia-e4', topic: 'volume', difficulty: 'advanced', type: 'number',
        prompt: 'y = √x 绕 x 轴在 [0, 4] 上旋转，体积 V = π∫₀⁴ x dx，求积分部分 ∫₀⁴ x dx 的值。',
        formula: 'V = \\pi \\int_0^4 x\\,dx',
        answer: 8,
        solution: ['∫₀⁴ x dx = [x²/2]₀⁴ = 16/2 = 8，体积为 8π。'],
      },
    ],
    quiz: [
      {
        id: 'ia-q1', topic: 'area', difficulty: 'basic', type: 'choice',
        prompt: 'y = x³ 与 x 轴在 [0, 1] 上围成的面积是？',
        options: [
          { id: 'a', label: '1/4' },
          { id: 'b', label: '1/3' },
          { id: 'c', label: '1/2' },
          { id: 'd', label: '1' },
        ],
        answer: 'a',
        solution: ['∫₀¹ x³ dx = [x⁴/4]₀¹ = 1/4。'],
      },
    ],
    resources: [
      { title: '定积分的应用（面积与体积）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%AE%9A%E7%A7%AF%E5%88%86%E7%9A%84%E5%BA%94%E7%94%A8', kind: 'video' },
      { title: 'Applications of integrals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/old-ap-calculus-ab/ab-applications-definite-integrals', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '忘记确定哪条曲线在上方，直接积分导致面积为负。', correction: '画图或代点判断上下关系，用差的绝对值保证非负。' },
      { mistake: '旋转体体积误用面积公式（少乘 π 或把半径搞错）。', correction: '圆盘法体积必乘 π，半径为曲线到旋转轴的距离。' },
    ],
    keyFormulas: [
      { name: '面积', formula: 'S = ∫ₐᵇ |f − g| dx', usage: '两曲线围成的区域面积。' },
      { name: '体积（圆盘法）', formula: 'V = π∫ₐᵇ f(x)² dx', usage: '绕 x 轴的旋转体体积。' },
    ],
  },

  {
    id: 'calc1-taylor',
    trackId: 'calc1',
    title: '泰勒公式与函数逼近',
    duration: 40,
    prerequisites: ['calc1-derivatives'],
    objectives: [
      '理解泰勒公式的逼近思想',
      '掌握常见函数的麦克劳林展开',
      '会用泰勒公式估计函数值与截断误差',
    ],
    intuition: [
      '泰勒公式说：任何足够光滑的函数都能用多项式逐项逼近，项数越多越精确。它把"难算的初等函数"变成"好算的多项式"。',
      '展开的前几项捕捉局部形状：常数项是高度、一次项是斜率、二次项是弯曲程度——每一项都比前一项更细致地刻画曲线。',
      '计算机计算 sin、eˣ 时实际用的就是泰勒多项式的有限项，这正是它的工程价值。',
    ],
    principles: [
      {
        title: '泰勒公式',
        body: '在点 x₀ 处把 f 展开成 n 次多项式加余项，各项系数由 f 在该点的各阶导数决定。',
        formula: 'f(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}\\,(x - x_0)^k + R_n(x)',
      },
      {
        title: '麦克劳林展开',
        body: 'x₀ = 0 时的泰勒公式，常见函数的展开要熟记。',
        formula: 'e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots;\\quad \\sin x = x - \\frac{x^3}{3!} + \\cdots',
      },
      {
        title: '拉格朗日余项',
        body: '截断到 n 阶后，剩余部分可以用某个中间点的 (n+1) 阶导数来估计。',
        formula: 'R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\,(x - x_0)^{n+1}',
      },
    ],
    examples: [
      {
        prompt: '写出 eˣ 在 x = 0 处展开到 x³ 项的麦克劳林公式。',
        steps: [
          'f 的各阶导数在 0 处均为 1，即 f⁽ᵏ⁾(0) = 1。',
          '代入泰勒公式：1 + x + x²/2! + x³/3!。',
          '结果为 1 + x + x²/2 + x³/6。',
        ],
        answer: '1 + x + x²/2 + x³/6',
      },
      {
        prompt: '用 eˣ ≈ 1 + x + x²/2 近似计算 e 的值（取 x = 1）。',
        steps: [
          '把 x = 1 代入近似式。',
          'e ≈ 1 + 1 + 1/2 = 2.5。',
          '真实值 e ≈ 2.718，误差来自被截断的高次项。',
        ],
        answer: 'e ≈ 2.5',
      },
    ],
    exercises: [
      {
        id: 'ta-e1', topic: 'taylor', difficulty: 'basic', type: 'choice',
        prompt: 'eˣ 在 x = 0 处展开到一次项（忽略高阶项）的结果是？',
        options: [
          { id: 'a', label: '1 + x' },
          { id: 'b', label: 'x' },
          { id: 'c', label: 'e' },
          { id: 'd', label: '1 − x' },
        ],
        answer: 'a',
        solution: ['f(0) = 1，f′(0) = 1，展开到一次项为 1 + x。'],
      },
      {
        id: 'ta-e2', topic: 'taylor', difficulty: 'basic', type: 'number',
        prompt: '麦克劳林展开 eˣ = 1 + x + x²/2! + ⋯ 中，一次项 x 的系数是多少？',
        answer: 1,
        solution: ['f′(0) = 1，除以 1! 仍为 1。'],
      },
      {
        id: 'ta-e3', topic: 'taylor', difficulty: 'advanced', type: 'choice',
        prompt: 'sin x 在 x = 0 处展开的最低次非零项是？',
        options: [
          { id: 'a', label: 'x' },
          { id: 'b', label: '1' },
          { id: 'c', label: 'x²' },
          { id: 'd', label: '−x' },
        ],
        answer: 'a',
        solution: ['sin x 的麦克劳林展开为 x − x³/3! + ⋯，最低次非零项是 x。'],
      },
      {
        id: 'ta-e4', topic: 'taylor', difficulty: 'advanced', type: 'number',
        prompt: '用 eˣ ≈ 1 + x + x²/2 近似计算 x = 1 时的 e，得到的数值是？',
        answer: 2.5,
        tolerance: 0.001,
        solution: ['1 + 1 + 1/2 = 2.5。'],
      },
    ],
    quiz: [
      {
        id: 'ta-q1', topic: 'taylor', difficulty: 'basic', type: 'choice',
        prompt: '泰勒公式中的余项 Rₙ(x) 反映的是？',
        options: [
          { id: 'a', label: '截断误差' },
          { id: 'b', label: '计算器舍入误差' },
          { id: 'c', label: '测量误差' },
          { id: 'd', label: '统计误差' },
        ],
        answer: 'a',
        solution: ['余项是被省略的高阶项，即近似展开的截断误差。'],
      },
    ],
    resources: [
      { title: '泰勒公式与麦克劳林展开', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%B3%B0%E5%8B%92%E5%85%AC%E5%BC%8F', kind: 'video' },
      { title: 'Taylor series — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/calculus-home/series-calc/taylor-series-calc', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把展开点写成别的点还当麦克劳林用。', correction: '麦克劳林专指 x₀ = 0，其余点要写 (x − x₀)ᵏ 形式。' },
      { mistake: '阶乘写错或漏掉符号交替。', correction: 'sin、cos 展开注意 (−1)ᵏ 的符号与奇偶次项。' },
    ],
    keyFormulas: [
      { name: '麦克劳林', formula: 'eˣ = Σ xᵏ/k!', usage: '指数函数逼近。' },
      { name: '余项估计', formula: 'Rₙ = f⁽ⁿ⁺¹⁾(ξ)(x−x₀)ⁿ⁺¹/(n+1)!', usage: '控制逼近精度。' },
    ],
    detailedNotes: [
      '求展开时先算导数表，再按公式逐项写系数。',
      '用展开估计数值时，余项能给出误差上界。',
    ],
  },

  // ── 第四阶：多元微积分 ─────────────────────────────────────────────
  {
    id: 'calc2-partial',
    trackId: 'calc2',
    title: '偏导数与全微分',
    duration: 50,
    prerequisites: ['calc1-derivatives'],
    objectives: ['理解多元函数与偏导数', '会求一阶二阶偏导', '理解全微分的线性近似'],
    intuition: [
      '多元函数像一片起伏的山地，海拔由经纬两个坐标共同决定。偏导数就是"只沿东西方向走"或"只沿南北方向走"时的坡度——固定其他变量，只让一个变量动。',
      '全微分是曲面在某点的"切平面近似"：附近的总变化 ≈ 各方向偏导 × 各方向小位移之和。',
    ],
    principles: [
      {
        title: '偏导数的定义',
        body: '对 x 求偏导时把 y 视为常数，按一元函数求导。',
        formula: '\\frac{\\partial f}{\\partial x} = \\lim_{\\Delta x \\to 0} \\frac{f(x+\\Delta x,\\ y) - f(x,\\ y)}{\\Delta x}',
      },
      {
        title: '二阶偏导与对称性',
        body: '混合偏导在连续时与求导次序无关。',
        formula: '\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial^2 f}{\\partial y \\partial x}',
      },
      {
        title: '全微分',
        body: '函数增量的线性主部由两个偏导数线性组合而成。',
        formula: 'dz = \\frac{\\partial f}{\\partial x} dx + \\frac{\\partial f}{\\partial y} dy',
      },
    ],
    examples: [
      {
        prompt: '求 f(x, y) = x²y + sin y 的两个一阶偏导。',
        steps: ['对 x：把 y 当常数，∂f/∂x = 2xy。', '对 y：把 x 当常数，∂f/∂y = x² + cos y。'],
        answer: '∂f/∂x = 2xy，∂f/∂y = x² + cos y',
      },
      {
        prompt: '求 z = e^(xy) 的全微分 dz。',
        steps: ['对 x 求偏导（y 固定）：∂z/∂x = y·e^(xy)。', '对 y 求偏导（x 固定）：∂z/∂y = x·e^(xy)。', '全微分 dz = (∂z/∂x)dx + (∂z/∂y)dy。'],
        answer: 'dz = e^(xy)(y·dx + x·dy)',
      },
    ],
    exercises: [
      {
        id: 'cp-ex1', topic: 'partial-derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x, y) = x² + 3xy，求 ∂f/∂x 在 (1, 2) 处的值。',
        answer: 8, tolerance: 0.0001,
        solution: ['∂f/∂x = 2x + 3y，代入 (1, 2) 得 2 + 6 = 8。'],
      },
      {
        id: 'cp-ex2', topic: 'partial-derivatives', difficulty: 'basic', type: 'choice',
        prompt: '求偏导 ∂/∂y (x³y²) 时，正确做法是？',
        options: [
          { id: 'a', label: '把 x 看作常数，对 y 求导得 2x³y' },
          { id: 'b', label: '把 y 看作常数，得 3x²y²' },
          { id: 'c', label: '两变量同时求导' },
          { id: 'd', label: '结果与 x 无关' },
        ],
        answer: 'a',
        solution: ['对 y 求偏导，x 固定：∂/∂y (x³y²) = 2x³y。'],
      },
      {
        id: 'cp-ex3', topic: 'partial-derivatives', difficulty: 'advanced', type: 'number',
        prompt: 'z = x²y + y²，求 ∂²z/∂x² 在 (1, 1) 处的值。',
        answer: 2, tolerance: 0.0001,
        solution: ['∂z/∂x = 2xy，再对 x 求导得 2y，代入 y = 1 得 2。'],
      },
      {
        id: 'cp-ex4', topic: 'partial-derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x, y) = e^(xy)，求 ∂f/∂x 在 (0, 1) 处的值。',
        answer: 1, tolerance: 0.0001,
        solution: ['∂f/∂x = y·e^(xy)，代入 (0,1) 得 1·e⁰ = 1。'],
      },
      {
        id: 'cp-ex5', topic: 'partial-derivatives', difficulty: 'advanced', type: 'choice',
        prompt: '若 z = x² + xy + y²，则 dz = ？',
        options: [
          { id: 'a', label: '(2x + y)dx + (x + 2y)dy' },
          { id: 'b', label: '(2x + y)dx + (2y)dy' },
          { id: 'c', label: '(2x)dx + (2y)dy' },
          { id: 'd', label: '(2x + y)dx + (x − 2y)dy' },
        ],
        answer: 'a',
        solution: ['∂z/∂x = 2x + y，∂z/∂y = x + 2y，故 dz = (2x+y)dx + (x+2y)dy。'],
      },
      {
        id: 'cp-ex6', topic: 'partial-derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x, y) = x³ + 2xy + y²，求 ∂f/∂y 在 (1, 0) 处的值。',
        answer: 2, tolerance: 0.0001,
        solution: ['∂f/∂y = 2x + 2y，代入 (1, 0) 得 2 + 0 = 2。'],
      },
      {
        id: 'cp-ex7', topic: 'partial-derivatives', difficulty: 'advanced', type: 'number',
        prompt: 'z = x²y³，求 ∂²z/(∂x∂y) 在 (2, 1) 处的值。',
        answer: 12, tolerance: 0.0001,
        solution: ['先 ∂z/∂x = 2xy³，再对 y 求偏导：∂²z/(∂x∂y) = 6xy²。', '代入 (2, 1) 得 6·2·1 = 12。'],
      },
      {
        id: 'cp-ex8', topic: 'partial-derivatives', difficulty: 'advanced', type: 'choice',
        prompt: 'f(x, y) = sin(xy)，则 ∂f/∂x = ？',
        options: [
          { id: 'a', label: 'y·cos(xy)' },
          { id: 'b', label: 'x·cos(xy)' },
          { id: 'c', label: 'cos(xy)' },
          { id: 'd', label: '−y·cos(xy)' },
        ],
        answer: 'a',
        solution: ['对 x 求偏导（y 固定）：链式法则，外层 sin 导数为 cos，内层 xy 对 x 导数为 y。', '∂f/∂x = cos(xy)·y = y·cos(xy)。'],
      },
    ],
    quiz: [
      {
        id: 'cp-q1', topic: 'partial-derivatives', difficulty: 'basic', type: 'number',
        prompt: 'f(x, y) = e^(x) · y，∂f/∂x 在 (0, 5) 处 = ？',
        answer: 5, tolerance: 0.0001,
        solution: ['∂f/∂x = eˣ·y，代入得 1 × 5 = 5。'],
      },
      {
        id: 'cp-q2', topic: 'partial-derivatives', difficulty: 'basic', type: 'choice',
        prompt: '全微分 dz 的几何意义是？',
        options: [
          { id: 'a', label: '切平面上的增量近似' },
          { id: 'b', label: '曲面的真实增量' },
          { id: 'c', label: '沿 x 轴的增量' },
          { id: 'd', label: '曲面的体积' },
        ],
        answer: 'a',
        solution: ['全微分是切平面对曲面增量的线性近似。'],
      },
    ],
    interactiveGraph: {
      formula: 'x*x',
      xMin: -3,
      xMax: 3,
      yMin: -1,
      yMax: 10,
      title: '固定 y 观察 x 方向的截面：z = x² 是一条抛物线',
    },
    resources: [
      { title: '多元函数微分学', provider: 'Bilibili · 宋浩老师', url: 'https://search.bilibili.com/all?keyword=%E5%AE%8B%E6%B5%A9%20%E5%81%8F%E5%AF%BC%E6%95%B0', kind: 'video' },
      { title: 'Partial derivatives — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives', kind: 'video' },
    ],
  },
  {
    id: 'calc2-double-integral',
    trackId: 'calc2',
    title: '二重积分',
    duration: 55,
    prerequisites: ['calc1-integrals', 'calc2-partial'],
    objectives: ['理解二重积分的体积意义', '会在矩形区域上计算累次积分', '理解积分次序交换'],
    intuition: [
      '一元积分算面积，二重积分算体积：把区域切成无数小方块，每个小方块上方有一个"小柱体"，体积之和就是曲面下的总体积。',
      '累次积分把二维问题拆成两次一维：先固定 x 对 y 积一遍（得到一条"切片面积"），再对 x 把这些切片叠起来。',
    ],
    principles: [
      {
        title: '二重积分的定义',
        body: '区域 D 上函数 f 的二重积分是曲面 f 下方、区域 D 上方的有向体积。',
        formula: '\\iint_D f(x, y)\\,d\\sigma',
      },
      {
        title: '矩形区域上的累次积分',
        body: '矩形 [a,b]×[c,d] 上，二重积分可化为先内后外的两次定积分。',
        formula: '\\iint_D f\\,d\\sigma = \\int_a^b \\left(\\int_c^d f(x,y)\\,dy\\right) dx',
      },
      {
        title: '富比尼定理',
        body: '被积函数连续时，积分次序可以交换，结果相同。',
        formula: '\\int_a^b\\!\\!\\int_c^d f\\,dy\\,dx = \\int_c^d\\!\\!\\int_a^b f\\,dx\\,dy',
      },
    ],
    examples: [
      {
        prompt: '计算 ∬_D (x + y) dσ，D = [0,1]×[0,1]。',
        steps: ['先对 y 积：∫₀¹ (x + y) dy = x + 1/2。', '再对 x 积：∫₀¹ (x + 1/2) dx = 1/2 + 1/2 = 1。'],
        answer: '1',
      },
      {
        prompt: '计算 ∬_D xy dσ，D = [0,2]×[0,1]。',
        steps: ['先对 y 积：∫₀¹ xy dy = x·[y²/2]₀¹ = x/2。', '再对 x 积：∫₀² (x/2) dx = [x²/4]₀² = 4/4 = 1。', '两次积分都得到整数，结果为 1。'],
        answer: '1',
      },
    ],
    exercises: [
      {
        id: 'cdi-ex1', topic: 'double-integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∬_D 1 dσ，其中 D = [0,2]×[0,3]（即区域面积）。',
        answer: 6, tolerance: 0.0001,
        solution: ['被积函数为 1 时，二重积分等于区域面积 2 × 3 = 6。'],
      },
      {
        id: 'cdi-ex2', topic: 'double-integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∫₀¹ ∫₀¹ x·y dy dx 的值。',
        answer: 0.25, tolerance: 0.0001,
        solution: ['内层：x·(1/2)；外层：(1/2)·(1/2) = 1/4。'],
      },
      {
        id: 'cdi-ex3', topic: 'double-integrals', difficulty: 'advanced', type: 'number',
        prompt: '计算 ∬_D (2x + y) dσ，D = [0,1]×[0,2]。',
        answer: 4, tolerance: 0.0001,
        solution: ['内层对 y：∫₀² (2x + y) dy = 4x + 2；外层：∫₀¹ (4x + 2) dx = 2 + 2 = 4。'],
      },
      {
        id: 'cdi-ex4', topic: 'double-integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∬_D x dσ，D = [0,1]×[0,1]。',
        answer: 0.5, tolerance: 0.0001,
        solution: ['∫₀¹∫₀¹ x dy dx = ∫₀¹ x dx = 1/2。'],
      },
      {
        id: 'cdi-ex5', topic: 'double-integrals', difficulty: 'advanced', type: 'choice',
        prompt: 'D = [0,2]×[0,3]，∬_D (x + y) dσ = ？',
        options: [
          { id: 'a', label: '12' },
          { id: 'b', label: '15' },
          { id: 'c', label: '18' },
          { id: 'd', label: '6' },
        ],
        answer: 'b',
        solution: ['∫₀²∫₀³ (x+y) dy dx = ∫₀² (3x + 9/2) dx = [3x²/2 + 9x/2]₀² = 6 + 9 = 15。'],
      },
      {
        id: 'cdi-ex6', topic: 'double-integrals', difficulty: 'basic', type: 'number',
        prompt: '计算 ∬_D x² dσ，D = [0, 1]×[0, 2]。',
        answer: 0.667, tolerance: 0.001,
        solution: ['∫₀¹∫₀² x² dy dx = ∫₀¹ 2x² dx = [2x³/3]₀¹ = 2/3 ≈ 0.667。'],
      },
      {
        id: 'cdi-ex7', topic: 'double-integrals', difficulty: 'advanced', type: 'number',
        prompt: '将 ∫₀¹∫₀^x f(x,y) dy dx 交换积分次序为 ∫₀¹∫_y¹ f(x,y) dx dy。求 ∫₀¹∫_y¹ 1 dx dy 的值。',
        answer: 0.5, tolerance: 0.001,
        solution: ['区域 D：0 ≤ y ≤ x ≤ 1，交换次序为 0 ≤ y ≤ 1，y ≤ x ≤ 1。', '∫₀¹∫_y¹ 1 dx dy = ∫₀¹ (1 − y) dy = [y − y²/2]₀¹ = 1 − 1/2 = 0.5。'],
      },
      {
        id: 'cdi-ex8', topic: 'double-integrals', difficulty: 'advanced', type: 'choice',
        prompt: 'D = [0,2]×[0,1]，∬_D (x² + y²) dσ = ？',
        options: [
          { id: 'a', label: '10/3' },
          { id: 'b', label: '8/3' },
          { id: 'c', label: '4' },
          { id: 'd', label: '2' },
        ],
        answer: 'a',
        solution: ['∫₀²∫₀¹ (x² + y²) dy dx = ∫₀² [x²y + y³/3]₀¹ dx = ∫₀² (x² + 1/3) dx。', '= [x³/3 + x/3]₀² = 8/3 + 2/3 = 10/3。'],
      },
    ],
    quiz: [
      {
        id: 'cdi-q1', topic: 'double-integrals', difficulty: 'basic', type: 'choice',
        prompt: '二重积分 ∬_D f dσ 的几何意义是？',
        options: [
          { id: 'a', label: '曲面 f 与区域 D 之间的体积' },
          { id: 'b', label: '区域 D 的周长' },
          { id: 'c', label: '曲线的长度' },
          { id: 'd', label: '函数的平均值' },
        ],
        answer: 'a',
        solution: ['二重积分度量曲顶柱体的体积。'],
      },
      {
        id: 'cdi-q2', topic: 'double-integrals', difficulty: 'basic', type: 'number',
        prompt: '∫₀² ∫₀¹ 3 dy dx = ？',
        answer: 6, tolerance: 0.0001,
        solution: ['3 × 1 × 2 = 6。'],
      },
    ],
    interactiveGraph: {
      formula: 'x*x+1',
      xMin: -2,
      xMax: 2,
      yMin: -1,
      yMax: 6,
      title: '二重积分的几何意义：曲面 z = x²+1 下的柱体体积',
      fillArea: true,
    },
    resources: [
      { title: '二重积分及其计算', provider: 'Bilibili · 宋浩老师', url: 'https://search.bilibili.com/all?keyword=%E5%AE%8B%E6%B5%A9%20%E4%BA%8C%E9%87%8D%E7%A7%AF%E5%88%86', kind: 'video' },
      { title: 'Double integrals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/multivariable-calculus/integrating-multivariable-functions', kind: 'video' },
    ],
  },
  {
    id: 'calc2-lagrange',
    trackId: 'calc2',
    title: '拉格朗日乘数法与条件极值',
    duration: 55,
    prerequisites: ['calc2-partial'],
    objectives: ['理解条件极值与约束优化的思想', '掌握拉格朗日乘数法的步骤', '会判断条件极值的最优性'],
    intuition: [
      '现实中很少能"自由"地求极值：预算有限、材料固定、面积给定——这就是约束。条件极值问的是：在一条曲线上走，哪里最高、哪里最低？',
      '拉格朗日乘数法的直觉是：在约束曲线上取得极值的点，目标函数的梯度必须与约束的梯度平行。因为若两者不平行，就还能沿着曲线"蹭"出更大值。λ 就是这个平行比例，它衡量"约束放松一个单位，目标改善多少"——经济学里叫影子价格。',
    ],
    principles: [
      {
        title: '条件极值问题',
        body: '求目标函数 f(x, y) 在约束 g(x, y) = 0 下的极值，称为条件极值问题。',
        formula: '\\min\\ \\max\\ f(x,y)\\quad \\text{s.t.}\\quad g(x,y) = 0',
      },
      {
        title: '拉格朗日乘数法',
        body: '构造拉格朗日函数 L = f + λg，令其对所有变量和 λ 的偏导都为零，解方程组即得候选极值点。',
        formula: 'L(x, y, \\lambda) = f(x, y) + \\lambda\\, g(x, y)',
      },
      {
        title: '驻点条件',
        body: '极值点满足梯度与约束梯度共线，即存在 λ 使两者的梯度线性相关。',
        formula: '\\nabla f = -\\lambda\\, \\nabla g',
      },
    ],
    examples: [
      {
        prompt: '用拉格朗日乘数法求 f(x, y) = xy 在约束 x + y = 4 下的最大值。',
        steps: ['构造 L = xy + λ(x + y − 4)。', '对 x 求偏导：y + λ = 0；对 y：x + λ = 0。', '两式相减得 x = y。', '代入约束 2x = 4，得 x = y = 2。', '最大值 f(2, 2) = 4。'],
        answer: '最大值 4，在 (2, 2) 取得',
      },
      {
        prompt: '求椭圆 x² + 4y² = 4 上的点到原点距离平方的最小值（即 min x² + y²，约束 x² + 4y² = 4）。',
        steps: ['构造 L = x² + y² + λ(x² + 4y² − 4)。', '对 x：2x + 2λx = 0；对 y：2y + 8λy = 0。', '由第一式，若 x ≠ 0 则 λ = −1；代入第二式得 2y − 8y = −6y = 0，故 y = 0，于是 x² = 4，候选点 (±2, 0)，距离平方 4。', '若 x = 0，则 y = ±1，距离平方 1。', '最小距离平方为 1（在 (0, ±1) 取得）。'],
        answer: '最小值为 1',
      },
    ],
    exercises: [
      {
        id: 'cl-ex1', topic: 'lagrange', difficulty: 'basic', type: 'number',
        prompt: '用拉格朗日乘数法求 f(x, y) = xy 在 x + y = 2 下的最大值。',
        answer: 1, tolerance: 0.0001,
        solution: ['L = xy + λ(x + y − 2)，y + λ = 0，x + λ = 0 ⇒ x = y = 1。', '最大值为 1。'],
      },
      {
        id: 'cl-ex2', topic: 'lagrange', difficulty: 'basic', type: 'number',
        prompt: '求 f(x, y) = x² + y² 在约束 x + y = 2 下的最小值。',
        answer: 2, tolerance: 0.0001,
        solution: ['L = x² + y² + λ(x + y − 2)，2x + λ = 0，2y + λ = 0 ⇒ x = y = 1。', '最小值为 1 + 1 = 2。'],
      },
      {
        id: 'cl-ex3', topic: 'lagrange', difficulty: 'advanced', type: 'choice',
        prompt: '拉格朗日乘数 λ 的经济学含义是？',
        options: [
          { id: 'a', label: '约束放松一个单位时目标函数的边际变化（影子价格）' },
          { id: 'b', label: '目标函数的最大值' },
          { id: 'c', label: '约束条件本身' },
          { id: 'd', label: '自变量的个数' },
        ],
        answer: 'a',
        solution: ['λ 是约束的边际价值：约束 b 变化 d b 时，最优值近似变化 λ·d b。'],
      },
      {
        id: 'cl-ex4', topic: 'lagrange', difficulty: 'basic', type: 'number',
        prompt: '矩形周长为 40，长宽各为多少时面积最大？求最大面积。',
        answer: 100, tolerance: 0.0001,
        solution: ['设长 x 宽 y，2x + 2y = 40，即 x + y = 20。', '由对称性或拉格朗日法，x = y = 10 时面积最大，为 100。'],
      },
      {
        id: 'cl-ex5', topic: 'lagrange', difficulty: 'advanced', type: 'number',
        prompt: '求 f(x, y) = 2x + 3y 在 x² + y² = 1 下的最大值（保留三位小数）。',
        answer: 3.606, tolerance: 0.001,
        solution: ['由柯西不等式，(2x+3y)² ≤ (2²+3²)(x²+y²) = 13。', '最大值为 √13 ≈ 3.606。'],
      },
      {
        id: 'cl-ex6', topic: 'lagrange', difficulty: 'advanced', type: 'choice',
        prompt: '条件极值的驻点处，目标函数梯度与约束梯度满足？',
        options: [
          { id: 'a', label: '互相平行（共线）' },
          { id: 'b', label: '互相垂直' },
          { id: 'c', label: '大小相等' },
          { id: 'd', label: '方向相反且等长' },
        ],
        answer: 'a',
        solution: ['∇f = −λ∇g，两梯度共线（平行）。'],
      },
      {
        id: 'cl-ex7', topic: 'lagrange', difficulty: 'basic', type: 'number',
        prompt: '用拉格朗日乘数法求 f(x, y) = x + y 在 xy = 1（x, y > 0）下的最小值。',
        answer: 2, tolerance: 0.0001,
        solution: ['L = x + y + λ(xy − 1)，1 + λy = 0，1 + λx = 0 ⇒ x = y = 1。', '最小值为 2。'],
      },
      {
        id: 'cl-ex8', topic: 'lagrange', difficulty: 'advanced', type: 'number',
        prompt: '给定 x² + y² = 8，求 xy 的最大值。',
        answer: 4, tolerance: 0.0001,
        solution: ['L = xy + λ(x² + y² − 8)，y + 2λx = 0，x + 2λy = 0。', '两式相减：(x − y)(1 − 2λ) = 0。取 x = y，则 2x² = 8，x = y = 2，xy = 4。'],
      },
    ],
    quiz: [
      {
        id: 'cl-q1', topic: 'lagrange', difficulty: 'basic', type: 'choice',
        prompt: '构造拉格朗日函数时，约束需写成？',
        options: [
          { id: 'a', label: 'g(x, y) = 0 的形式' },
          { id: 'b', label: 'g(x, y) = c 的任意形式' },
          { id: 'c', label: '必须 ≥ 0' },
          { id: 'd', label: '无需整理' },
        ],
        answer: 'a',
        solution: ['标准形式 L = f + λg，要求 g = 0。'],
      },
      {
        id: 'cl-q2', topic: 'lagrange', difficulty: 'basic', type: 'number',
        prompt: 'f(x, y) = x² + y² 在 x + y = 4 下的最小值是？',
        answer: 8, tolerance: 0.0001,
        solution: ['x = y = 2，最小值为 4 + 4 = 8。'],
      },
    ],
    interactiveGraph: {
      formula: 'x*x + y*y',
      xMin: -3,
      xMax: 3,
      yMin: -3,
      yMax: 3,
      title: '约束优化：目标函数 x² + y²（等高圆）与约束 x + y = 4（直线）相切处为最值点',
      annotations: [{ x: 2, label: '相切点 (2,2)' }],
    },
    keyFormulas: [
      { name: '拉格朗日函数', formula: 'L = f(x, y) + \\lambda\\, g(x, y)', usage: '把条件极值转化为无约束极值' },
      { name: '驻点方程组', formula: '\\frac{\\partial L}{\\partial x}=0,\\ \\frac{\\partial L}{\\partial y}=0,\\ \\frac{\\partial L}{\\partial \\lambda}=0', usage: '解出所有候选点后再代入比较' },
      { name: '梯度共线条件', formula: '\\nabla f = -\\lambda\\, \\nabla g', usage: '理解几何意义：等高线与约束曲线相切' },
    ],
    commonMistakes: [
      { mistake: '忘记对 λ 本身求偏导（即补上约束方程）', correction: '第三个方程 ∂L/∂λ = 0 正是 g = 0，必须列出并参与求解' },
      { mistake: '把候选点直接当作最值，不做比较', correction: '驻点方程组解出的都是候选点，需逐一比较（可能还有边界/端点）' },
      { mistake: '对拉格朗日函数求二阶导来判极值', correction: '条件极值的二阶判定需要用到边界上的二阶微分（受限海森矩阵），常规 Hessian 判别法不适用' },
    ],
    detailedNotes: [
      '拉格朗日乘数法把"带约束的优化"转化为"无约束的驻点方程组"。几何上，极值点处目标函数的等高线与约束曲线相切：切点处的梯度互相平行，这正是 ∂L 各偏导为零的几何来源。',
      'λ 的数值有明确解释：若把约束常数 c 提高一个微小量，最优目标值近似增加 λ·dc。因此 λ 也被称为"影子价格"，在经济学、工程学中用于评估资源的边际价值。',
      '对多约束问题 g₁ = 0, g₂ = 0，只需在 L 中叠加多个 λᵢgᵢ 项，驻点方程组维度相应增加。',
    ],
    resources: [
      { title: '拉格朗日乘数法（多元函数极值）', provider: 'Bilibili · 宋浩老师', url: 'https://search.bilibili.com/all?keyword=%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E4%B9%98%E6%95%B0%E6%B3%95', kind: 'video' },
      { title: 'Lagrange multipliers — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/multivariable-calculus/applications-of-multivariable-derivatives/lagrange-multipliers', kind: 'video' },
    ],
  },

  {
    id: 'calc2-directional-gradient',
    trackId: 'calc2',
    title: '方向导数与梯度',
    duration: 40,
    prerequisites: ['calc2-partial'],
    objectives: [
      '理解方向导数的几何意义',
      '掌握梯度的定义与基本性质',
      '会用梯度分析函数增长最快的方向',
    ],
    intuition: [
      '偏导数是沿坐标轴方向的变化率，方向导数则是沿任意单位向量方向的变化率——它衡量"朝某个方向走一小步，函数变多少"。',
      '梯度把各方向信息打包成一个向量：它的方向是函数增长最快的方向，模长是那个方向的增长率。等高线越密的地方，梯度越大。',
    ],
    principles: [
      {
        title: '方向导数',
        body: '函数沿单位向量 u 的方向导数，等于梯度与 u 的点积。',
        formula: '\\frac{\\partial f}{\\partial \\mathbf{u}} = \\nabla f \\cdot \\mathbf{u}',
      },
      {
        title: '梯度',
        body: '梯度是由各偏导数组成的向量，既有方向又有大小。',
        formula: '\\nabla f = \\left( \\frac{\\partial f}{\\partial x},\\ \\frac{\\partial f}{\\partial y} \\right)',
      },
      {
        title: '梯度方向的性质',
        body: '沿梯度方向增长最快，逆梯度方向下降最快，与梯度垂直的方向函数值不变。',
        formula: '\\max_{\\lVert \\mathbf{u} \\rVert = 1} \\frac{\\partial f}{\\partial \\mathbf{u}} = \\lVert \\nabla f \\rVert',
      },
    ],
    examples: [
      {
        prompt: 'f(x, y) = x² + y²，求在点 (1, 2) 处的梯度，以及沿方向 (1, 0) 的方向导数。',
        steps: [
          'fₓ = 2x，f_y = 2y，故 ∇f(1, 2) = (2, 4)。',
          '沿 (1, 0) 的方向导数 = ∇f·(1, 0) = 2×1 + 4×0 = 2。',
        ],
        answer: '∇f = (2, 4)；沿 x 轴方向的方向导数为 2',
      },
      {
        prompt: 'f(x, y) = x²y，求在点 (1, 1) 处增长最快的方向。',
        steps: [
          'fₓ = 2xy，f_y = x²，故 ∇f(1, 1) = (2, 1)。',
          '增长最快方向即梯度方向 (2, 1)。',
        ],
        answer: '(2, 1)',
      },
    ],
    exercises: [
      {
        id: 'dg-e1', topic: 'gradient', difficulty: 'basic', type: 'choice',
        prompt: '梯度向量 ∇f 的方向是？',
        options: [
          { id: 'a', label: '函数增长最快的方向' },
          { id: 'b', label: '函数下降最快的方向' },
          { id: 'c', label: '与等高线平行的方向' },
          { id: 'd', label: '任意方向' },
        ],
        answer: 'a',
        solution: ['梯度指向函数值增加最快的方向，这是梯度的核心性质。'],
      },
      {
        id: 'dg-e2', topic: 'gradient', difficulty: 'basic', type: 'number',
        prompt: 'f(x, y) = x + 2y，在任意点的梯度是 (1, b)，求 b。',
        answer: 2,
        solution: ['∂f/∂y = 2，故梯度为 (1, 2)，b = 2。'],
      },
      {
        id: 'dg-e3', topic: 'directional-derivative', difficulty: 'advanced', type: 'choice',
        prompt: '函数在某点沿哪个方向的方向导数为 0？',
        options: [
          { id: 'a', label: '与梯度垂直的方向' },
          { id: 'b', label: '与梯度同向' },
          { id: 'c', label: '与梯度反向' },
          { id: 'd', label: '任意方向' },
        ],
        answer: 'a',
        solution: ['方向导数 = ∇f·u，与梯度垂直时点积为 0，函数值沿等高线不变。'],
      },
      {
        id: 'dg-e4', topic: 'gradient', difficulty: 'advanced', type: 'number',
        prompt: 'f(x, y) = x² + y² 在点 (1, 1) 处梯度的模长 |∇f| = ？',
        formula: '\\lVert \\nabla f \\rVert = \\sqrt{2^2 + 2^2}',
        answer: 2.828,
        tolerance: 0.01,
        solution: ['∇f = (2, 2)，模长 = √(4 + 4) = 2√2 ≈ 2.828。'],
      },
    ],
    quiz: [
      {
        id: 'dg-q1', topic: 'directional-derivative', difficulty: 'basic', type: 'choice',
        prompt: 'f(x, y) = xy 在 (1, 1) 处沿方向 (1, 1)/√2 的方向导数 = ？',
        options: [
          { id: 'a', label: '√2' },
          { id: 'b', label: '1' },
          { id: 'c', label: '2' },
          { id: 'd', label: '0' },
        ],
        answer: 'a',
        solution: ['∇f = (y, x) = (1, 1)，与 u 的点积 = 1·(1/√2) + 1·(1/√2) = 2/√2 = √2。'],
      },
    ],
    resources: [
      { title: '方向导数与梯度（多元微积分）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%96%B9%E5%90%91%E5%AF%BC%E6%95%B0%20%E6%A2%AF%E5%BA%A6', kind: 'video' },
      { title: 'Gradient and directional derivatives — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/gradient-and-directional-derivatives', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '方向向量未单位化就与梯度点积。', correction: '方向导数公式要求 u 是单位向量，先归一化。' },
      { mistake: '把梯度方向当成下降方向。', correction: '梯度是增长方向，下降要用 −∇f。' },
    ],
    keyFormulas: [
      { name: '方向导数', formula: '∂f/∂u = ∇f·u', usage: '任意方向的瞬时变化率。' },
      { name: '梯度', formula: '∇f = (fₓ, f_y)', usage: '增长最快方向与最大增长率。' },
    ],
  },

  {
    id: 'calc2-triple-integral',
    trackId: 'calc2',
    title: '三重积分',
    duration: 45,
    prerequisites: ['calc2-double-integral'],
    objectives: [
      '理解三重积分的体积分意义',
      '掌握直角坐标系下的先一后二/先二后一法',
      '掌握柱面坐标与球面坐标变换',
    ],
    intuition: [
      '三重积分把二重积分推广到三维：把立体切成小方块，每块的"贡献"= 被积函数 × 体积，再全部累加。',
      '柱坐标适合绕 z 轴旋转对称的立体，球坐标适合球对称的立体——坐标系选对了，积分从噩梦变甜点。',
    ],
    principles: [
      {
        title: '三重积分的定义',
        body: '被积函数 f 在空间区域 Ω 上，对体积微元累加。',
        formula: '\\iiint_\\Omega f(x, y, z)\\,dV = \\lim_{n \\to \\infty} \\sum_{i} f(x_i, y_i, z_i)\\,\\Delta V',
      },
      {
        title: '先一后二法',
        body: '固定 (x, y)，先对 z 从下曲面到上曲面积分，再在 xy 平面的投影区域上做二重积分。',
        formula: '\\iiint_\\Omega f\\,dV = \\iint_D \\left[ \\int_{z_1(x,y)}^{z_2(x,y)} f\\,dz \\right] dx\\,dy',
      },
      {
        title: '球面坐标变换',
        body: '引入 (r, φ, θ)，体积元带因子 r² sinφ。',
        formula: 'x = r\\sin\\varphi\\cos\\theta,\\ y = r\\sin\\varphi\\sin\\theta,\\ z = r\\cos\\varphi;\\quad dV = r^2 \\sin\\varphi\\,dr\\,d\\varphi\\,d\\theta',
      },
    ],
    examples: [
      {
        prompt: '求 ∫∫∫_Ω 1 dV，其中 Ω 是单位立方体 [0, 1]³。',
        steps: [
          '写成累次积分：∫₀¹∫₀¹∫₀¹ 1 dz dy dx。',
          '逐层积分，每层结果都是 1。',
          '结果为 1，正是单位立方体的体积。',
        ],
        answer: '1',
      },
      {
        prompt: '用球面坐标求半径为 R 的球的体积。',
        steps: [
          'V = ∫₀^π ∫₀^(2π) ∫₀^R r² sinφ dr dθ dφ。',
          '先积 r 得 R³/3，再积 θ 得 2π，再积 φ 得 ∫₀^π sinφ dφ = 2。',
          'V = (R³/3)·(2π)·2 = 4πR³/3。',
        ],
        answer: '4πR³/3',
      },
    ],
    exercises: [
      {
        id: 'ti-e1', topic: 'triple-integral', difficulty: 'basic', type: 'choice',
        prompt: '∫∫∫_Ω 1 dV 在区域 Ω 上等于？',
        options: [
          { id: 'a', label: 'Ω 的体积' },
          { id: 'b', label: 'Ω 的表面积' },
          { id: 'c', label: '0' },
          { id: 'd', label: 'Ω 的边界长度' },
        ],
        answer: 'a',
        solution: ['被积函数恒为 1 的三重积分恰好是区域体积。'],
      },
      {
        id: 'ti-e2', topic: 'triple-integral', difficulty: 'basic', type: 'number',
        prompt: '求单位立方体 [0, 1]³ 的体积（即 ∫∫∫ 1 dV 的值）。',
        answer: 1,
        solution: ['边长为 1 的立方体体积为 1。'],
      },
      {
        id: 'ti-e3', topic: 'spherical-coords', difficulty: 'advanced', type: 'choice',
        prompt: '球面坐标中的体积元 dV = ？',
        options: [
          { id: 'a', label: 'r² sinφ dr dφ dθ' },
          { id: 'b', label: 'r dr dφ dθ' },
          { id: 'c', label: 'r² dr dφ dθ' },
          { id: 'd', label: 'sinφ dr dφ dθ' },
        ],
        answer: 'a',
        solution: ['球面坐标的雅可比因子是 r² sinφ。'],
      },
      {
        id: 'ti-e4', topic: 'triple-integral', difficulty: 'advanced', type: 'number',
        prompt: '半径为 1 的球体积是 4π/3，其数值约为多少？（保留三位小数）',
        answer: 4.189,
        tolerance: 0.001,
        solution: ['4π/3 ≈ 4.18879。'],
      },
    ],
    quiz: [
      {
        id: 'ti-q1', topic: 'cylindrical-coords', difficulty: 'basic', type: 'choice',
        prompt: '柱面坐标（x = r cosθ, y = r sinθ, z = z）下，体积元 dV = ？',
        options: [
          { id: 'a', label: 'r dr dθ dz' },
          { id: 'b', label: 'r² dr dθ dz' },
          { id: 'c', label: 'dr dθ dz' },
          { id: 'd', label: 'r³ dr dθ dz' },
        ],
        answer: 'a',
        solution: ['柱面坐标的雅可比因子是 r，故 dV = r dr dθ dz。'],
      },
    ],
    resources: [
      { title: '三重积分与坐标变换', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E4%B8%89%E9%87%8D%E7%A7%AF%E5%88%86', kind: 'video' },
      { title: 'Triple integrals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/multivariable-calculus/integrating-multivariable-functions/triple-integrals', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '三重积分书写顺序与积分限对应错位。', correction: '从内到外逐层书写，最内层积分限可依赖外层变量。' },
      { mistake: '球面坐标忘记 r² sinφ 因子。', correction: '坐标变换必带雅可比行列式，球坐标是 r² sinφ。' },
    ],
    keyFormulas: [
      { name: '球体积', formula: 'V = 4πR³/3', usage: '球对称区域的体积。' },
      { name: '球坐标体积元', formula: 'dV = r² sinφ dr dφ dθ', usage: '球对称积分换元。' },
    ],
  },

  {
    id: 'calc2-line-surface',
    trackId: 'calc2',
    title: '曲线积分与曲面积分',
    duration: 45,
    prerequisites: ['calc2-triple-integral'],
    objectives: [
      '理解第一类曲线积分的几何意义',
      '掌握第二类曲线积分与格林公式',
      '了解高斯公式与散度的意义',
    ],
    intuition: [
      '第一类曲线积分是"沿曲线加总标量"，比如求一根弯曲铁丝的总质量；第二类曲线积分是"沿曲线累加向量场的功"，比如水流推动小船。',
      '格林公式是平面版的"内外换算法"：把沿封闭曲线的积分换成内部区域的二重积分，让复杂边界计算变简单。',
    ],
    principles: [
      {
        title: '第一类曲线积分（对弧长）',
        body: '把 ds 用参数化后的切向量长度表达，将曲线积分化为定积分。',
        formula: '\\int_L f(x, y)\\,ds = \\int_a^b f(x(t), y(t))\\sqrt{x\'^2 + y\'^2}\\,dt',
      },
      {
        title: '第二类曲线积分（对坐标）',
        body: '向量场 P dx + Q dy 沿曲线的累加，代表做功。',
        formula: 'W = \\int_L P\\,dx + Q\\,dy',
      },
      {
        title: '格林公式',
        body: '平面封闭曲线上的第二类积分，等于其内部区域上的二重积分。',
        formula: '\\oint_L P\\,dx + Q\\,dy = \\iint_D \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) dx\\,dy',
      },
    ],
    examples: [
      {
        prompt: '求 ∫_L (x² + y²) ds，其中 L 是从 (0, 0) 到 (1, 0) 的直线段。',
        steps: [
          '参数化：x = t, y = 0（0 ≤ t ≤ 1），ds = dt。',
          '被积函数 = t²，∫₀¹ t² dt = 1/3。',
        ],
        answer: '1/3',
      },
      {
        prompt: '用格林公式计算 ∮_L y dx − x dy，其中 L 是单位圆（逆时针）。',
        steps: [
          'P = y，Q = −x，则 ∂Q/∂x = −1，∂P/∂y = 1。',
          '格林公式：∮ = ∬_D (−1 − 1) dxdy = −2·面积。',
          '单位圆面积为 π，故结果为 −2π。',
        ],
        answer: '−2π',
      },
    ],
    exercises: [
      {
        id: 'ls-e1', topic: 'line-integral', difficulty: 'basic', type: 'choice',
        prompt: '第一类曲线积分 ∫_L f ds 的意义是？',
        options: [
          { id: 'a', label: '标量场沿曲线累积' },
          { id: 'b', label: '向量场沿曲线做功' },
          { id: 'c', label: '平面区域面积' },
          { id: 'd', label: '曲线与坐标轴围成的面积' },
        ],
        answer: 'a',
        solution: ['第一类曲线积分对弧长积分标量函数，如求曲线质量。'],
      },
      {
        id: 'ls-e2', topic: 'line-integral', difficulty: 'basic', type: 'number',
        prompt: 'L 是从 (0, 0) 到 (1, 0) 的线段，求 ∫_L 1 ds 的值。',
        answer: 1,
        solution: ['∫ ds 即弧长，线段长度为 1。'],
      },
      {
        id: 'ls-e3', topic: 'green-theorem', difficulty: 'advanced', type: 'choice',
        prompt: '格林公式把 ∮_L P dx + Q dy 化为？',
        options: [
          { id: 'a', label: '区域上的二重积分' },
          { id: 'b', label: '曲面上的曲面积分' },
          { id: 'c', label: '三重积分' },
          { id: 'd', label: '一个常数' },
        ],
        answer: 'a',
        solution: ['格林公式：∮_L P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dxdy。'],
      },
      {
        id: 'ls-e4', topic: 'green-theorem', difficulty: 'advanced', type: 'number',
        prompt: '用格林公式计算 ∮_L 0 dx + x dy（L 为单位圆），结果为 ∬_D 1 dxdy = ？',
        formula: '\\oint_L x\\,dy = \\iint_D (\\partial x / \\partial x)\\,dxdy = \\iint_D 1\\,dxdy',
        answer: 3.1416,
        tolerance: 0.001,
        solution: ['∂Q/∂x − ∂P/∂y = 1 − 0 = 1，二重积分为单位圆面积 π ≈ 3.1416。'],
      },
    ],
    quiz: [
      {
        id: 'ls-q1', topic: 'line-integral', difficulty: 'basic', type: 'choice',
        prompt: '第二类曲线积分 W = ∫_L P dx + Q dy 代表？',
        options: [
          { id: 'a', label: '向量场沿曲线做的功' },
          { id: 'b', label: '曲线弧长' },
          { id: 'c', label: '曲面积分' },
          { id: 'd', label: '区域面积' },
        ],
        answer: 'a',
        solution: ['第二类曲线积分对坐标积分，物理意义是做功。'],
      },
    ],
    resources: [
      { title: '曲线积分与格林公式', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%9B%B2%E7%BA%BF%E7%A7%AF%E5%88%86%20%E6%A0%BC%E6%9E%97%E5%85%AC%E5%BC%8F', kind: 'video' },
      { title: 'Line integrals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/multivariable-calculus/integrating-multivariable-functions/line-integrals', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把第一类与第二类曲线积分混为一谈。', correction: '第一类对弧长 (ds)，第二类对坐标 (dx, dy)，被积与参数化方式都不同。' },
      { mistake: '格林公式使用前没确认曲线封闭且取正向。', correction: '格林公式要求 L 是正向封闭曲线，P、Q 在区域内一阶连续可导。' },
    ],
    keyFormulas: [
      { name: '弧长微元', formula: 'ds = √(x′² + y′²) dt', usage: '第一类曲线积分换元。' },
      { name: '格林公式', formula: '∮ P dx + Q dy = ∬ (Qₓ − P_y) dxdy', usage: '平面曲线积分转二重积分。' },
    ],
  },

  {
    id: 'calc2-infinite-series',
    trackId: 'calc2',
    title: '无穷级数',
    duration: 45,
    prerequisites: ['calc2-partial'],
    objectives: [
      '理解数项级数收敛与发散的概念',
      '掌握正项级数的比较、比值与 p-级数判别法',
      '掌握交错级数判别法与幂级数初步',
    ],
    intuition: [
      '无穷级数问的是"无限多项的和有没有意义"：比如 1/2 + 1/4 + 1/8 + ⋯ 无限加下去恰好等于 1。',
      '收敛的核心是"部分和逼近一个极限"。比值判别法像"逐项等比缩水"：每项都被前一项乘以一个小于 1 的比例，整体就被压住、收敛了。',
    ],
    principles: [
      {
        title: '几何级数',
        body: '公比绝对值小于 1 时收敛，和可用公式求。',
        formula: '\\sum_{n=0}^{\\infty} ar^n = \\frac{a}{1 - r},\\qquad |r| < 1',
      },
      {
        title: '比值判别法',
        body: '相邻项比值的极限小于 1 收敛，大于 1 发散，等于 1 时方法失效。',
        formula: '\\rho = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|:\\quad \\rho < 1 \\Rightarrow \\text{收敛},\\ \\rho > 1 \\Rightarrow \\text{发散}',
      },
      {
        title: 'p-级数与调和级数',
        body: 'p ≤ 1 时发散，p > 1 时收敛；调和级数（p = 1）是最经典的发散级数。',
        formula: '\\sum_{n=1}^{\\infty} \\frac{1}{n^p}\\ \\text{收敛} \\iff p > 1',
      },
    ],
    examples: [
      {
        prompt: '判断级数 Σ (1/3)ⁿ（n 从 0 起）是否收敛，并求其和。',
        steps: [
          '这是几何级数，公比 r = 1/3，|r| < 1，收敛。',
          '和 = a/(1 − r) = 1/(1 − 1/3) = 3/2。',
        ],
        answer: '收敛，和为 3/2',
      },
      {
        prompt: '判断调和级数 Σ 1/n（n ≥ 1）是否收敛。',
        steps: [
          '对应 p-级数，p = 1。',
          'p ≤ 1 时级数发散。',
          '故调和级数发散。',
        ],
        answer: '发散',
      },
    ],
    exercises: [
      {
        id: 'is-e1', topic: 'series', difficulty: 'basic', type: 'choice',
        prompt: '几何级数 Σ (1/2)ⁿ（n 从 0 起）的和是？',
        options: [
          { id: 'a', label: '2' },
          { id: 'b', label: '1' },
          { id: 'c', label: '3/2' },
          { id: 'd', label: '发散' },
        ],
        answer: 'a',
        solution: ['S = 1/(1 − 1/2) = 2。'],
      },
      {
        id: 'is-e2', topic: 'series', difficulty: 'basic', type: 'number',
        prompt: '级数 Σ (1/2)ⁿ 收敛，其公比 r 是多少？',
        answer: 0.5,
        tolerance: 0.001,
        solution: ['每一项是前一项的 1/2 倍，故 r = 1/2 = 0.5。'],
      },
      {
        id: 'is-e3', topic: 'p-series', difficulty: 'advanced', type: 'choice',
        prompt: '级数 Σ 1/n²（n ≥ 1）的敛散性是？',
        options: [
          { id: 'a', label: '收敛（p = 2 > 1）' },
          { id: 'b', label: '发散' },
          { id: 'c', label: '条件收敛' },
          { id: 'd', label: '无法判断' },
        ],
        answer: 'a',
        solution: ['这是 p-级数，p = 2 > 1，收敛。'],
      },
      {
        id: 'is-e4', topic: 'ratio-test', difficulty: 'advanced', type: 'number',
        prompt: '比值判别法中，若相邻项比值的极限为 0.5，则该级数收敛（填 1）还是发散（填 0）？',
        answer: 1,
        solution: ['比值极限 0.5 < 1，由比值判别法级数收敛，故填 1。'],
      },
    ],
    quiz: [
      {
        id: 'is-q1', topic: 'harmonic-series', difficulty: 'basic', type: 'choice',
        prompt: '调和级数 Σ 1/n（n ≥ 1）的敛散性是？',
        options: [
          { id: 'a', label: '发散' },
          { id: 'b', label: '收敛且和为 1' },
          { id: 'c', label: '收敛且和为 e' },
          { id: 'd', label: '收敛且和为 2' },
        ],
        answer: 'a',
        solution: ['调和级数是 p-级数 p = 1 的情形，发散。'],
      },
    ],
    resources: [
      { title: '无穷级数（正项级数判别法）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%97%A0%E7%A9%B7%E7%BA%A7%E6%95%B0', kind: 'video' },
      { title: 'Infinite series — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/integral-calculus/ic-series', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '误以为项趋向 0 就必然收敛。', correction: '通项趋于 0 是收敛的必要条件而非充分条件（调和级数反例）。' },
      { mistake: '比值判别法得到极限等于 1 时下结论。', correction: 'ρ = 1 时比值判别法失效，改用比较或积分判别法。' },
    ],
    keyFormulas: [
      { name: '几何级数和', formula: 'Σ arⁿ = a/(1−r)', usage: '公比 |r| < 1 时求和。' },
      { name: 'p-级数', formula: 'Σ 1/nᵖ 收敛 ⇔ p > 1', usage: '正项级数快速判断。' },
    ],
    detailedNotes: [
      '判断敛散性先看通项是否趋于 0，不趋于 0 直接发散。',
      '交错级数用莱布尼茨判别法：单调趋于 0 即条件收敛。',
    ],
  },

  // ── 第五阶：线性代数 ─────────────────────────────────────────────
  {
    id: 'linalg-vectors',
    trackId: 'linalg',
    title: '向量与空间',
    duration: 45,
    prerequisites: ['bridge-algebra'],
    objectives: ['理解向量的几何与代数意义', '掌握向量加减与数量积', '会用数量积求夹角'],
    intuition: [
      '向量是"有方向的位移"：既可以画成箭头，也可以写成坐标列表。代数化之后，几何问题就变成了计算问题。',
      '数量积（点积）度量两个向量"同向的程度"：结果为正且大，说明方向接近；为零则互相垂直——这是判断垂直最方便的工具。',
    ],
    principles: [
      {
        title: '向量的线性运算',
        body: '向量加法对应位移合成，数乘对应缩放，按分量逐位计算。',
        formula: '\\vec{a} + \\vec{b} = (a_1+b_1,\\ a_2+b_2,\\ a_3+b_3)',
      },
      {
        title: '数量积',
        body: '对应分量相乘再相加；等于模长乘积乘以夹角余弦。',
        formula: '\\vec{a} \\cdot \\vec{b} = \\sum a_i b_i = |\\vec{a}|\\,|\\vec{b}|\\cos\\theta',
      },
      {
        title: '垂直判定',
        body: '两非零向量垂直当且仅当数量积为零。',
        formula: '\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0',
      },
    ],
    examples: [
      {
        prompt: '求 a = (1, 2) 与 b = (3, −1) 的数量积，并判断是否垂直。',
        steps: ['a·b = 1×3 + 2×(−1) = 3 − 2 = 1。', '结果非零，故不垂直。'],
        answer: 'a·b = 1，不垂直',
      },
    ],
    exercises: [
      {
        id: 'lv-ex1', topic: 'vectors', difficulty: 'basic', type: 'number',
        prompt: 'a = (2, 1)，b = (1, 3)，求 a·b。',
        answer: 5, tolerance: 0.0001,
        solution: ['2×1 + 1×3 = 5。'],
      },
      {
        id: 'lv-ex2', topic: 'vectors', difficulty: 'basic', type: 'choice',
        prompt: '向量 a = (3, 4) 的模长是？',
        options: [
          { id: 'a', label: '5' },
          { id: 'b', label: '7' },
          { id: 'c', label: '25' },
          { id: 'd', label: '√7' },
        ],
        answer: 'a',
        solution: ['|a| = √(9 + 16) = 5。'],
      },
      {
        id: 'lv-ex3', topic: 'vectors', difficulty: 'advanced', type: 'number',
        prompt: 'a = (1, 0)，b = (1, 1)，求 a 与 b 夹角的余弦值（保留三位小数）。',
        answer: .707, tolerance: .001,
        solution: ['cosθ = (1)/(1 × √2) ≈ 0.707。'],
      },
      {
        id: 'lv-ex4', topic: 'vectors', difficulty: 'basic', type: 'choice',
        prompt: 'a = (1, 2)，b = (3, −1)，求 a + b。',
        options: [
          { id: 'a', label: '(4, 1)' },
          { id: 'b', label: '(1, 4)' },
          { id: 'c', label: '(−2, 3)' },
          { id: 'd', label: '(2, 3)' },
        ],
        answer: 'a',
        solution: ['a + b = (1+3, 2−1) = (4, 1)。'],
      },
      {
        id: 'lv-ex5', topic: 'vectors', difficulty: 'advanced', type: 'choice',
        prompt: '若 a = (2, k) 与 b = (1, −3) 垂直，则 k = ？',
        options: [
          { id: 'a', label: '2/3' },
          { id: 'b', label: '−2/3' },
          { id: 'c', label: '6' },
          { id: 'd', label: '−6' },
        ],
        answer: 'a',
        solution: ['a·b = 2×1 + k×(−3) = 0 ⇒ k = 2/3。'],
      },
      {
        id: 'lv-ex6', topic: 'vectors', difficulty: 'basic', type: 'number',
        prompt: 'a = (1, 2, 2)，求 |a|（模长，保留三位小数）。',
        answer: 3, tolerance: 0.0001,
        solution: ['|a| = √(1² + 2² + 2²) = √9 = 3。'],
      },
      {
        id: 'lv-ex7', topic: 'vectors', difficulty: 'advanced', type: 'choice',
        prompt: 'a = (1, 0)，b = (0, 1)，则 a 与 b 的夹角是？',
        options: [
          { id: 'a', label: '90°（π/2）' },
          { id: 'b', label: '0°' },
          { id: 'c', label: '45°（π/4）' },
          { id: 'd', label: '180°（π）' },
        ],
        answer: 'a',
        solution: ['a·b = 1×0 + 0×1 = 0，cosθ = 0/(1×1) = 0，θ = π/2 = 90°。'],
      },
      {
        id: 'lv-ex8', topic: 'vectors', difficulty: 'advanced', type: 'number',
        prompt: 'a = (3, 4)，b = (1, 2)，求 a 在 b 方向上的投影长度 a·b / |b|（保留三位小数）。',
        answer: 4.919, tolerance: 0.001,
        solution: ['a·b = 3×1 + 4×2 = 11。', '|b| = √(1 + 4) = √5 ≈ 2.236。', '投影长度 = 11 / 2.236 ≈ 4.919。'],
      },
    ],
    quiz: [
      {
        id: 'lv-q1', topic: 'vectors', difficulty: 'basic', type: 'choice',
        prompt: '若 a·b = 0 且 a、b 均非零向量，则它们？',
        options: [
          { id: 'a', label: '互相垂直' },
          { id: 'b', label: '方向相同' },
          { id: 'c', label: '方向相反' },
          { id: 'd', label: '模长相等' },
        ],
        answer: 'a',
        solution: ['数量积为零 ⟺ 垂直。'],
      },
      {
        id: 'lv-q2', topic: 'vectors', difficulty: 'basic', type: 'number',
        prompt: 'a = (1, 2)，则 3a 的第二个分量是？',
        answer: 6, tolerance: 0.0001,
        solution: ['3a = (3, 6)。'],
      },
    ],
    resources: [
      { title: '线性代数的本质 · 向量篇', provider: 'Bilibili · 3Blue1Brown', url: 'https://search.bilibili.com/all?keyword=%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0%E7%9A%84%E6%9C%AC%E8%B4%A8%20%E5%90%91%E9%87%8F', kind: 'video' },
      { title: 'Vectors — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces', kind: 'video' },
    ],
  },
  {
    id: 'linalg-matrices',
    trackId: 'linalg',
    title: '矩阵运算与线性变换',
    duration: 55,
    prerequisites: ['linalg-vectors'],
    objectives: ['掌握矩阵乘法', '理解矩阵即线性变换', '会求二阶逆矩阵'],
    intuition: [
      '矩阵不是一堆数字，而是一个"空间变换器"：它把整个平面旋转、拉伸或剪切。矩阵乘法就是两个变换的先后叠加。',
      '逆矩阵是"撤销变换"：若 A 把空间变成了某种样子，A⁻¹ 就把它变回去。行列式为零意味着空间被压扁，变换不可逆。',
    ],
    principles: [
      {
        title: '矩阵乘法',
        body: 'C = AB 的第 (i,j) 元素是 A 的第 i 行与 B 的第 j 列的数量积。',
        formula: 'c_{ij} = \\sum_k a_{ik} b_{kj}',
      },
      {
        title: '二阶行列式与逆矩阵',
        body: '二阶矩阵的行列式是缩放倍率；非零时可逆。',
        formula: 'A^{-1} = \\frac{1}{ad-bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
      },
      {
        title: '矩阵乘法不满足交换律',
        body: '变换的先后顺序影响结果：先旋转再剪切 ≠ 先剪切再旋转。',
        formula: 'AB \\ne BA \\ \\text{（一般情形）}',
      },
    ],
    examples: [
      {
        prompt: 'A = [[1,2],[3,4]]，B = [[0,1],[1,0]]，求 AB。',
        steps: ['第一行：c₁₁ = 1×0+2×1 = 2，c₁₂ = 1×1+2×0 = 1。', '第二行：c₂₁ = 3×0+4×1 = 4，c₂₂ = 3×1+4×0 = 3。'],
        answer: 'AB = [[2,1],[4,3]]',
      },
    ],
    exercises: [
      {
        id: 'lm-ex1', topic: 'matrices', difficulty: 'basic', type: 'number',
        prompt: 'A = [[2,0],[0,3]]，求 det A。',
        answer: 6, tolerance: 0.0001,
        solution: ['det = 2×3 − 0×0 = 6。'],
      },
      {
        id: 'lm-ex2', topic: 'matrices', difficulty: 'basic', type: 'choice',
        prompt: 'A 是 2×3 矩阵，B 是 3×4 矩阵，则 AB 的形状是？',
        options: [
          { id: 'a', label: '2×4' },
          { id: 'b', label: '3×3' },
          { id: 'c', label: '4×2' },
          { id: 'd', label: '无法相乘' },
        ],
        answer: 'a',
        solution: ['(2×3)(3×4) → 2×4，内维相同可乘。'],
      },
      {
        id: 'lm-ex3', topic: 'matrices', difficulty: 'advanced', type: 'number',
        prompt: 'A = [[1,2],[3,4]]，B = [[1,0],[0,1]]（单位阵），求 AB 的第 (2,1) 元素。',
        answer: 3, tolerance: 0.0001,
        solution: ['乘单位阵等于自身，AB = A，第 (2,1) 元素为 3。'],
      },
      {
        id: 'lm-ex4', topic: 'matrices', difficulty: 'basic', type: 'number',
        prompt: 'A = [[1,2],[3,4]]，求 det A。',
        answer: -2, tolerance: .0001,
        solution: ['det = 1×4 − 2×3 = −2。'],
      },
      {
        id: 'lm-ex5', topic: 'matrices', difficulty: 'advanced', type: 'choice',
        prompt: '矩阵 A = [[1,2],[3,4]] 的逆矩阵 A⁻¹ 中，元素 (1,2) 是？',
        options: [
          { id: 'a', label: '−1' },
          { id: 'b', label: '1' },
          { id: 'c', label: '−2' },
          { id: 'd', label: '2' },
        ],
        answer: 'b',
        solution: ['A⁻¹ = (1/det A)·[[4,−2],[−3,1]]，元素 (1,2) 为 −2/(−2) = 1。'],
      },
      {
        id: 'lm-ex6', topic: 'matrices', difficulty: 'basic', type: 'number',
        prompt: '矩阵 A = [[1,1],[0,1]]，B = [[1,0],[1,1]]，求 det(AB)。',
        answer: 1, tolerance: 0.0001,
        solution: ['det(AB) = det A × det B = 1 × 1 = 1。'],
      },
      {
        id: 'lm-ex7', topic: 'matrices', difficulty: 'advanced', type: 'choice',
        prompt: 'A = [[0,1],[1,0]] 表示什么线性变换？',
        options: [
          { id: 'a', label: '关于 y=x 的镜像反射' },
          { id: 'b', label: '逆时针旋转 90°' },
          { id: 'c', label: '沿 x 轴拉伸 2 倍' },
          { id: 'd', label: 'x 和 y 都取相反数' },
        ],
        answer: 'a',
        solution: ['A 作用在 (x, y) 上得 (y, x)，即交换两坐标，是关于直线 y=x 的镜像反射。'],
      },
      {
        id: 'lm-ex8', topic: 'matrices', difficulty: 'advanced', type: 'number',
        prompt: 'A = [[2,1],[1,2]]，求 (A²) 的迹 tr(A²)（即对角线元素之和）。',
        answer: 10, tolerance: 0.0001,
        solution: ['A² = [[2,1],[1,2]]×[[2,1],[1,2]] = [[5,4],[4,5]]。', 'tr(A²) = 5 + 5 = 10。'],
      },
    ],
    quiz: [
      {
        id: 'lm-q1', topic: 'matrices', difficulty: 'basic', type: 'number',
        prompt: 'det([[5,2],[1,3]]) = ？',
        answer: 13, tolerance: 0.0001,
        solution: ['5×3 − 2×1 = 13。'],
      },
      {
        id: 'lm-q2', topic: 'matrices', difficulty: 'basic', type: 'choice',
        prompt: '矩阵 A 可逆的充要条件是？',
        options: [
          { id: 'a', label: 'det A ≠ 0' },
          { id: 'b', label: 'A 是方阵' },
          { id: 'c', label: 'A 的所有元素非零' },
          { id: 'd', label: 'A 是对称矩阵' },
        ],
        answer: 'a',
        solution: ['行列式非零 ⟺ 可逆。'],
      },
    ],
    resources: [
      { title: '线性代数的本质 · 矩阵与线性变换', provider: 'Bilibili · 3Blue1Brown', url: 'https://search.bilibili.com/all?keyword=%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0%E7%9A%84%E6%9C%AC%E8%B4%A8%20%E7%9F%A9%E9%98%B5', kind: 'video' },
      { title: 'Matrix transformations — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra/matrix-transformations', kind: 'video' },
    ],
  },
  {
    id: 'linalg-eigen',
    trackId: 'linalg',
    title: '特征值与特征向量',
    duration: 60,
    prerequisites: ['linalg-matrices'],
    objectives: ['理解特征值的几何意义', '会求二阶矩阵的特征值', '了解对角化的思想'],
    intuition: [
      '变换中总有一些特殊方向"只被缩放、不被转向"——这些方向上的向量就是特征向量，缩放的倍数就是特征值。找到它们，就抓住了变换的主轴。',
      '对角化是把复杂变换"旋转到主轴上再看"：在特征向量组成的坐标系里，变换只是沿各轴独立缩放，计算（如矩阵的 n 次幂）瞬间简化。',
    ],
    principles: [
      {
        title: '特征值与特征向量的定义',
        body: '非零向量 v 被 A 作用后仍与自身共线，倍数 λ 即为特征值。',
        formula: 'A\\vec{v} = \\lambda \\vec{v}\\quad (\\vec{v} \\ne \\vec{0})',
      },
      {
        title: '特征方程',
        body: '特征值满足特征多项式等于零，二阶时是关于 λ 的二次方程。',
        formula: '\\det(A - \\lambda I) = 0',
      },
      {
        title: '对角化',
        body: '若有 n 个线性无关特征向量，则 A 可对角化为特征值组成的对角阵。',
        formula: 'A = P \\Lambda P^{-1}',
      },
    ],
    examples: [
      {
        prompt: '求 A = [[2,1],[1,2]] 的特征值。',
        steps: ['特征方程：(2−λ)² − 1 = 0。', '2−λ = ±1。', 'λ = 1 或 λ = 3。'],
        answer: 'λ₁ = 1，λ₂ = 3',
      },
    ],
    exercises: [
      {
        id: 'le-ex1', topic: 'eigenvalues', difficulty: 'basic', type: 'number',
        prompt: '对角矩阵 diag(3, 5) 的最大特征值是？',
        answer: 5, tolerance: 0.0001,
        solution: ['对角阵的特征值即对角元：3 和 5。'],
      },
      {
        id: 'le-ex2', topic: 'eigenvalues', difficulty: 'basic', type: 'choice',
        prompt: '若 Av = 4v（v ≠ 0），则 4 称为 A 的？',
        options: [
          { id: 'a', label: '特征值' },
          { id: 'b', label: '行列式' },
          { id: 'c', label: '秩' },
          { id: 'd', label: '迹' },
        ],
        answer: 'a',
        solution: ['由定义，4 是特征值，v 是对应特征向量。'],
      },
      {
        id: 'le-ex3', topic: 'eigenvalues', difficulty: 'advanced', type: 'number',
        prompt: 'A = [[3,0],[0,−2]] 的两个特征值之和（即迹）是？',
        answer: 1, tolerance: 0.0001,
        solution: ['特征值 3 与 −2，和为 1，等于迹 3 + (−2)。'],
      },
      {
        id: 'le-ex4', topic: 'eigenvalues', difficulty: 'basic', type: 'number',
        prompt: '求 A = [[2,1],[1,2]] 的较大特征值。',
        answer: 3, tolerance: .0001,
        solution: ['特征方程 (2−λ)²=1，λ=1 或 3，较大者为 3。'],
      },
      {
        id: 'le-ex5', topic: 'eigenvalues', difficulty: 'advanced', type: 'choice',
        prompt: 'A = [[4,1],[2,3]] 的特征值之积是？',
        options: [
          { id: 'a', label: '10' },
          { id: 'b', label: '7' },
          { id: 'c', label: '12' },
          { id: 'd', label: '−10' },
        ],
        answer: 'a',
        solution: ['特征值之积等于行列式：4×3 − 1×2 = 10。'],
      },
      {
        id: 'le-ex6', topic: 'eigenvalues', difficulty: 'basic', type: 'number',
        prompt: 'A = [[3,0],[0,3]] 的特征值是什么？写出较大的那个。',
        answer: 3, tolerance: 0.0001,
        solution: ['A = 3I 是纯量矩阵，其特征值就是 3（二重）。'],
      },
      {
        id: 'le-ex7', topic: 'eigenvalues', difficulty: 'advanced', type: 'choice',
        prompt: '若 A 可对角化且特征值为 2 和 −2，则 det A = ？',
        options: [
          { id: 'a', label: '−4' },
          { id: 'b', label: '4' },
          { id: 'c', label: '0' },
          { id: 'd', label: '2' },
        ],
        answer: 'a',
        solution: ['det A = 特征值之积 = 2 × (−2) = −4。'],
      },
      {
        id: 'le-ex8', topic: 'eigenvalues', difficulty: 'advanced', type: 'number',
        prompt: 'A = [[2,1],[1,2]]，求特征值 λ₁ = 1，λ₂ = 3。特征向量 v₂ 对应 λ₂=3，满足 (A−3I)v=0，求 v₂ 的一个分量（取 v₂ = (1, x)，求 x）。',
        answer: 1, tolerance: 0.0001,
        solution: ['A−3I = [[−1,1],[1,−1]]，解 (A−3I)(1,x)ᵀ = 0。', '第一行：−1·1 + 1·x = 0 ⇒ x = 1。', '故 v₂ = (1, 1) 是 λ₂=3 的特征向量。'],
      },
    ],
    quiz: [
      {
        id: 'le-q1', topic: 'eigenvalues', difficulty: 'basic', type: 'number',
        prompt: 'A = [[1,2],[0,3]] 的较小特征值是？（上三角矩阵特征值即对角元）',
        answer: 1, tolerance: 0.0001,
        solution: ['上三角矩阵的特征值为对角元 1 和 3。'],
      },
      {
        id: 'le-q2', topic: 'eigenvalues', difficulty: 'basic', type: 'choice',
        prompt: '矩阵特征值的乘积等于它的？',
        options: [
          { id: 'a', label: '行列式' },
          { id: 'b', label: '迹' },
          { id: 'c', label: '秩' },
          { id: 'd', label: '范数' },
        ],
        answer: 'a',
        solution: ['特征值之积 = det A，之和 = 迹。'],
      },
    ],
    resources: [
      { title: '线性代数的本质 · 特征值与特征向量', provider: 'Bilibili · 3Blue1Brown', url: 'https://search.bilibili.com/all?keyword=%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0%E7%9A%84%E6%9C%AC%E8%B4%A8%20%E7%89%B9%E5%BE%81%E5%80%BC', kind: 'video' },
      { title: 'Eigenvalues and eigenvectors — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra/alternate-bases-eigen-everything', kind: 'video' },
    ],
  },

  {
    id: 'linalg-determinants',
    trackId: 'linalg',
    title: '行列式与线性方程组',
    duration: 40,
    prerequisites: ['linalg-matrices'],
    objectives: [
      '理解行列式的定义与展开方式',
      '掌握行列式的基本性质与计算',
      '会用行列式判断矩阵可逆性并求解方程组',
    ],
    intuition: [
      '行列式衡量线性变换"改变面积/体积的比例"：行列式为 0，意味着变换把空间压扁了，信息被压缩到更低维——对应的矩阵不可逆。',
      '按行展开是"分而治之"：把高阶行列式拆成低阶，一行一列地蚕食下去。',
      '|A| ≠ 0 ⇔ 方阵可逆 ⇔ 方程组 AX = b 有唯一解：行列式是这三件事的统一判据。',
    ],
    principles: [
      {
        title: '二阶行列式',
        body: '主对角线乘积减去副对角线乘积。',
        formula: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
      },
      {
        title: '行列式的性质',
        body: '交换两行（列）变号；某行乘以常数 k，行列式乘以 k；两行成比例则行列式为 0。',
        formula: '\\det(AB) = \\det A \\cdot \\det B;\\qquad \\det A = 0 \\iff A \\text{ 不可逆}',
      },
      {
        title: '按行（列）展开',
        body: '行列式等于某行元素乘以对应代数余子式之和，用于降阶计算。',
        formula: '\\det A = \\sum_j a_{ij}\\,A_{ij}',
      },
    ],
    examples: [
      {
        prompt: '计算行列式 |2 3; 1 4|。',
        steps: [
          '用对角线法则：2×4 − 3×1。',
          '= 8 − 3 = 5。',
        ],
        answer: '5',
      },
      {
        prompt: '判断矩阵 [[1, 2], [2, 4]] 是否可逆。',
        steps: [
          'det = 1×4 − 2×2 = 0。',
          '两行成比例，行列式为 0。',
          '矩阵不可逆。',
        ],
        answer: '不可逆',
      },
    ],
    exercises: [
      {
        id: 'ld-e1', topic: 'determinant', difficulty: 'basic', type: 'choice',
        prompt: '二阶行列式 |a b; c d| 等于？',
        options: [
          { id: 'a', label: 'ad − bc' },
          { id: 'b', label: 'ac − bd' },
          { id: 'c', label: 'ab − cd' },
          { id: 'd', label: 'a + d' },
        ],
        answer: 'a',
        solution: ['对角线法则：主对角乘积减副对角乘积，即 ad − bc。'],
      },
      {
        id: 'ld-e2', topic: 'determinant', difficulty: 'basic', type: 'number',
        prompt: '计算行列式 |3 1; 2 4| 的值。',
        answer: 10,
        solution: ['3×4 − 1×2 = 12 − 2 = 10。'],
      },
      {
        id: 'ld-e3', topic: 'invertibility', difficulty: 'advanced', type: 'choice',
        prompt: '若 det(A) = 0，则方阵 A ？',
        options: [
          { id: 'a', label: '不可逆' },
          { id: 'b', label: '必可逆' },
          { id: 'c', label: '必是零矩阵' },
          { id: 'd', label: '行数大于列数' },
        ],
        answer: 'a',
        solution: ['det A = 0 ⇔ A 不可逆，这是行列式的核心判据。'],
      },
      {
        id: 'ld-e4', topic: 'determinant', difficulty: 'advanced', type: 'number',
        prompt: '对角矩阵 diag(1, 2, 3) 的行列式是？',
        answer: 6,
        solution: ['对角阵行列式 = 对角元之积 = 1×2×3 = 6。'],
      },
    ],
    quiz: [
      {
        id: 'ld-q1', topic: 'determinant', difficulty: 'basic', type: 'choice',
        prompt: '矩阵 [[1, 2], [2, 4]] 的行列式是？',
        options: [
          { id: 'a', label: '0' },
          { id: 'b', label: '8' },
          { id: 'c', label: '−4' },
          { id: 'd', label: '5' },
        ],
        answer: 'a',
        solution: ['1×4 − 2×2 = 0。'],
      },
    ],
    resources: [
      { title: '行列式的本质（线性代数的本质）', provider: 'Bilibili · 3Blue1Brown 中字', url: 'https://search.bilibili.com/all?keyword=%E8%A1%8C%E5%88%97%E5%BC%8F%E7%9A%84%E6%9C%AC%E8%B4%A8', kind: 'video' },
      { title: 'Determinants — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/algebra-home/alg-matrices/alg-determinants', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把 3×3 行列式按对角线法则硬套二阶口诀。', correction: '对角线法则只适用于二阶；三阶需按行展开或用萨鲁斯法则。' },
      { mistake: '交换两行时忘记变号。', correction: '行变换会改变行列式符号，做一次交换写一次负号。' },
    ],
    keyFormulas: [
      { name: '二阶行列式', formula: 'ad − bc', usage: '2×2 矩阵快速求值。' },
      { name: '可逆判据', formula: 'det A ≠ 0 ⇔ 可逆', usage: '判断方阵是否可逆。' },
    ],
  },

  {
    id: 'linalg-vector-space',
    trackId: 'linalg',
    title: '向量空间与线性无关',
    duration: 40,
    prerequisites: ['linalg-vectors'],
    objectives: [
      '理解向量空间与子空间的定义',
      '掌握线性相关与线性无关的判断',
      '理解基、维数与坐标的关系',
    ],
    intuition: [
      '向量空间是"装满可加可乘向量的容器"：任意两个向量相加、任意向量乘以常数，结果都还在里面。',
      '基是空间的最小"骨架"：基里的向量彼此线性无关，却又能张成整个空间；维数就是基的规模。',
      '线性无关说"每根向量都不可由同伴拼出来"——少了任何一个，张成的空间都会变小。',
    ],
    principles: [
      {
        title: '向量空间',
        body: '对加法和数乘封闭，满足加法交换、结合、零元、负元与数乘分配律。',
        formula: '\\mathbf{u} + \\mathbf{v} \\in V,\\ c\\mathbf{u} \\in V;\\quad \\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}',
      },
      {
        title: '线性无关',
        body: '只有当所有系数全为 0 时，线性组合才等于零向量，则该组向量线性无关。',
        formula: 'c_1\\mathbf{v}_1 + \\cdots + c_k\\mathbf{v}_k = \\mathbf{0} \\Rightarrow c_1 = \\cdots = c_k = 0',
      },
      {
        title: '基与维数',
        body: '线性无关且能张成整个空间的向量组称为一组基，基中向量个数即维数。',
        formula: '\\dim V = \\#\\{\\text{基中向量}\\};\\qquad V = \\mathrm{span}\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_n\\}',
      },
    ],
    examples: [
      {
        prompt: '判断 (1, 0) 与 (0, 1) 是否线性无关，它们张成什么空间？',
        steps: [
          'c₁(1,0) + c₂(0,1) = (c₁, c₂) = (0, 0) ⇒ c₁ = c₂ = 0。',
          '只有零组合才得到零向量，故线性无关。',
          '它们张成整个 ℝ²，构成 ℝ² 的一组基。',
        ],
        answer: '线性无关，是 ℝ² 的一组基',
      },
      {
        prompt: '判断 (1, 1) 与 (2, 2) 是否线性无关。',
        steps: [
          '注意到 (2, 2) = 2(1, 1)。',
          '取 c₁ = 2、c₂ = −1，则 2(1,1) − (2,2) = (0,0) 且系数不全为 0。',
          '故线性相关。',
        ],
        answer: '线性相关',
      },
    ],
    exercises: [
      {
        id: 'vs-e1', topic: 'vector-space', difficulty: 'basic', type: 'choice',
        prompt: '向量空间要求对哪两种运算封闭？',
        options: [
          { id: 'a', label: '加法与数乘' },
          { id: 'b', label: '乘法与除法' },
          { id: 'c', label: '求导与积分' },
          { id: 'd', label: '内积与外积' },
        ],
        answer: 'a',
        solution: ['向量空间的定义核心是对向量加法与数乘封闭。'],
      },
      {
        id: 'vs-e2', topic: 'dimension', difficulty: 'basic', type: 'number',
        prompt: 'ℝ² 的维数是多少？',
        answer: 2,
        solution: ['ℝ² 的一组基（如 (1,0)、(0,1)）含 2 个向量，维数为 2。'],
      },
      {
        id: 'vs-e3', topic: 'linear-independence', difficulty: 'advanced', type: 'choice',
        prompt: '向量组 (1, 0) 与 (2, 0) 的线性相关性是？',
        options: [
          { id: 'a', label: '线性相关' },
          { id: 'b', label: '线性无关' },
          { id: 'c', label: '构成 ℝ² 的一组基' },
          { id: 'd', label: '无法判断' },
        ],
        answer: 'a',
        solution: ['(2,0) = 2(1,0)，两个向量共线，线性相关。'],
      },
      {
        id: 'vs-e4', topic: 'dimension', difficulty: 'advanced', type: 'number',
        prompt: 'ℝ³ 中一组基包含多少个向量？',
        answer: 3,
        solution: ['ℝ³ 的维数为 3，基中向量数等于维数。'],
      },
    ],
    quiz: [
      {
        id: 'vs-q1', topic: 'basis', difficulty: 'basic', type: 'choice',
        prompt: '下列哪组向量构成 ℝ² 的一组基？',
        options: [
          { id: 'a', label: '(1, 0) 与 (0, 1)' },
          { id: 'b', label: '(1, 1) 与 (2, 2)' },
          { id: 'c', label: '(1, 0) 与 (2, 0)' },
          { id: 'd', label: '只有 (1, 0)' },
        ],
        answer: 'a',
        solution: ['只有线性无关且能张成 ℝ² 的两个向量才能构成基，答案 a 是标准基。'],
      },
    ],
    resources: [
      { title: '向量空间与线性无关（线性代数）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%90%91%E9%87%8F%E7%A9%BA%E9%97%B4%20%E7%BA%BF%E6%80%A7%E6%97%A0%E5%85%B3', kind: 'video' },
      { title: 'Vector spaces — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把"线性相关"误判为"不成基"。', correction: '成基需同时满足线性无关与张成整个空间。' },
      { mistake: '只用两个向量是否成比例判断无关性。', correction: '多个向量要逐个判断"是否能由其余向量线性表示"。' },
    ],
    keyFormulas: [
      { name: '线性无关', formula: 'Σcᵢvᵢ = 0 ⇒ 所有 cᵢ = 0', usage: '判断向量组是否无关。' },
      { name: '维数', formula: 'dim V = 基中向量个数', usage: '空间规模度量。' },
    ],
  },

  {
    id: 'linalg-quadratic-forms',
    trackId: 'linalg',
    title: '二次型与特征值',
    duration: 40,
    prerequisites: ['linalg-eigen'],
    objectives: [
      '理解二次型的矩阵表示',
      '掌握正交变换化二次型为标准形',
      '会用特征值判断二次型的正定性',
    ],
    intuition: [
      '二次型把"平方与交叉项"打包成一个对称矩阵：xᵀAx 把代数式翻译成矩阵语言，特征是"对角线是平方项系数、交叉项均分到对称位置"。',
      '特征值告诉我们：换个坐标系（正交变换），二次型只剩平方项、没有交叉项——标准形把曲面的朝向"摆正"了。',
      '正定性决定曲面是"碗口朝上的盆"（正定）、"碗口朝下的盆"（负定）还是"马鞍"（不定）。',
    ],
    principles: [
      {
        title: '二次型的矩阵表示',
        body: '对称矩阵 A 满足 f(x) = xᵀAx，对角线放平方系数，交叉项系数均分到对称位置。',
        formula: 'f = a x_1^2 + 2b x_1 x_2 + c x_2^2 = \\begin{pmatrix} x_1 & x_2 \\end{pmatrix}\\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix}',
      },
      {
        title: '正交变换化为标准形',
        body: '存在正交变换使二次型只含平方项，对角元恰为矩阵的特征值。',
        formula: 'f = \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\cdots + \\lambda_n y_n^2',
      },
      {
        title: '正定性判定',
        body: '对称矩阵正定当且仅当所有特征值大于 0。',
        formula: 'f\\ \\text{正定} \\iff \\lambda_i > 0\\ \\forall i',
      },
    ],
    examples: [
      {
        prompt: '写出二次型 f = 3x² + 2xy + 4y² 对应的对称矩阵。',
        steps: [
          '对角线放 x²、y² 的系数 3 与 4。',
          '交叉项 2xy 的系数 2 均分到对称位置，各为 1。',
          '矩阵为 [[3, 1], [1, 4]]。',
        ],
        answer: '[[3, 1], [1, 4]]',
      },
      {
        prompt: '判断 f(x, y) = x² + y² 是否正定。',
        steps: [
          '对应矩阵 [[1, 0], [0, 1]]，特征值为 1、1。',
          '所有特征值均大于 0。',
          '故 f 正定。',
        ],
        answer: '正定',
      },
    ],
    exercises: [
      {
        id: 'qf-e1', topic: 'quadratic-form', difficulty: 'basic', type: 'choice',
        prompt: '二次型 x² + 4y² 对应的矩阵是？',
        options: [
          { id: 'a', label: '[[1, 0], [0, 4]]' },
          { id: 'b', label: '[[1, 4], [4, 1]]' },
          { id: 'c', label: '[[0, 0], [0, 0]]' },
          { id: 'd', label: '[[1, 2], [2, 4]]' },
        ],
        answer: 'a',
        solution: ['没有交叉项，矩阵为对角阵，对角元放平方系数 1 与 4。'],
      },
      {
        id: 'qf-e2', topic: 'quadratic-form', difficulty: 'basic', type: 'number',
        prompt: '二次型 f = 5x² + 3y² 的矩阵中，位于第 2 行第 2 列的元素是多少？',
        answer: 3,
        solution: ['(2,2) 对应 y² 的系数，即 3。'],
      },
      {
        id: 'qf-e3', topic: 'definiteness', difficulty: 'advanced', type: 'choice',
        prompt: '二次型 f = −x² − y² 的正定性是？',
        options: [
          { id: 'a', label: '负定（特征值均小于 0）' },
          { id: 'b', label: '正定' },
          { id: 'c', label: '不定' },
          { id: 'd', label: '半正定' },
        ],
        answer: 'a',
        solution: ['矩阵为 −I，特征值 −1、−1 均小于 0，负定。'],
      },
      {
        id: 'qf-e4', topic: 'quadratic-form', difficulty: 'advanced', type: 'number',
        prompt: '标准形 f = λ₁y₁² + λ₂y₂² 中 λ₁ = 2、λ₂ = 3，则矩阵对角元之和（迹）是？',
        answer: 5,
        solution: ['标准形对角元即特征值，迹 = λ₁ + λ₂ = 5。'],
      },
    ],
    quiz: [
      {
        id: 'qf-q1', topic: 'definiteness', difficulty: 'basic', type: 'choice',
        prompt: '对称矩阵 [[1, 0], [0, −1]] 对应的二次型属于？',
        options: [
          { id: 'a', label: '不定（有正有负特征值）' },
          { id: 'b', label: '正定' },
          { id: 'c', label: '负定' },
          { id: 'd', label: '半正定' },
        ],
        answer: 'a',
        solution: ['特征值为 1 与 −1，一正一负，为不定二次型。'],
      },
    ],
    resources: [
      { title: '二次型与正定矩阵', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%9E%8B%20%E6%AD%A3%E5%AE%9A%E7%9F%A9%E9%98%B5', kind: 'video' },
      { title: 'Quadratic forms — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/linear-algebra/alternate-bases/eigen-everything', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '交叉项系数直接放进矩阵而不均分。', correction: 'f 中 xy 的系数是 2b，矩阵对称位置各放 b = 系数/2。' },
      { mistake: '用某几个主余子式就判定正定而不检查全部。', correction: '正定判据要求所有顺序主子式 > 0，或全部特征值 > 0。' },
    ],
    keyFormulas: [
      { name: '矩阵表示', formula: 'f = xᵀAx（A 对称）', usage: '二次型的矩阵化。' },
      { name: '标准形', formula: 'f = Σλᵢyᵢ²', usage: '正交变换后的对角形式。' },
    ],
  },

  // ── 第六阶：概率论与数理统计 ─────────────────────────────────────────
  {
    id: 'ps-probability',
    trackId: 'prob-stats',
    title: '概率基础与事件运算',
    duration: 40,
    prerequisites: ['bridge-logic-sets'],
    objectives: [
      '理解随机事件与概率的公理化定义',
      '掌握加法公式与乘法公式',
      '理解条件概率与事件的独立性',
    ],
    intuition: [
      '概率是"对随机性的量化配比"：样本空间是所有可能结果，事件是其中的子集，概率就是子集占样本空间的比例。',
      '"或"用加法（去重），"且"用乘法；条件依赖时用条件概率。独立意味着一个事件发生与否不改变另一个的概率。',
      '现实中的概率判断（如医学检测、天气预报）几乎都建立在条件概率上，贝叶斯公式是它的逆转工具。',
    ],
    principles: [
      {
        title: '概率公理',
        body: '概率非负、全空间概率为 1、互斥事件并集的概率等于概率之和。',
        formula: 'P(A) \\ge 0,\\quad P(\\Omega) = 1,\\quad P(A \\cup B) = P(A) + P(B)\\ (A, B \\text{ 互斥})',
      },
      {
        title: '条件概率',
        body: '已知事件 B 发生的情况下事件 A 发生的概率，等于交事件概率除以 B 的概率。',
        formula: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)},\\qquad P(B) > 0',
      },
      {
        title: '独立性',
        body: 'A、B 独立当且仅当交事件的概率等于各自概率之积。',
        formula: 'P(A \\cap B) = P(A)P(B) \\iff A, B\\ \\text{ 相互独立}',
      },
    ],
    examples: [
      {
        prompt: '掷一枚公平骰子，求点数为偶数的概率。',
        steps: [
          '样本空间 Ω = {1, 2, 3, 4, 5, 6}，共 6 个结果。',
          '偶数事件 A = {2, 4, 6}，含 3 个结果。',
          'P(A) = 3/6 = 1/2。',
        ],
        answer: '1/2',
      },
      {
        prompt: '从 52 张扑克中抽一张，已知是红色，求它是红桃的概率。',
        steps: [
          '红色牌共 26 张（红桃 13 + 方块 13）。',
          '在红色的前提下，红桃占 13/26。',
          'P(红桃 | 红色) = 1/2。',
        ],
        answer: '1/2',
      },
    ],
    exercises: [
      {
        id: 'pp-e1', topic: 'probability', difficulty: 'basic', type: 'choice',
        prompt: '掷一枚公平骰子，掷出奇数的概率是？',
        options: [
          { id: 'a', label: '1/2' },
          { id: 'b', label: '1/3' },
          { id: 'c', label: '1/6' },
          { id: 'd', label: '2/3' },
        ],
        answer: 'a',
        solution: ['奇数点 {1,3,5} 占 6 个等可能结果中的 3 个，P = 3/6 = 1/2。'],
      },
      {
        id: 'pp-e2', topic: 'probability', difficulty: 'basic', type: 'number',
        prompt: '从 1 到 10 的整数中随机取一个，取到 5 的概率是多少？（写小数）',
        answer: 0.1,
        solution: ['10 个等可能结果中只有 1 个是 5，P = 1/10 = 0.1。'],
      },
      {
        id: 'pp-e3', topic: 'probability', difficulty: 'advanced', type: 'choice',
        prompt: 'P(A) = 0.3，P(B) = 0.4，A、B 互斥，则 P(A ∪ B) = ？',
        options: [
          { id: 'a', label: '0.7' },
          { id: 'b', label: '0.12' },
          { id: 'c', label: '0.3' },
          { id: 'd', label: '0.1' },
        ],
        answer: 'a',
        solution: ['互斥时加法公式直接相加：P(A∪B) = 0.3 + 0.4 = 0.7。'],
      },
      {
        id: 'pp-e4', topic: 'probability', difficulty: 'advanced', type: 'number',
        prompt: '掷两枚公平硬币，两枚都正面朝上的概率是？（写小数）',
        answer: 0.25,
        solution: ['每枚硬币正面概率 1/2，独立事件乘积 = 1/4 = 0.25。'],
      },
    ],
    quiz: [
      {
        id: 'pp-q1', topic: 'independence', difficulty: 'basic', type: 'choice',
        prompt: '独立事件 A、B，P(A) = 0.5，P(B) = 0.4，则 P(A ∩ B) = ？',
        options: [
          { id: 'a', label: '0.2' },
          { id: 'b', label: '0.9' },
          { id: 'c', label: '0.5' },
          { id: 'd', label: '0.1' },
        ],
        answer: 'a',
        solution: ['独立时交概率 = 概率之积 = 0.5 × 0.4 = 0.2。'],
      },
    ],
    resources: [
      { title: '概率论基础（事件与概率公理）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%A6%82%E7%8E%87%E8%AE%BA%20%E4%BA%8B%E4%BB%B6', kind: 'video' },
      { title: 'Probability basics — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/probability-library', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '非互斥事件直接套加法公式导致重复计数。', correction: '用 P(A∪B) = P(A) + P(B) − P(A∩B) 去掉重叠部分。' },
      { mistake: '把"独立"与"互斥"混为一谈。', correction: '互斥强调不能同时发生，独立强调不相互影响，是两回事。' },
    ],
    keyFormulas: [
      { name: '加法公式', formula: 'P(A∪B) = P(A) + P(B) − P(A∩B)', usage: '并事件的概率。' },
      { name: '乘法公式', formula: 'P(A∩B) = P(A)P(B|A)', usage: '交事件的概率。' },
    ],
  },

  {
    id: 'ps-random-variable',
    trackId: 'prob-stats',
    title: '随机变量及其分布',
    duration: 45,
    prerequisites: ['ps-probability'],
    objectives: [
      '理解随机变量与分布函数的概念',
      '掌握常见离散型分布：伯努利、二项、泊松',
      '掌握均匀分布与正态分布（连续型）',
    ],
    intuition: [
      '随机变量把"随机结果"映射成数字，让概率论可以用函数与微积分来计算。',
      '分布函数 F(x) = P(X ≤ x) 是"累积的概率库"；离散变量看分布列，连续变量看概率密度曲线下的面积。',
      '正态分布像"钟"：大量独立微扰叠加自然形成它，均值与方差两个参数就决定了整个曲线。',
    ],
    principles: [
      {
        title: '离散型分布列',
        body: '离散随机变量在每个取值上的概率，和为 1。',
        formula: 'P(X = x_k) = p_k,\\qquad \\sum_k p_k = 1',
      },
      {
        title: '二项分布',
        body: 'n 次独立重复试验中恰好成功 k 次的概率。',
        formula: 'X \\sim B(n, p):\\quad P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}',
      },
      {
        title: '正态分布',
        body: '由均值 μ 与标准差 σ 决定的钟形密度。',
        formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
      },
    ],
    examples: [
      {
        prompt: 'X ~ B(4, 1/2)，求 P(X = 2)。',
        steps: [
          '组合数 C(4,2) = 6。',
          'P = 6·(1/2)²·(1/2)² = 6/16。',
          '= 3/8。',
        ],
        answer: '3/8',
      },
      {
        prompt: '设 X ~ U(0, 4)（均匀分布），求 P(1 ≤ X ≤ 3)。',
        steps: [
          '均匀分布密度 f(x) = 1/4（0 ≤ x ≤ 4）。',
          '概率 = 区间长度比 = (3 − 1)/4。',
          '= 1/2。',
        ],
        answer: '1/2',
      },
    ],
    exercises: [
      {
        id: 'pr-e1', topic: 'bernoulli', difficulty: 'basic', type: 'choice',
        prompt: '伯努利试验中成功概率为 p，则失败概率是？',
        options: [
          { id: 'a', label: '1 − p' },
          { id: 'b', label: 'p' },
          { id: 'c', label: '0' },
          { id: 'd', label: '2p' },
        ],
        answer: 'a',
        solution: ['成功与失败是互斥且完备的两事件，概率和为 1。'],
      },
      {
        id: 'pr-e2', topic: 'binomial', difficulty: 'basic', type: 'number',
        prompt: '抛一枚公平硬币 3 次，正面次数 X ~ B(3, 1/2)，P(X = 0) 是多少？（写小数）',
        answer: 0.125,
        solution: ['P(X=0) = (1/2)³ = 1/8 = 0.125。'],
      },
      {
        id: 'pr-e3', topic: 'normal', difficulty: 'advanced', type: 'choice',
        prompt: '标准正态分布的均值 μ = ？',
        options: [
          { id: 'a', label: '0' },
          { id: 'b', label: '1' },
          { id: 'c', label: '2' },
          { id: 'd', label: 'π' },
        ],
        answer: 'a',
        solution: ['标准正态 N(0, 1) 的均值为 0、方差为 1。'],
      },
      {
        id: 'pr-e4', topic: 'poisson', difficulty: 'advanced', type: 'number',
        prompt: '泊松分布 P(λ) 的均值是 λ，若 λ = 5，则均值是多少？',
        answer: 5,
        solution: ['泊松分布的均值就是参数 λ = 5。'],
      },
    ],
    quiz: [
      {
        id: 'pr-q1', topic: 'uniform', difficulty: 'basic', type: 'choice',
        prompt: '设 X ~ U(0, 6)（均匀分布），则 P(2 ≤ X ≤ 4) = ？',
        options: [
          { id: 'a', label: '1/3' },
          { id: 'b', label: '1/2' },
          { id: 'c', label: '1/6' },
          { id: 'd', label: '1' },
        ],
        answer: 'a',
        solution: ['概率 = (4 − 2)/6 = 2/6 = 1/3。'],
      },
    ],
    resources: [
      { title: '随机变量及其分布（概率统计）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E9%9A%8F%E6%9C%BA%E5%8F%98%E9%87%8F%20%E5%88%86%E5%B8%83', kind: 'video' },
      { title: 'Random variables — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '二项分布中把 n 与 k 搞混。', correction: 'n 是试验总数，k 是成功次数，0 ≤ k ≤ n。' },
      { mistake: '连续型分布中直接给"单点概率"。', correction: '连续型单点概率恒为 0，只有区间才有概率。' },
    ],
    keyFormulas: [
      { name: '二项分布', formula: 'P(X=k) = C(n,k)pᵏ(1−p)ⁿ⁻ᵏ', usage: '重复试验计数。' },
      { name: '正态密度', formula: 'f(x) = e^−(x−μ)²/(2σ²) / (σ√2π)', usage: '连续型建模。' },
    ],
  },

  {
    id: 'ps-joint-distribution',
    trackId: 'prob-stats',
    title: '多维随机变量与独立性',
    duration: 40,
    prerequisites: ['ps-random-variable'],
    objectives: [
      '理解联合分布与边缘分布',
      '掌握随机变量独立性的判定',
      '会求协方差与相关系数',
    ],
    intuition: [
      '联合分布同时记录两个变量的概率"地图"，边缘分布是沿某条轴"压扁"后的分布——把另一个变量全部求和掉。',
      '独立 = 联合分布等于边缘分布的乘积；不独立时协方差衡量两个变量"一起变动的方向与强度"。',
      '相关系数把协方差归一化到 [−1, 1]：1 是完全正相关，−1 是完全负相关，0 是不相关。',
    ],
    principles: [
      {
        title: '联合分布列',
        body: '二维离散变量的取值概率表，所有格子之和为 1。',
        formula: 'P(X = x_i, Y = y_j) = p_{ij},\\qquad \\sum_{i,j} p_{ij} = 1',
      },
      {
        title: '边缘分布',
        body: '对另一个变量求和，得到单变量的分布。',
        formula: 'P(X = x_i) = \\sum_j p_{ij},\\qquad P(Y = y_j) = \\sum_i p_{ij}',
      },
      {
        title: '独立判定与协方差',
        body: '联合 = 边缘之积对所有取值成立则独立；协方差衡量线性相关强度。',
        formula: '\\mathrm{Cov}(X, Y) = E[XY] - E[X]E[Y];\\qquad \\rho = \\frac{\\mathrm{Cov}(X,Y)}{\\sigma_X \\sigma_Y}',
      },
    ],
    examples: [
      {
        prompt: '联合分布：P(0,0) = P(0,1) = P(1,0) = P(1,1) = 1/4，判断 X、Y 是否独立。',
        steps: [
          '边缘分布：P(X=0) = 1/2，P(X=1) = 1/2，P(Y=0) = 1/2，P(Y=1) = 1/2。',
          'P(X=0,Y=0) = 1/4 = (1/2)(1/2)，其余三项同理。',
          '联合 = 边缘之积对所有取值成立，故 X、Y 独立。',
        ],
        answer: '独立',
      },
      {
        prompt: '求上面联合分布中 P(X = 1)。',
        steps: [
          'P(X = 1) = P(1, 0) + P(1, 1)。',
          '= 1/4 + 1/4 = 1/2。',
        ],
        answer: '1/2',
      },
    ],
    exercises: [
      {
        id: 'jd-e1', topic: 'marginal', difficulty: 'basic', type: 'choice',
        prompt: '联合分布表中，固定 X 对 Y 求和得到的是？',
        options: [
          { id: 'a', label: 'X 的边缘分布' },
          { id: 'b', label: 'Y 的边缘分布' },
          { id: 'c', label: '协方差' },
          { id: 'd', label: '相关系数' },
        ],
        answer: 'a',
        solution: ['对 Y 求和把 Y 消去，得到 X 的边缘分布。'],
      },
      {
        id: 'jd-e2', topic: 'marginal', difficulty: 'basic', type: 'number',
        prompt: '联合分布 P(0,0) = 1/4、P(0,1) = 1/4，则 P(X = 0) = ？（写小数）',
        answer: 0.5,
        solution: ['P(X=0) = P(0,0) + P(0,1) = 1/4 + 1/4 = 1/2。'],
      },
      {
        id: 'jd-e3', topic: 'independence', difficulty: 'advanced', type: 'choice',
        prompt: '若 P(X=a, Y=b) = P(X=a)P(Y=b) 对所有 a、b 成立，则 X、Y ？',
        options: [
          { id: 'a', label: '相互独立' },
          { id: 'b', label: '必然线性相关' },
          { id: 'c', label: '协方差最大' },
          { id: 'd', label: '无法判断' },
        ],
        answer: 'a',
        solution: ['这正是独立的定义：联合分布等于边缘分布之积。'],
      },
      {
        id: 'jd-e4', topic: 'covariance', difficulty: 'advanced', type: 'number',
        prompt: '若 X、Y 独立，则 Cov(X, Y) = ？',
        answer: 0,
        solution: ['独立时 E[XY] = E[X]E[Y]，协方差为 0。'],
      },
    ],
    quiz: [
      {
        id: 'jd-q1', topic: 'correlation', difficulty: 'basic', type: 'choice',
        prompt: '相关系数 ρ = 0 说明？',
        options: [
          { id: 'a', label: '不相关（但不一定独立）' },
          { id: 'b', label: '必然独立' },
          { id: 'c', label: '完全正相关' },
          { id: 'd', label: '完全负相关' },
        ],
        answer: 'a',
        solution: ['相关系数为 0 表示没有线性相关；独立是更强的性质。'],
      },
    ],
    resources: [
      { title: '多维随机变量与独立性', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E8%81%94%E5%90%88%E5%88%86%E5%B8%83%20%E7%8B%AC%E7%AB%8B%E6%80%A7', kind: 'video' },
      { title: 'Joint distributions — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/ap-statistics/random-variables-ap/joint-marginal-distributions', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把"不相关"当成"独立"。', correction: '独立 ⇒ 不相关，但不相关不一定独立。' },
      { mistake: '边缘分布计算时漏求和项。', correction: '边缘分布 = 该行（列）所有联合概率之和，务必加全。' },
    ],
    keyFormulas: [
      { name: '协方差', formula: 'Cov(X,Y) = E[XY] − E[X]E[Y]', usage: '衡量线性相关方向与强度。' },
      { name: '相关系数', formula: 'ρ = Cov(X,Y)/(σ_X σ_Y)', usage: '归一化的相关性度量。' },
    ],
  },

  {
    id: 'ps-expectation',
    trackId: 'prob-stats',
    title: '期望、方差与数字特征',
    duration: 40,
    prerequisites: ['ps-random-variable'],
    objectives: [
      '掌握期望与方差的定义',
      '掌握期望与方差的性质',
      '会算常见分布的期望与方差',
    ],
    intuition: [
      '期望是"加权平均"：每个可能值乘它的概率再加起来，是随机变量在大量重复中的平均水平。',
      '方差衡量"偏离平均的程度"：离得越远，方差越大；标准差（方差的平方根）回到与原变量相同的单位。',
      '期望与方差共同刻画一个分布的"位置"与"散布"，是后续估计与检验的基础。',
    ],
    principles: [
      {
        title: '期望的定义',
        body: '离散型随机变量的加权和，权重为概率。',
        formula: 'E[X] = \\sum_k x_k\\,p_k',
      },
      {
        title: '方差的定义',
        body: '离差平方的期望，也可用二阶矩减均值平方计算。',
        formula: '\\mathrm{Var}(X) = E\\bigl[(X - E[X])^2\\bigr] = E[X^2] - (E[X])^2',
      },
      {
        title: '线性性质',
        body: '期望对线性变换保序，方差对常数平移不变、对伸缩平方放大。',
        formula: 'E[aX + b] = aE[X] + b;\\qquad \\mathrm{Var}(aX + b) = a^2\\,\\mathrm{Var}(X)',
      },
    ],
    examples: [
      {
        prompt: '掷一枚公平骰子，求点数的期望。',
        steps: [
          'E = (1 + 2 + 3 + 4 + 5 + 6)/6。',
          '= 21/6 = 3.5。',
        ],
        answer: '3.5',
      },
      {
        prompt: 'X 取 0、1 各以概率 1/2，求 Var(X)。',
        steps: [
          'E[X] = 0.5。',
          'E[X²] = 0·(1/2) + 1·(1/2) = 0.5。',
          'Var = 0.5 − 0.25 = 0.25。',
        ],
        answer: '0.25',
      },
    ],
    exercises: [
      {
        id: 'pe-e1', topic: 'expectation', difficulty: 'basic', type: 'choice',
        prompt: '期望的另一个常用名称是？',
        options: [
          { id: 'a', label: '均值' },
          { id: 'b', label: '中位数' },
          { id: 'c', label: '众数' },
          { id: 'd', label: '极差' },
        ],
        answer: 'a',
        solution: ['期望即概率加权平均，又称均值。'],
      },
      {
        id: 'pe-e2', topic: 'expectation', difficulty: 'basic', type: 'number',
        prompt: '抛一枚公平硬币，正面记 1、反面记 0，期望是多少？（写小数）',
        answer: 0.5,
        solution: ['E = 1×(1/2) + 0×(1/2) = 0.5。'],
      },
      {
        id: 'pe-e3', topic: 'variance', difficulty: 'advanced', type: 'choice',
        prompt: '若 Var(X) = 4，则 Var(3X) = ？',
        options: [
          { id: 'a', label: '36' },
          { id: 'b', label: '12' },
          { id: 'c', label: '4' },
          { id: 'd', label: '16' },
        ],
        answer: 'a',
        solution: ['Var(aX) = a²Var(X) = 9×4 = 36。'],
      },
      {
        id: 'pe-e4', topic: 'expectation', difficulty: 'advanced', type: 'number',
        prompt: '掷一枚公平骰子的点数的期望是多少？',
        answer: 3.5,
        solution: ['E = 21/6 = 3.5。'],
      },
    ],
    quiz: [
      {
        id: 'pe-q1', topic: 'expectation', difficulty: 'basic', type: 'choice',
        prompt: '若 E[X] = 2，则 E[2X + 1] = ？',
        options: [
          { id: 'a', label: '5' },
          { id: 'b', label: '3' },
          { id: 'c', label: '2' },
          { id: 'd', label: '4' },
        ],
        answer: 'a',
        solution: ['E[2X+1] = 2E[X] + 1 = 4 + 1 = 5。'],
      },
    ],
    resources: [
      { title: '期望与方差（数字特征）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%9C%9F%E6%9C%9B%20%E6%96%B9%E5%B7%AE', kind: 'video' },
      { title: 'Expected value — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library/expected-value-lib', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '方差公式里忘记减去均值平方。', correction: '用 Var = E[X²] − (E[X])² 时两项都不能少。' },
      { mistake: '把 Var(X) 与标准差混用。', correction: '标准差是方差开根号，单位不同。' },
    ],
    keyFormulas: [
      { name: '方差', formula: 'Var(X) = E[X²] − (E[X])²', usage: '散布程度度量。' },
      { name: '线性性质', formula: 'Var(aX+b) = a²Var(X)', usage: '随机变量线性变换。' },
    ],
  },

  {
    id: 'ps-limit-theorems',
    trackId: 'prob-stats',
    title: '大数定律与中心极限定理',
    duration: 40,
    prerequisites: ['ps-expectation'],
    objectives: [
      '理解大数定律的含义',
      '掌握中心极限定理的内容',
      '会用正态近似计算二项分布的概率',
    ],
    intuition: [
      '大数定律说"平均会收敛"：抛硬币次数越多，正面频率越接近 1/2，频率以概率收敛于理论概率。',
      '中心极限定理说"无论原始分布如何，大量独立随机变量的和都趋近正态"。这就是为什么正态分布无处不在。',
      '对 n 很大的二项分布，直接用二项公式会爆炸式难算，正态近似给了快速估计。',
    ],
    principles: [
      {
        title: '大数定律',
        body: '独立同分布且方差有限的样本均值，以概率收敛于期望。',
        formula: '\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i\\ \\xrightarrow{P}\\ E[X]',
      },
      {
        title: '中心极限定理',
        body: '标准化后的和趋于标准正态分布。',
        formula: '\\frac{\\sum_{i=1}^n X_i - n\\mu}{\\sigma\\sqrt{n}}\\ \\xrightarrow{d}\\ N(0, 1)',
      },
      {
        title: '二项分布的正态近似',
        body: 'np 与 n(1−p) 都较大时，可用正态分布近似二项分布。',
        formula: 'B(n, p) \\approx N\\bigl(np,\\ np(1-p)\\bigr)',
      },
    ],
    examples: [
      {
        prompt: '抛一枚公平硬币 10000 次，正面频率大概会接近多少？',
        steps: [
          '大数定律：频率以概率收敛于概率。',
          '理论概率为 1/2。',
          '故频率接近 0.5。',
        ],
        answer: '接近 0.5',
      },
      {
        prompt: '设 Xᵢ 独立同分布，E = 0、Var = 1，n = 100，则 ΣXᵢ 近似服从什么分布？',
        steps: [
          '标准化：(ΣXᵢ − 0)/(1·√100) = ΣXᵢ/10。',
          '由中心极限定理趋于 N(0, 1)。',
          '故 ΣXᵢ 近似 N(0, 100)。',
        ],
        answer: '近似 N(0, 100)',
      },
    ],
    exercises: [
      {
        id: 'lt-e1', topic: 'lln', difficulty: 'basic', type: 'choice',
        prompt: '大数定律说明样本均值会？',
        options: [
          { id: 'a', label: '以概率收敛于期望' },
          { id: 'b', label: '恒等于期望' },
          { id: 'c', label: '趋于无穷' },
          { id: 'd', label: '等于中位数' },
        ],
        answer: 'a',
        solution: ['大数定律：样本均值以概率收敛于总体期望。'],
      },
      {
        id: 'lt-e2', topic: 'lln', difficulty: 'basic', type: 'number',
        prompt: '抛一枚公平硬币次数足够多时，正面频率趋近于哪个数？（写小数）',
        answer: 0.5,
        solution: ['理论概率为 1/2，频率以概率收敛于此。'],
      },
      {
        id: 'lt-e3', topic: 'clt', difficulty: 'advanced', type: 'choice',
        prompt: '中心极限定理说明大量独立同分布随机变量的和近似服从？',
        options: [
          { id: 'a', label: '正态分布' },
          { id: 'b', label: '均匀分布' },
          { id: 'c', label: '二项分布' },
          { id: 'd', label: '指数分布' },
        ],
        answer: 'a',
        solution: ['中心极限定理：标准化和收敛于标准正态。'],
      },
      {
        id: 'lt-e4', topic: 'normal-approx', difficulty: 'advanced', type: 'number',
        prompt: '若 n = 100、p = 0.5，二项分布 B(100, 0.5) 正态近似的方差是 np(1−p) = ？',
        answer: 25,
        solution: ['100 × 0.5 × 0.5 = 25。'],
      },
    ],
    quiz: [
      {
        id: 'lt-q1', topic: 'lln', difficulty: 'basic', type: 'choice',
        prompt: '独立同分布样本均值依概率收敛于期望，这属于？',
        options: [
          { id: 'a', label: '大数定律' },
          { id: 'b', label: '中心极限定理' },
          { id: 'c', label: '贝叶斯公式' },
          { id: 'd', label: '马尔可夫不等式' },
        ],
        answer: 'a',
        solution: ['这正是大数定律的内容。'],
      },
    ],
    resources: [
      { title: '大数定律与中心极限定理', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%A4%A7%E6%95%B0%E5%AE%9A%E5%BE%8B%20%E4%B8%AD%E5%BF%83%E6%9E%81%E9%99%90%E5%AE%9A%E7%90%86', kind: 'video' },
      { title: 'Central limit theorem — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library/sample-means', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '认为中心极限定理对任意有限 n 都精确成立。', correction: '它是 n 充分大时的极限结果，n 小仍需精确分布。' },
      { mistake: '正态近似二项时未检查 np 与 n(1−p) 是否足够大。', correction: '通常要求 np ≥ 10 且 n(1−p) ≥ 10。' },
    ],
    keyFormulas: [
      { name: '大数定律', formula: 'X̄ₙ → E[X]（概率收敛）', usage: '频率趋于概率的依据。' },
      { name: '中心极限', formula: '(ΣXᵢ − nμ)/(σ√n) → N(0,1)', usage: '大量独立变量和的正态性。' },
    ],
  },

  {
    id: 'ps-statistics',
    trackId: 'prob-stats',
    title: '参数估计',
    duration: 45,
    prerequisites: ['ps-expectation'],
    objectives: [
      '理解统计量与抽样分布',
      '掌握矩估计与极大似然估计',
      '会构造正态总体均值的置信区间',
    ],
    intuition: [
      '参数估计是从样本反推总体：样本均值、样本方差是"从数据看总体"的窗口，估计量用 n−1 作分母是为了无偏。',
      '极大似然估计回答"什么样的参数最可能产出我看到的这组数据"，是统计推断的核心思想。',
      '置信区间给出"大约在哪"的区间：95% 置信区间意味着反复抽样时，约 95% 的区间会套住真实参数。',
    ],
    principles: [
      {
        title: '样本均值与样本方差',
        body: '样本均值与样本方差是对总体参数的无偏估计。',
        formula: '\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i,\\qquad S^2 = \\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2',
      },
      {
        title: '极大似然估计',
        body: '选取使观测数据出现概率最大的参数值。',
        formula: '\\hat{\\theta} = \\arg\\max_\\theta L(\\theta) = \\arg\\max_\\theta \\prod_{i=1}^n f(x_i; \\theta)',
      },
      {
        title: '均值置信区间',
        body: '正态总体方差已知时，用 Z 统计量构造区间。',
        formula: '\\bar{X} \\pm z_{\\alpha/2}\\, \\frac{\\sigma}{\\sqrt{n}}',
      },
    ],
    examples: [
      {
        prompt: '样本为 1、2、3，求样本均值。',
        steps: [
          '均值 = (1 + 2 + 3)/3。',
          '= 6/3 = 2。',
        ],
        answer: '2',
      },
      {
        prompt: '正态总体方差已知，样本均值 10，n = 100，σ = 2，z₀.₀₂₅ = 1.96，求 95% 置信区间。',
        steps: [
          '半宽 = 1.96 × 2/√100 = 0.392。',
          '区间 = [10 − 0.392, 10 + 0.392]。',
          '≈ [9.61, 10.39]。',
        ],
        answer: '约 [9.61, 10.39]',
      },
    ],
    exercises: [
      {
        id: 'st-e1', topic: 'estimator', difficulty: 'basic', type: 'choice',
        prompt: '样本方差 S² 用 n−1 作分母，目的是使估计量？',
        options: [
          { id: 'a', label: '无偏' },
          { id: 'b', label: '有偏' },
          { id: 'c', label: '方差最大' },
          { id: 'd', label: '恒为 0' },
        ],
        answer: 'a',
        solution: ['除以 n−1（贝塞尔修正）使样本方差成为总体方差的无偏估计。'],
      },
      {
        id: 'st-e2', topic: 'estimator', difficulty: 'basic', type: 'number',
        prompt: '样本 4、5、6 的样本均值是多少？',
        answer: 5,
        solution: ['(4 + 5 + 6)/3 = 5。'],
      },
      {
        id: 'st-e3', topic: 'mle', difficulty: 'advanced', type: 'choice',
        prompt: '极大似然估计的思想是？',
        options: [
          { id: 'a', label: '让观测数据出现的概率最大' },
          { id: 'b', label: '让方差最大' },
          { id: 'c', label: '让样本均值最小' },
          { id: 'd', label: '随机选择一个参数' },
        ],
        answer: 'a',
        solution: ['极大似然估计挑选使似然函数（数据出现概率）最大的参数。'],
      },
      {
        id: 'st-e4', topic: 'se', difficulty: 'advanced', type: 'number',
        prompt: 'n = 100、σ = 2，则标准误 σ/√n = ？',
        answer: 0.2,
        solution: ['2/√100 = 2/10 = 0.2。'],
      },
    ],
    quiz: [
      {
        id: 'st-q1', topic: 'ci', difficulty: 'basic', type: 'choice',
        prompt: '"95% 置信区间"的含义是？',
        options: [
          { id: 'a', label: '反复抽样时约 95% 的区间覆盖真实参数' },
          { id: 'b', label: '参数落在区间内的概率是 95%' },
          { id: 'c', label: '样本均值等于参数的概率是 95%' },
          { id: 'd', label: '数据有 95% 落在区间内' },
        ],
        answer: 'a',
        solution: ['置信水平描述的是"区间过程"的覆盖频率，而非参数本身随机。'],
      },
    ],
    resources: [
      { title: '参数估计（矩估计与极大似然）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%8F%82%E6%95%B0%E4%BC%B0%E8%AE%A1', kind: 'video' },
      { title: 'Confidence intervals — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/confidence-intervals-one-sample', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '误读置信区间的"概率"含义。', correction: '置信水平是过程覆盖频率，不表示参数落在区间内的概率。' },
      { mistake: '样本方差除以 n 而非 n−1。', correction: '无偏估计需除以 n−1（贝塞尔修正）。' },
    ],
    keyFormulas: [
      { name: '样本方差', formula: 'S² = Σ(Xᵢ−X̄)²/(n−1)', usage: '总体方差的无偏估计。' },
      { name: 'Z 置信区间', formula: 'X̄ ± z_{α/2}·σ/√n', usage: '已知方差的正态总体均值区间。' },
    ],
  },

  {
    id: 'ps-hypothesis-testing',
    trackId: 'prob-stats',
    title: '假设检验',
    duration: 45,
    prerequisites: ['ps-statistics'],
    objectives: [
      '理解原假设与备择假设',
      '掌握两类错误的概念',
      '会用 Z 检验做均值的假设检验',
    ],
    intuition: [
      '假设检验是"法庭审判"：先假定原假设 H₀"无罪"，再让数据说话，证据足够才推翻它。',
      '第一类错误是"冤枉好人"（拒绝了本真的 H₀），第二类错误是"放过坏人"（接受了本假的 H₀）。',
      'p 值越小，数据与 H₀ 矛盾越强；p < α 就拒绝 H₀。α 通常取 0.05。',
    ],
    principles: [
      {
        title: '原假设与备择假设',
        body: 'H₀ 是默认现状，H₁ 是备择；检验围绕是否拒绝 H₀ 展开。',
        formula: 'H_0:\\ \\mu = \\mu_0;\\qquad H_1:\\ \\mu \\neq \\mu_0\\ (\\text{双侧})',
      },
      {
        title: 'Z 检验统计量',
        body: '已知总体方差时，用标准化样本均值作统计量。',
        formula: 'Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}}',
      },
      {
        title: '两类错误',
        body: '第一类错误（α）是弃真，第二类错误（β）是纳伪；检验功效 = 1 − β。',
        formula: '\\alpha = P(\\text{拒绝} \\mid H_0 \\text{真}),\\qquad \\beta = P(\\text{接受} \\mid H_0 \\text{假})',
      },
    ],
    examples: [
      {
        prompt: '灯泡平均寿命声称 1000 小时，样本均值 980，n = 100，σ = 100，α = 0.05（z₀.₀₂₅ = 1.96），检验 H₀: μ = 1000。',
        steps: [
          'Z = (980 − 1000)/(100/√100) = −20/10 = −2。',
          '|Z| = 2 > 1.96。',
          '拒绝 H₀，认为平均寿命显著低于 1000 小时。',
        ],
        answer: '拒绝 H₀',
      },
      {
        prompt: '若检验得出 p = 0.03 < 0.05，结论是什么？',
        steps: [
          'p 值小于显著性水平 α。',
          '数据与 H₀ 的矛盾足够强。',
          '拒绝原假设。',
        ],
        answer: '拒绝原假设',
      },
    ],
    exercises: [
      {
        id: 'ht-e1', topic: 'hypothesis', difficulty: 'basic', type: 'choice',
        prompt: '原假设 H₀ 通常表示？',
        options: [
          { id: 'a', label: '默认/现状假说' },
          { id: 'b', label: '想要证明的结论' },
          { id: 'c', label: '样本方差' },
          { id: 'd', label: '检验功效' },
        ],
        answer: 'a',
        solution: ['H₀ 是需要足够证据才能推翻的默认假说。'],
      },
      {
        id: 'ht-e2', topic: 'z-test', difficulty: 'basic', type: 'number',
        prompt: 'α = 0.05 时双侧 Z 检验的临界值 z₀.₀₂₅ 约为多少？（保留两位小数）',
        answer: 1.96,
        solution: ['标准正态 0.975 分位点为 1.96。'],
      },
      {
        id: 'ht-e3', topic: 'errors', difficulty: 'advanced', type: 'choice',
        prompt: '拒绝了本真的 H₀，犯了哪类错误？',
        options: [
          { id: 'a', label: '第一类错误' },
          { id: 'b', label: '第二类错误' },
          { id: 'c', label: '没有错误' },
          { id: 'd', label: '抽样误差' },
        ],
        answer: 'a',
        solution: ['弃真（拒绝了真的原假设）是第一类错误。'],
      },
      {
        id: 'ht-e4', topic: 'z-test', difficulty: 'advanced', type: 'number',
        prompt: '若 Z 统计量为 2.4，α = 0.05 双侧临界值为 1.96，则应拒绝 H₀（填 1）还是接受 H₀（填 0）？',
        answer: 1,
        solution: ['|Z| = 2.4 > 1.96，落在拒绝域，拒绝 H₀。'],
      },
    ],
    quiz: [
      {
        id: 'ht-q1', topic: 'hypothesis', difficulty: 'basic', type: 'choice',
        prompt: 'p 值小于显著性水平 α 时，结论是？',
        options: [
          { id: 'a', label: '拒绝 H₀' },
          { id: 'b', label: '接受 H₀' },
          { id: 'c', label: '无法判断' },
          { id: 'd', label: '需要增加样本' },
        ],
        answer: 'a',
        solution: ['p < α 意味着证据足够强，拒绝原假设。'],
      },
    ],
    resources: [
      { title: '假设检验（Z 检验与两类错误）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%81%87%E8%AE%BE%E6%A3%80%E9%AA%8C', kind: 'video' },
      { title: 'Hypothesis testing — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把"接受 H₀"理解为"证明 H₀ 为真"。', correction: '无法拒绝 ≠ 证明为真，只能说证据不足以拒绝。' },
      { mistake: '单侧检验却用双侧临界值。', correction: '备择假设方向决定用单侧还是双侧临界值。' },
    ],
    keyFormulas: [
      { name: 'Z 统计量', formula: 'Z = (X̄ − μ₀)/(σ/√n)', usage: '已知方差时的均值检验。' },
      { name: '拒绝准则', formula: '|Z| > z_{α/2} ⇒ 拒绝 H₀', usage: '双侧检验判定。' },
    ],
  },

  // ── 第七阶：常微分方程 ─────────────────────────────────────────────
  {
    id: 'ode-first-order',
    trackId: 'ode',
    title: '一阶微分方程',
    duration: 45,
    prerequisites: ['calc1-integrals'],
    objectives: [
      '理解微分方程、通解与特解的概念',
      '掌握可分离变量方程',
      '掌握一阶线性方程的积分因子法',
    ],
    intuition: [
      '微分方程是"含有导数的方程"：它不直接给出函数，而是给出函数变化率的规律，求解就是"反求原函数"。',
      '可分离变量法把 dy/dx 拆成 dy 与 dx 各在一边，两边各自积分——这是最常用的手法。',
      '通解含任意常数，像一族曲线；初值条件挑出其中一条（特解），这正是建模的落点。',
    ],
    principles: [
      {
        title: '可分离变量方程',
        body: '形如 dy/dx = g(x)h(y) 的方程，把 y 与 x 分到两边后分别积分。',
        formula: '\\frac{dy}{dx} = g(x)h(y) \\Rightarrow \\int \\frac{dy}{h(y)} = \\int g(x)\\,dx',
      },
      {
        title: '一阶线性方程',
        body: 'y′ + P(x)y = Q(x)，用积分因子 e^{∫P dx} 化为可直接积分的形式。',
        formula: 'y\' + P(x)y = Q(x) \\Rightarrow y = e^{-\\int P\\,dx}\\left( \\int Q\\,e^{\\int P\\,dx}\\,dx + C \\right)',
      },
      {
        title: '通解与特解',
        body: '通解含一个任意常数；由初值条件 y(x₀) = y₀ 确定常数得到特解。',
        formula: 'y = y(x, C)\\ \\text{通解};\\qquad y(x_0) = y_0 \\Rightarrow C\\ \\text{唯一确定}',
      },
    ],
    examples: [
      {
        prompt: '解方程 dy/dx = 2x。',
        steps: [
          '分离变量：dy = 2x dx。',
          '两边积分：y = x² + C。',
          '这就是通解。',
        ],
        answer: 'y = x² + C',
      },
      {
        prompt: '解 dy/dx = 2x 并满足 y(1) = 3。',
        steps: [
          '通解为 y = x² + C。',
          '代入 y(1) = 3：1 + C = 3 ⇒ C = 2。',
          '特解为 y = x² + 2。',
        ],
        answer: 'y = x² + 2',
      },
    ],
    exercises: [
      {
        id: 'fo-e1', topic: 'separable', difficulty: 'basic', type: 'choice',
        prompt: '微分方程 y′ = 3x² 的通解是？',
        options: [
          { id: 'a', label: 'x³ + C' },
          { id: 'b', label: '3x³ + C' },
          { id: 'c', label: '6x + C' },
          { id: 'd', label: 'x³' },
        ],
        answer: 'a',
        solution: ['∫3x² dx = x³ + C。'],
      },
      {
        id: 'fo-e2', topic: 'ivp', difficulty: 'basic', type: 'number',
        prompt: '方程 dy/dx = 2 的通解为 y = 2x + C，若 y(0) = 1，则 C = ？',
        answer: 1,
        solution: ['代入 y(0) = 1：0 + C = 1，故 C = 1。'],
      },
      {
        id: 'fo-e3', topic: 'linear-ode', difficulty: 'advanced', type: 'choice',
        prompt: '一阶线性方程 y′ + P(x)y = Q(x) 的标准解法是？',
        options: [
          { id: 'a', label: '积分因子法' },
          { id: 'b', label: '特征方程法' },
          { id: 'c', label: '待定系数法' },
          { id: 'd', label: '拉普拉斯逆变换查表' },
        ],
        answer: 'a',
        solution: ['乘积分因子 e^{∫P dx} 后左边恰是 (ye^{∫P dx})′，可直接积分。'],
      },
      {
        id: 'fo-e4', topic: 'ivp', difficulty: 'advanced', type: 'number',
        prompt: '解 dy/dx = x 且 y(2) = 2，通解为 y = x²/2 + C，求 C 的值。',
        answer: 0,
        solution: ['代入 y(2) = 2：2 + C = 2，故 C = 0。'],
      },
    ],
    quiz: [
      {
        id: 'fo-q1', topic: 'separable', difficulty: 'basic', type: 'choice',
        prompt: 'y′ = y 的通解是？',
        options: [
          { id: 'a', label: 'Ceˣ' },
          { id: 'b', label: 'Ce⁻ˣ' },
          { id: 'c', label: 'x + C' },
          { id: 'd', label: 'Cx' },
        ],
        answer: 'a',
        solution: ['分离变量 dy/y = dx，积分得 ln|y| = x + C，y = Ceˣ。'],
      },
    ],
    resources: [
      { title: '一阶微分方程（可分离变量与一阶线性）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E4%B8%80%E9%98%B6%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B', kind: 'video' },
      { title: 'First order ODEs — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/differential-equations/first-order-differential-equations', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '可分离变量时丢项或忘加常数 C。', correction: '每积分一次都补一个任意常数，最后合并为一个 C。' },
      { mistake: '积分因子记成 e^{∫Q dx} 而非 e^{∫P dx}。', correction: '积分因子由 y′ 的系数 P(x) 决定，与 Q(x) 无关。' },
    ],
    keyFormulas: [
      { name: '可分离变量', formula: '∫dy/h(y) = ∫g(x)dx', usage: '分离变量型方程。' },
      { name: '积分因子', formula: 'μ = e^{∫P dx}', usage: '一阶线性方程求解。' },
    ],
  },

  {
    id: 'ode-second-order',
    trackId: 'ode',
    title: '二阶常系数线性微分方程',
    duration: 45,
    prerequisites: ['ode-first-order'],
    objectives: [
      '掌握二阶常系数齐次方程的解法',
      '掌握特征方程的三种情形',
      '会求非齐次方程的特解（待定系数法）',
    ],
    intuition: [
      '二阶常系数方程 y″ + py′ + qy = 0 的解形如 e^(rx)，代入后得到一个关于 r 的代数方程——特征方程。',
      '特征根决定解的形状：两个不同实根（指数组合）、重根（乘 x）、共轭复根（三角函数摆动）。',
      '非齐次方程的解 = 齐次通解 + 一个特解，特解按右边函数的形式"猜"（待定系数法）。',
    ],
    principles: [
      {
        title: '特征方程',
        body: '设 y = e^(rx) 代入齐次方程，得到关于 r 的代数方程。',
        formula: 'y\'\' + py\' + qy = 0 \\Rightarrow r^2 + pr + q = 0',
      },
      {
        title: '不同实根与重根',
        body: '两不同实根 r₁ ≠ r₂ 时解为指数组合；重根 r 时多乘一个 x。',
        formula: 'y = C_1 e^{r_1 x} + C_2 e^{r_2 x};\\qquad r_1 = r_2 = r \\Rightarrow y = (C_1 + C_2 x)e^{rx}',
      },
      {
        title: '共轭复根',
        body: '特征根为 r = α ± iβ 时，解含指数衰减因子与三角函数。',
        formula: 'y = e^{\\alpha x}\\bigl( C_1\\cos(\\beta x) + C_2\\sin(\\beta x) \\bigr)',
      },
    ],
    examples: [
      {
        prompt: '解 y″ − 3y′ + 2y = 0。',
        steps: [
          '特征方程 r² − 3r + 2 = 0，解得 r = 1、2。',
          '两个不同实根。',
          '通解 y = C₁eˣ + C₂e²ˣ。',
        ],
        answer: 'y = C₁eˣ + C₂e²ˣ',
      },
      {
        prompt: '解 y″ + y = 0。',
        steps: [
          '特征方程 r² + 1 = 0，得 r = ±i。',
          'α = 0，β = 1。',
          '通解 y = C₁cos x + C₂sin x。',
        ],
        answer: 'y = C₁cos x + C₂sin x',
      },
    ],
    exercises: [
      {
        id: 'so-e1', topic: 'characteristic', difficulty: 'basic', type: 'choice',
        prompt: 'y″ − y = 0 的特征方程是？',
        options: [
          { id: 'a', label: 'r² − 1 = 0' },
          { id: 'b', label: 'r − 1 = 0' },
          { id: 'c', label: 'r² + 1 = 0' },
          { id: 'd', label: 'r² = 0' },
        ],
        answer: 'a',
        solution: ['y″ → r²，y → 1，故特征方程为 r² − 1 = 0。'],
      },
      {
        id: 'so-e2', topic: 'characteristic', difficulty: 'basic', type: 'number',
        prompt: '特征方程 r² − 4 = 0 的较大实根是多少？',
        answer: 2,
        solution: ['r² = 4，根为 ±2，较大者为 2。'],
      },
      {
        id: 'so-e3', topic: 'complex-roots', difficulty: 'advanced', type: 'choice',
        prompt: 'y″ + 4y = 0 的通解形如？',
        options: [
          { id: 'a', label: 'C₁cos 2x + C₂sin 2x' },
          { id: 'b', label: 'C₁e²ˣ + C₂e⁻²ˣ' },
          { id: 'c', label: 'C₁x + C₂' },
          { id: 'd', label: 'C₁e²ˣ' },
        ],
        answer: 'a',
        solution: ['特征根 r = ±2i，α = 0、β = 2，通解为 C₁cos2x + C₂sin2x。'],
      },
      {
        id: 'so-e4', topic: 'complex-roots', difficulty: 'advanced', type: 'number',
        prompt: '若特征根为共轭复根 α ± iβ，且 α = 0、β = 3，则通解三角函数的角频率 β 是多少？',
        answer: 3,
        solution: ['角频率就是虚部 β = 3。'],
      },
    ],
    quiz: [
      {
        id: 'so-q1', topic: 'repeated-roots', difficulty: 'basic', type: 'choice',
        prompt: 'y″ − 2y′ + y = 0 的特征方程是 r² − 2r + 1 = 0，它的根为？',
        options: [
          { id: 'a', label: '重根 r = 1' },
          { id: 'b', label: 'r = 1、2' },
          { id: 'c', label: 'r = −1' },
          { id: 'd', label: '无实根' },
        ],
        answer: 'a',
        solution: ['(r−1)² = 0，重根 r = 1。'],
      },
    ],
    resources: [
      { title: '二阶常系数线性微分方程', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E9%98%B6%E5%B8%B8%E7%B3%BB%E6%95%B0%E7%BA%BF%E6%80%A7%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B', kind: 'video' },
      { title: 'Second order ODEs — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/differential-equations/second-order-differential-equations', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '把非齐次方程当齐次处理，丢掉特解。', correction: '非齐次解 = 齐次通解 + 特解，两步都要做。' },
      { mistake: '共轭复根情形只写一个三角函数项。', correction: '虚部 ±β 对应 cos 与 sin 两个独立解。' },
    ],
    keyFormulas: [
      { name: '特征方程', formula: 'r² + pr + q = 0', usage: '求齐次通解的入口。' },
      { name: '复根通解', formula: 'y = e^αx(C₁cosβx + C₂sinβx)', usage: '特征根为共轭复根时。' },
    ],
  },

  {
    id: 'ode-higher-order',
    trackId: 'ode',
    title: '高阶微分方程',
    duration: 40,
    prerequisites: ['ode-second-order'],
    objectives: [
      '掌握高阶常系数齐次方程的解结构',
      '理解解空间的维数等于方程的阶数',
      '会处理重根与复根的组合',
    ],
    intuition: [
      'n 阶齐次方程的通解含 n 个独立任意常数——解空间是 n 维的，基础解系就是它的 n 个基向量。',
      '特征根每出现一次，就贡献一个基础解；重根 r 会贡献 e^(rx)、xe^(rx)、x²e^(rx)…直到根的重复次数。',
      '遇到"高次"先因式分解特征多项式，把问题拆成若干个低阶情形的并集。',
    ],
    principles: [
      {
        title: '解的结构',
        body: 'n 阶齐次方程的通解 = 基础解系的线性组合，含 n 个任意常数。',
        formula: 'y = C_1 y_1 + C_2 y_2 + \\cdots + C_n y_n',
      },
      {
        title: '重根处理',
        body: '特征根 r 是 m 重根时，贡献 m 个线性无关的解。',
        formula: 'e^{rx},\\ x\\,e^{rx},\\ x^2 e^{rx},\\ \\ldots,\\ x^{m-1} e^{rx}',
      },
      {
        title: '线性无关的充要条件',
        body: '基础解系的朗斯基行列式在定义域内不为 0。',
        formula: 'W(y_1, \\ldots, y_n)(x) \\neq 0',
      },
    ],
    examples: [
      {
        prompt: '解 y″′ − y″ = 0。',
        steps: [
          '特征方程 r³ − r² = r²(r − 1) = 0，根为 r = 0（二重）、r = 1。',
          'r = 0 二重根贡献 1 与 x。',
          '通解 y = C₁ + C₂x + C₃eˣ。',
        ],
        answer: 'y = C₁ + C₂x + C₃eˣ',
      },
      {
        prompt: '解 y″′ = 0。',
        steps: [
          '特征方程 r³ = 0，三重根 r = 0。',
          '贡献 1、x、x²。',
          '通解 y = C₁ + C₂x + C₃x²。',
        ],
        answer: 'y = C₁ + C₂x + C₃x²',
      },
    ],
    exercises: [
      {
        id: 'ho-e1', topic: 'structure', difficulty: 'basic', type: 'choice',
        prompt: 'n 阶齐次线性方程的通解含有几个独立任意常数？',
        options: [
          { id: 'a', label: 'n 个' },
          { id: 'b', label: '1 个' },
          { id: 'c', label: 'n + 1 个' },
          { id: 'd', label: 'n − 1 个' },
        ],
        answer: 'a',
        solution: ['通解是 n 个独立解的线性组合，含 n 个任意常数。'],
      },
      {
        id: 'ho-e2', topic: 'repeated-roots', difficulty: 'basic', type: 'number',
        prompt: 'y″′ = 0 的通解中，最高次幂项是 x 的几次方？',
        answer: 2,
        solution: ['三重根贡献 1、x、x²，最高二次。'],
      },
      {
        id: 'ho-e3', topic: 'repeated-roots', difficulty: 'advanced', type: 'choice',
        prompt: '特征根 r 是 m 重根时，贡献几个基础解？',
        options: [
          { id: 'a', label: 'm 个' },
          { id: 'b', label: '1 个' },
          { id: 'c', label: 'm − 1 个' },
          { id: 'd', label: '2m 个' },
        ],
        answer: 'a',
        solution: ['m 重根贡献 e^{rx}…x^{m−1}e^{rx} 共 m 个解。'],
      },
      {
        id: 'ho-e4', topic: 'repeated-roots', difficulty: 'advanced', type: 'number',
        prompt: '方程 y″′ − y″ = 0 的特征根中，r = 0 作为重根出现几次？',
        answer: 2,
        solution: ['r³ − r² = r²(r−1)，r = 0 是二重根。'],
      },
    ],
    quiz: [
      {
        id: 'ho-q1', topic: 'structure', difficulty: 'basic', type: 'choice',
        prompt: '四阶方程 y⁗ = 0 的通解中最高次幂项是？',
        options: [
          { id: 'a', label: 'x³' },
          { id: 'b', label: 'x²' },
          { id: 'c', label: 'x⁴' },
          { id: 'd', label: 'x' },
        ],
        answer: 'a',
        solution: ['四重根 r = 0 贡献 1、x、x²、x³，最高三次。'],
      },
    ],
    resources: [
      { title: '高阶常系数线性微分方程', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E9%AB%98%E9%98%B6%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B', kind: 'video' },
      { title: 'Higher order ODEs — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/differential-equations/linear-homogeneous-odes', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '重根只写一个指数解，少写乘 x 的项。', correction: '重根按重数依次乘 x^0, x^1, …, x^{m−1}。' },
      { mistake: '忘记用朗斯基行列式检验基础解系线性无关。', correction: '每组基础解都应是线性无关的。' },
    ],
    keyFormulas: [
      { name: '重根基础解', formula: 'x^k e^{rx}, k = 0…m−1', usage: 'm 重根的 m 个解。' },
      { name: '通解结构', formula: 'y = ΣCᵢyᵢ', usage: '基础解系的线性组合。' },
    ],
  },

  {
    id: 'ode-systems',
    trackId: 'ode',
    title: '微分方程组与状态空间',
    duration: 45,
    prerequisites: ['ode-second-order'],
    objectives: [
      '掌握一阶线性方程组的矩阵写法',
      '掌握用特征值与特征向量求基解',
      '理解相图与平衡点稳定性',
    ],
    intuition: [
      '微分方程组把多个相互影响的变化率打包成矩阵形式 dX/dt = AX，解的结构由矩阵特征值决定。',
      '特征值实部为负 → 解衰减到平衡点（稳定）；实部为正 → 发散（不稳定）。这解释了"为什么看特征值"。',
      '二阶单方程可以写成 2×2 方程组；反过来，方程组也常化为高阶方程，二者是同一个系统。',
    ],
    principles: [
      {
        title: '矩阵形式',
        body: '一阶线性方程组统一写为向量形式。',
        formula: '\\frac{d\\mathbf{X}}{dt} = A\\mathbf{X},\\qquad \\mathbf{X} = \\begin{pmatrix} x(t) \\\\ y(t) \\end{pmatrix}',
      },
      {
        title: '基解的构造',
        body: '若 v 是 A 的特征向量（特征值 λ），则 e^{λt}v 是方程的解。',
        formula: 'A\\mathbf{v} = \\lambda \\mathbf{v} \\Rightarrow \\mathbf{X} = e^{\\lambda t}\\mathbf{v}',
      },
      {
        title: '稳定性判定',
        body: '所有特征值实部为负时平衡点渐近稳定；存在正实部则不稳定。',
        formula: '\\mathrm{Re}\\,\\lambda_i < 0\\ \\forall i \\Rightarrow \\text{渐近稳定}',
      },
    ],
    examples: [
      {
        prompt: '把系统 x′ = y、y′ = −x 写成矩阵形式。',
        steps: [
          'X = (x, y)ᵀ，则 X′ = (y, −x)ᵀ。',
          '矩阵 A = [[0, 1], [−1, 0]]。',
        ],
        answer: 'A = [[0, 1], [−1, 0]]',
      },
      {
        prompt: '若 A 的特征值为 ±i（实部为 0），系统解的行为是什么？',
        steps: [
          '实部为 0，既不发散也不衰减。',
          '解为周期振荡。',
          '平衡点是中心型，稳定但不渐近稳定。',
        ],
        answer: '周期振荡',
      },
    ],
    exercises: [
      {
        id: 'sy-e1', topic: 'stability', difficulty: 'basic', type: 'choice',
        prompt: '方程组 dX/dt = AX 的解是否收敛到平衡点，主要取决于？',
        options: [
          { id: 'a', label: '特征值的实部' },
          { id: 'b', label: '特征值的虚部' },
          { id: 'c', label: '矩阵的维数' },
          { id: 'd', label: '初值矩阵' },
        ],
        answer: 'a',
        solution: ['实部为负才衰减收敛，实部符号决定稳定性。'],
      },
      {
        id: 'sy-e2', topic: 'system', difficulty: 'basic', type: 'number',
        prompt: '系统 x′ = −x 的特征值 λ = ？',
        answer: -1,
        solution: ['方程 λ + 1 = 0，λ = −1。'],
      },
      {
        id: 'sy-e3', topic: 'stability', difficulty: 'advanced', type: 'choice',
        prompt: '特征值实部均为负时，平衡点称为？',
        options: [
          { id: 'a', label: '渐近稳定' },
          { id: 'b', label: '不稳定' },
          { id: 'c', label: '中心' },
          { id: 'd', label: '鞍点' },
        ],
        answer: 'a',
        solution: ['全部特征值实部为负 ⇒ 解衰减 ⇒ 渐近稳定。'],
      },
      {
        id: 'sy-e4', topic: 'stability', difficulty: 'advanced', type: 'number',
        prompt: 'A = [[−2, 0], [0, −3]] 的特征值均为负，则系统渐近稳定（填 1）还是不稳定（填 0）？',
        answer: 1,
        solution: ['对角阵特征值为 −2、−3，实部为负，渐近稳定。'],
      },
    ],
    quiz: [
      {
        id: 'sy-q1', topic: 'stability', difficulty: 'basic', type: 'choice',
        prompt: '特征值 λ = 2（实部为正）时，系统解的行为是？',
        options: [
          { id: 'a', label: '发散' },
          { id: 'b', label: '收敛到 0' },
          { id: 'c', label: '周期振荡' },
          { id: 'd', label: '恒为常数' },
        ],
        answer: 'a',
        solution: ['正实部导致 e^{λt} 指数增长，系统发散。'],
      },
    ],
    resources: [
      { title: '线性微分方程组（状态空间）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%E7%BB%84', kind: 'video' },
      { title: 'Linear systems of ODEs — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/differential-equations/linear-systems', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '只算特征值而忘了验证对应特征向量。', correction: '基解需要特征向量 v，解才真正满足方程。' },
      { mistake: '把"实部为零"判为不稳定。', correction: '实部为零是临界情形（中心型/周期），稳定但不渐近。' },
    ],
    keyFormulas: [
      { name: '基解', formula: 'X = e^{λt}v', usage: '特征值特征向量法。' },
      { name: '稳定性', formula: 'Re λ < 0 ∀i ⇒ 渐近稳定', usage: '平衡点类型判定。' },
    ],
  },

  {
    id: 'ode-laplace',
    trackId: 'ode',
    title: '拉普拉斯变换',
    duration: 45,
    prerequisites: ['ode-second-order'],
    objectives: [
      '理解拉普拉斯变换的定义',
      '掌握常用函数的变换与反变换表',
      '会用变换求解常系数初值问题',
    ],
    intuition: [
      '拉普拉斯变换把"微积分问题"变成"代数问题"：求导变成乘 s，积分变成除以 s，解完再反变换回去。',
      '它对初值问题尤其好用，因为变换天然把初始条件 y(0)、y′(0) 收进来，省去"求通解再定常数"的步骤。',
      '部分分式展开是反变换的关键技巧：把复杂分式拆成查表就能认出的简单项。',
    ],
    principles: [
      {
        title: '变换定义',
        body: '拉普拉斯变换把时间域函数映射到复频率域。',
        formula: '\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^{\\infty} f(t)\\,e^{-st}\\,dt',
      },
      {
        title: '微分性质',
        body: '求导的变换会引入初始条件。',
        formula: '\\mathcal{L}\\{f\'\\} = sF(s) - f(0);\\qquad \\mathcal{L}\\{f\'\'\\} = s^2F(s) - sf(0) - f\'(0)',
      },
      {
        title: '逆变换',
        body: '把 F(s) 部分分式展开后查表回代。',
        formula: '\\mathcal{L}^{-1}\\left\\{ \\frac{1}{s - a} \\right\\} = e^{at};\\qquad \\mathcal{L}^{-1}\\left\\{ \\frac{1}{s^2 + a^2} \\right\\} = \\frac{\\sin(at)}{a}',
      },
    ],
    examples: [
      {
        prompt: '求 L{1}。',
        steps: [
          'L{1} = ∫₀^∞ e^(−st) dt。',
          '= [−e^(−st)/s]₀^∞。',
          '= 1/s（s > 0）。',
        ],
        answer: '1/s',
      },
      {
        prompt: '求 L{e^(2t)}。',
        steps: [
          '查表：L{e^(at)} = 1/(s − a)。',
          '令 a = 2。',
          '= 1/(s − 2)。',
        ],
        answer: '1/(s − 2)',
      },
    ],
    exercises: [
      {
        id: 'la-e1', topic: 'transform', difficulty: 'basic', type: 'choice',
        prompt: 'L{e^(at)} = ？',
        options: [
          { id: 'a', label: '1/(s − a)' },
          { id: 'b', label: '1/(s + a)' },
          { id: 'c', label: 's/(s² + a²)' },
          { id: 'd', label: 'a/(s² + a²)' },
        ],
        answer: 'a',
        solution: ['指数函数的变换是 1/(s − a)。'],
      },
      {
        id: 'la-e2', topic: 'transform', difficulty: 'basic', type: 'number',
        prompt: 'L{1} = 1/s，当 s = 2 时 F(s) = ？（写小数）',
        answer: 0.5,
        solution: ['1/2 = 0.5。'],
      },
      {
        id: 'la-e3', topic: 'derivative', difficulty: 'advanced', type: 'choice',
        prompt: '拉普拉斯变换中，L{f′} = ？',
        options: [
          { id: 'a', label: 'sF(s) − f(0)' },
          { id: 'b', label: 'F(s)/s' },
          { id: 'c', label: 'sF(s) + f(0)' },
          { id: 'd', label: 'F(s − a)' },
        ],
        answer: 'a',
        solution: ['求导的变换 = sF(s) − 初值 f(0)。'],
      },
      {
        id: 'la-e4', topic: 'transform', difficulty: 'advanced', type: 'number',
        prompt: 'L{e^(3t)} = 1/(s − 3)，当 s = 4 时 F(s) = ？',
        answer: 1,
        solution: ['1/(4 − 3) = 1。'],
      },
    ],
    quiz: [
      {
        id: 'la-q1', topic: 'transform', difficulty: 'basic', type: 'choice',
        prompt: '用拉普拉斯变换解初值问题时，方程中的求导项被换成？',
        options: [
          { id: 'a', label: '含 s 与初值的代数表达式' },
          { id: 'b', label: '积分表达式' },
          { id: 'c', label: '原函数' },
          { id: 'd', label: '常数' },
        ],
        answer: 'a',
        solution: ['求导变乘 s 并带入初值，方程成为代数方程。'],
      },
    ],
    resources: [
      { title: '拉普拉斯变换（变换表与求解初值问题）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E6%8B%89%E6%99%AE%E6%8B%89%E6%96%AF%E5%8F%98%E6%8D%A2', kind: 'video' },
      { title: 'Laplace transform — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/differential-equations/laplace-transform', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '反变换前没有做部分分式展开。', correction: '把 F(s) 拆成 1/(s−a)、1/(s²+a²) 等基本项再逐项查表。' },
      { mistake: '二阶导数的变换漏掉 −s·f(0) 项。', correction: 'L{f″} = s²F(s) − s·f(0) − f′(0)，两个初值都要带。' },
    ],
    keyFormulas: [
      { name: '指数变换', formula: 'L{e^{at}} = 1/(s−a)', usage: '基本变换表项。' },
      { name: '微分性质', formula: 'L{f′} = sF(s) − f(0)', usage: '把微分方程变代数方程。' },
    ],
  },

  {
    id: 'ode-applications',
    trackId: 'ode',
    title: '微分方程的应用建模',
    duration: 40,
    prerequisites: ['ode-systems'],
    objectives: [
      '掌握指数增长与 Logistic 模型',
      '掌握牛顿冷却定律',
      '会把实际问题翻译成初值问题',
    ],
    intuition: [
      '建模就是"把文字翻译成方程"：增长率与当前量成正比 → y′ = ky（指数增长）；资源有限 → 加一个饱和项（Logistic）。',
      '牛顿冷却定律说"冷却速度与温差成正比"，是一阶线性方程在现实中的经典应用。',
      '一个模型的成败，往往取决于参数与初值定得准不准，而不是方程本身难不难。',
    ],
    principles: [
      {
        title: '指数增长',
        body: '增长率正比于当前总量，解为指数函数。',
        formula: '\\frac{dy}{dt} = ky \\Rightarrow y = y_0\\,e^{kt}',
      },
      {
        title: 'Logistic 增长',
        body: '带环境容量 K 的受限增长，y 接近 K 时增长趋缓。',
        formula: '\\frac{dy}{dt} = ry\\left(1 - \\frac{y}{K}\\right)',
      },
      {
        title: '牛顿冷却定律',
        body: '物体温度变化率与环境温差成正比。',
        formula: '\\frac{dT}{dt} = -k\\,(T - T_a)',
      },
    ],
    examples: [
      {
        prompt: '细菌每 2 小时翻一倍，初始 1000 个，求 6 小时后数量。',
        steps: [
          '指数模型 y = 1000·2^(t/2)。',
          't = 6 时 y = 1000·2³。',
          '= 8000。',
        ],
        answer: '8000',
      },
      {
        prompt: '牛顿冷却：物体 90°C 放入 30°C 环境，T′ = −k(T − 30)，求 T(t)。',
        steps: [
          '令 u = T − 30，则 u′ = −ku，解为 u = u₀e^(−kt)。',
          'T = 30 + u₀e^(−kt)。',
          '由 T(0) = 90 ⇒ u₀ = 60。',
          'T(t) = 30 + 60e^(−kt)。',
        ],
        answer: 'T(t) = 30 + 60e^(−kt)',
      },
    ],
    exercises: [
      {
        id: 'oa-e1', topic: 'exponential-growth', difficulty: 'basic', type: 'choice',
        prompt: '指数增长模型 y′ = ky（k > 0）的解是？',
        options: [
          { id: 'a', label: 'y₀e^(kt)' },
          { id: 'b', label: 'y₀e^(−kt)' },
          { id: 'c', label: 'y₀ + kt' },
          { id: 'd', label: 'y₀tᵏ' },
        ],
        answer: 'a',
        solution: ['一阶线性 y′ = ky 的解为指数函数 y₀e^(kt)。'],
      },
      {
        id: 'oa-e2', topic: 'exponential-growth', difficulty: 'basic', type: 'number',
        prompt: '细菌每 2 小时翻倍，初始 100 个，6 小时后是多少个？',
        answer: 800,
        solution: ['100·2³ = 800。'],
      },
      {
        id: 'oa-e3', topic: 'logistic', difficulty: 'advanced', type: 'choice',
        prompt: 'Logistic 模型中，当 y 接近环境容量 K 时，增长速率？',
        options: [
          { id: 'a', label: '趋于 0' },
          { id: 'b', label: '最大' },
          { id: 'c', label: '趋于无穷' },
          { id: 'd', label: '保持恒定' },
        ],
        answer: 'a',
        solution: ['因子 (1 − y/K) 趋于 0，增长停止，种群稳定在 K。'],
      },
      {
        id: 'oa-e4', topic: 'newton-cooling', difficulty: 'advanced', type: 'number',
        prompt: '牛顿冷却 T′ = −k(T − 30)，T(0) = 90，则 u₀ = T(0) − 30 = ？',
        answer: 60,
        solution: ['u₀ = 90 − 30 = 60。'],
      },
    ],
    quiz: [
      {
        id: 'oa-q1', topic: 'logistic', difficulty: 'basic', type: 'choice',
        prompt: '描述带环境容量的受限增长的模型是？',
        options: [
          { id: 'a', label: 'Logistic 模型' },
          { id: 'b', label: '指数增长模型' },
          { id: 'c', label: '线性增长模型' },
          { id: 'd', label: '常数模型' },
        ],
        answer: 'a',
        solution: ['Logistic 方程含饱和项 (1 − y/K)，描述受限增长。'],
      },
    ],
    resources: [
      { title: '微分方程建模（指数与 Logistic）', provider: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%20%E5%BB%BA%E6%A8%A1', kind: 'video' },
      { title: 'Differential equations applications — Khan Academy', provider: 'Khan Academy', url: 'https://www.khanacademy.org/math/differential-equations/first-order-differential-equations', kind: 'video' },
    ],
    commonMistakes: [
      { mistake: '指数模型中把"翻倍"与 k 的换算搞错。', correction: '翻倍间隔 T 满足 e^{kT} = 2，先解 k 再代时间。' },
      { mistake: '牛顿冷却里把 T 与温差 u = T − Ta 混用。', correction: '方程是关于温差 u 的，解得 u 后再加回环境温度。' },
    ],
    keyFormulas: [
      { name: '指数增长', formula: 'y = y₀e^{kt}', usage: '无约束增长。' },
      { name: 'Logistic', formula: 'dy/dt = ry(1 − y/K)', usage: '受环境容量约束的增长。' },
    ],
  },
]

export function findLesson(id: string): MathLesson | undefined {
  return mathLessons.find(lesson => lesson.id === id)
}

export function lessonsForTrack(trackId: string): MathLesson[] {
  return mathLessons.filter(lesson => lesson.trackId === trackId)
}

export function trackForLesson(lesson: MathLesson): MathTrack | undefined {
  return mathTracks.find(track => track.id === lesson.trackId)
}
