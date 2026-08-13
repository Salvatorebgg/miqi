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
  w('w101', 'lucid', '/ˈluːsɪd/', 'adj.', '清晰易懂的', ['lucid explanation', 'lucid prose'], 'Her lucid explanation made a difficult theorem feel obvious.', 'academic'),
  w('w102', 'mitigate', '/ˈmɪtɪɡeɪt/', 'v.', '缓解；减轻', ['mitigate risks', 'mitigate the impact'], 'Strict building codes mitigate damage during earthquakes.', 'environment'),
  w('w103', 'paradigm', '/ˈpærədaɪm/', 'n.', '范式；典范', ['scientific paradigm', 'paradigm shift'], 'The internet triggered a paradigm shift in how we study.', 'technology'),
  w('w104', 'prudent', '/ˈpruːdnt/', 'adj.', '谨慎的；明智的', ['prudent decision', 'prudent use'], 'It is prudent to back up your work regularly.', 'economy'),
  w('w105', 'emulate', '/ˈemjuleɪt/', 'v.', '效仿；模仿', ['emulate best practice', 'emulate success'], 'Many cities try to emulate Singapore\'s public transport system.', 'society'),
  w('w106', 'skeptical', '/ˈskeptɪkl/', 'adj.', '怀疑的；持怀疑态度的', ['skeptical about', 'remain skeptical'], 'Scientists stay skeptical until results are replicated.', 'academic'),
  w('w107', 'replicate', '/ˈreplɪkeɪt/', 'v.', '复制；重现', ['replicate the results', 'replicate an experiment'], 'The experiment was replicated in three different laboratories.', 'academic'),
  w('w108', 'dilute', '/daɪˈljuːt/', 'v.', '稀释；削弱', ['dilute a solution', 'dilute the message'], 'Critics said the extra chapters diluted the novel\'s impact.', 'academic'),
  w('w109', 'bolster', '/ˈbəʊlstə(r)/', 'v.', '支持；加强', ['bolster confidence', 'bolster the argument'], 'New evidence bolstered the researchers\' theory.', 'academic'),
  w('w110', 'credible', '/ˈkredəbl/', 'adj.', '可信的；可靠的', ['credible source', 'barely credible'], 'Always cite credible sources in an academic essay.', 'writing'),
  w('w111', 'reliable', '/rɪˈlaɪəbl/', 'adj.', '可靠的；可信赖的', ['reliable data', 'reliable source'], 'The study is built on reliable long-term data.', 'academic'),
  w('w112', 'precision', '/prɪˈsɪʒn/', 'n.', '精确；精准', ['with precision', 'surgical precision'], 'Calculators improve the precision of manual computation.', 'academic'),
  w('w113', 'approximate', '/əˈprɒksɪmət/', 'adj.', '近似的；大概的', ['approximate value', 'rough approximation'], 'The figure is only an approximate estimate of the cost.', 'academic'),
  w('w114', 'elicit', '/ɪˈlɪsɪt/', 'v.', '引出；诱出', ['elicit a response', 'elicit feedback'], 'Open questions elicit richer answers than yes-or-no ones.', 'academic'),
  w('w115', 'infer', '/ɪnˈfɜː(r)/', 'v.', '推断；推论', ['infer from', 'infer meaning'], 'Readers must infer the theme from small details.', 'language'),
  w('w116', 'consecutive', '/kənˈsekjətɪv/', 'adj.', '连续的', ['consecutive days', 'three consecutive wins'], 'He studied for five consecutive hours without a break.', 'daily'),
  w('w117', 'cumulative', '/ˈkjuːmjələtɪv/', 'adj.', '累积的', ['cumulative effect', 'cumulative total'], 'Small daily savings have a cumulative effect over years.', 'economy'),
  w('w118', 'discrete', '/dɪˈskriːt/', 'adj.', '离散的；分开的', ['discrete units', 'discrete categories'], 'The survey data falls into discrete categories.', 'academic'),
  w('w119', 'conversely', '/ˈkɒnvɜːsli/', 'adv.', '相反地', ['and conversely', 'conversely, when'], 'Warm weather speeds growth; conversely, cold slows it down.', 'academic'),
  w('w120', 'notably', '/ˈnəʊtəbli/', 'adv.', '尤其；显著地', ['most notably', 'notably, when'], 'Several students, notably the new arrivals, improved quickly.', 'academic'),
  w('w121', 'significant', '/sɪɡˈnɪfɪkənt/', 'adj.', '显著的；重要的', ['significant difference', 'statistically significant'], 'The new treatment produced a significant improvement.', 'health'),
  w('w122', 'statistical', '/stəˈtɪstɪkl/', 'adj.', '统计的', ['statistical analysis', 'statistical significance'], 'Statistical analysis showed the result was unlikely by chance.', 'academic'),
  w('w123', 'variable', '/ˈveəriəbl/', 'n.', '变量', ['dependent variable', 'key variable'], 'Temperature is a key variable in plant growth.', 'academic'),
  w('w124', 'correlation', '/ˌkɒrəˈleɪʃn/', 'n.', '相关性；关联', ['strong correlation', 'correlation between'], 'There is a clear correlation between sleep and memory.', 'health'),
  w('w125', 'causal', '/ˈkɔːzl/', 'adj.', '因果的', ['causal relationship', 'causal link'], 'Correlation alone does not prove a causal link.', 'academic'),
  w('w126', 'rationale', '/ˌræʃəˈnɑːl/', 'n.', '理由；逻辑依据', ['the rationale behind', 'clear rationale'], 'The teacher explained the rationale behind the grading scheme.', 'education'),
  w('w127', 'supplement', '/ˈsʌplɪment/', 'v./n.', '补充；增补', ['supplement income', 'dietary supplement'], 'Online videos supplement the textbook rather than replace it.', 'education'),
  w('w128', 'complement', '/ˈkɒmplɪment/', 'v.', '与…互补', ['complement each other', 'perfectly complement'], 'Reading and speaking practice complement each other well.', 'daily'),
  w('w129', 'augment', '/ɔːɡˈment/', 'v.', '增强；扩大', ['augment income', 'augment the team'], 'She augmented her salary with freelance editing work.', 'economy'),
  w('w130', 'accumulate', '/əˈkjuːmjəleɪt/', 'v.', '积累；积聚', ['accumulate wealth', 'accumulating evidence'], 'Knowledge accumulates through daily review.', 'education'),
  w('w131', 'retention', '/rɪˈtenʃn/', 'n.', '保持；记忆保持', ['memory retention', 'student retention'], 'Spaced practice improves long-term retention.', 'education'),
  w('w132', 'recall', '/rɪˈkɔːl/', 'v./n.', '回忆；召回', ['recall information', 'beyond recall'], 'Self-testing helps you recall what you learned earlier.', 'education'),
  w('w133', 'retrieve', '/rɪˈtriːv/', 'v.', '找回；检索', ['retrieve data', 'retrieve memories'], 'The search engine can retrieve files within seconds.', 'technology'),
  w('w134', 'retain', '/rɪˈteɪn/', 'v.', '保持；保留', ['retain information', 'retain staff'], 'Learners retain more when they explain ideas aloud.', 'education'),
  w('w135', 'distraction', '/dɪˈstrækʃn/', 'n.', '分心；干扰', ['constant distraction', 'source of distraction'], 'Phone notifications are a major distraction during study.', 'technology'),
  w('w136', 'concentration', '/ˌkɒnsnˈtreɪʃn/', 'n.', '专注；浓度', ['deep concentration', 'concentration on'], 'A tidy desk aids concentration for long sessions.', 'health'),
  w('w137', 'momentum', '/məˈmentəm/', 'n.', '势头；动量', ['lose momentum', 'gathering momentum'], 'The campaign gained momentum after the first week.', 'society'),
  w('w138', 'persistent', '/pəˈsɪstənt/', 'adj.', '持续的；执着的', ['persistent problem', 'persistent effort'], 'Persistent practice, not talent, builds fluency.', 'education'),
  w('w139', 'consistency', '/kənˈsɪstənsi/', 'n.', '一致性；连贯', ['consistency in', 'lack of consistency'], 'Consistency matters more than intensity in language learning.', 'education'),
  w('w140', 'diligent', '/ˈdɪlɪdʒənt/', 'adj.', '勤奋的；用功的', ['diligent student', 'diligent effort'], 'A diligent reader finishes far more books each year.', 'education'),
  w('w141', 'proficiency', '/prəˈfɪʃnsi/', 'n.', '熟练；精通', ['language proficiency', 'level of proficiency'], 'The exam measures proficiency in all four skills.', 'language'),
  w('w142', 'fluency', '/ˈfluːənsi/', 'n.', '流利', ['fluency in', 'speaking fluency'], 'Daily conversation builds speaking fluency.', 'language'),
  w('w143', 'articulate', '/ɑːˈtɪkjuleɪt/', 'v./adj.', '清晰表达；口齿伶俐的', ['articulate a view', 'articulate clearly'], 'She articulated her argument in three crisp points.', 'writing'),
  w('w144', 'reiterate', '/riˈɪtəreɪt/', 'v.', '重申', ['reiterate a point', 'reiterate the need'], 'The report reiterates the need for better funding.', 'academic'),
  w('w145', 'emphasise', '/ˈemfəsaɪz/', 'v.', '强调', ['emphasise the importance', 'emphasised repeatedly'], 'The course emphasises independent thinking over memorising.', 'education'),
  w('w146', 'underscore', '/ˌʌndəˈskɔː(r)/', 'v.', '强调；凸显', ['underscore the point', 'underscored by'], 'Rising costs underscore the need for efficiency.', 'economy'),
  w('w147', 'consolidate', '/kənˈsɒlɪdeɪt/', 'v.', '巩固；合并', ['consolidate knowledge', 'consolidate gains'], 'Review sessions consolidate what you learned during the week.', 'education'),
  w('w148', 'reinforce', '/ˌriːɪnˈfɔːs/', 'v.', '强化；加强', ['reinforce learning', 'reinforce a belief'], 'Short quizzes reinforce the key concepts of each chapter.', 'education'),
  w('w149', 'rehearse', '/rɪˈhɜːs/', 'v.', '排练；演练', ['rehearse a presentation', 'rehearse answers'], 'Rehearse your talk twice before the oral exam.', 'education'),
  w('w150', 'visualise', '/ˈvɪʒuəlaɪz/', 'v.', '想象；可视化', ['visualise success', 'visualise a graph'], 'Visualise the curve before solving the integral.', 'academic'),
  w('w151', 'distinct', '/dɪˈstɪŋkt/', 'adj.', '不同的；明显的', ['distinct advantage', 'clearly distinct'], 'The two dialects are closely related but clearly distinct.', 'language'),
  w('w152', 'distinguish', '/dɪˈstɪŋɡwɪʃ/', 'v.', '区分；辨别', ['distinguish between', 'distinguish oneself'], 'Good readers distinguish fact from opinion.', 'language'),
  w('w153', 'resemble', '/rɪˈzembl/', 'v.', '与…相似', ['closely resemble', 'resemble each other'], 'The new tablet closely resembles its predecessor.', 'technology'),
  w('w154', 'correspond', '/ˌkɒrəˈspɒnd/', 'v.', '对应；相符', ['correspond to', 'correspond with'], 'Each code corresponds to a different product.', 'academic'),
  w('w155', 'proportion', '/prəˈpɔːʃn/', 'n.', '比例；部分', ['proportion of', 'in proportion to'], 'A growing proportion of students choose to study abroad.', 'society'),
  w('w156', 'ratio', '/ˈreɪʃiəʊ/', 'n.', '比率', ['ratio of', 'in the ratio'], 'The ratio of teachers to students is slowly improving.', 'education'),
  w('w157', 'magnitude', '/ˈmæɡnɪtjuːd/', 'n.', '量级；重要性', ['magnitude of', 'order of magnitude'], 'Scientists underestimated the earthquake\'s magnitude.', 'academic'),
  w('w158', 'dimension', '/daɪˈmenʃn/', 'n.', '维度；尺寸', ['new dimension', 'economic dimension'], 'The internet added a global dimension to learning.', 'technology'),
  w('w159', 'scope', '/skəʊp/', 'n.', '范围；余地', ['the scope of', 'broad scope'], 'The project\'s scope grew far beyond the original plan.', 'society'),
  w('w160', 'spectrum', '/ˈspektrəm/', 'n.', '范围；光谱', ['broad spectrum', 'full spectrum'], 'Opinions span the full spectrum from support to rejection.', 'society'),
  w('w161', 'enormous', '/ɪˈnɔːməs/', 'adj.', '巨大的', ['enormous impact', 'enormous amount'], 'The project required an enormous amount of coordination.', 'society'),
  w('w162', 'immense', '/ɪˈmens/', 'adj.', '巨大的；无边的', ['immense pressure', 'immense potential'], 'The region holds immense potential for solar power.', 'environment'),
  w('w163', 'considerable', '/kənˈsɪdərəbl/', 'adj.', '相当大的；可观的', ['considerable effort', 'considerable time'], 'Writing well requires considerable practice.', 'writing'),
  w('w164', 'modest', '/ˈmɒdɪst/', 'adj.', '适度的；谦虚的', ['modest increase', 'modest income'], 'The plan proposes a modest increase in funding.', 'economy'),
  w('w165', 'slight', '/slaɪt/', 'adj.', '轻微的；略微的', ['slight change', 'slight improvement'], 'A slight change in wording changed the meaning.', 'language'),
  w('w166', 'marginal', '/ˈmɑːdʒɪnl/', 'adj.', '微小的；边缘的', ['marginal effect', 'marginal improvement'], 'Extra study hours had only a marginal effect on scores.', 'education'),
  w('w167', 'gradual', '/ˈɡrædʒuəl/', 'adj.', '逐渐的', ['gradual increase', 'gradual process'], 'Language acquisition is a gradual process.', 'education'),
  w('w168', 'abrupt', '/əˈbrʌpt/', 'adj.', '突然的；唐突的', ['abrupt change', 'abruptly stop'], 'An abrupt change in policy confused many families.', 'society'),
  w('w169', 'preliminary', '/prɪˈlɪmɪnəri/', 'adj.', '初步的', ['preliminary results', 'preliminary stage'], 'Preliminary results look promising but need confirmation.', 'academic'),
  w('w170', 'interim', '/ˈɪntərɪm/', 'adj./n.', '临时的；过渡期', ['interim report', 'in the interim'], 'The interim report was published before the final study.', 'academic'),
  w('w171', 'subsequent', '/ˈsʌbsɪkwənt/', 'adj.', '随后的', ['subsequent research', 'subsequent events'], 'Subsequent studies confirmed the original finding.', 'academic'),
  w('w172', 'preceding', '/prɪˈsiːdɪŋ/', 'adj.', '在前的；先前的', ['the preceding year', 'preceding chapters'], 'Review the preceding chapter before the test.', 'education'),
  w('w173', 'underlying', '/ˌʌndəˈlaɪɪŋ/', 'adj.', '潜在的；根本的', ['underlying cause', 'underlying assumption'], 'The underlying cause of the failure was poor planning.', 'academic'),
  w('w174', 'premise', '/ˈpremɪs/', 'n.', '前提', ['basic premise', 'false premise'], 'The argument rests on a questionable premise.', 'academic'),
  w('w175', 'axiom', '/ˈæksiəm/', 'n.', '公理；公设', ['mathematical axiom', 'taken as an axiom'], 'Every proof begins from a set of axioms.', 'academic'),
  w('w176', 'postulate', '/ˈpɒstjuleɪt/', 'n./v.', '假定；公设', ['postulate that', 'a fundamental postulate'], 'Einstein postulated that light travels at a constant speed.', 'academic'),
  w('w177', 'derive', '/dɪˈraɪv/', 'v.', '推导；获得', ['derive from', 'derive a formula'], 'We can derive the formula from first principles.', 'academic'),
  w('w178', 'yield', '/jiːld/', 'v.', '产生；让出', ['yield results', 'yield the right of way'], 'The experiment yielded surprising results.', 'academic'),
  w('w179', 'surpass', '/səˈpɑːs/', 'v.', '超过；胜过', ['surpass expectations', 'surpass all rivals'], 'Her final score surpassed the class average.', 'education'),
  w('w180', 'exceed', '/ɪkˈsiːd/', 'v.', '超过', ['exceed the limit', 'far exceed'], 'Demand exceeded supply for several months.', 'economy'),
  w('w181', 'attain', '/əˈteɪn/', 'v.', '达到；获得', ['attain a goal', 'attain fluency'], 'It takes years to attain native-like fluency.', 'language'),
  w('w182', 'achieve', '/əˈtʃiːv/', 'v.', '实现；达成', ['achieve a goal', 'achievable target'], 'Set small targets you can achieve each week.', 'education'),
  w('w183', 'accomplish', '/əˈkʌmplɪʃ/', 'v.', '完成；实现', ['accomplish a task', 'accomplished musician'], 'Volunteers accomplished more than anyone expected.', 'society'),
  w('w184', 'fulfil', '/fʊlˈfɪl/', 'v.', '履行；满足', ['fulfil a promise', 'fulfil requirements'], 'The course fulfils the entrance requirements.', 'education'),
  w('w185', 'comply', '/kəmˈplaɪ/', 'v.', '遵守', ['comply with rules', 'refuse to comply'], 'Companies must comply with data protection laws.', 'society'),
  w('w186', 'conform', '/kənˈfɔːm/', 'v.', '遵守；符合', ['conform to', 'conform with standards'], 'Products must conform to strict safety standards.', 'society'),
  w('w187', 'adhere', '/ədˈhɪə(r)/', 'v.', '坚持；遵守', ['adhere to', 'adhere strictly'], 'Students must adhere to the word limit.', 'writing'),
  w('w188', 'violate', '/ˈvaɪəleɪt/', 'v.', '违反；侵犯', ['violate a rule', 'violate rights'], 'Plagiarism violates the university\'s academic policy.', 'education'),
  w('w189', 'enforce', '/ɪnˈfɔːs/', 'v.', '执行；强制', ['enforce a law', 'enforce rules'], 'It is hard to enforce the rule in online forums.', 'society'),
  w('w190', 'regulate', '/ˈreɡjuleɪt/', 'v.', '监管；调节', ['regulate the market', 'regulate temperature'], 'Governments regulate how food is labelled.', 'society'),
  w('w191', 'legislate', '/ˈledʒɪsleɪt/', 'v.', '立法', ['legislate against', 'legislate to'], 'Parliament legislated to protect consumers.', 'society'),
  w('w192', 'arbitrary', '/ˈɑːbɪtrəri/', 'adj.', '任意的；武断的', ['arbitrary decision', 'purely arbitrary'], 'The deadline seemed arbitrary to the students.', 'society'),
  w('w193', 'compulsory', '/kəmˈpʌlsəri/', 'adj.', '强制的；义务的', ['compulsory education', 'compulsory course'], 'Physical education is compulsory at many schools.', 'education'),
  w('w194', 'voluntary', '/ˈvɒləntri/', 'adj.', '自愿的', ['voluntary work', 'voluntary basis'], 'Attendance at the workshop is entirely voluntary.', 'society'),
  w('w195', 'optional', '/ˈɒpʃənl/', 'adj.', '可选的', ['optional course', 'purely optional'], 'The evening lecture is optional.', 'education'),
  w('w196', 'implicit', '/ɪmˈplɪsɪt/', 'adj.', '含蓄的；内含的', ['implicit assumption', 'implicitly understood'], 'There is an implicit promise of fairness in the grading.', 'academic'),
  w('w197', 'overt', '/əʊˈvɜːt/', 'adj.', '公开的；明显的', ['overt criticism', 'overt display'], 'Overt praise motivated the young students.', 'education'),
  w('w198', 'covert', '/ˈkʌvət/', 'adj.', '隐蔽的；秘密的', ['covert operation', 'covert surveillance'], 'Covert monitoring raised privacy concerns.', 'society'),
  w('w199', 'unambiguous', '/ˌʌnæmˈbɪɡjuəs/', 'adj.', '明确的；不含糊的', ['unambiguous answer', 'unambiguous signal'], 'The instructions must be unambiguous.', 'academic'),
  w('w200', 'concrete', '/ˈkɒŋkriːt/', 'adj./n.', '具体的；混凝土', ['concrete example', 'concrete plan'], 'Give concrete examples to support your claim.', 'writing'),
  w('w201', 'asset', '/ˈæset/', 'n.', '资产；宝贵的人或物', ['valuable asset', 'financial assets'], 'Reliable employees are a company\'s greatest asset.', 'economy'),
  w('w202', 'liability', '/ˌlaɪəˈbɪləti/', 'n.', '负债；责任', ['liability for', 'legal liability'], 'The firm reduced its liabilities by selling offices.', 'economy'),
  w('w203', 'equity', '/ˈekwəti/', 'n.', '公平；股权', ['equity in education', 'share of equity'], 'The reforms aim to improve equity in education.', 'society'),
  w('w204', 'inequality', '/ˌɪnɪˈkwɒləti/', 'n.', '不平等', ['income inequality', 'social inequality'], 'Income inequality has widened over the decade.', 'society'),
  w('w205', 'disparity', '/dɪˈspærəti/', 'n.', '差距；悬殊', ['regional disparity', 'disparity in wealth'], 'There is a wide disparity in internet access between regions.', 'technology'),
  w('w206', 'welfare', '/ˈwelfeə(r)/', 'n.', '福利', ['social welfare', 'child welfare'], 'The programme improved the welfare of migrant workers.', 'society'),
  w('w207', 'subsidy', '/ˈsʌbsədi/', 'n.', '补贴', ['government subsidy', 'subsidy scheme'], 'Solar panels attract a generous subsidy.', 'economy'),
  w('w208', 'tariff', '/ˈtærɪf/', 'n.', '关税', ['import tariff', 'trade tariffs'], 'Higher tariffs raise prices for consumers.', 'economy'),
  w('w209', 'revenue', '/ˈrevənjuː/', 'n.', '收入；税收', ['tax revenue', 'annual revenue'], 'Advertising funds most of the site\'s revenue.', 'economy'),
  w('w210', 'budget', '/ˈbʌdʒɪt/', 'n.', '预算', ['annual budget', 'tight budget'], 'The library operates on a tight budget.', 'economy'),
  w('w211', 'expenditure', '/ɪkˈspendɪtʃə(r)/', 'n.', '支出', ['public expenditure', 'capital expenditure'], 'Defence expenditure consumes a large share of the budget.', 'economy'),
  w('w212', 'investment', '/ɪnˈvestmənt/', 'n.', '投资', ['foreign investment', 'long-term investment'], 'Education is a long-term investment in people.', 'economy'),
  w('w213', 'capital', '/ˈkæpɪtl/', 'n.', '资本；首都', ['capital investment', 'human capital'], 'The firm needs capital to expand its factories.', 'economy'),
  w('w214', 'deficit', '/ˈdefɪsɪt/', 'n.', '赤字；亏空', ['budget deficit', 'trade deficit'], 'The country ran a budget deficit for years.', 'economy'),
  w('w215', 'surplus', '/ˈsɜːpləs/', 'n.', '盈余；过剩', ['trade surplus', 'budget surplus'], 'The surplus funded new schools.', 'economy'),
  w('w216', 'commodity', '/kəˈmɒdəti/', 'n.', '商品；大宗商品', ['basic commodity', 'commodity prices'], 'Oil is a widely traded commodity.', 'economy'),
  w('w217', 'merchandise', '/ˈmɜːtʃəndaɪs/', 'n.', '商品；货品', ['retail merchandise', 'branded merchandise'], 'The store sells both food and merchandise.', 'economy'),
  w('w218', 'manufacture', '/ˌmænjuˈfæktʃə(r)/', 'v./n.', '制造', ['manufacture goods', 'manufacturing industry'], 'The plant manufactures batteries at scale.', 'economy'),
  w('w219', 'industrial', '/ɪnˈdʌstriəl/', 'adj.', '工业的', ['industrial production', 'industrial era'], 'Industrial cities grew up around the new factories.', 'society'),
  w('w220', 'commercial', '/kəˈmɜːʃl/', 'adj.', '商业的', ['commercial value', 'commercial success'], 'The drug proved a commercial success.', 'economy'),
  w('w221', 'entrepreneur', '/ˌɒntrəprəˈnɜː(r)/', 'n.', '企业家', ['young entrepreneur', 'serial entrepreneur'], 'The entrepreneur has founded three startups.', 'economy'),
  w('w222', 'enterprise', '/ˈentəpraɪz/', 'n.', '企业；事业', ['private enterprise', 'enterprise zone'], 'Small enterprises drive most job creation.', 'economy'),
  w('w223', 'productivity', '/ˌprɒdʌkˈtɪvəti/', 'n.', '生产力；生产率', ['labour productivity', 'boost productivity'], 'Automation raises productivity but displaces some jobs.', 'economy'),
  w('w224', 'efficiency', '/ɪˈfɪʃnsi/', 'n.', '效率', ['energy efficiency', 'improve efficiency'], 'Public transport improves the efficiency of city travel.', 'society'),
  w('w225', 'output', '/ˈaʊtpʊt/', 'n.', '产量；输出', ['industrial output', 'the output of'], 'The factory\'s output doubled in five years.', 'economy'),
  w('w226', 'input', '/ˈɪnpʊt/', 'n.', '投入；输入', ['valuable input', 'energy input'], 'The teacher welcomed student input on the syllabus.', 'education'),
  w('w227', 'distribute', '/dɪˈstrɪbjuːt/', 'v.', '分配；分发', ['distribute evenly', 'distribute resources'], 'Food was distributed among the shelters.', 'society'),
  w('w228', 'consume', '/kənˈsjuːm/', 'v.', '消耗；消费', ['consume energy', 'consume resources'], 'Data centres consume huge amounts of electricity.', 'environment'),
  w('w229', 'deplete', '/dɪˈpliːt/', 'v.', '耗尽；使枯竭', ['deplete resources', 'depleted reserves'], 'Overfishing depletes the ocean\'s fish stocks.', 'environment'),
  w('w230', 'replenish', '/rɪˈplenɪʃ/', 'v.', '补充；再装满', ['replenish stocks', 'replenish energy'], 'Rain replenishes the reservoir each winter.', 'environment'),
  w('w231', 'exhaust', '/ɪɡˈzɔːst/', 'v./n.', '耗尽；排气', ['exhaust resources', 'car exhaust'], 'Mining can exhaust a region\'s water supply.', 'environment'),
  w('w232', 'preserve', '/prɪˈzɜːv/', 'v.', '保护；保存', ['preserve wildlife', 'preserve the environment'], 'The park preserves a rare wetland habitat.', 'environment'),
  w('w233', 'conserve', '/kənˈsɜːv/', 'v.', '节约；保护', ['conserve energy', 'conserve water'], 'Turn off the lights to conserve energy.', 'environment'),
  w('w234', 'recycle', '/ˌriːˈsaɪkl/', 'v.', '回收利用', ['recycle waste', 'recycled materials'], 'The city recycles a third of its household waste.', 'environment'),
  w('w235', 'sustain', '/səˈsteɪn/', 'v.', '维持；支撑', ['sustain growth', 'sustain life'], 'The river sustains farming along its banks.', 'environment'),
  w('w236', 'endure', '/ɪnˈdjʊə(r)/', 'v.', '忍受；持续', ['endure hardship', 'long-enduring'], 'The tradition has endured for centuries.', 'culture'),
  w('w237', 'tolerate', '/ˈtɒləreɪt/', 'v.', '容忍；忍受', ['tolerate delays', 'tolerate noise'], 'The school will not tolerate bullying.', 'society'),
  w('w238', 'embrace', '/ɪmˈbreɪs/', 'v.', '欣然接受；拥抱', ['embrace change', 'embrace technology'], 'Younger firms embrace remote work.', 'technology'),
  w('w239', 'resist', '/rɪˈzɪst/', 'v.', '抵抗；抵制', ['resist change', 'resist the temptation'], 'Some teachers resist using new tools.', 'education'),
  w('w240', 'oppose', '/əˈpəʊz/', 'v.', '反对', ['strongly oppose', 'oppose the plan'], 'Residents oppose the new tower block.', 'society'),
  w('w241', 'endorse', '/ɪnˈdɔːs/', 'v.', '支持；背书', ['endorse a plan', 'publicly endorse'], 'The union endorsed the new contract.', 'society'),
  w('w242', 'sanction', '/ˈsæŋkʃn/', 'n./v.', '制裁；批准', ['economic sanctions', 'official sanction'], 'The UN imposed sanctions on the regime.', 'society'),
  w('w243', 'boycott', '/ˈbɔɪkɒt/', 'v./n.', '抵制', ['boycott a brand', 'call for a boycott'], 'Consumers boycotted the company after the scandal.', 'society'),
  w('w244', 'petition', '/pəˈtɪʃn/', 'n./v.', '请愿；请愿书', ['sign a petition', 'petition the government'], 'Over ten thousand people signed the petition.', 'society'),
  w('w245', 'campaign', '/kæmˈpeɪn/', 'n.', '运动；活动', ['awareness campaign', 'election campaign'], 'The campaign raised awareness of plastic pollution.', 'environment'),
  w('w246', 'initiative', '/ɪˈnɪʃətɪv/', 'n.', '倡议；主动性', ['local initiative', 'take the initiative'], 'A community initiative restored the old library.', 'society'),
  w('w247', 'scheme', '/skiːm/', 'n.', '计划；方案', ['scheme to', 'government scheme'], 'A subsidy scheme helped families install solar panels.', 'economy'),
  w('w248', 'venture', '/ˈventʃə(r)/', 'n./v.', '冒险；企业', ['business venture', 'joint venture'], 'The venture aims to commercialise the technology.', 'economy'),
  w('w249', 'endowment', '/ɪnˈdaʊmənt/', 'n.', '捐赠；天赋', ['university endowment', 'natural endowment'], 'The scholarship is funded by a large endowment.', 'education'),
  w('w250', 'philanthropy', '/fɪˈlænθrəpi/', 'n.', '慈善；慈善事业', ['corporate philanthropy', 'tradition of philanthropy'], 'Her philanthropy supports libraries and museums.', 'culture'),
  w('w251', 'synthesis', '/ˈsɪnθəsɪs/', 'n.', '综合；合成', ['synthesis of ideas', 'protein synthesis'], 'A good essay is a synthesis of evidence and argument.', 'writing'),
  w('w252', 'analysis', '/əˈnæləsɪs/', 'n.', '分析', ['detailed analysis', 'statistical analysis'], 'The analysis revealed a clear seasonal pattern.', 'academic'),
  w('w253', 'methodology', '/ˌmeθəˈdɒlədʒi/', 'n.', '方法论', ['research methodology', 'sound methodology'], 'The study\'s methodology was criticised by peers.', 'academic'),
  w('w254', 'benchmark', '/ˈbentʃmɑːk/', 'n.', '基准；参照', ['benchmark for', 'industry benchmark'], 'The test serves as a benchmark for progress.', 'academic'),
  w('w255', 'parameter', '/pəˈræmɪtə(r)/', 'n.', '参数；界限', ['key parameter', 'within the parameters'], 'The model has three adjustable parameters.', 'academic'),
  w('w256', 'coefficient', '/ˌkəʊɪˈfɪʃnt/', 'n.', '系数', ['correlation coefficient', 'coefficient of'], 'The coefficient measures the strength of the relationship.', 'academic'),
  w('w257', 'phenomenon', '/fəˈnɒmɪnən/', 'n.', '现象', ['natural phenomenon', 'common phenomenon'], 'The northern lights are a spectacular natural phenomenon.', 'academic'),
  w('w258', 'proposition', '/ˌprɒpəˈzɪʃn/', 'n.', '主张；命题', ['proposition that', 'mathematical proposition'], 'The proposition is easy to state but hard to prove.', 'academic'),
  w('w259', 'assertion', '/əˈsɜːʃn/', 'n.', '断言；主张', ['bold assertion', 'unsupported assertion'], 'The essay makes a bold assertion without evidence.', 'writing'),
  w('w260', 'contention', '/kənˈtenʃn/', 'n.', '论点；主张', ['main contention', 'contention that'], 'Her main contention is that exams favour memory over understanding.', 'academic'),
  w('w261', 'stance', '/stæns/', 'n.', '立场；姿态', ['firm stance', 'political stance'], 'The paper takes a firm stance on privacy.', 'society'),
  w('w262', 'perspective', '/pəˈspektɪv/', 'n.', '视角；观点', ['from a global perspective', 'historical perspective'], 'The book offers a fresh perspective on the war.', 'culture'),
  w('w263', 'outlook', '/ˈaʊtlʊk/', 'n.', '观点；前景', ['positive outlook', 'economic outlook'], 'The outlook for graduates remains competitive.', 'society'),
  w('w264', 'mindset', '/ˈmaɪndset/', 'n.', '心态；思维模式', ['growth mindset', 'fixed mindset'], 'A growth mindset treats mistakes as feedback.', 'education'),
  w('w265', 'disposition', '/ˌdɪspəˈzɪʃn/', 'n.', '性情；倾向', ['natural disposition', 'disposition to'], 'She has a cheerful disposition.', 'culture'),
  w('w266', 'temperament', '/ˈtemprəmənt/', 'n.', '气质；性情', ['calm temperament', 'artistic temperament'], 'His calm temperament suits the job.', 'culture'),
  w('w267', 'ethic', '/ˈeθɪk/', 'n.', '伦理；道德准则', ['work ethic', 'professional ethic'], 'A strong work ethic is hard to teach.', 'society'),
  w('w268', 'integrity', '/ɪnˈteɡrəti/', 'n.', '诚信；完整', ['academic integrity', 'personal integrity'], 'Academic integrity means crediting others\' ideas.', 'education'),
  w('w269', 'morality', '/məˈræləti/', 'n.', '道德', ['public morality', 'question of morality'], 'The debate is as much about morality as about law.', 'society'),
  w('w270', 'conscience', '/ˈkɒnʃəns/', 'n.', '良心；良知', ['a matter of conscience', 'clear conscience'], 'He followed his conscience and returned the money.', 'society'),
  w('w271', 'ethical', '/ˈeθɪkl/', 'adj.', '伦理的；道德的', ['ethical dilemma', 'ethical standards'], 'Scientists face ethical dilemmas in human trials.', 'health'),
  w('w272', 'humane', '/hjuːˈmeɪn/', 'adj.', '人道的；仁慈的', ['humane treatment', 'humane conditions'], 'Critics called for more humane treatment of animals.', 'society'),
  w('w273', 'compassion', '/kəmˈpæʃn/', 'n.', '同情心；恻隐之心', ['show compassion', 'compassion for'], 'Nurses combine skill with compassion.', 'health'),
  w('w274', 'empathy', '/ˈempəθi/', 'n.', '共情；同理心', ['show empathy', 'sense of empathy'], 'Listening with empathy helps resolve conflicts.', 'society'),
  w('w275', 'altruism', '/ˈæltruɪzəm/', 'n.', '利他主义', ['pure altruism', 'act of altruism'], 'Volunteering is often driven by altruism.', 'society'),
  w('w276', 'reciprocity', '/ˌresɪˈprɒsəti/', 'n.', '互惠；回报', ['principle of reciprocity', 'social reciprocity'], 'Trade flourishes on mutual reciprocity.', 'society'),
  w('w277', 'accord', '/əˈkɔːd/', 'n./v.', '一致；协议', ['in accord with', 'sign an accord'], 'The two nations signed an accord on trade.', 'society'),
  w('w278', 'compromise', '/ˈkɒmprəmaɪz/', 'n./v.', '妥协；折中', ['reach a compromise', 'refuse to compromise'], 'The two sides reached a compromise on rent.', 'society'),
  w('w279', 'negotiate', '/nɪˈɡəʊʃieɪt/', 'v.', '谈判；协商', ['negotiate a deal', 'hard to negotiate'], 'Unions negotiated higher wages for workers.', 'society'),
  w('w280', 'mediate', '/ˈmiːdieɪt/', 'v.', '调解；斡旋', ['mediate a dispute', 'mediate between'], 'A counsellor mediated between the two groups.', 'society'),
  w('w281', 'arbitrate', '/ˈɑːbɪtreɪt/', 'v.', '仲裁', ['arbitrate a dispute', 'independent arbitrator'], 'An independent panel arbitrates labour disputes.', 'society'),
  w('w282', 'reconcile', '/ˈrekənsaɪl/', 'v.', '调和；和解', ['reconcile differences', 'reconcile with'], 'The report tries to reconcile economic and environmental goals.', 'society'),
  w('w283', 'collaborative', '/kəˈlæbərətɪv/', 'adj.', '合作的', ['collaborative effort', 'collaborative learning'], 'The project was a collaborative effort across three labs.', 'education'),
  w('w284', 'autonomy', '/ɔːˈtɒnəmi/', 'n.', '自主；自治', ['learner autonomy', 'regional autonomy'], 'Students value autonomy in choosing topics.', 'education'),
  w('w285', 'accountability', '/əˌkaʊntəˈbɪləti/', 'n.', '问责；责任', ['public accountability', 'accountability to'], 'The reforms strengthened accountability in hospitals.', 'society'),
  w('w286', 'transparency', '/trænsˈpærənsi/', 'n.', '透明；透明性', ['full transparency', 'transparency in'], 'The report demands transparency in government spending.', 'society'),
  w('w287', 'scrutiny', '/ˈskruːtəni/', 'n.', '审查；仔细检查', ['public scrutiny', 'under scrutiny'], 'The budget came under intense scrutiny.', 'society'),
  w('w288', 'oversight', '/ˈəʊvəsaɪt/', 'n.', '监督；疏忽', ['regulatory oversight', 'lack of oversight'], 'Strong oversight prevents abuse of power.', 'society'),
  w('w289', 'governance', '/ˈɡʌvənəns/', 'n.', '治理；管理', ['corporate governance', 'good governance'], 'Good governance builds public trust.', 'society'),
  w('w290', 'jurisdiction', '/ˌdʒʊərɪsˈdɪkʃn/', 'n.', '司法管辖；权限', ['within the jurisdiction', 'legal jurisdiction'], 'The case falls outside the court\'s jurisdiction.', 'society'),
  w('w291', 'sovereignty', '/ˈsɒvrənti/', 'n.', '主权', ['national sovereignty', 'sovereignty over'], 'Nations guard their digital sovereignty.', 'society'),
  w('w292', 'diplomacy', '/dɪˈpləʊməsi/', 'n.', '外交；外交手腕', ['quiet diplomacy', 'economic diplomacy'], 'Trade is often a tool of diplomacy.', 'society'),
  w('w293', 'treaty', '/ˈtriːti/', 'n.', '条约', ['sign a treaty', 'peace treaty'], 'The climate treaty sets binding targets.', 'environment'),
  w('w294', 'protocol', '/ˈprəʊtəkɒl/', 'n.', '协议；规程', ['safety protocol', 'research protocol'], 'The lab follows a strict safety protocol.', 'academic'),
  w('w295', 'mandate', '/ˈmændeɪt/', 'n./v.', '授权；任务', ['clear mandate', 'mandate to'], 'The agency has a mandate to protect wildlife.', 'society'),
  w('w296', 'authority', '/ɔːˈθɒrəti/', 'n.', '权威；当局', ['local authority', 'authority over'], 'The health authority issued new guidelines.', 'society'),
  w('w297', 'legitimacy', '/lɪˈdʒɪtɪməsi/', 'n.', '合法性；正当性', ['political legitimacy', 'question the legitimacy'], 'The election\'s legitimacy was questioned abroad.', 'society'),
  w('w298', 'prestige', '/preˈstiːʒ/', 'n.', '声望；威望', ['academic prestige', 'prestige of'], 'The university enjoys international prestige.', 'education'),
  w('w299', 'credibility', '/ˌkredəˈbɪləti/', 'n.', '可信度；信誉', ['lose credibility', 'credibility with'], 'The scandal damaged the agency\'s credibility.', 'society'),
  w('w300', 'reputation', '/ˌrepjuˈteɪʃn/', 'n.', '声誉；名声', ['build a reputation', 'damage the reputation'], 'Customer service shapes a brand\'s reputation.', 'economy'),
  w('w301', 'gene', '/dʒiːn/', 'n.', '基因', ['gene mutation', 'identical genes'], 'Researchers identified the gene linked to the disease.', 'health'),
  w('w302', 'genetic', '/dʒəˈnetɪk/', 'adj.', '基因的；遗传的', ['genetic testing', 'genetic diversity'], 'Genetic testing can reveal disease risk.', 'health'),
  w('w303', 'cellular', '/ˈseljələ(r)/', 'adj.', '细胞的；蜂窝的', ['cellular biology', 'cellular network'], 'The drug acts at the cellular level.', 'health'),
  w('w304', 'organism', '/ˈɔːɡənɪzəm/', 'n.', '生物体；有机体', ['living organism', 'microscopic organism'], 'Bacteria are simple organisms.', 'health'),
  w('w305', 'ecosystem', '/ˈiːkəʊsɪstəm/', 'n.', '生态系统', ['marine ecosystem', 'fragile ecosystem'], 'Wetlands form a delicate ecosystem.', 'environment'),
  w('w306', 'habitat', '/ˈhæbɪtæt/', 'n.', '栖息地', ['natural habitat', 'wildlife habitat'], 'Deforestation destroys animal habitats.', 'environment'),
  w('w307', 'biodiversity', '/ˌbaɪəʊdaɪˈvɜːsəti/', 'n.', '生物多样性', ['rich biodiversity', 'loss of biodiversity'], 'The rainforest holds enormous biodiversity.', 'environment'),
  w('w308', 'contaminant', '/kənˈtæmɪnənt/', 'n.', '污染物', ['chemical contaminants', 'water contaminant'], 'The filter removes contaminants from drinking water.', 'environment'),
  w('w309', 'pollutant', '/pəˈluːtənt/', 'n.', '污染物', ['air pollutant', 'industrial pollutants'], 'Factories release pollutants into the river.', 'environment'),
  w('w310', 'emission', '/ɪˈmɪʃn/', 'n.', '排放；排放物', ['carbon emissions', 'emission reduction'], 'Cities are cutting vehicle emissions.', 'environment'),
  w('w311', 'combustion', '/kəmˈbʌstʃən/', 'n.', '燃烧', ['internal combustion', 'combustion engine'], 'Petrol engines rely on combustion.', 'technology'),
  w('w312', 'renewable', '/rɪˈnjuːəbl/', 'adj.', '可再生的', ['renewable energy', 'renewable source'], 'Solar and wind are renewable sources of power.', 'environment'),
  w('w313', 'fossil', '/ˈfɒsl/', 'n.', '化石', ['fossil fuel', 'fossil record'], 'Fossil fuels still power most transport.', 'environment'),
  w('w314', 'thermal', '/ˈθɜːml/', 'adj.', '热的；热量的', ['thermal energy', 'thermal power'], 'Geothermal plants tap the earth\'s thermal energy.', 'environment'),
  w('w315', 'nuclear', '/ˈnjuːkliə(r)/', 'adj.', '核的', ['nuclear energy', 'nuclear waste'], 'Nuclear power produces no direct carbon emissions.', 'environment'),
  w('w316', 'radiation', '/ˌreɪdiˈeɪʃn/', 'n.', '辐射', ['solar radiation', 'harmful radiation'], 'The panels convert solar radiation into electricity.', 'environment'),
  w('w317', 'wavelength', '/ˈweɪvleŋθ/', 'n.', '波长', ['short wavelength', 'light wavelength'], 'Different colours have different wavelengths.', 'technology'),
  w('w318', 'frequency', '/ˈfriːkwənsi/', 'n.', '频率；频繁', ['high frequency', 'frequency of'], 'The frequency of extreme weather is rising.', 'environment'),
  w('w319', 'amplitude', '/ˈæmplɪtjuːd/', 'n.', '振幅', ['wave amplitude', 'amplitude of'], 'Loudness depends on the wave\'s amplitude.', 'academic'),
  w('w320', 'velocity', '/vəˈlɒsəti/', 'n.', '速度；速率', ['constant velocity', 'escape velocity'], 'Sound travels at a fixed velocity in air.', 'academic'),
  w('w321', 'inertia', '/ɪˈnɜːʃə/', 'n.', '惯性；惰性', ['law of inertia', 'organisational inertia'], 'Newton\'s first law is the law of inertia.', 'academic'),
  w('w322', 'gravity', '/ˈɡrævəti/', 'n.', '重力；严肃', ['force of gravity', 'the gravity of'], 'Gravity keeps the planets in orbit.', 'academic'),
  w('w323', 'density', '/ˈdensəti/', 'n.', '密度', ['population density', 'high density'], 'Wood floats because its density is low.', 'academic'),
  w('w324', 'volume', '/ˈvɒljuːm/', 'n.', '体积；音量', ['volume of', 'turn up the volume'], 'The volume of traffic has tripled.', 'society'),
  w('w325', 'circumference', '/səˈkʌmfərəns/', 'n.', '周长', ['circumference of a circle', 'measure the circumference'], 'Divide the circumference by π to find the diameter.', 'academic'),
  w('w326', 'diameter', '/daɪˈæmɪtə(r)/', 'n.', '直径', ['diameter of', 'in diameter'], 'The crater is three kilometres in diameter.', 'academic'),
  w('w327', 'radius', '/ˈreɪdiəs/', 'n.', '半径', ['radius of', 'within a radius of'], 'Homes within a radius of ten kilometres were evacuated.', 'society'),
  w('w328', 'vertical', '/ˈvɜːtɪkl/', 'adj.', '垂直的', ['vertical line', 'vertical axis'], 'The building\'s vertical garden cools the facade.', 'technology'),
  w('w329', 'horizontal', '/ˌhɒrɪˈzɒntl/', 'adj.', '水平的', ['horizontal axis', 'horizontal line'], 'The x-axis is horizontal.', 'academic'),
  w('w330', 'parallel', '/ˈpærəlel/', 'adj.', '平行的', ['parallel lines', 'run parallel'], 'The two roads run parallel for miles.', 'academic'),
  w('w331', 'perpendicular', '/ˌpɜːpənˈdɪkjələ(r)/', 'adj.', '垂直的', ['perpendicular to', 'perpendicular lines'], 'The tower rises perpendicular to the ground.', 'academic'),
  w('w332', 'diagonal', '/daɪˈæɡənl/', 'adj./n.', '对角线的；对角线', ['diagonal line', 'move diagonally'], 'Draw a diagonal across the rectangle.', 'academic'),
  w('w333', 'symmetry', '/ˈsɪmətri/', 'n.', '对称', ['line of symmetry', 'perfect symmetry'], 'Butterflies show bilateral symmetry.', 'academic'),
  w('w334', 'asymmetry', '/eɪˈsɪmətri/', 'n.', '不对称', ['information asymmetry', 'striking asymmetry'], 'Asymmetry in the data puzzled the researchers.', 'academic'),
  w('w335', 'congruent', '/ˈkɒŋɡruənt/', 'adj.', '全等的；一致的', ['congruent triangles', 'congruent with'], 'Two triangles are congruent if all sides match.', 'academic'),
  w('w336', 'equivalent', '/ɪˈkwɪvələnt/', 'adj.', '等价的；相当的', ['equivalent to', 'equivalent amount'], 'One pound is roughly equivalent to 1.2 dollars.', 'economy'),
  w('w337', 'proportional', '/prəˈpɔːʃənl/', 'adj.', '成比例的', ['directly proportional', 'inversely proportional'], 'Friction is proportional to the normal force.', 'academic'),
  w('w338', 'inverse', '/ˌɪnˈvɜːs/', 'adj./n.', '相反的；倒数', ['inverse relationship', 'inverse function'], 'Speed and travel time are in inverse relation.', 'academic'),
  w('w339', 'exponential', '/ˌekspəˈnenʃl/', 'adj.', '指数的', ['exponential growth', 'exponential increase'], 'The virus spread at an exponential rate.', 'health'),
  w('w340', 'logarithmic', '/ˌlɒɡəˈrɪðmɪk/', 'adj.', '对数的', ['logarithmic scale', 'logarithmic growth'], 'Decibels are measured on a logarithmic scale.', 'academic'),
  w('w341', 'quadratic', '/kwɒˈdrætɪk/', 'adj.', '二次的', ['quadratic equation', 'quadratic function'], 'Solve the quadratic equation for x.', 'academic'),
  w('w342', 'linear', '/ˈlɪniə(r)/', 'adj.', '线性的；直线的', ['linear relationship', 'linear progression'], 'The graph shows a linear relationship.', 'academic'),
  w('w343', 'curve', '/kɜːv/', 'n.', '曲线', ['steep curve', 'learning curve'], 'The learning curve for the tool is gentle.', 'education'),
  w('w344', 'tangent', '/ˈtændʒənt/', 'n.', '切线', ['tangent to', 'tangent line'], 'The derivative gives the slope of the tangent.', 'academic'),
  w('w345', 'asymptote', '/ˈæsɪmptəʊt/', 'n.', '渐近线', ['vertical asymptote', 'approach an asymptote'], 'The curve approaches the asymptote but never touches it.', 'academic'),
  w('w346', 'infinite', '/ˈɪnfɪnət/', 'adj.', '无限的', ['infinite number', 'infinite space'], 'There are infinitely many prime numbers.', 'academic'),
  w('w347', 'finite', '/ˈfaɪnaɪt/', 'adj.', '有限的', ['finite resources', 'finite number'], 'The planet has finite resources.', 'environment'),
  w('w348', 'infinitesimal', '/ˌɪnfɪnɪˈtesɪml/', 'adj.', '无穷小的', ['infinitesimal change', 'infinitesimal quantity'], 'Calculus deals with infinitesimal changes.', 'academic'),
  w('w349', 'integer', '/ˈɪntɪdʒə(r)/', 'n.', '整数', ['positive integer', 'consecutive integers'], 'Seven is a prime integer.', 'academic'),
  w('w350', 'decimal', '/ˈdesɪml/', 'adj./n.', '小数的；十进制', ['decimal point', 'decimal system'], 'Write the answer as a decimal.', 'academic'),
  w('w351', 'aesthetic', '/iːsˈθetɪk/', 'adj./n.', '审美的；美学', ['aesthetic appeal', 'aesthetic value'], 'The building combines function with aesthetic appeal.', 'culture'),
  w('w352', 'heritage', '/ˈherɪtɪdʒ/', 'n.', '遗产；传统', ['cultural heritage', 'world heritage'], 'The old town is a world heritage site.', 'culture'),
  w('w353', 'tradition', '/trəˈdɪʃn/', 'n.', '传统', ['long tradition', 'tradition of'], 'There is a long tradition of tea drinking in the region.', 'culture'),
  w('w354', 'convention', '/kənˈvenʃn/', 'n.', '惯例；大会', ['social convention', 'by convention'], 'Breaking the convention felt liberating.', 'culture'),
  w('w355', 'custom', '/ˈkʌstəm/', 'n.', '风俗；习惯', ['local custom', 'ancient custom'], 'The festival follows an ancient custom.', 'culture'),
  w('w356', 'ritual', '/ˈrɪtʃuəl/', 'n.', '仪式；例行程序', ['religious ritual', 'daily ritual'], 'Morning coffee is part of her daily ritual.', 'culture'),
  w('w357', 'ceremony', '/ˈserəməni/', 'n.', '典礼；仪式', ['opening ceremony', 'graduation ceremony'], 'The graduation ceremony lasts two hours.', 'education'),
  w('w358', 'festival', '/ˈfestɪvl/', 'n.', '节日', ['cultural festival', 'music festival'], 'The lantern festival draws huge crowds.', 'culture'),
  w('w359', 'folklore', '/ˈfəʊklɔː(r)/', 'n.', '民间传说', ['local folklore', 'rich in folklore'], 'The village is rich in folklore.', 'culture'),
  w('w360', 'legend', '/ˈledʒənd/', 'n.', '传说；传奇', ['ancient legend', 'living legend'], 'The lake has a legend about a water spirit.', 'culture'),
  w('w361', 'myth', '/mɪθ/', 'n.', '神话；谬见', ['Greek myth', 'a common myth'], 'The idea that we use only ten percent of our brain is a myth.', 'academic'),
  w('w362', 'superstition', '/ˌsuːpəˈstɪʃn/', 'n.', '迷信', ['old superstition', 'pure superstition'], 'The superstition about black cats persists.', 'culture'),
  w('w363', 'anecdote', '/ˈænɪkdəʊt/', 'n.', '轶事；趣闻', ['personal anecdote', 'illustrate with an anecdote'], 'He opened the talk with a humorous anecdote.', 'culture'),
  w('w364', 'narrative', '/ˈnærətɪv/', 'n.', '叙述；叙事', ['compelling narrative', 'national narrative'], 'The film weaves a compelling narrative.', 'culture'),
  w('w365', 'chronicle', '/ˈkrɒnɪkl/', 'n./v.', '编年史；记录', ['chronicle of events', 'chronicle the war'], 'The diary chronicles daily life during the war.', 'culture'),
  w('w366', 'archive', '/ˈɑːkaɪv/', 'n.', '档案；档案馆', ['digital archive', 'archive footage'], 'Historians consult the city archives.', 'culture'),
  w('w367', 'manuscript', '/ˈmænjuskrɪpt/', 'n.', '手稿；原稿', ['ancient manuscript', 'final manuscript'], 'The medieval manuscript was kept in a vault.', 'culture'),
  w('w368', 'literature', '/ˈlɪtrətʃə(r)/', 'n.', '文学；文献', ['English literature', 'research literature'], 'She studies nineteenth-century literature.', 'culture'),
  w('w369', 'poetry', '/ˈpəʊətri/', 'n.', '诗歌', ['modern poetry', 'a collection of poetry'], 'The course covers Japanese poetry.', 'culture'),
  w('w370', 'prose', '/prəʊz/', 'n.', '散文', ['prose and poetry', 'clear prose'], 'His prose is admired for its clarity.', 'writing'),
  w('w371', 'lyric', '/ˈlɪrɪk/', 'n./adj.', '歌词；抒情的', ['song lyrics', 'lyric poetry'], 'The lyrics capture a feeling of loss.', 'culture'),
  w('w372', 'verse', '/vɜːs/', 'n.', '诗节；韵文', ['blank verse', 'a verse of'], 'The poem has five verses.', 'culture'),
  w('w373', 'metaphor', '/ˈmetəfə(r)/', 'n.', '隐喻', ['extended metaphor', 'a metaphor for'], 'The journey is a metaphor for growing up.', 'writing'),
  w('w374', 'simile', '/ˈsɪməli/', 'n.', '明喻', ['use a simile', 'a simile comparing'], 'As light as air is a simile.', 'writing'),
  w('w375', 'imagery', '/ˈɪmɪdʒəri/', 'n.', '意象；形象化描述', ['vivid imagery', 'use of imagery'], 'The novel is rich in sensory imagery.', 'writing'),
  w('w376', 'symbolism', '/ˈsɪmbəlɪzəm/', 'n.', '象征主义；象征', ['rich symbolism', 'use of symbolism'], 'The dove carries symbolism of peace.', 'writing'),
  w('w377', 'irony', '/ˈaɪrəni/', 'n.', '反讽；讽刺', ['dramatic irony', 'a touch of irony'], 'The irony was lost on the audience.', 'writing'),
  w('w378', 'sarcasm', '/ˈsɑːkæzəm/', 'n.', '讽刺；挖苦', ['heavy sarcasm', 'dripping with sarcasm'], 'His sarcasm offended the junior staff.', 'writing'),
  w('w379', 'parody', '/ˈpærədi/', 'n.', '戏仿', ['parody of', 'a comic parody'], 'The sketch is a parody of reality TV.', 'culture'),
  w('w380', 'satire', '/ˈsætaɪə(r)/', 'n.', '讽刺文学；讽刺', ['political satire', 'a work of satire'], 'The cartoon is gentle satire on office life.', 'culture'),
  w('w381', 'allegory', '/ˈæləɡəri/', 'n.', '寓言；讽喻', ['allegory of', 'political allegory'], 'The story is an allegory about power.', 'writing'),
  w('w382', 'allusion', '/əˈluːʒn/', 'n.', '典故；暗指', ['allusion to', 'classical allusion'], 'The title is an allusion to a famous poem.', 'writing'),
  w('w383', 'eloquent', '/ˈeləkwənt/', 'adj.', '雄辩的；有说服力的', ['eloquent speech', 'eloquent in'], 'She gave an eloquent defence of the policy.', 'writing'),
  w('w384', 'rhetoric', '/ˈretərɪk/', 'n.', '修辞；言辞', ['political rhetoric', 'empty rhetoric'], 'The speech relied on rhetoric rather than facts.', 'writing'),
  w('w385', 'discourse', '/ˈdɪskɔːs/', 'n.', '话语；论述', ['public discourse', 'academic discourse'], 'Social media shapes public discourse.', 'society'),
  w('w386', 'dialogue', '/ˈdaɪəlɒɡ/', 'n.', '对话', ['open dialogue', 'intercultural dialogue'], 'The two communities opened a dialogue.', 'society'),
  w('w387', 'vernacular', '/vəˈnækjələ(r)/', 'n./adj.', '方言；本地话', ['in the vernacular', 'vernacular architecture'], 'The novel is written in everyday vernacular.', 'culture'),
  w('w388', 'dialect', '/ˈdaɪəlekt/', 'n.', '方言', ['regional dialect', 'speak a dialect'], 'The play is written in a rural dialect.', 'language'),
  w('w389', 'accent', '/ˈæksent/', 'n.', '口音', ['foreign accent', 'strong accent'], 'Her accent reveals she grew up in the north.', 'language'),
  w('w390', 'intonation', '/ˌɪntəˈneɪʃn/', 'n.', '语调', ['rising intonation', 'sentence intonation'], 'Questions often end with rising intonation.', 'language'),
  w('w391', 'pronunciation', '/prəˌnʌnsiˈeɪʃn/', 'n.', '发音', ['correct pronunciation', 'improve pronunciation'], 'Shadowing improves pronunciation.', 'language'),
  w('w392', 'articulation', '/ɑːˌtɪkjuˈleɪʃn/', 'n.', '发音；表达', ['clear articulation', 'articulation of'], 'Slow speech aids clear articulation.', 'language'),
  w('w393', 'grammar', '/ˈɡræmə(r)/', 'n.', '语法', ['English grammar', 'correct grammar'], 'Grammar gives structure to meaning.', 'language'),
  w('w394', 'syntax', '/ˈsɪntæks/', 'n.', '句法', ['sentence syntax', 'complex syntax'], 'The poem twists syntax for effect.', 'language'),
  w('w395', 'vocabulary', '/vəˈkæbjələri/', 'n.', '词汇', ['expand vocabulary', 'technical vocabulary'], 'Reading widely expands vocabulary.', 'language'),
  w('w396', 'semantics', '/sɪˈmæntɪks/', 'n.', '语义学；语义', ['lexical semantics', 'question of semantics'], 'The debate is partly a question of semantics.', 'language'),
  w('w397', 'etymology', '/ˌetɪˈmɒlədʒi/', 'n.', '词源学；词源', ['word etymology', 'trace the etymology'], 'The dictionary explains the word\'s etymology.', 'language'),
  w('w398', 'colloquial', '/kəˈləʊkwiəl/', 'adj.', '口语的；非正式的', ['colloquial expression', 'colloquial style'], 'Avoid colloquial phrases in academic writing.', 'writing'),
  w('w399', 'idiom', '/ˈɪdiəm/', 'n.', '习语；成语', ['common idiom', 'learn idioms'], 'Kick the bucket is a well-known idiom.', 'language'),
  w('w400', 'cognate', '/ˈkɒɡneɪt/', 'n./adj.', '同源词；同源的', ['cognate words', 'a close cognate'], 'German and English share many cognates.', 'language'),
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

  {
    id: 'sc-bank-account',
    kind: 'scenario',
    title: '情景理解 · 银行开户与信用卡申请',
    passage: [
      'When opening a current account at a city bank, Priya is asked for proof of address, a valid passport, and an employment letter. The clerk explains the account comes with no monthly fee for the first year, a debit card that is free abroad, and an app that can freeze the card instantly if it is lost.',
      'Priya also applies for a credit card with a modest limit. The bank stresses that late payments carry interest of 19% and a missed payment can lower her credit score, which affects future loans and even rental applications. She decides to set up an automatic payment on the day after her salary arrives.',
    ],
    translation: [
      '在市区一家银行开设活期账户时，普里亚被要求提供住址证明、有效护照和在职证明。柜员解释，该账户首年免月费，附赠一张境外免手续费的借记卡，还有一个能在卡丢失时立即冻结它的手机应用。',
      '普里亚还申请了一张额度适中的信用卡。银行强调，逾期还款要承担19%的利息，一次逾期还会降低她的信用评分，而信用评分会影响未来的贷款甚至租房申请。她决定把自动还款设在工资到账后的第二天。',
    ],
    questions: [
      q('sc8-q1', 'main-idea', '本段主要讲了什么？', [
        ['a', '开户申卡所需的材料、费用与注意事项'],
        ['b', '如何投资股票'],
        ['c', '银行的营业时间'],
        ['d', '外币兑换流程'],
      ], 'a', '从所需材料到费用与信用风险，都是围绕开户申卡的要点。'),
      q('sc8-q2', 'detail', '开立账户需要提供的材料不包括？', [
        ['a', '住址证明'],
        ['b', '有效护照'],
        ['c', '在职证明'],
        ['d', '婚姻证明'],
      ], 'd', '文中列出护照、住址证明与在职证明，未提及婚姻证明。'),
      q('sc8-q3', 'inference', '她为何把自动还款设在发薪日次日？', [
        ['a', '避免逾期利息并保护信用评分'],
        ['b', '让银行多收手续费'],
        ['c', '因为周末银行不营业'],
        ['d', '为了赚取存款利息'],
      ], 'a', '银行强调19%的罚息与信用评分风险，自动还款正是为规避它们。'),
      q('sc8-q4', 'summary', '对初次办卡的人来说，最稳妥的做法是？', [
        ['a', '先弄清费用与罚息规则，并设置自动还款'],
        ['b', '申请最高额度'],
        ['c', '注销所有银行卡'],
        ['d', '只使用现金'],
      ], 'a', '理解条款+自动还款是文中给出的正确示范。'),
    ],
    summaryPrompt: '用英文向第一次办卡的朋友说明开户和用卡的三个要点。',
  },

  {
    id: 'sc-hospital-visit',
    kind: 'scenario',
    title: '情景理解 · 门诊就诊与取药',
    passage: [
      'At the clinic, Dario checks in with his health insurance card and fills a short questionnaire about allergies and current medication. The nurse measures his blood pressure before the doctor reviews a rash on his arm. The doctor prescribes an ointment and a two-week course of tablets, and prints a referral to a dermatologist if the symptoms persist.',
      'At the pharmacy, the pharmacist confirms there is no interaction between the tablets and Dario\'s asthma inhaler. She explains the ointment should be applied twice daily and the tablets taken after food to avoid stomach upset, and reminds him to finish the full course even if the rash clears early.',
    ],
    translation: [
      '在诊所，达里奥用医保卡登记，并填写一份关于过敏和当前用药的简短问卷。护士先测量了他的血压，然后医生检查了他手臂上的皮疹。医生开了一支药膏和两周的口服药，并打印了一张转诊单——如果症状持续就去皮肤科。',
      '在药房，药剂师确认这些药片与达里奥的哮喘吸入器没有相互作用。她解释药膏应每日涂抹两次，药片应在饭后服用以避免胃部不适，并提醒他即使皮疹提前消退也要吃完整个疗程。',
    ],
    questions: [
      q('sc9-q1', 'main-idea', '本段介绍的是？', [
        ['a', '从登记、就诊到处方取药的完整就医流程'],
        ['b', '如何购买医疗保险'],
        ['c', '医院的收费明细'],
        ['d', '皮肤科的手术方案'],
      ], 'a', '登记→问诊→处方→取药构成一条清晰的主线。'),
      q('sc9-q2', 'detail', '医生给 Dario 开出了什么？', [
        ['a', '一支药膏和两周药片，症状持续则转诊皮肤科'],
        ['b', '住院通知单'],
        ['c', '手术建议'],
        ['d', '疫苗注射证明'],
      ], 'a', '原文明确"ointment and a two-week course of tablets"加"referral"。'),
      q('sc9-q3', 'inference', '药剂师为何强调"即使皮疹消退也要吃完疗程"？', [
        ['a', '提前停药可能让症状反复甚至耐药'],
        ['b', '药片可以作为零食'],
        ['c', '为了多收一次药费'],
        ['d', '因为与吸入器冲突'],
      ], 'a', '完成整个疗程是防止复发的常规医嘱。'),
      q('sc9-q4', 'summary', '正确的用药方式是？', [
        ['a', '药膏每日两次、药片饭后服用并完成全程'],
        ['b', '一天只服一次'],
        ['c', '症状一好转立即停药'],
        ['d', '自行加大剂量'],
      ], 'a', '两条医嘱都与药剂师的说明吻合。'),
    ],
    summaryPrompt: '用英文写出 Dario 就医的完整过程，以及药师给出的用药提醒。',
  },

  {
    id: 'sc-museum-tour',
    kind: 'scenario',
    title: '情景理解 · 博物馆参观与观展规定',
    passage: [
      'At the national museum, Tomás buys a combined ticket that includes the temporary exhibition and the rooftop garden. The audio guide is free with the ticket, and he selects the English audio. A volunteer points out that photography is allowed except in the hall with illuminated manuscripts, where flash can damage the pigments.',
      'In the medieval hall, a sign explains the manuscripts are kept in low light and rotated every few months to slow fading. Tomás learns that donations fund the conservation lab, and that the museum runs a late opening every Friday with a reduced entry fee for students after six.',
    ],
    translation: [
      '在国家博物馆，托马斯买了一张联票，包含特展和屋顶花园。语音导览凭票免费，他选择了英语语音。志愿者提醒，除展出照明手稿的展厅外都可拍照，因为闪光灯会损伤颜料。',
      '在中世纪展厅，一块说明牌解释手稿被放在低照度下并每隔几个月轮换展出，以减缓褪色。托马斯了解到，捐赠用于资助文物保护实验室，博物馆每周五晚开放，六点后学生可享优惠票价。',
    ],
    questions: [
      q('sc10-q1', 'main-idea', '本段主要介绍博物馆的？', [
        ['a', '门票、参观规定与开放安排'],
        ['b', '餐厅菜单'],
        ['c', '员工招聘信息'],
        ['d', '建筑的设计历史'],
      ], 'a', '两段分别讲购票拍照规定与周五优惠开放。'),
      q('sc10-q2', 'detail', '哪里禁止拍照？', [
        ['a', '展示照明手稿的展厅'],
        ['b', '屋顶花园'],
        ['c', '售票大厅'],
        ['d', '礼品商店'],
      ], 'a', '原文："except in the hall with illuminated manuscripts"。'),
      q('sc10-q3', 'inference', '手稿"每隔几个月轮换展出"最可能的原因是？', [
        ['a', '长期强光会使其褪色，需轮流"休息"'],
        ['b', '防止游客将手稿带出'],
        ['c', '为了节省清洁费用'],
        ['d', '因为展签需要更换'],
      ], 'a', '"low light and rotated... to slow fading" 说明核心目的是延缓褪色。'),
      q('sc10-q4', 'summary', '既省钱又不受拍照限制的参观安排是？', [
        ['a', '周五晚六点后的学生优惠时段，避开手稿厅拍照'],
        ['b', '周末上午十点'],
        ['c', '闭馆后进入'],
        ['d', '只参观礼品店'],
      ], 'a', '周五学生优惠+避开闪光灯禁区是文中信息的最佳组合。'),
    ],
    summaryPrompt: '用英文为朋友写一条博物馆参观小贴士（门票、拍照、优惠时段）。',
  },

  {
    id: 'sc-club-fair',
    kind: 'scenario',
    title: '情景理解 · 社团招新与时间协调',
    passage: [
      'During the club fair, Aisha is drawn to the debating society\'s banner promising "confidence through argument". The recruitment table lists weekly meetings on Tuesday, a first-year friendly cup in November, and a training camp in spring that is subsidised by the student union. Membership costs ten yuan a term.',
      'Aisha hesitates because her timetable has a lab on Tuesday evenings. A senior member explains that meetings are recorded and uploaded, so absent members can catch up, and that the society also runs a weekend workshop twice a term for beginners. She signs up for the mailing list and decides to attend one session before committing.',
    ],
    translation: [
      '在社团招新会上，艾莎被辩论社那句"在辩论中建立自信"的横幅吸引。招募台列出每周二例会、十一月新生友谊杯，以及由学生会补贴的春季训练营。会员费每学期十元。',
      '艾莎犹豫了，因为周二晚她要上实验课。一位学长解释，例会会录制并上传，缺席成员可以补看；社团每学期还为新手办两次周末工作坊。她登记了邮件列表，决定先参加一次例会再决定是否加入。',
    ],
    questions: [
      q('sc11-q1', 'main-idea', '本段主要讲什么？', [
        ['a', '辩论社的活动安排与兼顾学业的办法'],
        ['b', '如何举办校园运动会'],
        ['c', '学生会的年度预算'],
        ['d', '辩论比赛的详细规则'],
      ], 'a', '活动介绍与"录制可补"都是为了解决时间冲突。'),
      q('sc11-q2', 'detail', '春季训练营由谁补贴？', [
        ['a', '学生会'],
        ['b', '校外赞助商'],
        ['c', '社团成员自费'],
        ['d', '学校食堂'],
      ], 'a', '原文："subsidised by the student union"。'),
      q('sc11-q3', 'inference', '学长特意提出"例会录制上传"的意图是？', [
        ['a', '化解艾莎周二晚有课的顾虑'],
        ['b', '为网站增加浏览量'],
        ['c', '用录像替代线下活动'],
        ['d', '向非会员收费'],
      ], 'a', '上一句正是她因实验课犹豫，学长随即给出补看方案。'),
      q('sc11-q4', 'summary', '艾莎最终的决定是？', [
        ['a', '先免费试听一次再决定是否入会'],
        ['b', '当场缴纳全年费用'],
        ['c', '拒绝所有社团'],
        ['d', '同时加入十个社团'],
      ], 'a', '"attend one session before committing" 正是先体验再决定。'),
    ],
    summaryPrompt: '用英文为想加入社团但又怕没时间的同学写三条建议。',
  },

  {
    id: 'sc-store-return',
    kind: 'scenario',
    title: '情景理解 · 超市退换货',
    passage: [
      'Marta returns to the supermarket with a rice cooker that stops heating after two weeks. The receipt is inside the box, and the store\'s policy on the wall states a full refund within 30 days if the product is faulty, or exchange only if it is simply unwanted. A staff member tests the appliance at the service counter and confirms the fault.',
      'The clerk offers a refund to her original card or a replacement of equal value. Marta chooses the replacement because the refund would take five working days to appear, and she needs the cooker for the weekend. She is told the new unit carries a fresh one-year warranty starting from today.',
    ],
    translation: [
      '玛尔塔带着一台用了两周就停止加热的电饭煲回到超市。收据放在盒子里，墙上的退换货政策写明：30天内产品有故障可全额退款，仅因不想要则只能换货。售后柜台的员工当场测试并确认了故障。',
      '店员提供了两种选择：退回到原银行卡，或换一台等值的新机。玛尔塔选择换货，因为退款需要五个工作日到账，而她周末就要用。她被告知新机从今天起享受全新的一年保修。',
    ],
    questions: [
      q('sc12-q1', 'main-idea', '本段主要讲超市的？', [
        ['a', '退换货政策与一次实际退换过程'],
        ['b', '员工绩效考核'],
        ['c', '新品上架流程'],
        ['d', '会员积分规则'],
      ], 'a', '政策墙+当场测试+换货决定都是退换货场景。'),
      q('sc12-q2', 'detail', '有故障的商品在多少天内可全额退款？', [
        ['a', '14 天'],
        ['b', '30 天'],
        ['c', '60 天'],
        ['d', '90 天'],
      ], 'b', '原文："a full refund within 30 days"。'),
      q('sc12-q3', 'inference', 'Marta 为何选择换货而非退款？', [
        ['a', '退款要五个工作日到账，而她周末急需使用'],
        ['b', '她不喜欢银行卡'],
        ['c', '换货能返现金'],
        ['d', '她不想保留旧收据'],
      ], 'a', '原文明确给出退款时间与周末用锅的冲突。'),
      q('sc12-q4', 'summary', '商品出现故障时，正确的做法是？', [
        ['a', '保留收据，按政策主张退款或换货'],
        ['b', '直接把商品扔掉'],
        ['c', '用威胁投诉的方式施压'],
        ['d', '忽视保修条款'],
      ], 'a', 'Marta 正是靠收据与政策完成退换。'),
    ],
    summaryPrompt: '用英文写一段顾客服务话术，向顾客解释退换货政策。',
  },

  {
    id: 'sc-restaurant-order',
    kind: 'scenario',
    title: '情景理解 · 餐厅点餐与过敏告知',
    passage: [
      'At the restaurant, Omar tells the waiter that a friend has a peanut allergy, so the kitchen must avoid peanuts and peanut oil for that order. The waiter writes the note clearly, confirms with the chef, and returns to say the sauce for the recommended dish already contains nuts and has been swapped for a nut-free version.',
      'Omar also asks whether the grilled fish is fresh, and the waiter explains the fish arrives daily from the market and is sold out most evenings. The bill includes a service charge printed at the bottom, and Omar leaves a small extra tip, which the waiter smiles at but does not push for.',
    ],
    translation: [
      '在餐厅，奥马尔告诉服务员，一位朋友对花生过敏，因此这份订单必须避免花生和花生油。服务员在订单上清楚标注，并与主厨确认后回来告知：推荐菜的原酱汁含坚果，已换成无坚果版本。',
      '奥马尔还询问烤鱼是否新鲜，服务员解释鱼每天从市场进货，多数晚上会售罄。账单底部印有服务费，奥马尔额外留了一点小费，服务员报以微笑但并未强求。',
    ],
    questions: [
      q('sc13-q1', 'main-idea', '本段主要讲餐厅里的？', [
        ['a', '过敏告知、食材确认与小费惯例'],
        ['b', '厨师招聘'],
        ['c', '菜单设计'],
        ['d', '后厨卫生检查'],
      ], 'a', '过敏处理与食材新鲜、小费构成就餐主线。'),
      q('sc13-q2', 'detail', '针对过敏订单，厨房做了什么？', [
        ['a', '把含坚果的酱汁换成无坚果版本'],
        ['b', '直接拒绝接单'],
        ['c', '只提供沙拉'],
        ['d', '减少盐量'],
      ], 'a', '原文："swapped for a nut-free version"。'),
      q('sc13-q3', 'inference', '"sold out most evenings" 暗示什么？', [
        ['a', '鱼很受欢迎，食材新鲜'],
        ['b', '厨师不会做鱼'],
        ['c', '餐厅即将倒闭'],
        ['d', '鱼是进口冷冻货'],
      ], 'a', '每天从市场进货且常售罄，说明新鲜且受欢迎。'),
      q('sc13-q4', 'summary', '对有食物过敏的人，外出就餐最稳妥的做法是？', [
        ['a', '明确告知服务员，并确认厨房的处理方式'],
        ['b', '自己偷偷带药'],
        ['c', '什么都不说'],
        ['d', '只点主食'],
      ], 'a', '奥马尔主动告知并得到确认，是标准做法。'),
    ],
    summaryPrompt: '用英文写出外出就餐时告知过敏原的正确方式（含三步）。',
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

  {
    id: 'news-bike-rules',
    kind: 'news',
    title: '新闻阅读 · 共享单车新规',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'A dozen cities are tightening rules on shared bikes after parked fleets began blocking pavements and bus stops. The new licences cap the number of bikes per district, require docking zones every four hundred metres, and fine operators that leave broken bikes on the street for more than a day.',
      'Operators say the caps force them to remove bikes from low-use areas, which riders there may notice as fewer options in the morning rush. City planners respond that the goal is reliable bikes where people actually are, not simply more of them, and early data from two pilot cities shows repair times have dropped by half.',
    ],
    translation: [
      '在共享单车车队开始阻塞人行道和公交站后，十多个城市正在收紧相关规定。新版许可限制每个行政区的车辆上限，要求每四百米设置还车区，并对把损坏车辆留在街头超过一天的运营商罚款。',
      '运营商表示，限流迫使他们从低使用率地区撤车，这些地区的骑行者可能会在早高峰感到车变少了。城市规划者回应称，目标是在人们真正需要的地方提供可靠的车，而不是简单地投放更多；两个试点城市的早期数据显示，维修时间已缩短一半。',
    ],
    questions: [
      q('n6-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '城市对共享单车的新监管，以及运营商与规划者的回应'],
        ['b', '共享单车的发明历史'],
        ['c', '自行车赛事'],
        ['d', '停车收费标准'],
      ], 'a', '新规+双方回应构成完整的政策报道。'),
      q('n6-q2', 'detail', '新规要求还车区每隔多远设置？', [
        ['a', '200 米'],
        ['b', '400 米'],
        ['c', '1 公里'],
        ['d', '没有距离要求'],
      ], 'b', '原文："require docking zones every four hundred metres"。'),
      q('n6-q3', 'inference', '运营商提到"早高峰车变少"，说明什么？', [
        ['a', '监管在便利与秩序之间存在权衡'],
        ['b', '运营商即将破产'],
        ['c', '市民拒绝使用共享单车'],
        ['d', '规划者不关心市民出行'],
      ], 'a', '撤车换来秩序，代价是部分地区的可用车辆减少。'),
      q('n6-q4', 'summary', '试点城市的数据最直接证明了？', [
        ['a', '新规让车辆维修效率明显提升'],
        ['b', '骑行人数翻倍'],
        ['c', '罚款收入大幅增加'],
        ['d', '所有城市问题都消失了'],
      ], 'a', '"repair times have dropped by half" 是给出的直接证据。'),
    ],
    summaryPrompt: '用英文写出这条新闻的冲突点（what / who disagrees / early result）。',
  },

  {
    id: 'news-offshore-wind',
    kind: 'news',
    title: '新闻阅读 · 近海风电场扩容',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'Construction begins this summer on the largest offshore wind farm in the region, with 174 turbines spread over 120 square kilometres. Developers say the site will power more than 500,000 homes and that turbines are now tall enough to catch steadier winds far from the coast.',
      'Fishermen\'s associations worry that cabling on the seabed could disturb spawning grounds, so the plan routes cables along existing shipping lanes and funds an independent marine survey. Environmental groups cautiously support the project but want bird-migration data published each season before further expansion.',
    ],
    translation: [
      '该地区最大的近海风电场将于今夏开工，174台风力发电机分布在120平方公里的海面上。开发商称，该电站将为超过50万户家庭供电，且如今的风机已足够高，可以捕捉远离海岸的更稳定风。',
      '渔民协会担心海床电缆可能扰乱产卵场，因此方案让电缆沿现有航道铺设，并出资开展独立海洋调查。环保组织谨慎支持该项目，但希望在进一步扩建前，每个季度都公布鸟类迁徙数据。',
    ],
    questions: [
      q('n7-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '近海风电场开工，以及各方对渔业与环境的协调'],
        ['b', '风电场的融资方式'],
        ['c', '沿海旅游开发'],
        ['d', '电网电价调整'],
      ], 'a', '开工信息与渔民、环保组织的关切共同构成主线。'),
      q('n7-q2', 'detail', '风电场将覆盖多少户家庭的用电？', [
        ['a', '5 万户'],
        ['b', '50 万户'],
        ['c', '500 万户'],
        ['d', '5,000 户'],
      ], 'b', '原文："power more than 500,000 homes"。'),
      q('n7-q3', 'inference', '电缆沿现有航道铺设的目的是？', [
        ['a', '尽量不干扰渔场产卵区'],
        ['b', '节省电缆材料'],
        ['c', '方便日后检修'],
        ['d', '避开海底暗流'],
      ], 'a', '渔民担忧产卵场，方案因此调整电缆路线。'),
      q('n7-q4', 'summary', '环保组织"谨慎支持"的原因最可能是？', [
        ['a', '认可减排价值，但要求迁徙数据公开透明'],
        ['b', '完全反对一切风电'],
        ['c', '只要资金支持不要数据'],
        ['d', '认为风电毫无作用'],
      ], 'a', '支持项目的同时要求"data published each season"正是谨慎态度。'),
    ],
    summaryPrompt: '用英文概括这条新闻支持的方案与各方的担忧。',
  },

  {
    id: 'news-wildlife-corridor',
    kind: 'news',
    title: '新闻阅读 · 为野生动物架桥',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'Highway authorities are building "green bridges" — vegetated overpasses — so that deer, lynx and migrating amphibians can cross motorways safely. The first structure, completed in spring, is 60 metres wide and planted with local grasses, and motion cameras show deer using it within a week of opening.',
      'Ecologists say the bridges reconnect habitats split by roads, which boosts gene flow between populations. Maintenance is cheaper than expected because no salt or mowing is needed on the planted surface, and engineers now plan another nine crossings along the same corridor over the next five years.',
    ],
    translation: [
      '公路部门正在修建"绿色桥梁"——覆盖植被的跨路天桥——让鹿、猞猁和迁徙的两栖动物能够安全穿过高速公路。第一座于春季完工，宽60米，种满本地草类；运动相机显示，开放一周内就有鹿在使用。',
      '生态学家表示，这些桥梁重新连接了被道路隔断的栖息地，促进种群间的基因流动。维护成本低于预期，因为植被表面不需要撒盐或割草；工程师计划在未来五年内沿同一走廊再建九座这样的通道。',
    ],
    questions: [
      q('n8-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '野生动物通道的用途、成效与扩建计划'],
        ['b', '高速公路收费标准'],
        ['c', '动物园的动物表演'],
        ['d', '城市规划法规'],
      ], 'a', '作用、成效数据与扩建计划构成完整报道。'),
      q('n8-q2', 'detail', '第一座绿色桥梁宽多少米？', [
        ['a', '30 米'],
        ['b', '45 米'],
        ['c', '60 米'],
        ['d', '90 米'],
      ], 'c', '原文："is 60 metres wide"。'),
      q('n8-q3', 'inference', '"基因流动"改善说明什么？', [
        ['a', '被道路隔断的种群重新有了交流'],
        ['b', '动物数量将失控增长'],
        ['c', '桥梁阻碍了动物迁徙'],
        ['d', '高速公路将被拆除'],
      ], 'a', '生态学家的解释是"reconnect habitats...boosts gene flow"。'),
      q('n8-q4', 'summary', '维护成本较低的原因是？', [
        ['a', '植被表面不需要撒盐或割草'],
        ['b', '桥梁不需要照明设备'],
        ['c', '没有车辆经过'],
        ['d', '由志愿者免费维护'],
      ], 'a', '原文："no salt or mowing is needed"。'),
    ],
    summaryPrompt: '用英文写出这条新闻的 what / why / benefit / next plan。',
  },

  {
    id: 'news-school-sleep',
    kind: 'news',
    title: '新闻阅读 · 推迟上课与青少年睡眠',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'A school-district study of 4,000 teenagers finds that starting the first class at 8:30 instead of 7:50 is linked to about 40 more minutes of sleep on school nights. Students reported less daytime sleepiness and, on average, slightly higher scores in maths and science, with the biggest gains among students who had previously slept the least.',
      'The change was not free: bus routes were redrawn, after-school sports ended later, and some families found child-care harder. District leaders say they will keep the later start for another two years and publish attendance and grade data before a permanent decision.',
    ],
    translation: [
      '一项覆盖4,000名青少年的学区分组研究发现，把第一节课从7:50推迟到8:30，与上学日每晚多睡约40分钟相关。学生报告白天困倦减少，数学和科学平均分略有上升，其中此前睡眠最少的学生进步最大。',
      '这一改变并非没有代价：公交路线重新规划，课外体育活动结束得更晚，一些家庭接送更难安排。学区负责人表示，晚上课将再试行两年，并在做出最终决定前公布出勤率与成绩数据。',
    ],
    questions: [
      q('n9-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '推迟上课带来的睡眠与成绩收益，及其社会成本'],
        ['b', '学生的营养午餐'],
        ['c', '校车的尾气排放'],
        ['d', '假期安排调整'],
      ], 'a', '收益与成本两面构成平衡报道。'),
      q('n9-q2', 'detail', '推迟上课平均让学生多睡多久？', [
        ['a', '约 20 分钟'],
        ['b', '约 40 分钟'],
        ['c', '约 1 小时'],
        ['d', '约 2 小时'],
      ], 'b', '原文："about 40 more minutes of sleep"。'),
      q('n9-q3', 'inference', '"这一改变并非没有代价"说明什么？', [
        ['a', '政策需要权衡各方利益后再做决定'],
        ['b', '学校想省钱'],
        ['c', '学生普遍反对'],
        ['d', '老师准备离职'],
      ], 'a', '第二段列举的公交、体育与接送问题正是权衡点。'),
      q('n9-q4', 'summary', '学区下一步的计划是？', [
        ['a', '再试行两年并公布数据后再做最终决定'],
        ['b', '立即恢复 7:50 上课'],
        ['c', '无限期推迟所有决定'],
        ['d', '取消所有课外活动'],
      ], 'a', '原文："keep the later start for another two years and publish...data"。'),
    ],
    summaryPrompt: '用英文写出这条新闻的好处、代价与决策方式。',
  },

  {
    id: 'news-bottle-deposit',
    kind: 'news',
    title: '新闻阅读 · 塑料瓶押金制度',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'The national bottle deposit scheme, running for a year, now returns 78% of plastic drink bottles for recycling, up from 40% before the policy. Shoppers pay a small deposit on each bottle and collect it back at automated machines in supermarkets, which also issue store credit for unclaimed bottles donated to charity.',
      'Retailers report the machines cost more to maintain than expected and occasionally jam with crushed bottles. Still, officials estimate the scheme has kept 1.4 billion bottles out of landfills and is funding recycling plants; a trial extension to glass jars is planned for next spring.',
    ],
    translation: [
      '全国塑料瓶押金制度实施一年后，塑料饮料瓶的回收率从政策前的40%提高到78%。购物者为每瓶支付小额押金，可在超市的自动回收机取回押金；无人领取的押金则转为商店积分并捐赠给慈善机构。',
      '零售商反馈，回收机维护成本高于预期，且有时会被压扁的瓶子卡住。不过官方估计，该制度已使14亿个瓶子免于填埋，并为回收工厂提供了资金；明年春天计划试点将范围扩大到玻璃罐。',
    ],
    questions: [
      q('n10-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '押金制推高回收率，及其现实成本与扩展计划'],
        ['b', '塑料的化学成分'],
        ['c', '超市的营销策略'],
        ['d', '垃圾焚烧发电'],
      ], 'a', '成效、成本与扩展计划构成主线。'),
      q('n10-q2', 'detail', '政策实施后塑料瓶回收率是多少？', [
        ['a', '40%'],
        ['b', '58%'],
        ['c', '78%'],
        ['d', '98%'],
      ], 'c', '原文："returns 78%... up from 40%"（40%是政策前）。'),
      q('n10-q3', 'inference', '提到机器"偶尔卡住"的作用是？', [
        ['a', '让报道更客观，呈现推行中的困难'],
        ['b', '证明制度彻底失败'],
        ['c', '支持取消该制度'],
        ['d', '为机器做广告'],
      ], 'a', '第二段先讲成本问题再讲整体成效，是典型的平衡写法。'),
      q('n10-q4', 'summary', '官方对该制度的总体评价是？', [
        ['a', '显著减少填埋并资助回收，还计划扩大范围'],
        ['b', '完全失败'],
        ['c', '与资源回收无关'],
        ['d', '只对富人有利'],
      ], 'a', '"kept 1.4 billion bottles out of landfills and is funding recycling plants"。'),
    ],
    summaryPrompt: '用英文写出这条新闻的 what / result / cost / next step。',
  },

  {
    id: 'news-drone-books',
    kind: 'news',
    title: '新闻阅读 · 无人机送书进乡村',
    source: 'Miqi Learning 编辑部（模拟新闻稿）',
    passage: [
      'A public library network is piloting drone delivery of reserved books to villages that have no branch. Residents order titles on a phone app, and a drone flies the books to a secure drop box at the local community centre, usually within two hours. The pilot covers nine villages and around 3,000 readers.',
      'Librarians note the drones cannot fly in strong wind or heavy rain, and that the scheme complements rather than replaces the mobile library bus. Early surveys show readers borrowed about a third more books in the pilot area, so the network will decide on a wider roll-out after a full year of data.',
    ],
    translation: [
      '一个公共图书馆网络正在试点用无人机向没有分馆的村庄投递预约图书。居民在手机应用上预订书目，无人机通常两小时内把书送到当地社区中心的安全投递箱。试点覆盖九个村庄、约3,000名读者。',
      '图书管理员指出，无人机在大风或大雨中无法飞行，且这一方案是对流动图书车的补充而非替代。早期调查显示，试点地区读者借书量增加了约三分之一，因此该网络将在收集一整年数据后决定是否扩大推广。',
    ],
    questions: [
      q('n11-q1', 'main-idea', '这篇报道的主线是？', [
        ['a', '无人机送书试点的运作、局限与数据评估'],
        ['b', '图书馆的装修工程'],
        ['c', '无人机的军事用途'],
        ['d', '图书定价策略'],
      ], 'a', '运作方式、局限与评估标准构成主线。'),
      q('n11-q2', 'detail', '无人机通常多久送达预约图书？', [
        ['a', '30 分钟内'],
        ['b', '2 小时内'],
        ['c', '当天'],
        ['d', '一周内'],
      ], 'b', '原文："usually within two hours"。'),
      q('n11-q3', 'inference', '"补充而非替代流动图书车"说明什么？', [
        ['a', '无人机方案有局限，需要与现有服务配合'],
        ['b', '图书车即将被淘汰'],
        ['c', '图书馆想削减开支'],
        ['d', '读者不喜欢无人机'],
      ], 'a', '不能飞行的天气条件正是需要互补的原因。'),
      q('n11-q4', 'summary', '决定是否扩大推广的依据是？', [
        ['a', '一整年的数据与借阅量变化'],
        ['b', '无人机厂商的报价'],
        ['c', '新闻关注热度'],
        ['d', '村干部的个人意见'],
      ], 'a', '原文："after a full year of data"。'),
    ],
    summaryPrompt: '用英文写出这条新闻的 what / how / limitation / decision criterion。',
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

  {
    id: 'paper-exercise-cognition',
    kind: 'paper',
    title: '论文摘要 · 运动与老年人认知',
    source: '模拟学术摘要 · 老年医学方向',
    passage: [
      'A 12-month randomised trial of 320 adults aged 65-75 examined whether a twice-weekly programme of brisk walking and light resistance training could slow cognitive decline. The exercise group scored about 11% higher than the control group on a battery of memory and attention tests, and MRI scans showed less shrinkage in the hippocampus, the brain region central to memory.',
      'Researchers caution that the study ran for a single year and that adherence was high because participants were supervised, so real-world effects may be smaller. They recommend longer follow-ups and testing the programme in adults with mild cognitive impairment before treating exercise as a standard prescription.',
    ],
    translation: [
      '一项针对320名65至75岁成年人、为期12个月的随机试验考察了每周两次的快走加轻度抗阻训练能否减缓认知能力下降。在记忆与注意力测试组合中，运动组得分比对照组高约11%，且核磁共振扫描显示，大脑中主管记忆的海马体萎缩更少。',
      '研究人员提醒，该研究仅持续一年，且因参与者接受监督、依从性很高，现实世界中的效果可能更小。他们建议进行更长时间的随访，并在轻度认知障碍的成人中测试该方案，之后才能把运动当作标准处方。',
    ],
    questions: [
      q('p6-q1', 'main-idea', '该研究的主线是？', [
        ['a', '运动训练对老年人认知与脑部的影响及其局限'],
        ['b', '老年人的饮食结构'],
        ['c', '运动装备的选择'],
        ['d', '退休制度改革'],
      ], 'a', '发现、扫描证据与局限共同构成摘要主线。'),
      q('p6-q2', 'detail', '运动组在测试组合上比对照组高多少？', [
        ['a', '约 5%'],
        ['b', '约 11%'],
        ['c', '约 20%'],
        ['d', '约 35%'],
      ], 'b', '原文："scored about 11% higher than the control group"。'),
      q('p6-q3', 'inference', '强调"参与者接受监督"说明什么？', [
        ['a', '现实中的效果可能比实验中要小'],
        ['b', '实验设计存在缺陷'],
        ['c', '运动对认知毫无用处'],
        ['d', '参与者是被强迫的'],
      ], 'a', '高依从性来自监督，日常自行坚持的效果往往打折扣。'),
      q('p6-q4', 'summary', '作者建议的下一步是？', [
        ['a', '更长随访，并在轻度认知障碍人群中验证'],
        ['b', '立即把运动列为标准处方'],
        ['c', '停止相关研究'],
        ['d', '只保留核磁检查'],
      ], 'a', '原文："recommend longer follow-ups and testing...in adults with mild cognitive impairment"。'),
    ],
    summaryPrompt: '用英文写出该研究的问题、主要发现、局限与下一步建议。',
  },

  {
    id: 'paper-sitting-metabolism',
    kind: 'paper',
    title: '论文摘要 · 久坐打断与代谢',
    source: '模拟学术摘要 · 代谢流行病学方向',
    passage: [
      'An observational study following 1,400 office workers for six years finds that people who interrupt their sitting time with three-minute walks every hour have noticeably better blood-sugar and fat profiles than those who sit in unbroken blocks. The benefit was seen even among workers who already did a regular gym session.',
      'Because the study is observational, the authors cannot rule out that healthier people simply move more. They are now running a controlled trial in which half the participants receive stand-up desks and hourly movement reminders, with results expected next year.',
    ],
    translation: [
      '一项随访1,400名办公室职员六年的观察研究发现，每小时用三分钟步行打断久坐的人，其血糖和血脂水平明显优于长时间连续久坐的人。即使在工作之余已经规律健身的职员中也能看到这一益处。',
      '由于这是一项观察性研究，作者无法排除更健康的人本身就动得更多这一可能。他们目前正在进行一项对照试验，其中一半参与者配备站立式办公桌并每小时收到活动提醒，结果预计明年公布。',
    ],
    questions: [
      q('p7-q1', 'main-idea', '该研究的主线是？', [
        ['a', '打断久坐与代谢指标的关联，以及观察研究的因果局限'],
        ['b', '办公室的装修风格'],
        ['c', '健身器材的价格'],
        ['d', '员工工资水平'],
      ], 'a', '关联发现、机制与局限构成主线。'),
      q('p7-q2', 'detail', '研究对象是谁？', [
        ['a', '1,400 名办公室职员'],
        ['b', '400 名运动员'],
        ['c', '4,000 名学生'],
        ['d', '1,400 名退休老人'],
      ], 'a', '原文："following 1,400 office workers for six years"。'),
      q('p7-q3', 'inference', '"无法排除更健康的人本来就动得多"说明什么？', [
        ['a', '观察性研究难以直接证明因果关系'],
        ['b', '研究完全没有价值'],
        ['c', '实验数据被篡改'],
        ['d', '参与者提供了虚假信息'],
      ], 'a', '观察研究只能显示关联，因果需随机对照试验验证。'),
      q('p7-q4', 'summary', '作者为解决因果问题采取的措施是？', [
        ['a', '开展随机对照试验'],
        ['b', '放弃继续研究'],
        ['c', '只依靠观察数据'],
        ['d', '缩短随访时间'],
      ], 'a', '原文："running a controlled trial in which half the participants receive stand-up desks"。'),
    ],
    summaryPrompt: '用英文写出该研究的发现、为何不能断言因果，以及作者的验证方案。',
  },

  {
    id: 'paper-music-language',
    kind: 'paper',
    title: '论文摘要 · 音乐训练与语言能力',
    source: '模拟学术摘要 · 发展神经科学方向',
    passage: [
      'A study of 90 children who began piano lessons at age six and continued for three years reports that they outperformed non-musical peers on tests of speech discrimination in noisy rooms, a skill linked to reading. Brain recordings showed earlier and stronger responses to speech sounds in the auditory cortex of the music group.',
      'The authors note the sample is small and all children came from middle-income families, so results may not generalise. They argue the findings support music education as part of the school day, but stop short of claiming musical training cures language disorders.',
    ],
    translation: [
      '一项针对90名六岁开始学习钢琴并持续三年的儿童的研究报告称，在嘈杂房间中的言语辨别测试里，他们的表现优于未学音乐的同伴，这一能力与阅读相关。脑电记录显示，音乐组听觉皮层对语音的反应更早、更强。',
      '作者指出样本量较小，且所有孩子都来自中等收入家庭，结果可能无法推广。他们认为研究结果支持把音乐教育纳入学校日常课程，但并未声称音乐训练能治愈语言障碍。',
    ],
    questions: [
      q('p8-q1', 'main-idea', '该研究的主线是？', [
        ['a', '音乐训练与语音处理能力的关系，及其推广局限'],
        ['b', '钢琴的市场价格'],
        ['c', '儿童的饮食习惯'],
        ['d', '学校的升学排名'],
      ], 'a', '行为与脑电证据、局限与建议构成主线。'),
      q('p8-q2', 'detail', '研究中儿童从几岁开始学钢琴？', [
        ['a', '4 岁'],
        ['b', '5 岁'],
        ['c', '6 岁'],
        ['d', '8 岁'],
      ], 'c', '原文："began piano lessons at age six"。'),
      q('p8-q3', 'inference', '"结果可能无法推广"的最直接原因是？', [
        ['a', '样本较小且家庭背景单一'],
        ['b', '作者态度不严谨'],
        ['c', '测试本身不可靠'],
        ['d', '孩子们不认真练习'],
      ], 'a', '作者明确指出 sample is small 且家庭均为中等收入。'),
      q('p8-q4', 'summary', '作者对音乐训练的态度是？', [
        ['a', '支持纳入学校课程，但不夸大疗效'],
        ['b', '完全反对音乐教育'],
        ['c', '声称能治愈语言障碍'],
        ['d', '认为只适合富裕家庭孩子'],
      ], 'a', '支持纳入课程，同时 "stop short of claiming...cures"。'),
    ],
    summaryPrompt: '用英文写出该研究的发现、样本局限与作者的结论边界。',
  },

  {
    id: 'paper-social-media-anxiety',
    kind: 'paper',
    title: '论文摘要 · 社交媒体与青少年焦虑',
    source: '模拟学术摘要 · 青少年心理学方向',
    passage: [
      'A two-year panel survey of 1,800 teenagers aged 13 to 16 finds that heavy evening social-media use is associated with poorer sleep and higher self-reported anxiety a year later. The link was stronger for girls and for students who checked feeds more than once an hour during the evening.',
      'The researchers are careful not to claim social media causes anxiety, pointing out that anxious teenagers may also turn to screens to cope. They urge platforms to introduce evening limits and call for randomised trials that temporarily cut late-night access to test the effect directly.',
    ],
    translation: [
      '一项针对1,800名13至16岁青少年的两年追踪调查发现，晚间大量使用社交媒体与一年后较差的睡眠和更高的自评焦虑相关。这种关联在女孩以及晚间每小时查看内容超过一次的学生中更为明显。',
      '研究人员谨慎地不宣称社交媒体导致焦虑，并指出焦虑的青少年也可能转向屏幕来应对。他们敦促平台推出晚间使用限制，并呼吁开展随机试验，通过临时切断深夜访问来直接检验这一效应。',
    ],
    questions: [
      q('p9-q1', 'main-idea', '该研究的主线是？', [
        ['a', '晚间社交媒体使用与青少年睡眠/焦虑的关联，及其因果审慎'],
        ['b', '社交媒体的功能迭代'],
        ['c', '手机的硬件配置'],
        ['d', '校园课程设置'],
      ], 'a', '关联、群体差异与审慎结论构成主线。'),
      q('p9-q2', 'detail', '研究对象的年龄范围是？', [
        ['a', '10-12 岁'],
        ['b', '13-16 岁'],
        ['c', '17-19 岁'],
        ['d', '20 岁以上'],
      ], 'b', '原文："1,800 teenagers aged 13 to 16"。'),
      q('p9-q3', 'inference', '研究人员"不宣称社交媒体导致焦虑"体现了？', [
        ['a', '对因果关系的审慎态度'],
        ['b', '被平台方收买'],
        ['c', '研究完全失败'],
        ['d', '有意隐瞒证据'],
      ], 'a', '作者明确指出存在反向因果的可能（焦虑者可能转向屏幕）。'),
      q('p9-q4', 'summary', '作者提出的直接检验方法是？', [
        ['a', '随机试验中临时切断深夜访问'],
        ['b', '永久禁止使用手机'],
        ['c', '只依赖观察数据'],
        ['d', '直接询问家长意见'],
      ], 'a', '原文："call for randomised trials that temporarily cut late-night access"。'),
    ],
    summaryPrompt: '用英文写出该研究的发现、为何不能断言因果，以及建议的检验方式。',
  },

  {
    id: 'paper-cycling-cvd',
    kind: 'paper',
    title: '论文摘要 · 自行车通勤与心血管健康',
    source: '模拟学术摘要 · 心血管流行病学方向',
    passage: [
      'A cohort study tracking 2,300 commuters for a decade reports that cycling to work at least three days a week is linked to a 24% lower risk of cardiovascular disease, even after adjusting for income, diet and general activity. The protective effect grew with distance, up to a plateau around nine kilometres each way.',
      'The authors caution that commuter cyclists in the sample were disproportionately male, fit and car-free, which may inflate the benefit. They call for infrastructure studies, noting that cities that build safe bike lanes tend to raise cycling rates without shifting the burden onto busy roads.',
    ],
    translation: [
      '一项追踪2,300名通勤者十年的队列研究报告称，每周至少骑车通勤三天与心血管疾病风险降低24%相关，即使在校正收入、饮食和总体活动量后仍然如此。保护效应随距离增加，到单程约九公里时趋于平稳。',
      '作者提醒，样本中的骑车通勤者男性、体健、无车比例偏高，可能高估了益处。他们呼吁开展基础设施研究，并指出建设安全自行车道的城市往往能提高骑行率，而不会把负担转移给繁忙道路。',
    ],
    questions: [
      q('p10-q1', 'main-idea', '该研究的主线是？', [
        ['a', '骑车通勤与心血管健康的关联、样本局限与政策启示'],
        ['b', '汽车品牌的竞争力'],
        ['c', '城市房价走势'],
        ['d', '国际油价波动'],
      ], 'a', '发现、局限与基础设施建议构成主线。'),
      q('p10-q2', 'detail', '骑车通勤与心血管风险下降多少相关？', [
        ['a', '12%'],
        ['b', '24%'],
        ['c', '34%'],
        ['d', '44%'],
      ], 'b', '原文："linked to a 24% lower risk of cardiovascular disease"。'),
      q('p10-q3', 'inference', '"样本中男性体健者偏多"说明什么？', [
        ['a', '观察到的益处可能被高估'],
        ['b', '研究数据造假'],
        ['c', '女性从不骑车'],
        ['d', '实际风险被低估'],
      ], 'a', '样本偏差会使结论偏向"更健康的人骑车"这一方向。'),
      q('p10-q4', 'summary', '作者对政策的建议是？', [
        ['a', '建设安全的自行车道以提升骑行率'],
        ['b', '全面禁止汽车'],
        ['c', '只为无车者提供补贴'],
        ['d', '不采取任何措施'],
      ], 'a', '原文："cities that build safe bike lanes tend to raise cycling rates"。'),
    ],
    summaryPrompt: '用英文写出该研究的发现、样本局限与政策建议。',
  },

  {
    id: 'paper-classroom-light',
    kind: 'paper',
    title: '论文摘要 · 教室自然光与学习表现',
    source: '模拟学术摘要 · 教育心理学方向',
    passage: [
      'A quasi-experiment across 38 classrooms in eight schools compared students who were moved to renovated classrooms with large windows and skylights against matched peers in standard rooms. After two semesters, the daylight group scored about 7% higher on standardised reading tests and reported fewer concentration complaints.',
      'The authors warn that renovation and better teaching resources were bundled together, so the daylight itself cannot be isolated as the cause. They propose a follow-up in which lighting is adjusted without any other classroom change, to measure the effect of light alone.',
    ],
    translation: [
      '一项覆盖八所学校38间教室的准实验比较了搬入带大窗户和天窗的翻新教室的学生，与仍在标准教室的匹配同伴。两个学期后，自然光组在标准化阅读测试中得分高出约7%，并且更少抱怨注意力不集中。',
      '作者提醒，翻新与更好的教学资源是捆绑在一起的，因此无法把自然光本身单独归结为原因。他们提议开展后续研究，在不改变教室其他条件的情况下仅调整照明，以单独测量光的作用。',
    ],
    questions: [
      q('p11-q1', 'main-idea', '该研究的主线是？', [
        ['a', '教室自然光与学习表现的关联，及其混杂因素局限'],
        ['b', '教室装修的成本'],
        ['c', '教师的薪资待遇'],
        ['d', '考试的难度设置'],
      ], 'a', '发现、混杂提示与后续设计构成主线。'),
      q('p11-q2', 'detail', '自然光组在阅读测试上高出多少？', [
        ['a', '约 3%'],
        ['b', '约 7%'],
        ['c', '约 12%'],
        ['d', '约 20%'],
      ], 'b', '原文："scored about 7% higher on standardised reading tests"。'),
      q('p11-q3', 'inference', '"翻新与教学资源捆绑"说明什么？', [
        ['a', '不能单独断定是自然光的功劳'],
        ['b', '研究完全没有意义'],
        ['c', '学生存在作弊行为'],
        ['d', '老师故意偏袒实验组'],
      ], 'a', '多个变量同时改变，自然光的作用无法被单独分离。'),
      q('p11-q4', 'summary', '作者提出的后续研究方案是？', [
        ['a', '只调整照明，其余条件不变'],
        ['b', '再翻新更多教室'],
        ['c', '直接取消实验'],
        ['d', '改用问卷调查'],
      ], 'a', '原文："lighting is adjusted without any other classroom change"。'),
    ],
    summaryPrompt: '用英文写出该研究的发现、混杂因素与后续实验设计。',
  },
]
