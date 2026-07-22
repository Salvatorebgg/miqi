/** Wordle-style word guessing puzzle. Challenging deduction game for adults. */

const WORDS = [
  'ABOUT','ABOVE','ACTOR','ADMIT','ADOPT','ADULT','AFTER','AGAIN','AGENT','AGREE',
  'AHEAD','ALBUM','ALIEN','ALIGN','ALIVE','ALLOW','ALONE','ALONG','ALTER','AMONG',
  'ANGEL','ANGER','ANGLE','APART','APPLE','APPLY','ARENA','ARGUE','ARISE','ARRAY',
  'ASIDE','ASSET','AVOID','AWARD','AWARE','BADLY','BASIC','BASIS','BEACH','BEGIN',
  'BEING','BELOW','BENCH','BIRTH','BLACK','BLAME','BLIND','BLOCK','BLOOD','BOARD',
  'BOOST','BOUND','BRAIN','BRAND','BRAVE','BREAD','BREAK','BREED','BRIEF','BRING',
  'BROAD','BROWN','BUILD','BUNCH','BUYER','CABLE','CARRY','CATCH','CAUSE','CHAIN',
  'CHAIR','CHART','CHASE','CHEAP','CHECK','CHEST','CHIEF','CHILD','CIVIL','CLAIM',
  'CLASS','CLEAN','CLEAR','CLIMB','CLING','CLOCK','CLOSE','CLOUD','COACH','COAST',
  'COULD','COUNT','COURT','COVER','CRAFT','CRASH','CRAZY','CREAM','CRIME','CROSS',
  'CROWD','CROWN','CURVE','CYCLE','DAILY','DANCE','DEATH','DEBUG','DELAY','DEPTH',
  'DIRTY','DOUBT','DOZEN','DRAFT','DRAMA','DREAM','DRESS','DRINK','DRIVE','EAGER',
  'EARLY','EARTH','EIGHT','ELECT','ELITE','EMPTY','ENEMY','ENJOY','ENTER','ENTRY',
  'EQUAL','ERROR','ESSAY','EVENT','EVERY','EXACT','EXIST','EXTRA','FAITH','FALSE',
  'FAULT','FENCE','FIBER','FIELD','FIFTH','FIFTY','FIGHT','FINAL','FIRST','FIXED',
  'FLASH','FLEET','FLOOR','FLUID','FOCUS','FORCE','FORTH','FORUM','FOUND','FRAME',
  'FRANK','FRAUD','FRESH','FRONT','FRUIT','FULLY','FUNNY','GIANT','GIVEN','GLASS',
  'GLOBE','GRADE','GRAIN','GRAND','GRANT','GRAPH','GRASP','GRASS','GRAVE','GREAT',
  'GREEN','GREET','GROUP','GROWN','GUARD','GUESS','GUEST','GUIDE','GUILT','HAPPY',
  'HARRY','HEART','HEAVY','HENCE','HORSE','HOTEL','HOUSE','HUMAN','IDEAL','IMAGE',
  'IMPLY','INDEX','INNER','INPUT','ISSUE','JOINT','JUDGE','KEVIN','KNOWN','LABEL',
  'LARGE','LASER','LATER','LAUGH','LAYER','LEARN','LEAST','LEAVE','LEGAL','LEMON',
  'LEVEL','LEWIS','LIGHT','LIMIT','LINUX','LIVER','LOCAL','LOGIC','LOOSE','LOWER',
  'LUCKY','LUNCH','MAJOR','MARCH','MATCH','MAYOR','MEDIA','METAL','MIGHT','MINOR',
  'MINUS','MIXED','MODEL','MONEY','MONTH','MORAL','MOTOR','MOUNT','MOUSE','MOUTH',
  'MOVIE','MUSIC','NAVAL','NEEDS','NERVE','NEVER','NEWLY','NIGHT','NINTH','NOBLE',
  'NOISE','NORTH','NOTED','NOVEL','NURSE','OCCUR','OCEAN','OFFER','OFTEN','OLIVE',
  'ONION','OPERA','ORDER','OTHER','OUGHT','OUTER','OWNER','OXFORD','PAINT','PANEL',
  'PAPER','PARTY','PEACE','PENAL','PENNY','PETER','PHASE','PHONE','PHOTO','PIANO',
  'PIECE','PILOT','PITCH','PLACE','PLAIN','PLANE','PLANT','PLATE','PLEAD','PLOT',
  'PLUCK','POINT','POLAR','POUND','POWER','PRESS','PRICE','PRIDE','PRIME','PRINT',
  'PRIOR','PRIZE','PROBE','PROOF','PROPS','PROUD','PROVE','PULSE','PURSE','QUEEN',
  'QUERY','QUEST','QUEUE','QUICK','QUIET','QUITE','QUOTA','RADIO','RAISE','RANGE',
  'RAPID','RATIO','REACH','REACT','READY','REALM','REBEL','REFER','REIGN','RELAX',
  'REPLY','RIDER','RIDGE','RIFLE','RIGHT','RISKY','RIVER','ROBIN','ROMAN','ROUGH',
  'ROUND','ROUTE','ROYAL','RULER','RURAL','SAINT','SALAD','SCALE','SCENE','SCOPE',
  'SCORE','SEIZE','SENSE','SERVE','SEVEN','SHALL','SHAPE','SHARE','SHARP','SHEEP',
  'SHEER','SHEET','SHELF','SHELL','SHIFT','SHIRT','SHOCK','SHOOT','SHORT','SHOWN',
  'SIGHT','SILLY','SINCE','SIXTH','SIXTY','SKILL','SLAVE','SLEEP','SLICE','SLIDE',
  'SLIMY','SMALL','SMART','SMILE','SMITH','SMOKE','SOLAR','SOLID','SOLVE','SORRY',
  'SOUND','SOUTH','SPACE','SPARE','SPEAK','SPEED','SPEND','SPENT','SPLIT','SPOKE',
  'SPORT','SQUAD','STAFF','STAGE','STAKE','STAND','START','STATE','STAYS','STEAD',
  'STEAL','STEAM','STEEL','STEEP','STEER','STERN','STICK','STIFF','STILL','STOCK',
  'STONE','STOOD','STORE','STORM','STORY','STRAW','STRIP','STUCK','STUDY','STUFF',
  'STYLE','SUGAR','SUITE','SUNNY','SUPER','SURGE','SWAMP','SWEEP','SWEET','SWIFT',
  'SWING','SWORD','TABLE','TASTE','TEACH','TEETH','TERRY','THEME','THERE','THICK',
  'THING','THINK','THIRD','THOSE','THREE','THREW','THROW','THUMB','TIGHT','TIMER',
  'TODAY','TOKEN','TOPIC','TOTAL','TOUCH','TOUGH','TOWER','TRACE','TRACK','TRADE',
  'TRAIL','TRAIN','TREAT','TREND','TRIAL','TRIBE','TRICK','TRIED','TROOP','TRUCK',
  'TRULY','TRUMP','TRUNK','TRUST','TRUTH','TWICE','UNCLE','UNDER','UNION','UNITE',
  'UNITY','UNTIL','UPPER','UPSET','URBAN','USAGE','USUAL','VALID','VALUE','VIDEO',
  'VIGOR','VIRUS','VISIT','VITAL','VIVID','VOCAL','VOICE','VOTER','WAGES','WAGON',
  'WASTE','WATCH','WATER','WEARY','WEAVE','WHEAT','WHEEL','WHERE','WHICH','WHILE',
  'WHITE','WHOLE','WHOSE','WIDER','WOMAN','WORLD','WORRY','WORSE','WORST','WORTH',
  'WOULD','WOUND','WRATH','WRITE','WRONG','WROTE','YIELD','YOUNG','YOUTH',
]

const WORD_SET = new Set(WORDS)

export type LetterState = 'correct' | 'present' | 'absent'

export interface WordleState {
  target: string
  guesses: string[]
  evaluations: LetterState[][]
  currentGuess: string
  gameOver: boolean
  won: boolean
  lettersUsed: Record<string, LetterState>
  attempts: number
  startedAt: number
  message: string
}

function pickWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export function generateWordle(): WordleState {
  return {
    target: pickWord(),
    guesses: [],
    evaluations: [],
    currentGuess: '',
    gameOver: false,
    won: false,
    lettersUsed: {},
    attempts: 0,
    startedAt: Date.now(),
    message: '',
  }
}

function evaluateGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array(5).fill('absent')
  const targetChars = target.split('')
  const guessChars = guess.split('')
  const used = Array(5).fill(false)

  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = 'correct'
      used[i] = true
    }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessChars[i] === targetChars[j]) {
        result[i] = 'present'
        used[j] = true
        break
      }
    }
  }
  return result
}

export function typeLetter(state: WordleState, letter: string): WordleState {
  if (state.gameOver || state.currentGuess.length >= 5) return state
  return { ...state, currentGuess: state.currentGuess + letter.toUpperCase(), message: '' }
}

export function backspace(state: WordleState): WordleState {
  if (state.gameOver || state.currentGuess.length === 0) return state
  return { ...state, currentGuess: state.currentGuess.slice(0, -1), message: '' }
}

export function submitGuess(state: WordleState): WordleState {
  if (state.gameOver) return state
  if (state.currentGuess.length !== 5) return { ...state, message: '请输入5个字母' }
  if (!WORD_SET.has(state.currentGuess)) return { ...state, message: '不在词库中，请换一个' }

  const evaluation = evaluateGuess(state.currentGuess, state.target)
  const won = evaluation.every(s => s === 'correct')
  const attempts = state.attempts + 1
  const gameOver = won || attempts >= 6

  const lettersUsed = { ...state.lettersUsed }
  for (let i = 0; i < 5; i++) {
    const ch = state.currentGuess[i]
    const cur = lettersUsed[ch]
    if (cur !== 'correct') {
      lettersUsed[ch] = evaluation[i]
    }
  }

  return {
    ...state,
    guesses: [...state.guesses, state.currentGuess],
    evaluations: [...state.evaluations, evaluation],
    currentGuess: '',
    attempts,
    won,
    gameOver,
    lettersUsed,
    message: won ? '猜对了！' : gameOver ? `答案是 ${state.target}` : '',
  }
}
