export interface IeltsWord {
  id: string
  word: string
  /** IPA pronunciation, e.g. "/əˈliːvi.eɪt/". */
  phonetic: string
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
  /** Chinese translation of each passage paragraph, parallel to `passage`. */
  translation: string[]
  source?: string
  questions: ReadingQuestion[]
  summaryPrompt: string
}

const w = (
  id: string,
  word: string,
  phonetic: string,
  pos: string,
  definition: string,
  collocations: string[],
  example: string,
  scenarioTag: string,
): IeltsWord => ({ id, word, phonetic, pos, definition, collocations, example, scenarioTag })

export const ieltsWords: IeltsWord[] = [
  w('w01', 'alleviate', '/əˈliːvi.eɪt/', 'v.', '减轻；缓和', ['alleviate poverty', 'alleviate stress'], 'Building more cycle lanes could alleviate traffic congestion in city centres.', 'society'),
  w('w02', 'ambiguous', '/æmˈbɪɡjuəs/', 'adj.', '模棱两可的；含糊的', ['ambiguous wording', 'remain ambiguous'], 'The instructions were so ambiguous that half the participants misunderstood the task.', 'academic'),
  w('w03', 'coherent', '/kəʊˈhɪərənt/', 'adj.', '连贯的；条理清晰的', ['coherent argument', 'coherent policy'], 'A high-scoring essay presents a coherent line of reasoning from start to finish.', 'writing'),
  w('w04', 'compelling', '/kəmˈpelɪŋ/', 'adj.', '有说服力的；引人入胜的', ['compelling evidence', 'compelling reason'], 'There is compelling evidence that sleep deprivation harms memory consolidation.', 'academic'),
  w('w05', 'contemplate', '/ˈkɒntəmpleɪt/', 'v.', '深思；考虑', ['contemplate doing', 'seriously contemplate'], 'Many graduates contemplate taking a gap year before starting work.', 'daily'),
  w('w06', 'deteriorate', '/dɪˈtɪəriəreɪt/', 'v.', '恶化；变坏', ['deteriorate rapidly', 'deteriorating condition'], 'Air quality tends to deteriorate during windless winter weeks.', 'environment'),
  w('w07', 'diminish', '/dɪˈmɪnɪʃ/', 'v.', '减少；降低', ['diminish returns', 'diminishing influence'], 'The benefits of extra study time diminish sharply after about four hours a day.', 'education'),
  w('w08', 'diverse', '/daɪˈvɜːs/', 'adj.', '多样的；形形色色的', ['culturally diverse', 'diverse range'], 'A diverse reading habit exposes you to many styles of argument.', 'culture'),
  w('w09', 'empirical', '/ɪmˈpɪrɪkl/', 'adj.', '以经验（或实验）为依据的', ['empirical evidence', 'empirical research'], 'Empirical studies suggest that bilingual children develop stronger attention control.', 'academic'),
  w('w10', 'exacerbate', '/ɪɡˈzæsəbeɪt/', 'v.', '使恶化；使加剧', ['exacerbate the problem', 'exacerbate inequality'], 'Cutting bus services would only exacerbate congestion, not relieve it.', 'society'),
  w('w11', 'facilitate', '/fəˈsɪlɪteɪt/', 'v.', '促进；使便利', ['facilitate learning', 'facilitate access'], 'Small-group tutorials facilitate deeper engagement with difficult material.', 'education'),
  w('w12', 'fluctuate', '/ˈflʌktʃueɪt/', 'v.', '波动；起伏', ['prices fluctuate', 'fluctuate wildly'], 'Demand for electricity fluctuates considerably between seasons.', 'economy'),
  w('w13', 'fundamental', '/ˌfʌndəˈmentl/', 'adj.', '根本的；基础的', ['fundamental principle', 'fundamental change'], 'Regular review is a fundamental principle of durable memory.', 'academic'),
  w('w14', 'hypothesis', '/haɪˈpɒθəsɪs/', 'n.', '假设；假说', ['test a hypothesis', 'working hypothesis'], 'The researchers tested the hypothesis that green space reduces stress hormones.', 'academic'),
  w('w15', 'implement', '/ˈɪmplɪment/', 'v.', '实施；执行', ['implement a policy', 'fully implemented'], 'The city implemented a congestion charge to discourage private cars.', 'society'),
  w('w16', 'inevitable', '/ɪnˈevɪtəbl/', 'adj.', '不可避免的', ['inevitable consequence', 'almost inevitable'], 'Some degree of failure is an inevitable part of learning any skill.', 'daily'),
  w('w17', 'infrastructure', '/ˈɪnfrəstrʌktʃə/', 'n.', '基础设施', ['transport infrastructure', 'digital infrastructure'], 'Investment in rail infrastructure usually pays off over decades.', 'society'),
  w('w18', 'legitimate', '/lɪˈdʒɪtɪmət/', 'adj.', '合法的；正当的', ['legitimate concern', 'perfectly legitimate'], 'Concern about screen time for young children is entirely legitimate.', 'society'),
  w('w19', 'meticulous', '/məˈtɪkjələs/', 'adj.', '一丝不苟的；严谨的', ['meticulous planning', 'meticulous attention'], 'Meticulous note-taking makes revision far more efficient.', 'education'),
  w('w20', 'notion', '/ˈnəʊʃn/', 'n.', '观念；概念', ['the notion that', 'reject the notion'], 'The notion that talent matters more than practice has been widely challenged.', 'academic'),
  w('w21', 'outweigh', '/ˌaʊtˈweɪ/', 'v.', '超过；重于', ['benefits outweigh risks', 'far outweigh'], 'For most commuters, the time saved outweighs the extra cost of the train.', 'society'),
  w('w22', 'paradox', '/ˈpærədɒks/', 'n.', '悖论；自相矛盾的事', ['apparent paradox', 'paradox of choice'], 'The paradox of choice is that more options can make us less satisfied.', 'academic'),
  w('w23', 'plausible', '/ˈplɔːzəbl/', 'adj.', '貌似合理的；可信的', ['plausible explanation', 'perfectly plausible'], 'One plausible explanation for the decline is the rise of remote working.', 'academic'),
  w('w24', 'pragmatic', '/præɡˈmætɪk/', 'adj.', '务实的；讲究实际的', ['pragmatic approach', 'pragmatic solution'], 'A pragmatic study plan focuses on the weakest skills first.', 'education'),
  w('w25', 'prevalent', '/ˈprevələnt/', 'adj.', '流行的；普遍存在的', ['increasingly prevalent', 'prevalent among'], 'Remote learning became increasingly prevalent during the pandemic years.', 'society'),
  w('w26', 'profound', '/prəˈfaʊnd/', 'adj.', '深刻的；深远的', ['profound impact', 'profound change'], 'The printing press had a profound impact on how knowledge spread.', 'culture'),
  w('w27', 'redundant', '/rɪˈdʌndənt/', 'adj.', '多余的；被裁减的', ['be made redundant', 'redundant data'], 'Automation has made some routine clerical roles redundant.', 'economy'),
  w('w28', 'resilient', '/rɪˈzɪliənt/', 'adj.', '有韧性的；能适应的', ['resilient economy', 'remarkably resilient'], 'Children who read daily prove more resilient when facing difficult texts.', 'education'),
  w('w29', 'scrutinise', '/ˈskruːtənaɪz/', 'v.', '仔细审查', ['scrutinise the data', 'closely scrutinised'], 'Examiners scrutinise task response more than any other writing criterion.', 'writing'),
  w('w30', 'substantial', '/səbˈstænʃl/', 'adj.', '大量的；实质性的', ['substantial evidence', 'substantial increase'], 'A substantial body of research links vocabulary size to reading speed.', 'academic'),
  w('w31', 'tangible', '/ˈtændʒəbl/', 'adj.', '切实的；可触摸的', ['tangible benefits', 'tangible results'], 'Tracking your streak gives a tangible sense of progress.', 'daily'),
  w('w32', 'ubiquitous', '/juːˈbɪkwɪtəs/', 'adj.', '无处不在的', ['ubiquitous smartphones', 'almost ubiquitous'], 'Smartphones have become ubiquitous even in remote communities.', 'technology'),
  w('w33', 'viable', '/ˈvaɪəbl/', 'adj.', '可行的；能存活的', ['viable alternative', 'commercially viable'], 'Cycling is a viable alternative to driving for most short urban trips.', 'society'),
  w('w34', 'widespread', '/ˈwaɪdspred/', 'adj.', '广泛的；普遍的', ['widespread concern', 'widespread adoption'], 'There is widespread agreement that sleep affects academic performance.', 'society'),
  w('w35', 'acquire', '/əˈkwaɪə/', 'v.', '获得；习得', ['acquire a language', 'newly acquired'], 'Vocabulary is best acquired through repeated exposure in context.', 'education'),
  w('w36', 'advocate', '/ˈædvəkeɪt/', 'v./n.', '提倡；拥护者', ['advocate reform', 'a strong advocate'], 'Many teachers advocate spaced repetition over last-minute cramming.', 'education'),
  w('w37', 'attribute', '/əˈtrɪbjuːt/', 'v./n.', '归因于；属性', ['attribute success to', 'key attribute'], 'She attributes her listening score to daily podcast practice.', 'daily'),
  w('w38', 'comprehensive', '/ˌkɒmprɪˈhensɪv/', 'adj.', '全面的；综合的', ['comprehensive review', 'comprehensive coverage'], 'A comprehensive review before the exam beats selective guessing.', 'education'),
  w('w39', 'controversial', '/ˌkɒntrəˈvɜːʃl/', 'adj.', '有争议的', ['highly controversial', 'controversial issue'], 'Whether homework helps primary pupils remains highly controversial.', 'society'),
  w('w40', 'curriculum', '/kəˈrɪkjələm/', 'n.', '课程体系', ['national curriculum', 'broad curriculum'], 'A broad curriculum keeps students curious beyond exam subjects.', 'education'),
  w('w41', 'demographic', '/ˌdeməˈɡræfɪk/', 'adj./n.', '人口统计的；人群', ['ageing demographic', 'younger demographic'], 'An ageing demographic changes what cities must provide.', 'society'),
  w('w42', 'elaborate', '/ɪˈlæbəreɪt/', 'v./adj.', '详细阐述；精心制作的', ['elaborate on', 'elaborate system'], 'In speaking part 3, you are expected to elaborate on your answers.', 'speaking'),
  w('w43', 'exemplify', '/ɪɡˈzemplɪfaɪ/', 'v.', '例证；是…的典范', ['exemplify the trend', 'best exemplified by'], 'Norway exemplifies how policy can accelerate electric car adoption.', 'academic'),
  w('w44', 'feasible', '/ˈfiːzəbl/', 'adj.', '可行的', ['technically feasible', 'feasible option'], 'Studying two focused hours daily is feasible for most working learners.', 'daily'),
  w('w45', 'gradient', '/ˈɡreɪdiənt/', 'n.', '坡度；梯度', ['steep gradient', 'learning gradient'], 'A gentle learning gradient keeps motivation high.', 'education'),
  w('w46', 'incentive', '/ɪnˈsentɪv/', 'n.', '激励；诱因', ['financial incentive', 'strong incentive'], 'Visible progress is a powerful incentive to keep practising.', 'daily'),
  w('w47', 'jeopardise', '/ˈdʒepədaɪz/', 'v.', '危及；损害', ['jeopardise chances', 'jeopardised by'], 'Chronic sleep loss can jeopardise both health and exam performance.', 'health'),
  w('w48', 'lucrative', '/ˈluːkrətɪv/', 'adj.', '利润丰厚的', ['lucrative career', 'highly lucrative'], 'Data science has become a lucrative career path.', 'economy'),
  w('w49', 'mandatory', '/ˈmændətəri/', 'adj.', '强制的；义务的', ['mandatory attendance', 'mandatory course'], 'Attendance at the safety briefing is mandatory for all lab users.', 'education'),
  w('w50', 'nuance', '/ˈnjuːɑːns/', 'n.', '细微差别', ['subtle nuance', 'appreciate the nuance'], 'High-band writing captures nuance instead of relying on absolutes.', 'writing'),
  w('w51', 'obsolete', '/ˈɒbsəliːt/', 'adj.', '过时的；淘汰的', ['become obsolete', 'obsolete technology'], 'Paper maps became almost obsolete within a decade of GPS phones.', 'technology'),
  w('w52', 'perception', '/pəˈsepʃn/', 'n.', '看法；感知', ['public perception', 'shape perception'], 'Public perception of science is shaped by how results are reported.', 'media'),
  w('w53', 'quantify', '/ˈkwɒntɪfaɪ/', 'v.', '量化', ['difficult to quantify', 'quantified precisely'], 'The benefits of reading for pleasure are hard to quantify.', 'academic'),
  w('w54', 'rigorous', '/ˈrɪɡərəs/', 'adj.', '严谨的；严格的', ['rigorous testing', 'rigorous standards'], 'Rigorous self-testing reveals gaps that rereading hides.', 'education'),
  w('w55', 'stimulus', '/ˈstɪmjələs/', 'n.', '刺激（物）；促进因素', ['economic stimulus', 'external stimulus'], 'A quiet room removes external stimuli and aids concentration.', 'health'),
  w('w56', 'subtle', '/ˈsʌtl/', 'adj.', '微妙的；不易察觉的', ['subtle difference', 'subtle shift'], 'There is a subtle difference between "affect" and "effect".', 'language'),
  w('w57', 'sustainable', '/səˈsteɪnəbl/', 'adj.', '可持续的', ['sustainable growth', 'environmentally sustainable'], 'Sustainable study habits matter more than heroic all-nighters.', 'environment'),
  w('w58', 'tentative', '/ˈtentətɪv/', 'adj.', '试探性的；暂定的', ['tentative conclusion', 'tentative steps'], 'The findings support a tentative conclusion rather than a firm law.', 'academic'),
  w('w59', 'unprecedented', '/ʌnˈpresɪdentɪd/', 'adj.', '前所未有的', ['unprecedented scale', 'almost unprecedented'], 'Online education has grown at an unprecedented pace.', 'technology'),
  w('w60', 'versatile', '/ˈvɜːsətaɪl/', 'adj.', '多才多艺的；用途广的', ['versatile skill', 'highly versatile'], 'Writing is a versatile skill that transfers to almost every career.', 'daily'),
  w('w61', 'abolish', '/əˈbɒlɪʃ/', 'v.', '废除；取消', ['abolish slavery', 'abolish a rule'], 'The committee voted to abolish the outdated dress code.', 'society'),
  w('w62', 'accelerate', '/əkˈseləreɪt/', 'v.', '加速；促进', ['accelerate growth', 'accelerate the process'], 'Investment in rail could accelerate regional economic growth.', 'economy'),
  w('w63', 'accommodate', '/əˈkɒmədeɪt/', 'v.', '容纳；为…提供方便', ['accommodate more students', 'accommodate changing needs'], 'The new library was designed to accommodate 800 students at once.', 'education'),
  w('w64', 'acknowledge', '/əkˈnɒlɪdʒ/', 'v.', '承认；致谢', ['acknowledge a mistake', 'widely acknowledged'], 'The report acknowledges that remote learning widened the digital divide.', 'society'),
  w('w65', 'adequate', '/ˈædɪkwət/', 'adj.', '足够的；合格的', ['adequate funding', 'adequate preparation'], 'Many schools lack adequate funding for laboratory equipment.', 'education'),
  w('w66', 'administer', '/ədˈmɪnɪstə(r)/', 'v.', '管理；施行', ['administer a test', 'administer the programme'], 'The survey was administered to over three thousand households.', 'academic'),
  w('w67', 'allocate', '/ˈæləkeɪt/', 'v.', '分配；拨给', ['allocate resources', 'allocate time'], 'Councils must allocate scarce housing resources fairly.', 'society'),
  w('w68', 'analogous', '/əˈnæləɡəs/', 'adj.', '类似的；可比拟的', ['analogous situation', 'broadly analogous'], 'The spread of a rumour is analogous to the spread of a disease.', 'academic'),
  w('w69', 'assess', '/əˈses/', 'v.', '评估；估价', ['assess the impact', 'assess performance'], 'Exams are only one way to assess a student\'s understanding.', 'education'),
  w('w70', 'assume', '/əˈsjuːm/', 'v.', '假定；承担', ['assume responsibility', 'safely assume'], 'We should not assume that every student has internet access at home.', 'society'),
  w('w71', 'capacity', '/kəˈpæsəti/', 'n.', '容量；能力', ['spare capacity', 'capacity to learn'], 'The hospital\'s capacity was stretched during the winter peak.', 'health'),
  w('w72', 'collaborate', '/kəˈlæbəreɪt/', 'v.', '合作；协作', ['collaborate on a project', 'collaborate closely'], 'Students collaborated on the science fair project across three schools.', 'education'),
  w('w73', 'compensate', '/ˈkɒmpenseɪt/', 'v.', '补偿；弥补', ['compensate for a loss', 'compensate workers'], 'Flexible working can compensate for long commutes.', 'society'),
  w('w74', 'concurrent', '/kənˈkʌrənt/', 'adj.', '同时发生的；并行的', ['concurrent sessions', 'concurrent processes'], 'The conference ran four concurrent workshops.', 'academic'),
  w('w75', 'confine', '/kənˈfaɪn/', 'v.', '限制；局限于', ['confine to', 'confined space'], 'The damage was confined to the ground floor.', 'daily'),
  w('w76', 'consensus', '/kənˈsensəs/', 'n.', '共识；一致意见', ['reach a consensus', 'growing consensus'], 'There is broad consensus that exercise improves mental health.', 'health'),
  w('w77', 'constrain', '/kənˈstreɪn/', 'v.', '限制；约束', ['constrained by budget', 'time constraints'], 'Small budgets constrain what schools can offer.', 'education'),
  w('w78', 'contemporary', '/kənˈtemprəri/', 'adj.', '当代的；同时代的', ['contemporary society', 'contemporary art'], 'Contemporary debates about privacy echo older concerns about newspapers.', 'culture'),
  w('w79', 'contradict', '/ˌkɒntrəˈdɪkt/', 'v.', '反驳；与…矛盾', ['contradict a claim', 'directly contradict'], 'The new data appears to contradict the earlier conclusion.', 'academic'),
  w('w80', 'conventional', '/kənˈvenʃənl/', 'adj.', '传统的；常规的', ['conventional wisdom', 'conventional methods'], 'Conventional teaching relies heavily on the lecture format.', 'education'),
  w('w81', 'convey', '/kənˈveɪ/', 'v.', '传达；运送', ['convey meaning', 'convey a message'], 'Tone of voice can convey as much as the words themselves.', 'language'),
  w('w82', 'criterion', '/kraɪˈtɪəriən/', 'n.', '标准；准则', ['meet the criteria', 'key criterion'], 'Speed is not the only criterion for judging a writer.', 'writing'),
  w('w83', 'crucial', '/ˈkruːʃl/', 'adj.', '至关重要的；决定性的', ['crucial role', 'crucial to success'], 'Sleep plays a crucial role in consolidating new vocabulary.', 'health'),
  w('w84', 'decline', '/dɪˈklaɪn/', 'v./n.', '下降；衰退', ['sharp decline', 'declining birth rate'], 'Public libraries have seen a slow decline in footfall.', 'society'),
  w('w85', 'deduce', '/dɪˈdjuːs/', 'v.', '推断；演绎', ['deduce from', 'correctly deduced'], 'From the footprints, detectives deduced the suspect\'s height.', 'academic'),
  w('w86', 'deficient', '/dɪˈfɪʃnt/', 'adj.', '缺乏的；有缺陷的', ['deficient in', 'nutritionally deficient'], 'Diets deficient in vitamin D are common in winter.', 'health'),
  w('w87', 'demonstrate', '/ˈdemənstreɪt/', 'v.', '证明；演示', ['demonstrate a link', 'demonstrate how'], 'The study demonstrates a clear link between reading and vocabulary growth.', 'academic'),
  w('w88', 'distort', '/dɪˈstɔːt/', 'v.', '扭曲；歪曲', ['distort the truth', 'distorted view'], 'Anonymity can distort the tone of online discussion.', 'technology'),
  w('w89', 'domestic', '/dəˈmestɪk/', 'adj.', '国内的；家用的', ['domestic market', 'domestic chores'], 'The domestic market absorbs most of the factory\'s output.', 'economy'),
  w('w90', 'dominant', '/ˈdɒmɪnənt/', 'adj.', '占主导地位的；显著的', ['dominant position', 'dominant culture'], 'English remains the dominant language of academic publishing.', 'culture'),
  w('w91', 'enable', '/ɪˈneɪbl/', 'v.', '使能够；使可行', ['enable students to', 'enable access'], 'Subsidised transport enables rural students to attend school daily.', 'society'),
  w('w92', 'enhance', '/ɪnˈhɑːns/', 'v.', '提高；增强', ['enhance learning', 'enhance the experience'], 'Multimedia materials can enhance understanding of abstract ideas.', 'education'),
  w('w93', 'explicit', '/ɪkˈsplɪsɪt/', 'adj.', '明确的；直白的', ['explicit instruction', 'explicit consent'], 'The guidelines give explicit examples of acceptable practice.', 'academic'),
  w('w94', 'flourish', '/ˈflʌrɪʃ/', 'v.', '繁荣；兴旺', ['flourish under', 'culture flourished'], 'Small towns flourished along the new railway line.', 'economy'),
  w('w95', 'foster', '/ˈfɒstə(r)/', 'v.', '培养；促进', ['foster creativity', 'foster a culture'], 'Discussion-based classes foster critical thinking.', 'education'),
  w('w96', 'generate', '/ˈdʒenəreɪt/', 'v.', '产生；生成', ['generate revenue', 'generate interest'], 'A good question can generate a lively class debate.', 'education'),
  w('w97', 'identical', '/aɪˈdentɪkl/', 'adj.', '完全相同的', ['identical twins', 'essentially identical'], 'The two algorithms produce essentially identical results.', 'academic'),
  w('w98', 'illuminate', '/ɪˈluːmɪneɪt/', 'v.', '阐明；照亮', ['illuminate the issue', 'illuminate the difference'], 'Case studies illuminate how policy works in practice.', 'academic'),
  w('w99', 'imply', '/ɪmˈplaɪ/', 'v.', '暗示；意味着', ['imply that', 'does not imply'], 'High grades do not necessarily imply deep understanding.', 'education'),
  w('w100', 'innovative', '/ˈɪnəvətɪv/', 'adj.', '创新的；新颖的', ['innovative approach', 'innovative design'], 'Innovative teaching methods can revive a tired curriculum.', 'education'),
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
    translation: [
      '玛雅需要为她的演讲小组预订一间小组研讨室。图书馆网站显示，房间最多可提前两周预订，每个小组每天最多使用三小时。考试周期间，进门需出示有效学生卡，迟到超过十五分钟的小组将失去预订资格。',
      '队友利奥建议每天早晨先订下最大的房间"以防万一"。玛雅指出，空置的预订会占用其他学生的可用空间，而且一个学期内三次未到，图书馆可暂停其预订权限。',
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
    translation: [
      '汤姆就厨房水龙头漏水一事给房东发了邮件。租约规定，80英镑以下的小修由租客负责，而结构性问题——墙体内部管道、供暖系统、屋顶——由房东承担。房东回复说，滴水的水龙头属于小修范围，但提出可以推荐一位收取固定上门费的可靠水管工。',
      '汤姆查阅记录后发现，漏水来自墙内的管道接头，而不是水龙头本身。他拍下灰泥墙上不断蔓延的水渍，并引用关于结构性管道的条款予以回复。',
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
    translation: [
      '面试研究助理一职后，普里亚在二十四小时内发出了一封感谢邮件。她提到谈话中的一个具体细节——实验室即将到来的野外考察季——并简要补充说，她的统计学课程经历能够支撑团队所描述的数据工作。她把邮件控制在150词以内。',
      '一周过去，她没有任何回音。职业顾问建议，在七到十个工作日后发一次礼貌的跟进是可以的，但频繁发信会显得急躁。普里亚发了一封简短的消息重申兴趣，随后收到一封致歉回复：评审小组因预算审批而延误。',
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
    translation: [
      '某城市健身房打出"每月19英镑起"的会员广告。小字条款注明，该价格仅适用于非高峰时段（工作日10:00至16:00）且需签约十二个月。高峰时段会员每月34英镑，所有新合同都需缴纳25英镑入会费。会员可因医疗原因（凭医生证明）每年冻结会员资格最长两个月。',
      '在最短合约期届满前取消，需缴纳剩余款项50%的违约金。十二个月之后，合同转为按月滚动，提前三十天通知即可取消。',
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
    translation: [
      '该校政策规定，当学生遭遇"不可预见的情况"——如生病、家庭紧急事件或类似的干扰——作业最多可延期五个工作日。申请必须在原截止日期之前通过学院门户提交，并尽可能附上证明材料。截止日期之后提出的延期申请不予受理。',
      '拉杰在提交周患了流感。他在周一上传了医疗证明，距离周五的截止日期还有两天，并申请额外三天时间。他的导师几小时内就批准了申请，并提醒他延期的作业会按正常标准评分，不会扣分。',
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
    translation: [
      '一家沿海慈善机构招募周末志愿者进行海滩清洁。新志愿者第一个上午要参加四十分钟的安全简报，内容涵盖潮汐、尖锐物体和防晒。慈善机构提供手套和垃圾夹，但要求志愿者自备水和结实的鞋子。',
      '参加六次活动后，正式志愿者可以接受团队组长的培训。组长检查装备、向新人说明要点，并记录收集垃圾的重量。慈善机构将这些数据发布在年度报告中，用于游说减少塑料包装。',
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
  {
    id: 'sc-flight-change',
    kind: 'scenario',
    title: '情景理解 · 航班延误与改签',
    passage: [
      'Lena\'s flight home is cancelled two hours before departure. At the airline counter she asks for the earliest rebooking rather than a refund, because her visa runs out in three days. The agent finds a morning flight the next day and, as the delay crosses the threshold in EU law, hands her a form to claim compensation and a voucher for meals and one hotel night.',
      'The airline\'s website says vouchers expire in six months and are non-transferable. Lena photographs every receipt, keeps the boarding pass for the original flight, and notes the cancellation reason the agent mentions — "crew scheduling" — since disputed claims are sometimes dismissed for this wording.',
    ],
    translation: [
      '丽娜的返程航班在起飞前两小时被取消。在航空公司柜台，她要求改签最早的航班而不是退款，因为她的签证三天后就到期。代理为她找到次日早班机，并且由于延误超过了欧盟法律规定的门槛，给了她一张申请赔偿的表格，以及一份餐费和一夜酒店住宿的代金券。',
      '航空公司官网显示，代金券六个月后过期且不可转让。丽娜拍下了每一张收据，保留原航班的登机牌，并记下代理提到的取消原因——"机组排班"——因为有争议的索赔有时会因为这个措辞而被驳回。',
    ],
    questions: [
      q('sc7-q1', 'main-idea', '本段介绍？', [
        ['a', '航班取消时改签、索赔与留证的关键做法'], ['b', '如何预订酒店'], ['c', '签证办理流程'], ['d', '航空公司的收益结构'],
      ], 'a', '从柜台改签到法务索赔再到留存证据，是一条完整的应对主线。'),
      q('sc7-q2', 'detail', 'Lena 选择改签而非退款的原因是？', [
        ['a', '她的签证三天后到期，退款来不及重新购票'], ['b', '退款金额太少'], ['c', '她喜欢该航空公司'], ['d', '退款需要等一个月'],
      ], 'a', '原文明确："because her visa runs out in three days"。'),
      q('sc7-q3', 'inference', '她为何特意记下"机组排班"这一措辞？', [
        ['a', '某些航空公司会以该理由拒付赔偿，需留作质证'], ['b', '她想投诉该员工'], ['c', '这是为了申请签证'], ['d', '她需要向房东解释'],
      ], 'a', '"disputed claims are sometimes dismissed for this wording" 说明原因。'),
      q('sc7-q4', 'summary', '遭遇航班取消时，合理的做法是？', [
        ['a', '尽快改签并留存凭证，必要时申请法定赔偿'], ['b', '当场放弃所有权利'], ['c', '只要求退款不考虑行程'], ['d', '靠发怒解决问题'],
      ], 'a', '文中 Lena 的每一步都在为改签与索赔保留依据。'),
    ],
    summaryPrompt: '用英文写一段话，向乘客说明航班取消后应做的三件事。',
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
    translation: [
      '三个欧洲国家的学校正在试点AI辅导助手，为学生的数学练习提供即时反馈。这项为期一年、涉及一万二千名学生的试点的早期结果显示，进步最大的恰恰是那些过去在课堂上很少提问的学生。',
      '参与该项目的教师强调，这些系统的设计初衷是释放课堂时间，而非取代人的判断。"软件处理常规批改，我负责激励和纠错，"一位数学老师说。教育部表示，在全国推广之前会先发布独立评估，一些试点现已加入每周"不插电"课程，以保持学生的讨论能力。',
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
    translation: [
      '全球绿色债券（专门用于环保项目的债务）发行量本季度创下历史新高，主要受海上风电和电网储能交易推动。分析师指出，养老基金的需求已超过供给，使认证项目的借贷成本低于传统债券，交易员将这一价差称为"绿色溢价"。',
      '然而，监管机构警告说，标签标准不一致仍是市场最薄弱的环节。明年生效的一项新披露标准将要求发行方每年按项目报告排放数据，旨在安抚担心"漂绿"的投资者。',
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
    translation: [
      '今年城市马拉松为全部三万名跑者引入实时追踪后，观众可以逐条街道跟踪朋友的进程。在幕后，赛事组织者用同样的数据重新调度医疗队，使平均响应时间缩短了近三分之一。',
      '运动科学家提醒，在补水等指标上，消费级可穿戴设备仍落后于实验室设备，并敦促跑者把手表读数当作趋势而非结论。明年的赛事将试点可回收计时芯片，这是赛事在2028年前实现碳中和承诺的一部分。',
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
    translation: [
      '一支科研考察队在太平洋下两公里处的热液喷口周围，记录了十几个此前未知的物种。团队使用配备低光摄像头和温和抽吸式采样器的遥控潜水器，首次让多种脆弱的生物得以在存活状态下被研究。',
      '生物学家表示，这些曾被认为寸草不生的喷口，如今看来每隔数百公里就孕育着各具特色的生物群落。这一发现恰逢各国政府讨论深海采矿规则之际；考察队首席科学家主张，任何开采许可都必须先完成基线调查，"这样我们才知道会失去什么"。',
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
  {
    id: 'news-farmbots',
    kind: 'news',
    title: '新闻阅读 · 农田里的机器人',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'Autonomous weeding robots, powered by cameras and narrow AI, are being tested on vegetable farms across northern Europe. The machines remove individual weeds by precision water jet, cutting herbicide use by up to 80% on some trial fields. Farmers report the robots work through the night, when staff cannot, and that soil compaction is lower because the machines weigh a fraction of a tractor.',
      'Agronomists caution that the robots currently recognise a limited set of crop varieties and struggle in heavy rain. Early adopters also note the upfront cost — about half the price of a small tractor — still excludes most smallholders, widening an existing digital divide in agriculture.',
    ],
    translation: [
      '配备摄像头和窄域人工智能的自主除草机器人，正在北欧多国的蔬菜农场接受测试。这些机器通过精准水刀去除单株杂草，在部分试验田里将除草剂用量减少了多达80%。农户反馈，机器可以在夜间工作，这是人力做不到的；而且由于自重仅为一台拖拉机的零头，对土壤的压实也更小。',
      '农学家提醒，这些机器人目前只能识别有限的作物品种，在大雨中也会失灵。早期采用者还指出，购置成本——约为一台小型拖拉机价格的一半——仍将大多数小农户拒之门外，从而拉大了农业领域已有的数字鸿沟。',
    ],
    questions: [
      q('n5-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '除草机器人带来的收益及其在成本与技术上对农户的挑战'],
        ['b', '机器人将彻底取代所有农民'],
        ['c', '除草剂的发明历史'],
        ['d', '北方蔬菜的价格波动'],
      ], 'a', '一段讲收益，二段讲局限与成本门槛，构成均衡报道。'),
      q('n5-q2', 'detail', '试验田中除草剂用量减少了多少？', [
        ['a', '约 50%'], ['b', '最多 80%'], ['c', '100%'], ['d', '30%'],
      ], 'b', '原文："cutting herbicide use by up to 80%"。'),
      q('n5-q3', 'inference', '"widening an existing digital divide" 指？', [
        ['a', '能买得起机器的大农场与小农户差距拉大'], ['b', '城市与乡村网络差异消失'], ['c', '农民不再使用手机'], ['d', '机器人之间性能不同'],
      ], 'a', '成本门槛使小农户难以受益，加深了既有分化。'),
      q('n5-q4', 'summary', '文中提到机器人的一个优势与一个局限是？', [
        ['a', '优势：夜间作业、减少除草剂与压实；局限：品种识别有限、怕大雨、成本高'],
        ['b', '优势：完全免费；局限：速度太快'],
        ['c', '优势：无需维护；局限：只能种菜'],
        ['d', '优势：替代所有农活；局限：噪音大'],
      ], 'a', '两个段落分别列出，答案整合了正反两面。'),
    ],
    summaryPrompt: '用英文写出这条新闻的三要素（what / why / concern）。',
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
    translation: [
      '摘要：我们对254项比较间隔练习与集中练习的实验进行了元分析，涵盖言语、运动和数学任务。在间隔一周或更久的延迟测试中，间隔安排稳定地带来更高的保持率（平均效应量 d=0.54），且优势随保持间隔延长而增大。即时测试中收益最小，此时集中练习偶尔会占优。',
      '调节变量分析表明，对于言语材料，递增间隔略优于固定间隔；而对于解题类任务，最强的调节因素并非间隔形状，而是反馈质量。我们得出结论：间隔练习是一个稳健的、跨领域的普遍现象，但其效应大小取决于所学内容以及错误如何被纠正。',
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
    translation: [
      '摘要：利用一个具有全国代表性的样本——对9800名成年人跟踪六年——我们估算了居住地绿化程度（基于卫星的300米范围内NDVI指数）与自我报告的心理困扰之间的关联。在调整收入、就业和基线健康状况后，从绿化最低四分位组移动到最高组，持续困扰的几率降低了13%。',
      '当模型加入身体活动和社会凝聚力后，这一关联大约减弱了一半，表明这些行为在一定程度上中介了绿化与困扰之间的联系。由于研究采用观察性设计，应谨慎作出因果推断；围绕新公园开放开展的自然实验是未来工作的优先方向。',
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
    translation: [
      '摘要：我们提出一种低温湿法冶金工艺，可从废旧电动汽车电池中回收锂、钴和镍。小试规模测试的回收率分别达到92%、97%和96%，同时较传统熔炼工艺降低40%的工艺能耗。浸出剂在闭环中再生，减少了二次废料。',
      '技术经济分析表明，在当前的钴价水平下，年处理量至少8000吨的工厂即可实现盈利。敏感性分析显示，经济效益对锂价波动最为敏感，这凸显了与整车厂签订长期供应合同的价值。',
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
    translation: [
      '摘要：终身双语一直被提出有助于形成"认知储备"，从而延缓痴呆症状。我们比较了214名双语和198名单语的老年人，并匹配了教育与职业背景。双语者平均晚3.8年被确诊，尽管一个小样本亚组的尸检结果显示大脑病理程度相当。',
      '执行控制任务的组间差异最大，这与"管理两种语言会锻炼通用控制网络"的说法一致。我们提醒，移民历史和社会经济因素仍难以完全匹配，在将双语作为保护性策略加以推荐之前，还需要预注册的纵向研究。',
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
  {
    id: 'paper-microbiome',
    kind: 'paper',
    title: '论文摘要 · 肠道菌群与睡眠质量',
    source: '模拟学术摘要 · Nutrition & Sleep Medicine 方向',
    passage: [
      'Abstract: We examined whether gut microbial diversity is associated with objectively measured sleep efficiency. Across 862 adults, higher Shannon diversity of the gut microbiome correlated with fewer night awakenings and greater slow-wave sleep, after adjusting for body mass index, diet, and chronotype.',
      'Longitudinal sampling of 214 participants over six months showed that increases in dietary fibre preceded measurable gains in diversity and, one to two weeks later, small but significant improvements in sleep efficiency. Because the temporal order is suggestive rather than conclusive, the authors propose randomised fibre interventions as the next step.',
    ],
    translation: [
      '摘要：我们考察了肠道菌群多样性是否与客观测量的睡眠效率相关。在862名成年人中，肠道微生物组的香农多样性越高，与夜间觉醒次数越少、慢波睡眠越多相关，且这一关联在调整了体质指数、饮食和昼夜节律类型之后仍然成立。',
      '对214名参与者为期六个月的纵向采样显示，膳食纤维的增加先于多样性可测量的提升，而多样性提升一到两周后，睡眠效率出现小而显著的改善。由于时间先后顺序只能提示而不能确证因果，作者建议下一步开展随机化的纤维干预研究。',
    ],
    questions: [
      q('p5-q1', 'main-idea', '该研究的核心发现是？', [
        ['a', '肠道菌群多样性与睡眠效率相关，纤维增加可能先于睡眠改善'],
        ['b', '睡眠问题与饮食完全无关'],
        ['c', '菌群多样性由基因唯一决定'],
        ['d', '慢波睡眠没有生理意义'],
      ], 'a', '横断面相关 + 纵向时间顺序共同支撑，作者自己也强调需干预验证。'),
      q('p5-q2', 'detail', '横断面分析纳入了多少名成年人？', [
        ['a', '214'], ['b', '862'], ['c', '1,076'], ['d', '6,000'],
      ], 'b', '横断面 862 人，纵向随访是其子集 214 人。'),
      q('p5-q3', 'inference', '作者为何把结论限定为"建议性"而非"因果"？', [
        ['a', '观察性时间顺序无法排除其他因素，需要随机干预证实'], ['b', '样本量太小'], ['c', '仪器测量不准'], ['d', '数据被篡改'],
      ], 'a', '"temporal order is suggestive rather than conclusive" 与随机干预建议呼应。'),
      q('p5-q4', 'summary', '纵向数据揭示的先后关系是？', [
        ['a', '纤维摄入增加 → 菌群多样性上升 → 1–2 周后睡眠效率改善'],
        ['b', '睡眠变好导致纤维摄入增加'],
        ['c', '三者在同一时间完全无关'],
        ['d', '先有疾病再有多样性下降'],
      ], 'a', '原文给出了明确的三步时间顺序。'),
    ],
    summaryPrompt: '用英文写出该研究的发现、方法局限，以及作者建议的下一步。',
  },
]
