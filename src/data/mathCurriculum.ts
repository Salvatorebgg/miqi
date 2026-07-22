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
          { id: 'd', label: 'x = log₃ 81' },
        ],
        answer: 'a',
        solution: ['81 = 3⁴，故 3ˣ = 3⁴，x = 4。选项 d 也对但未化简，选最简形式 a。'],
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
        answer: 'a',
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
        prompt: '交换积分次序：∫₀¹∫₀^x f(x,y) dy dx，积分区域 D 可表示为？求 ∫₀¹∫_y¹ 1 dx dy 的值。',
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
        id: 'lv-ex4', topic: 'vectors', difficulty: 'basic', type: 'number',
        prompt: 'a = (1, 2)，b = (3, −1)，求 a + b。',
        answer: 4, tolerance: .0001,
        solution: ['a + b = (1+3, 2−1) = (4, 1)。本题为第一分量，答案为 4。'],
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
