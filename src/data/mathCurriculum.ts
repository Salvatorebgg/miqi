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
    resources: [
      { title: '【高中数学】函数的概念与性质', provider: 'Bilibili · 一数', url: 'https://search.bilibili.com/all?keyword=%E5%87%BD%E6%95%B0%E7%9A%84%E6%A6%82%E5%BF%B5%E4%B8%8E%E6%80%A7%E8%B4%A8', kind: 'video' },
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
        answer: 0.707, tolerance: 0.001,
        solution: ['cosθ = (1)/(1 × √2) ≈ 0.707。'],
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
