export interface IeltsWord {
  id: string
  word: string
  pos: string
  definition: string
  collocations: string[]
  example: string
  scenarioTag: string
}

export interface ReadingQuestion {
  id: string
  kind: 'main-idea' | 'detail' | 'inference' | 'summary'
  prompt: string
  options: { id: string; label: string }[]
  answer: string
  explanation: string
}

export interface ReadingSet {
  id: string
  kind: 'scenario' | 'news' | 'paper'
  title: string
  passage: string[]
  source?: string
  questions: ReadingQuestion[]
  summaryPrompt: string
}

const w = (
  id: string,
  word: string,
  pos: string,
  definition: string,
  collocations: string[],
  example: string,
  scenarioTag: string,
): IeltsWord => ({ id, word, pos, definition, collocations, example, scenarioTag })

export const ieltsWords: IeltsWord[] = [
  w('w01', 'alleviate', 'v.', '减轻；缓和', ['alleviate poverty', 'alleviate stress'], 'Building more cycle lanes could alleviate traffic congestion in city centres.', 'society'),
  w('w02', 'ambiguous', 'adj.', '模棱两可的；含糊的', ['ambiguous wording', 'remain ambiguous'], 'The instructions were so ambiguous that half the participants misunderstood the task.', 'academic'),
  w('w03', 'coherent', 'adj.', '连贯的；条理清晰的', ['coherent argument', 'coherent policy'], 'A high-scoring essay presents a coherent line of reasoning from start to finish.', 'writing'),
  w('w04', 'compelling', 'adj.', '有说服力的；引人入胜的', ['compelling evidence', 'compelling reason'], 'There is compelling evidence that sleep deprivation harms memory consolidation.', 'academic'),
  w('w05', 'contemplate', 'v.', '深思；考虑', ['contemplate doing', 'seriously contemplate'], 'Many graduates contemplate taking a gap year before starting work.', 'daily'),
  w('w06', 'deteriorate', 'v.', '恶化；变坏', ['deteriorate rapidly', 'deteriorating condition'], 'Air quality tends to deteriorate during windless winter weeks.', 'environment'),
  w('w07', 'diminish', 'v.', '减少；降低', ['diminish returns', 'diminishing influence'], 'The benefits of extra study time diminish sharply after about four hours a day.', 'education'),
  w('w08', 'diverse', 'adj.', '多样的；形形色色的', ['culturally diverse', 'diverse range'], 'A diverse reading habit exposes you to many styles of argument.', 'culture'),
  w('w09', 'empirical', 'adj.', '以经验（或实验）为依据的', ['empirical evidence', 'empirical research'], 'Empirical studies suggest that bilingual children develop stronger attention control.', 'academic'),
  w('w10', 'exacerbate', 'v.', '使恶化；使加剧', ['exacerbate the problem', 'exacerbate inequality'], 'Cutting bus services would only exacerbate congestion, not relieve it.', 'society'),
  w('w11', 'facilitate', 'v.', '促进；使便利', ['facilitate learning', 'facilitate access'], 'Small-group tutorials facilitate deeper engagement with difficult material.', 'education'),
  w('w12', 'fluctuate', 'v.', '波动；起伏', ['prices fluctuate', 'fluctuate wildly'], 'Demand for electricity fluctuates considerably between seasons.', 'economy'),
  w('w13', 'fundamental', 'adj.', '根本的；基础的', ['fundamental principle', 'fundamental change'], 'Regular review is a fundamental principle of durable memory.', 'academic'),
  w('w14', 'hypothesis', 'n.', '假设；假说', ['test a hypothesis', 'working hypothesis'], 'The researchers tested the hypothesis that green space reduces stress hormones.', 'academic'),
  w('w15', 'implement', 'v.', '实施；执行', ['implement a policy', 'fully implemented'], 'The city implemented a congestion charge to discourage private cars.', 'society'),
  w('w16', 'inevitable', 'adj.', '不可避免的', ['inevitable consequence', 'almost inevitable'], 'Some degree of failure is an inevitable part of learning any skill.', 'daily'),
  w('w17', 'infrastructure', 'n.', '基础设施', ['transport infrastructure', 'digital infrastructure'], 'Investment in rail infrastructure usually pays off over decades.', 'society'),
  w('w18', 'legitimate', 'adj.', '合法的；正当的', ['legitimate concern', 'perfectly legitimate'], 'Concern about screen time for young children is entirely legitimate.', 'society'),
  w('w19', 'meticulous', 'adj.', '一丝不苟的；严谨的', ['meticulous planning', 'meticulous attention'], 'Meticulous note-taking makes revision far more efficient.', 'education'),
  w('w20', 'notion', 'n.', '观念；概念', ['the notion that', 'reject the notion'], 'The notion that talent matters more than practice has been widely challenged.', 'academic'),
  w('w21', 'outweigh', 'v.', '超过；重于', ['benefits outweigh risks', 'far outweigh'], 'For most commuters, the time saved outweighs the extra cost of the train.', 'society'),
  w('w22', 'paradox', 'n.', '悖论；自相矛盾的事', ['apparent paradox', 'paradox of choice'], 'The paradox of choice is that more options can make us less satisfied.', 'academic'),
  w('w23', 'plausible', 'adj.', '貌似合理的；可信的', ['plausible explanation', 'perfectly plausible'], 'One plausible explanation for the decline is the rise of remote working.', 'academic'),
  w('w24', 'pragmatic', 'adj.', '务实的；讲究实际的', ['pragmatic approach', 'pragmatic solution'], 'A pragmatic study plan focuses on the weakest skills first.', 'education'),
  w('w25', 'prevalent', 'adj.', '流行的；普遍存在的', ['increasingly prevalent', 'prevalent among'], 'Remote learning became increasingly prevalent during the pandemic years.', 'society'),
  w('w26', 'profound', 'adj.', '深刻的；深远的', ['profound impact', 'profound change'], 'The printing press had a profound impact on how knowledge spread.', 'culture'),
  w('w27', 'redundant', 'adj.', '多余的；被裁减的', ['be made redundant', 'redundant data'], 'Automation has made some routine clerical roles redundant.', 'economy'),
  w('w28', 'resilient', 'adj.', '有韧性的；能适应的', ['resilient economy', 'remarkably resilient'], 'Children who read daily prove more resilient when facing difficult texts.', 'education'),
  w('w29', 'scrutinise', 'v.', '仔细审查', ['scrutinise the data', 'closely scrutinised'], 'Examiners scrutinise task response more than any other writing criterion.', 'writing'),
  w('w30', 'substantial', 'adj.', '大量的；实质性的', ['substantial evidence', 'substantial increase'], 'A substantial body of research links vocabulary size to reading speed.', 'academic'),
  w('w31', 'tangible', 'adj.', '切实的；可触摸的', ['tangible benefits', 'tangible results'], 'Tracking your streak gives a tangible sense of progress.', 'daily'),
  w('w32', 'ubiquitous', 'adj.', '无处不在的', ['ubiquitous smartphones', 'almost ubiquitous'], 'Smartphones have become ubiquitous even in remote communities.', 'technology'),
  w('w33', 'viable', 'adj.', '可行的；能存活的', ['viable alternative', 'commercially viable'], 'Cycling is a viable alternative to driving for most short urban trips.', 'society'),
  w('w34', 'widespread', 'adj.', '广泛的；普遍的', ['widespread concern', 'widespread adoption'], 'There is widespread agreement that sleep affects academic performance.', 'society'),
  w('w35', 'acquire', 'v.', '获得；习得', ['acquire a language', 'newly acquired'], 'Vocabulary is best acquired through repeated exposure in context.', 'education'),
  w('w36', 'advocate', 'v./n.', '提倡；拥护者', ['advocate reform', 'a strong advocate'], 'Many teachers advocate spaced repetition over last-minute cramming.', 'education'),
  w('w37', 'attribute', 'v./n.', '归因于；属性', ['attribute success to', 'key attribute'], 'She attributes her listening score to daily podcast practice.', 'daily'),
  w('w38', 'comprehensive', 'adj.', '全面的；综合的', ['comprehensive review', 'comprehensive coverage'], 'A comprehensive review before the exam beats selective guessing.', 'education'),
  w('w39', 'controversial', 'adj.', '有争议的', ['highly controversial', 'controversial issue'], 'Whether homework helps primary pupils remains highly controversial.', 'society'),
  w('w40', 'curriculum', 'n.', '课程体系', ['national curriculum', 'broad curriculum'], 'A broad curriculum keeps students curious beyond exam subjects.', 'education'),
  w('w41', 'demographic', 'adj./n.', '人口统计的；人群', ['ageing demographic', 'younger demographic'], 'An ageing demographic changes what cities must provide.', 'society'),
  w('w42', 'elaborate', 'v./adj.', '详细阐述；精心制作的', ['elaborate on', 'elaborate system'], 'In speaking part 3, you are expected to elaborate on your answers.', 'speaking'),
  w('w43', 'exemplify', 'v.', '例证；是…的典范', ['exemplify the trend', 'best exemplified by'], 'Norway exemplifies how policy can accelerate electric car adoption.', 'academic'),
  w('w44', 'feasible', 'adj.', '可行的', ['technically feasible', 'feasible option'], 'Studying two focused hours daily is feasible for most working learners.', 'daily'),
  w('w45', 'gradient', 'n.', '坡度；梯度', ['steep gradient', 'learning gradient'], 'A gentle learning gradient keeps motivation high.', 'education'),
  w('w46', 'incentive', 'n.', '激励；诱因', ['financial incentive', 'strong incentive'], 'Visible progress is a powerful incentive to keep practising.', 'daily'),
  w('w47', 'jeopardise', 'v.', '危及；损害', ['jeopardise chances', 'jeopardised by'], 'Chronic sleep loss can jeopardise both health and exam performance.', 'health'),
  w('w48', 'lucrative', 'adj.', '利润丰厚的', ['lucrative career', 'highly lucrative'], 'Data science has become a lucrative career path.', 'economy'),
  w('w49', 'mandatory', 'adj.', '强制的；义务的', ['mandatory attendance', 'mandatory course'], 'Attendance at the safety briefing is mandatory for all lab users.', 'education'),
  w('w50', 'nuance', 'n.', '细微差别', ['subtle nuance', 'appreciate the nuance'], 'High-band writing captures nuance instead of relying on absolutes.', 'writing'),
  w('w51', 'obsolete', 'adj.', '过时的；淘汰的', ['become obsolete', 'obsolete technology'], 'Paper maps became almost obsolete within a decade of GPS phones.', 'technology'),
  w('w52', 'perception', 'n.', '看法；感知', ['public perception', 'shape perception'], 'Public perception of science is shaped by how results are reported.', 'media'),
  w('w53', 'quantify', 'v.', '量化', ['difficult to quantify', 'quantified precisely'], 'The benefits of reading for pleasure are hard to quantify.', 'academic'),
  w('w54', 'rigorous', 'adj.', '严谨的；严格的', ['rigorous testing', 'rigorous standards'], 'Rigorous self-testing reveals gaps that rereading hides.', 'education'),
  w('w55', 'stimulus', 'n.', '刺激（物）；促进因素', ['economic stimulus', 'external stimulus'], 'A quiet room removes external stimuli and aids concentration.', 'health'),
  w('w56', 'subtle', 'adj.', '微妙的；不易察觉的', ['subtle difference', 'subtle shift'], 'There is a subtle difference between "affect" and "effect".', 'language'),
  w('w57', 'sustainable', 'adj.', '可持续的', ['sustainable growth', 'environmentally sustainable'], 'Sustainable study habits matter more than heroic all-nighters.', 'environment'),
  w('w58', 'tentative', 'adj.', '试探性的；暂定的', ['tentative conclusion', 'tentative steps'], 'The findings support a tentative conclusion rather than a firm law.', 'academic'),
  w('w59', 'unprecedented', 'adj.', '前所未有的', ['unprecedented scale', 'almost unprecedented'], 'Online education has grown at an unprecedented pace.', 'technology'),
  w('w60', 'versatile', 'adj.', '多才多艺的；用途广的', ['versatile skill', 'highly versatile'], 'Writing is a versatile skill that transfers to almost every career.', 'daily'),
]

const q = (
  id: string,
  kind: ReadingQuestion['kind'],
  prompt: string,
  options: [string, string][],
  answer: string,
  explanation: string,
): ReadingQuestion => ({ id, kind, prompt, options: options.map(([oid, label]) => ({ id: oid, label })), answer, explanation })

export const scenarioSets: ReadingSet[] = [
  {
    id: 'sc-campus-library',
    kind: 'scenario',
    title: '情景理解 · 图书馆研讨预约',
    passage: [
      'Maya needs to book a group study room for her presentation team. The library website says rooms can be reserved up to two weeks in advance, for a maximum of three hours per day per group. During exam weeks, a valid student card is required at the door, and groups arriving more than fifteen minutes late lose their reservation.',
      'Her teammate Leo suggests booking the largest room every morning "just in case". Maya points out that unused reservations prevent other students from finding space, and the library can suspend booking privileges after three no-shows in a term.',
    ],
    questions: [
      q('sc1-q1', 'main-idea', '本段主要讲了什么？', [
        ['a', '图书馆研讨室的预约规则与使用的礼仪'],
        ['b', '如何准备课堂演讲'],
        ['c', '图书馆的历史与馆藏'],
        ['d', '学生卡丢失后的补办流程'],
      ], 'a', '两段都围绕预约规则（提前两周、三小时上限、迟到取消）与合理使用展开。'),
      q('sc1-q2', 'detail', '小组迟到多久会失去预约？', [
        ['a', '10 分钟'], ['b', '15 分钟'], ['c', '30 分钟'], ['d', '1 小时'],
      ], 'b', '原文明确："more than fifteen minutes late lose their reservation"。'),
      q('sc1-q3', 'inference', 'Maya 对 Leo 建议的态度是？', [
        ['a', '完全赞同'], ['b', '不关心'], ['c', '不赞同，认为浪费公共资源'], ['d', '认为应该订更大的房间'],
      ], 'c', 'Maya 指出空占预约会妨碍他人，且有停权风险，可见她反对这种做法。'),
      q('sc1-q4', 'summary', '哪一项最能概括预约政策的目的？', [
        ['a', '让所有学生公平地使用有限空间'], ['b', '增加图书馆收入'], ['c', '限制学生小组学习'], ['d', '推广学生卡的使用'],
      ], 'a', '规则（时限、取消、停权）都服务于公平分配有限资源。'),
    ],
    summaryPrompt: '用 2–3 句英文总结预约规则，并说明你如何避免失约。',
  },
  {
    id: 'sc-landlord-repair',
    kind: 'scenario',
    title: '情景理解 · 租房维修沟通',
    passage: [
      'Tom emails his landlord about a leaking kitchen tap. The tenancy agreement states that minor repairs under £80 are the tenant\'s responsibility, while structural issues — plumbing inside walls, heating systems, roofing — are covered by the landlord. The landlord replies that a dripping tap counts as a minor repair, but offers to recommend a reliable plumber who charges a fixed call-out fee.',
      'Tom checks his records and notices the leak comes from a pipe joint inside the wall, not the tap itself. He photographs the damp patch spreading on the plaster and replies, quoting the clause on structural plumbing.',
    ],
    questions: [
      q('sc2-q1', 'main-idea', '本段的核心是？', [
        ['a', '界定维修责任归属的一次沟通'], ['b', '如何修理水龙头'], ['c', '签订租约的流程'], ['d', '如何选择水管工'],
      ], 'a', '全文围绕"谁该为这次漏水负责"展开。'),
      q('sc2-q2', 'detail', '根据租约，多少英镑以下的小修由租客承担？', [
        ['a', '£50'], ['b', '£80'], ['c', '£100'], ['d', '£120'],
      ], 'b', '原文："minor repairs under £80 are the tenant\'s responsibility"。'),
      q('sc2-q3', 'inference', 'Tom 拍照并引用条款，说明他？', [
        ['a', '想用证据证明维修应由房东负责'], ['b', '准备自己修理'], ['c', '打算提前退租'], ['d', '想换一个水管工'],
      ], 'a', '漏水来自墙内管道，属于房东责任范围，他在收集证据支持自己的主张。'),
      q('sc2-q4', 'summary', '从本段可得出什么沟通策略？', [
        ['a', '熟悉合同条款并保留证据有助于解决纠纷'], ['b', '房东总是正确的'], ['c', '所有维修都应找最贵的工人'], ['d', '邮件不如电话有效'],
      ], 'a', 'Tom 的做法（查记录、拍照、引用条款）正是理性维权的示范。'),
    ],
    summaryPrompt: '用英文写一封简短邮件，向房东说明一处房屋问题并请求维修。',
  },
  {
    id: 'sc-job-interview',
    kind: 'scenario',
    title: '情景理解 · 面试后的跟进',
    passage: [
      'After her interview for a research assistant post, Priya sends a thank-you email within twenty-four hours. She mentions a specific moment from the conversation — the lab\'s upcoming fieldwork season — and briefly adds that her statistics coursework would support the data work the team described. She keeps the message under 150 words.',
      'A week later she has heard nothing. Careers advisers suggest one polite follow-up is acceptable after seven to ten working days, but repeated messages can appear impatient. Priya sends a single short note restating her interest, and receives an apologetic reply: the panel had been delayed by budget approvals.',
    ],
    questions: [
      q('sc3-q1', 'main-idea', '本段主要介绍？', [
        ['a', '面试后得体跟进的时机与方式'], ['b', '如何写简历'], ['c', '研究助理的日常工作'], ['d', '预算审批的流程'],
      ], 'a', '两段分别讲感谢信与追问信的正确做法。'),
      q('sc3-q2', 'detail', '感谢邮件应在面试后多久内发出？', [
        ['a', '6 小时'], ['b', '24 小时'], ['c', '3 天'], ['d', '一周'],
      ], 'b', '原文："within twenty-four hours"。'),
      q('sc3-q3', 'inference', '招聘方迟迟未回复的真实原因是？', [
        ['a', '对 Priya 不满意'], ['b', '行政流程（预算审批）延误'], ['c', '职位已取消'], ['d', '邮件被遗漏'],
      ], 'b', '回复中明确提到 "delayed by budget approvals"。'),
      q('sc3-q4', 'summary', '跟进邮件的要领是？', [
        ['a', '简短、具体、礼貌，且不过度频繁'], ['b', '越长越详细越好'], ['c', '每天发一封直到收到回复'], ['d', '只打电话不发邮件'],
      ], 'a', '150 词以内、提及具体细节、一次礼貌追问——正是文中示范。'),
    ],
    summaryPrompt: '用英文写一封 100 词左右的面试感谢信提纲。',
  },
  {
    id: 'sc-gym-membership',
    kind: 'scenario',
    title: '情景理解 · 健身房会员条款',
    passage: [
      'A city gym advertises memberships "from £19 a month". The small print explains that this rate applies only to off-peak access (10:00–16:00 on weekdays) with a twelve-month commitment. Peak memberships cost £34 monthly, and a £25 joining fee applies to all new contracts. Members may freeze their membership for up to two months per year for medical reasons, with a doctor\'s note.',
      'Cancellation before the minimum term ends triggers a fee of 50% of the remaining payments. After the twelfth month, the contract rolls monthly and can be cancelled with thirty days\' notice.',
    ],
    questions: [
      q('sc4-q1', 'main-idea', '本段的主旨是？', [
        ['a', '解读健身房会员价格与条款的细节'], ['b', '健身房器械介绍'], ['c', '如何制定健身计划'], ['d', '医生证明的开具流程'],
      ], 'a', '全文逐条解释广告价格背后的限制条件。'),
      q('sc4-q2', 'detail', '冻结会员资格每年最多多久？', [
        ['a', '两周'], ['b', '一个月'], ['c', '两个月'], ['d', '三个月'],
      ], 'c', '原文："freeze their membership for up to two months per year"。'),
      q('sc4-q3', 'inference', '广告中的 "from £19" 可能让人误解为？', [
        ['a', '所有人都能以 £19 随时使用健身房'], ['b', '健身房全年休息'], ['c', '入会无需任何费用'], ['d', '价格每月都会下降'],
      ], 'a', '最低价仅限非高峰时段且需签约一年，广告措辞容易造成误解。'),
      q('sc4-q4', 'summary', '签任何会员合同前应当？', [
        ['a', '细读条款：期限、费用、取消与冻结政策'], ['b', '只看广告大字'], ['c', '当天立即签约'], ['d', '拒绝一切长期合同'],
      ], 'a', '文中所有"坑"都来自未细读的条款。'),
    ],
    summaryPrompt: '用英文列出签约前要问销售人员的三个问题。',
  },
  {
    id: 'sc-course-deadline',
    kind: 'scenario',
    title: '情景理解 · 课程作业延期申请',
    passage: [
      'The university\'s policy allows coursework extensions of up to five working days when students face "unforeseen circumstances" — illness, family emergencies, or similar disruption. Requests must be filed before the original deadline through the faculty portal, with supporting evidence where possible. Extensions requested after the deadline cannot be considered.',
      'Raj has flu during submission week. He uploads a medical certificate on Monday, two days before his Friday deadline, and asks for three extra days. His tutor approves the request within hours and reminds him that extension work is marked normally, without penalty.',
    ],
    questions: [
      q('sc5-q1', 'main-idea', '本段说明了？', [
        ['a', '作业延期政策与一次成功申请'], ['b', '如何治疗流感'], ['c', '教师评分标准'], ['d', '校园门户的使用教程'],
      ], 'a', '先讲政策，再给出一个合规申请的例子。'),
      q('sc5-q2', 'detail', '延期最长为几个工作日？', [
        ['a', '3'], ['b', '5'], ['c', '7'], ['d', '10'],
      ], 'b', '原文："extensions of up to five working days"。'),
      q('sc5-q3', 'inference', 'Raj 的申请迅速获批，最可能是因为？', [
        ['a', '他在截止日期前提交且附了有效证明'], ['b', '他和导师关系好'], ['c', '延期不需要理由'], ['d', '他申请了最长的延期'],
      ], 'a', '提前申请 + 医疗证明，完全符合政策要求。'),
      q('sc5-q4', 'summary', '若预感无法按时交作业，正确做法是？', [
        ['a', '在原定截止前通过正式渠道申请延期并提供证明'], ['b', '先逾期再解释'], ['c', '直接放弃该作业'], ['d', '让同学代交'],
      ], 'a', '政策明确：截止后申请不予受理。'),
    ],
    summaryPrompt: '用英文写一封申请作业延期的邮件（说明原因、时长与附件）。',
  },
  {
    id: 'sc-volunteer-signup',
    kind: 'scenario',
    title: '情景理解 · 志愿活动报名',
    passage: [
      'A coastal charity recruits weekend volunteers for beach clean-ups. New volunteers attend a forty-minute safety briefing on their first morning, covering tides, sharp objects, and sun protection. The charity provides gloves and litter pickers, but asks volunteers to bring their own water and sturdy footwear.',
      'Regular volunteers can train as team leaders after six sessions. Team leaders check equipment, brief newcomers, and log the weight of collected litter, which the charity publishes in an annual report used to lobby for reduced plastic packaging.',
    ],
    questions: [
      q('sc6-q1', 'main-idea', '本段主要介绍？', [
        ['a', '海滩清洁志愿活动的安排与成长路径'], ['b', '海洋污染的科学原理'], ['c', '慈善机构的财务状况'], ['d', '如何制造垃圾夹'],
      ], 'a', '从新人须知到组长职责，完整勾勒出参与方式。'),
      q('sc6-q2', 'detail', '志愿者需要自带什么？', [
        ['a', '手套和垃圾夹'], ['b', '水和结实的鞋'], ['c', '防晒霜和帽子'], ['d', '急救包'],
      ], 'b', '装备由机构提供，"bring their own water and sturdy footwear"。'),
      q('sc6-q3', 'inference', '记录垃圾重量的目的是？', [
        ['a', '形成数据用于环保倡议'], ['b', '向志愿者收费'], ['c', '评选最美海滩'], ['d', '统计志愿者出勤'],
      ], 'a', '数据进入年报，用于游说减少塑料包装。'),
      q('sc6-q4', 'summary', '想长期参与志愿活动的人可以获得？', [
        ['a', '培训与承担更多责任的机会'], ['b', '免费旅行'], ['c', '大学学分保证'], ['d', '时薪报酬'],
      ], 'a', '六次活动后可培训成为组长。'),
    ],
    summaryPrompt: '用英文写一段话，说服朋友参加一次志愿活动。',
  },
]

export const englishNewsSets: ReadingSet[] = [
  {
    id: 'news-ai-tutors',
    kind: 'news',
    title: '新闻阅读 · AI 辅导走进课堂',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'Schools in three European countries are piloting AI tutoring assistants that give pupils instant feedback on mathematics exercises. Early results from the year-long trial, involving 12,000 students, suggest the biggest gains appear among pupils who previously asked few questions in class.',
      'Teachers in the programme stress that the systems are designed to free up lesson time rather than replace human judgement. "The software handles routine marking; I handle motivation and misconceptions," one maths teacher said. Education ministries say they will publish an independent evaluation before any national rollout, and several pilots now include weekly "unplugged" sessions to keep discussion skills sharp.',
    ],
    questions: [
      q('n1-q1', 'main-idea', '这篇报道的中心是？', [
        ['a', 'AI 辅导试点的初步成效与审慎推广态度'],
        ['b', 'AI 将全面取代教师'],
        ['c', '欧洲三国教育经费削减'],
        ['d', '学生抵触新技术'],
      ], 'a', '报道呈现成效，也强调评估与"不插电"课堂等审慎安排。'),
      q('n1-q2', 'detail', '试点涉及多少名学生？', [
        ['a', '1,200'], ['b', '12,000'], ['c', '120,000'], ['d', '未提及'],
      ], 'b', '原文明确给出 12,000。'),
      q('n1-q3', 'inference', '设置每周"不插电"课堂的意图是？', [
        ['a', '保持学生的讨论与表达能力'], ['b', '节约电费'], ['c', '减少教师工作量'], ['d', '维修服务器'],
      ], 'a', '原文："to keep discussion skills sharp"。'),
      q('n1-q4', 'summary', '教师如何看待 AI 系统的角色？', [
        ['a', '处理常规批改，人类负责激励与纠偏'], ['b', '完全替代备课'], ['c', '只用于考试监考'], ['d', '用来布置更多作业'],
      ], 'a', '教师的原话明确划分了人机分工。'),
    ],
    summaryPrompt: '用英文写 3 句话总结这条新闻，并给出你对 AI 进课堂的一点看法。',
  },
  {
    id: 'news-green-bonds',
    kind: 'news',
    title: '新闻阅读 · 绿色债券市场升温',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'Global issuance of green bonds — debt earmarked for environmental projects — reached a record high this quarter, driven largely by offshore wind and grid-storage deals. Analysts note that demand from pension funds has outstripped supply, pushing borrowing costs for certified projects below those of conventional bonds, a gap traders call the "greenium".',
      'Regulators, however, warn that inconsistent labelling remains the market\'s weakest link. A new disclosure standard taking effect next year will require issuers to report project-level emissions annually, aiming to reassure investors wary of "greenwashing".',
    ],
    questions: [
      q('n2-q1', 'main-idea', '报道的主旨是？', [
        ['a', '绿色债券创纪录发行与监管对透明度的强化'], ['b', '养老金基金的亏损'], ['c', '风电技术原理'], ['d', '传统债券的消亡'],
      ], 'a', '一段讲市场热度，二段讲监管补短板。'),
      q('n2-q2', 'detail', '"greenium" 指的是什么？', [
        ['a', '绿色项目融资成本低于传统债券的价差'], ['b', '一种新的加密货币'], ['c', '债券违约率'], ['d', '碳排放交易价格'],
      ], 'a', '原文解释了该词含义：认证项目借贷成本更低形成的 gap。'),
      q('n2-q3', 'inference', '监管者最担心的风险是？', [
        ['a', '标准不一导致"漂绿"损害信任'], ['b', '利率过低'], ['c', '风电过剩'], ['d', '投资者过于谨慎'],
      ], 'a', '"inconsistent labelling" 与 "greenwashing" 点明担忧。'),
      q('n2-q4', 'summary', '新的披露标准要求发行方？', [
        ['a', '每年按项目报告排放数据'], ['b', '立即停止发债'], ['c', '只投资风电'], ['d', '降低债券价格'],
      ], 'a', '原文："report project-level emissions annually"。'),
    ],
    summaryPrompt: '用英文解释 "greenium"，并说明新披露规则为何重要。',
  },
  {
    id: 'news-marathon-tech',
    kind: 'news',
    title: '新闻阅读 · 马拉松与运动科技',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'When the city marathon introduced real-time tracking for all 30,000 runners this year, spectators could follow friends street by street. Behind the scenes, race organisers used the same data to reroute medical teams, cutting average response times by nearly a third.',
      'Sports scientists caution that consumer wearables still lag lab equipment for metrics like hydration, and urge runners to treat watch readings as trends rather than verdicts. Next year\'s race will pilot recyclable timing chips, part of a wider pledge to make the event carbon-neutral by 2028.',
    ],
    questions: [
      q('n3-q1', 'main-idea', '这篇报道主要讲？', [
        ['a', '数据技术如何提升马拉松体验与安全，及其局限'], ['b', '马拉松冠军的训练秘诀'], ['c', '可穿戴设备广告'], ['d', '城市交通改造'],
      ], 'a', '报道涵盖应用、医疗调度收益、测量局限与环保计划。'),
      q('n3-q2', 'detail', '医疗响应时间改善了多少？', [
        ['a', '约三分之一'], ['b', '一半'], ['c', '10%'], ['d', '两倍'],
      ], 'a', '原文："cutting average response times by nearly a third"。'),
      q('n3-q3', 'inference', '科学家建议跑者把手表读数当作"趋势"，意味着？', [
        ['a', '读数有误差，应看长期变化而非单次绝对值'], ['b', '手表完全无用'], ['c', '实验室设备更便宜'], ['d', '跑者不应补水'],
      ], 'a', '"treat readings as trends rather than verdicts" 暗示精度有限。'),
      q('n3-q4', 'summary', '赛事方的环保举措包括？', [
        ['a', '试点可回收计时芯片，目标 2028 碳中和'], ['b', '取消所有补给站'], ['c', '改用电动救护车'], ['d', '限制观众人数'],
      ], 'a', '原文最后一句明确。'),
    ],
    summaryPrompt: '用英文写出这条新闻的两个要点和你认为最有价值的一点。',
  },
  {
    id: 'news-deep-sea',
    kind: 'news',
    title: '新闻阅读 · 深海热泉新物种',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'A research expedition has catalogued more than a dozen previously unknown species around hydrothermal vents two kilometres beneath the Pacific. The team used a remotely operated vehicle equipped with low-light cameras and gentle suction samplers, allowing several fragile organisms to be studied alive for the first time.',
      'Biologists say the vents, once dismissed as barren, now appear to host distinct communities every few hundred kilometres. The findings arrive as governments debate deep-sea mining rules; the expedition\'s lead scientist argues that baseline surveys must precede any extraction licences "so we know what we stand to lose".',
    ],
    questions: [
      q('n4-q1', 'main-idea', '报道的核心是？', [
        ['a', '深海新物种发现及其对采矿政策的意义'], ['b', '潜水器的技术参数'], ['c', '太平洋旅游路线'], ['d', '已灭绝物种研究'],
      ], 'a', '发现本身与"先调查、后开采"的政策主张构成主线。'),
      q('n4-q2', 'detail', '考察海域的深度约为？', [
        ['a', '200 米'], ['b', '2 公里'], ['c', '20 公里'], ['d', '200 公里'],
      ], 'b', '原文："two kilometres beneath the Pacific"。'),
      q('n4-q3', 'inference', '"so we know what we stand to lose" 表明首席科学家主张？', [
        ['a', '先摸清生态本底再谈开采许可'], ['b', '立即全面开采'], ['c', '停止一切海洋研究'], ['d', '只保护大型动物'],
      ], 'a', '基线调查先于许可证，正是谨慎立场。'),
      q('n4-q4', 'summary', '新发现改变了人们对深海热泉的什么认识？', [
        ['a', '它们并非荒芜，而是拥有各具特色的群落'], ['b', '它们完全没有生命'], ['c', '它们只在赤道存在'], ['d', '它们正在迅速消失'],
      ], 'a', '"once dismissed as barren" 与 "distinct communities" 构成转折。'),
    ],
    summaryPrompt: '用英文概括这项发现，并说明你支持或反对深海采矿的理由。',
  },
]

export const paperSets: ReadingSet[] = [
  {
    id: 'paper-spaced-repetition',
    kind: 'paper',
    title: '论文摘要 · 间隔重复与长期记忆',
    source: '模拟学术摘要 · Cognitive Psychology 方向',
    passage: [
      'Abstract: We meta-analysed 254 experiments comparing spaced and massed practice across verbal, motor, and mathematical tasks. Spaced schedules produced reliably larger retention after delays of one week or more (average effect size d = 0.54), with the advantage growing as the retention interval lengthened. Benefits were smallest for immediate tests, where massed practice occasionally prevailed.',
      'Moderator analyses indicated that expanding intervals slightly outperformed uniform intervals for verbal material, while feedback quality — not interval shape — was the strongest moderator for problem-solving tasks. We conclude that spacing is a robust, domain-general phenomenon, but its magnitude depends on what is being learned and how errors are corrected.',
    ],
    questions: [
      q('p1-q1', 'main-idea', '该研究的核心结论是？', [
        ['a', '间隔练习普遍优于集中练习，但优势大小受任务与反馈影响'],
        ['b', '集中练习永远最好'],
        ['c', '记忆训练没有意义'],
        ['d', '只有语言学习适合间隔重复'],
      ], 'a', '"robust, domain-general" 加上 "magnitude depends" 概括了结论。'),
      q('p1-q2', 'detail', '元分析纳入了多少个实验？', [
        ['a', '54'], ['b', '254'], ['c', '2,054'], ['d', '未说明'],
      ], 'b', '摘要第一句给出 254。'),
      q('p1-q3', 'inference', '若学生明天就要考试，研究发现提示？', [
        ['a', '集中突击在即时测试中偶尔占优，间隔优势主要体现于长时保持'], ['b', '间隔练习仍大幅领先'], ['c', '两种方法完全等效'], ['d', '考试前应放弃复习'],
      ], 'a', '"smallest for immediate tests, where massed practice occasionally prevailed"。'),
      q('p1-q4', 'summary', '对解题类任务，最强的调节因素是？', [
        ['a', '反馈质量'], ['b', '间隔形状'], ['c', '学习时长'], ['d', '材料语言'],
      ], 'a', '"feedback quality ... was the strongest moderator for problem-solving tasks"。'),
    ],
    summaryPrompt: '用英文写一句话概括该摘要，并说它如何影响你的学习计划。',
  },
  {
    id: 'paper-urban-green',
    kind: 'paper',
    title: '论文摘要 · 城市绿地与心理健康',
    source: '模拟学术摘要 · Public Health 方向',
    passage: [
      'Abstract: Using a nationally representative panel of 9,800 adults followed for six years, we estimated the association between residential greenness (satellite-derived NDVI within 300 m) and self-reported psychological distress. Moving from the lowest to the highest greenness quartile was associated with a 13% lower odds of persistent distress after adjusting for income, employment, and baseline health.',
      'The association attenuated by roughly half when physical activity and social cohesion were added to the model, suggesting these behaviours partly mediate the greenness–distress link. Because the design is observational, causal claims should be made cautiously; natural experiments around new park openings are a priority for future work.',
    ],
    questions: [
      q('p2-q1', 'main-idea', '研究主要发现？', [
        ['a', '居住绿地越多，持续心理困扰几率越低，部分由运动与社会联结中介'],
        ['b', '绿地对心理健康毫无影响'],
        ['c', '收入是唯一影响因素'],
        ['d', '卫星数据无法用于健康研究'],
      ], 'a', '主效应与中介分析共同支持该结论。'),
      q('p2-q2', 'detail', '绿地暴露最高的组别，持续困扰几率降低了约多少？', [
        ['a', '3%'], ['b', '13%'], ['c', '31%'], ['d', '50%'],
      ], 'b', '原文："13% lower odds"。'),
      q('p2-q3', 'inference', '作者为何建议谨慎下因果结论？', [
        ['a', '研究为观察性设计，无法排除混杂'], ['b', '样本量太小'], ['c', '没有使用卫星数据'], ['d', '追踪时间过长'],
      ], 'a', '"Because the design is observational, causal claims should be made cautiously"。'),
      q('p2-q4', 'summary', '加入运动与社会联结后关联减弱一半，说明？', [
        ['a', '绿地部分通过促进行为与社会交往起作用'], ['b', '绿地完全没有作用'], ['c', '模型存在计算错误'], ['d', '受访者谎报了情况'],
      ], 'a', '衰减提示中介机制："partly mediate"。'),
    ],
    summaryPrompt: '用英文解释为什么观察性研究不能直接证明因果，并举本文一例。',
  },
  {
    id: 'paper-battery-recycling',
    kind: 'paper',
    title: '论文摘要 · 锂电池回收新技术',
    source: '模拟学术摘要 · Materials Science 方向',
    passage: [
      'Abstract: We present a low-temperature hydrometallurgical process that recovers lithium, cobalt, and nickel from spent electric-vehicle batteries. Bench-scale tests achieved recovery rates of 92%, 97%, and 96% respectively, while cutting process energy use by 40% relative to conventional smelting. The leaching agent is regenerated in a closed loop, limiting secondary waste.',
      'Techno-economic analysis indicates profitability at current cobalt prices for plants processing at least 8,000 tonnes per year. Sensitivity analysis shows the economics are most vulnerable to lithium price volatility, highlighting the value of long-term supply contracts with vehicle manufacturers.',
    ],
    questions: [
      q('p3-q1', 'main-idea', '该研究提出的工艺特点是？', [
        ['a', '低温湿法回收率高且能耗显著低于冶炼'], ['b', '完全不需要化学试剂'], ['c', '只能回收锂'], ['d', '已在全行业普及'],
      ], 'a', '回收率数字 + 能耗下降 40% + 闭环再生试剂支持此概括。'),
      q('p3-q2', 'detail', '钴的回收率是多少？', [
        ['a', '92%'], ['b', '96%'], ['c', '97%'], ['d', '40%'],
      ], 'c', '三种金属回收率依次为 92%、97%、96%，钴居中为 97%。'),
      q('p3-q3', 'inference', '工艺经济性对什么最敏感？', [
        ['a', '锂价波动'], ['b', '电价波动'], ['c', '运输距离'], ['d', '劳动力成本'],
      ], 'a', '"most vulnerable to lithium price volatility"。'),
      q('p3-q4', 'summary', '实现盈利的条件是？', [
        ['a', '年处理量至少 8,000 吨且钴价维持当前水平'], ['b', '任意规模都盈利'], ['c', '政府补贴永久存在'], ['d', '只处理一种金属'],
      ], 'a', '原文给出盈亏平衡的规模与价格条件。'),
    ],
    summaryPrompt: '用英文写出该工艺的两个优势与一个商业风险。',
  },
  {
    id: 'paper-language-brain',
    kind: 'paper',
    title: '论文摘要 · 双语经验与认知老化',
    source: '模拟学术摘要 · Neuroscience 方向',
    passage: [
      'Abstract: Lifelong bilingualism has been proposed to contribute to "cognitive reserve", delaying dementia symptoms. We compared 214 bilingual and 198 monolingual older adults matched for education and occupation. Bilinguals received their diagnosis on average 3.8 years later, despite comparable levels of brain pathology at autopsy in a small subsample.',
      'Executive-control tasks showed the largest group differences, consistent with the claim that managing two languages exercises domain-general control networks. We caution that immigration history and socioeconomic factors remain difficult to fully match, and preregistered longitudinal studies are needed before bilingualism can be prescribed as a protective strategy.',
    ],
    questions: [
      q('p4-q1', 'main-idea', '研究支持的主要观点是？', [
        ['a', '终身双语与症状延迟相关，或与执行控制网络的锻炼有关'],
        ['b', '双语可以治愈痴呆'],
        ['c', '单语者大脑更健康'],
        ['d', '病理差异完全解释症状差异'],
      ], 'a', '延迟 3.8 年 + 执行控制差异支持"认知储备"解释。'),
      q('p4-q2', 'detail', '双语者平均晚多少年确诊？', [
        ['a', '1.8 年'], ['b', '3.8 年'], ['c', '8.3 年'], ['d', '14 年'],
      ], 'b', '原文："on average 3.8 years later"。'),
      q('p4-q3', 'inference', '作者为何强调需要预注册的纵向研究？', [
        ['a', '现有对照难以完全匹配移民与社会经济因素，证据尚不足以作为干预建议'], ['b', '因为实验完全没有价值'], ['c', '为了延长研究经费'], ['d', '因为双语有害'],
      ], 'a', '作者在 limitations 中明确该顾虑。'),
      q('p4-q4', 'summary', '"认知储备"在本文中指？', [
        ['a', '大脑在相似病理下维持功能更久的能力'], ['b', '记忆的存储容量'], ['c', '词汇量的大小'], ['d', '大脑的物理体积'],
      ], 'a', '病理相当却更晚出现症状，正是储备概念的操作化。'),
    ],
    summaryPrompt: '用英文总结研究设计，并写出作者提到的一个局限。',
  },
]
