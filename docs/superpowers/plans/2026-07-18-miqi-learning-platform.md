# Miqi Learning Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a mint-glass personal learning portal with progressive mathematics, IELTS practice, refreshed news, brain games, planning, account login, and cross-device sync.

**Architecture:** A React/TypeScript/Vite single-page app uses hash routing so every route works on GitHub Pages. Feature modules consume typed curriculum/content data and a repository interface; the repository writes locally first and optionally synchronizes to Supabase under Row Level Security. GitHub Actions tests and deploys the app and refreshes a normalized static news feed four times per day.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Supabase JS, Vitest, Testing Library, Playwright, vite-plugin-pwa, KaTeX, Lucide React, fast-xml-parser, GitHub Actions, GitHub Pages

## Global Constraints

- The production base path, OAuth redirect path, and PWA scope are `/miqi/`.
- The default branch is `main`; the target site is `https://salvatorebgg.github.io/miqi/`.
- Authentication supports email/password and GitHub OAuth.
- All user-owned Supabase tables use `auth.uid()` Row Level Security policies.
- The application remains usable in clearly labeled local experience mode when Supabase is unavailable.
- User actions are local-first; failed synchronization never deletes local work.
- News is normalized into static JSON and partial source failure preserves the previous successful file.
- The interface uses mint-green glass surfaces, audible but restrained synthesized controls, mute, and reduced-motion support.
- External articles are represented by title, short summary, source, date, category, and original URL only.
- Social, payment, teacher administration, real-time chat, and user-authored courses are outside this release.

---

## File Structure

```text
.github/workflows/ci.yml                    Typecheck, unit tests, and production build
.github/workflows/pages.yml                 GitHub Pages deployment
.github/workflows/refresh-news.yml          Scheduled news refresh and commit
e2e/core-flows.spec.ts                      Browser-level critical path tests
public/data/news.json                       Last successful normalized news feed
public/icons/                               PWA icons
scripts/fetch-news.mjs                      RSS fetch, normalize, classify, deduplicate
supabase/migrations/001_initial_schema.sql   Tables, triggers, indexes, and RLS
src/app/App.tsx                             Providers and route tree
src/app/AppShell.tsx                        Responsive navigation and sync chrome
src/app/routes.tsx                          Lazy route definitions
src/components/ui/                          Shared glass cards, buttons, rings, states
src/data/mathCurriculum.ts                  Mathematics tracks, lessons, exercises, resources
src/data/englishContent.ts                  IELTS vocabulary, scenarios, news, paper exercises
src/features/account/AccountPage.tsx        Profile, sound, motion, sync settings
src/features/auth/AuthPage.tsx              Email and GitHub authentication UI
src/features/dashboard/DashboardPage.tsx    Daily learning cockpit
src/features/english/EnglishPage.tsx        IELTS daily practice surface
src/features/english/scheduler.ts            Spaced-repetition scheduling
src/features/games/GamesPage.tsx            Sudoku and maze host
src/features/games/maze.ts                  Perfect-maze generation and movement
src/features/games/sudoku.ts                Puzzle generation and validation
src/features/math/MathPage.tsx              Curriculum overview
src/features/math/LessonPage.tsx            Lesson, exercise, solution, and resources
src/features/news/NewsPage.tsx              Filtered news experience
src/features/news/news.ts                   Feed validation, cache-busting, fallback
src/features/planner/PlannerPage.tsx        Goals, heatmap, tasks, and weak areas
src/features/planner/progress.ts            Progress and streak calculations
src/lib/audio.ts                            Web Audio feedback with mute preference
src/lib/localRepository.ts                  LocalStorage persistence and event queue
src/lib/repository.ts                       Stable user-data repository interface
src/lib/supabase.ts                         Optional Supabase client
src/lib/syncRepository.ts                   Local-first cloud synchronization
src/styles/globals.css                      Tokens, glass layers, flow animation, responsive rules
src/types/domain.ts                         Shared domain and persistence types
src/test/setup.ts                           DOM and storage test setup
```

### Task 1: Application Foundation and Mint Glass Shell

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `index.html`
- Create: `src/main.tsx`, `src/app/App.tsx`, `src/app/AppShell.tsx`, `src/app/routes.tsx`
- Create: `src/styles/globals.css`, `src/test/setup.ts`
- Test: `src/app/AppShell.test.tsx`

**Interfaces:**
- Consumes: none
- Produces: `App`, `AppShell`, hash routes for `/`, `/math`, `/english`, `/news`, `/games`, `/planner`, `/account`, `/auth`

- [ ] **Step 1: Add the toolchain and scripts**

Create `package.json` with scripts `dev`, `build`, `typecheck`, `test`, `test:run`, `test:e2e`, and `news:refresh`. Add React, React Router, Supabase JS, KaTeX, Lucide React, Vite PWA, fast-xml-parser, TypeScript, Vitest, Testing Library, jsdom, and Playwright dependencies. Configure Vite with `base: '/miqi/'`, React, and a PWA manifest named `Miqi Learning`.

- [ ] **Step 2: Write the failing shell test**

```tsx
it('renders the learning cockpit and every primary destination', () => {
  render(<MemoryRouter><AppShell /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: /学习驾驶舱/ })).toBeInTheDocument()
  for (const label of ['数学课堂', 'IELTS 英语', '每日资讯', '脑力游戏', '规划中心']) {
    expect(screen.getByRole('link', { name: new RegExp(label) })).toBeInTheDocument()
  }
})
```

- [ ] **Step 3: Run the shell test and confirm failure**

Run: `npm install && npm run test:run -- src/app/AppShell.test.tsx`  
Expected: FAIL because `AppShell` and the test setup do not exist.

- [ ] **Step 4: Implement the shell and base design system**

```tsx
export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar glass" aria-label="主导航">
        <Link className="brand" to="/">M</Link>
        <nav>{navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}><Icon aria-hidden="true" />{label}</NavLink>
        ))}</nav>
      </aside>
      <main id="main-content"><Outlet /></main>
      <aside className="context-rail glass" aria-label="学习概览"><DailySnapshot /></aside>
      <MobileDock items={navItems} />
    </div>
  )
}
```

Define CSS tokens `--mint-500: #58c99d`, `--mint-300: #9ddfca`, `--mint-100: #dff4ea`, `--ice: #f7fffb`, and `--forest: #315949`. Implement glass borders, layered shadows, visible focus rings, the background flow animation, a 1180px desktop layout, and the mobile dock below 900px. Disable flow animation inside `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 5: Verify the shell**

Run: `npm run typecheck && npm run test:run -- src/app/AppShell.test.tsx && npm run build`  
Expected: all commands exit 0 and `dist/index.html` references `/miqi/assets/`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json index.html src/app src/main.tsx src/styles src/test
git commit -m "Build Miqi application shell"
```

### Task 2: Domain Model and Local-First Repository

**Files:**
- Create: `src/types/domain.ts`, `src/lib/repository.ts`, `src/lib/localRepository.ts`
- Test: `src/lib/localRepository.test.ts`

**Interfaces:**
- Consumes: browser `Storage`
- Produces: `LearningRepository`, `createLocalRepository(storage)`, `DailyTask`, `CourseProgress`, `VocabularyProgress`, `GameSession`, `SavedArticle`, `SyncEvent`

- [ ] **Step 1: Define stable domain contracts**

```ts
export type LearningCategory = 'math' | 'english' | 'reading' | 'game'
export interface DailyTask { id:string; userId:string; date:string; category:LearningCategory; title:string; target:number; completed:number; order:number; updatedAt:string }
export interface CourseProgress { id:string; userId:string; courseId:string; lessonId:string; read:boolean; exerciseScore:number; quizScore:number; updatedAt:string }
export interface VocabularyProgress { id:string; userId:string; wordId:string; familiarity:0|1|2; intervalDays:number; nextReviewAt:string; updatedAt:string }
export interface GameSession { id:string; userId:string; game:'sudoku'|'maze'; difficulty:string; durationSeconds:number; moves:number; score:number; createdAt:string }
export interface ExerciseAttempt { id:string; userId:string; lessonId:string; exerciseId:string; topic:string; correct:boolean; durationSeconds:number; createdAt:string }
export interface ReadingAttempt { id:string; userId:string; materialId:string; kind:'scenario'|'news'|'paper'; correct:number; total:number; durationSeconds:number; summary:string; createdAt:string }
export interface SavedArticle { id:string; userId:string; articleId:string; read:boolean; saved:boolean; updatedAt:string }
export interface SyncEvent { id:string; entity:string; entityId:string; operation:'upsert'|'delete'; payload:unknown; version:number; updatedAt:string }

export interface LearningRepository {
  saveTask(task:DailyTask):Promise<void>; listTasks(date:string):Promise<DailyTask[]>;
  saveCourseProgress(progress:CourseProgress):Promise<void>; listCourseProgress():Promise<CourseProgress[]>;
  saveExerciseAttempt(attempt:ExerciseAttempt):Promise<void>; listExerciseAttempts():Promise<ExerciseAttempt[]>;
  saveVocabulary(progress:VocabularyProgress):Promise<void>; listVocabulary():Promise<VocabularyProgress[]>;
  saveReadingAttempt(attempt:ReadingAttempt):Promise<void>; listReadingAttempts():Promise<ReadingAttempt[]>;
  saveGameSession(session:GameSession):Promise<void>; listGameSessions():Promise<GameSession[]>;
  saveArticle(article:SavedArticle):Promise<void>; listSavedArticles():Promise<SavedArticle[]>;
  pendingEvents():SyncEvent[]; acknowledgeEvents(ids:string[]):void;
}
```

- [ ] **Step 2: Write failing persistence and queue tests**

```ts
it('persists a task and queues an upsert without losing prior events', async () => {
  const repo = createLocalRepository(localStorage)
  await repo.saveTask(task)
  expect(await repo.listTasks('2026-07-18')).toEqual([task])
  expect(repo.pendingEvents()).toMatchObject([{ entity:'daily_tasks', entityId:task.id, operation:'upsert' }])
})
```

- [ ] **Step 3: Confirm the repository test fails**

Run: `npm run test:run -- src/lib/localRepository.test.ts`  
Expected: FAIL because `createLocalRepository` is missing.

- [ ] **Step 4: Implement namespaced persistence and ordered queueing**

```ts
const read = <T>(storage:Storage, key:string, fallback:T):T => {
  try { return JSON.parse(storage.getItem(`miqi:${key}`) ?? '') as T } catch { return fallback }
}
const write = (storage:Storage, key:string, value:unknown) => storage.setItem(`miqi:${key}`, JSON.stringify(value))

export function createLocalRepository(storage:Storage):LearningRepository {
  const enqueue = (event:SyncEvent) => write(storage, 'sync-events', [...read(storage, 'sync-events', []), event])
  return {
    async saveTask(task) {
      const tasks = read<DailyTask[]>(storage, 'tasks', []).filter(item => item.id !== task.id)
      write(storage, 'tasks', [...tasks, task]); enqueue(toUpsert('daily_tasks', task))
    },
    async listTasks(date) { return read<DailyTask[]>(storage, 'tasks', []).filter(task => task.date === date).sort((a,b) => a.order-b.order) },
    pendingEvents() { return read<SyncEvent[]>(storage, 'sync-events', []) },
    acknowledgeEvents(ids) { write(storage, 'sync-events', read<SyncEvent[]>(storage, 'sync-events', []).filter(event => !ids.includes(event.id))) }
  }
}
```

- [ ] **Step 5: Verify local persistence and corrupted-storage recovery**

Run: `npm run test:run -- src/lib/localRepository.test.ts`  
Expected: PASS for save/list, ordered queue, acknowledgement, and malformed JSON fallback cases.

- [ ] **Step 6: Commit**

```bash
git add src/types src/lib/repository.ts src/lib/localRepository*
git commit -m "Add local-first learning repository"
```

### Task 3: Supabase Authentication, Database Security, and Sync

**Files:**
- Create: `src/lib/supabase.ts`, `src/lib/syncRepository.ts`
- Create: `src/features/auth/AuthPage.tsx`, `src/features/account/AccountPage.tsx`
- Create: `supabase/migrations/001_initial_schema.sql`, `.env.example`
- Test: `src/lib/syncRepository.test.ts`, `src/features/auth/AuthPage.test.tsx`

**Interfaces:**
- Consumes: `LearningRepository`, `SyncEvent`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- Produces: `supabase`, `syncPendingEvents(local, client)`, `AuthPage`, `AccountPage`, `SyncStatus`

- [ ] **Step 1: Write failing sync behavior tests**

```ts
it('keeps local events when a cloud upsert fails', async () => {
  cloud.from.mockReturnValue({ upsert: vi.fn().mockResolvedValue({ error:new Error('offline') }) })
  const result = await syncPendingEvents(local, cloud)
  expect(result).toEqual({ status:'failed', synced:0, remaining:1 })
  expect(local.acknowledgeEvents).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Confirm sync tests fail**

Run: `npm run test:run -- src/lib/syncRepository.test.ts src/features/auth/AuthPage.test.tsx`  
Expected: FAIL because sync and authentication modules are missing.

- [ ] **Step 3: Create secure schema and RLS policies**

Create all tables from the approved specification with `user_id uuid not null references auth.users(id) on delete cascade`, stable text IDs, `updated_at timestamptz`, and indexes on `(user_id, updated_at)`. Apply this policy pattern to each user-owned table:

```sql
alter table public.daily_tasks enable row level security;
create policy "users manage own daily tasks" on public.daily_tasks
for all using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
```

Add an `updated_at` trigger and a profile-creation trigger for new authenticated users. Do not create policies granting anonymous reads to user data.

- [ ] **Step 4: Implement optional client and lossless sync**

```ts
export const supabase = url && key ? createClient(url, key, { auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true } }) : null

export async function syncPendingEvents(local:LearningRepository, client:SupabaseClient):Promise<SyncResult> {
  const events = local.pendingEvents()
  const completed:string[] = []
  for (const event of events) {
    const query = event.operation === 'delete'
      ? client.from(event.entity).delete().eq('id', event.entityId)
      : client.from(event.entity).upsert(event.payload)
    const { error } = await query
    if (error) return { status:'failed', synced:completed.length, remaining:events.length-completed.length }
    completed.push(event.id)
  }
  local.acknowledgeEvents(completed)
  return { status:'synced', synced:completed.length, remaining:0 }
}
```

- [ ] **Step 5: Implement email/password and GitHub flows**

Use `signUp`, `signInWithPassword`, `resetPasswordForEmail`, and `signInWithOAuth({ provider:'github', options:{ redirectTo:location.origin + '/miqi/#/' } })`. Render a visible local-mode notice when `supabase` is null. Account settings include sign-out, profile display, sound, motion, and current sync status.

- [ ] **Step 6: Verify auth UI and sync failure safety**

Run: `npm run test:run -- src/lib/syncRepository.test.ts src/features/auth/AuthPage.test.tsx`  
Expected: PASS for local mode, form validation, GitHub invocation, successful event acknowledgement, and failed-event preservation.

- [ ] **Step 7: Commit**

```bash
git add .env.example supabase src/lib/supabase.ts src/lib/syncRepository* src/features/auth src/features/account
git commit -m "Add secure authentication and cloud sync"
```

### Task 4: Progressive Mathematics Curriculum and Exercise Engine

**Files:**
- Create: `src/data/mathCurriculum.ts`
- Create: `src/features/math/MathPage.tsx`, `src/features/math/LessonPage.tsx`, `src/features/math/math.ts`
- Test: `src/features/math/math.test.ts`, `src/features/math/LessonPage.test.tsx`

**Interfaces:**
- Consumes: `CourseProgress`, repository progress methods
- Produces: `mathTracks`, `findLesson(id)`, `gradeExercise(exercise, answer)`, `lessonCompletion(progress)`, mathematics routes

- [ ] **Step 1: Write failing grading and completion tests**

```ts
it('combines reading, exercise, and quiz evidence into completion', () => {
  expect(lessonCompletion({ read:true, exerciseScore:80, quizScore:90 })).toBe(87)
})
it('accepts an equivalent normalized numeric answer', () => {
  expect(gradeExercise({ type:'number', answer:0.5, tolerance:0.001 }, '0.500')).toBe(true)
})
```

- [ ] **Step 2: Confirm the mathematics tests fail**

Run: `npm run test:run -- src/features/math`  
Expected: FAIL because the mathematics engine and pages are missing.

- [ ] **Step 3: Implement the curriculum schema and complete seed curriculum**

```ts
export interface MathLesson {
  id:string; trackId:string; title:string; duration:number; prerequisites:string[]; objectives:string[];
  intuition:string[]; principles:{ title:string; body:string; formula?:string }[];
  examples:{ prompt:string; steps:string[]; answer:string }[];
  exercises:MathExercise[]; quiz:MathExercise[];
  resources:{ title:string; provider:string; url:string; kind:'video'|'article' }[]
}
```

Populate five tracks covering high-school bridge, precalculus, single-variable calculus, multivariable calculus, and linear algebra. Every published lesson contains at least two explanation sections, one worked example, three exercises across two difficulty levels, solution steps, a quiz, and two reputable external resources.

- [ ] **Step 4: Implement grading and completion**

```ts
export const lessonCompletion = ({ read, exerciseScore, quizScore }:CompletionInput) =>
  Math.round((read ? 20 : 0) + exerciseScore * .4 + quizScore * .4)

export function gradeExercise(exercise:MathExercise, raw:string):boolean {
  if (exercise.type === 'number') return Math.abs(Number(raw) - exercise.answer) <= exercise.tolerance
  if (exercise.type === 'choice') return raw === exercise.answer
  return normalize(raw) === normalize(exercise.answer)
}
```

- [ ] **Step 5: Build curriculum and lesson surfaces**

The curriculum page renders track progress, prerequisites, lesson status, and a continue action. The lesson page renders objectives, intuitive explanation, KaTeX formulas, worked examples, expandable answer explanations, exercise feedback, quiz results, and external resources that open safely with `rel="noopener noreferrer"`.

- [ ] **Step 6: Verify content completeness and interaction**

Run: `npm run test:run -- src/features/math`  
Expected: PASS for every lesson content contract, grading variants, completion calculation, locked prerequisites, solution reveal, and resource-link safety.

- [ ] **Step 7: Commit**

```bash
git add src/data/mathCurriculum.ts src/features/math
git commit -m "Add progressive mathematics classroom"
```

### Task 5: IELTS 8–9 Practice System

**Files:**
- Create: `src/data/englishContent.ts`
- Create: `src/features/english/scheduler.ts`, `src/features/english/EnglishPage.tsx`
- Test: `src/features/english/scheduler.test.ts`, `src/features/english/EnglishPage.test.tsx`

**Interfaces:**
- Consumes: `VocabularyProgress`, repository vocabulary and reading methods
- Produces: `scheduleReview(progress, rating, now)`, `getDailyEnglishPlan(date, progress)`, IELTS practice UI

- [ ] **Step 1: Write failing spaced-repetition tests**

```ts
it.each([[0,1],[1,3],[2,7]] as const)('maps familiarity %i to %i day interval', (rating, days) => {
  const next = scheduleReview(baseProgress, rating, new Date('2026-07-18T00:00:00Z'))
  expect(next.intervalDays).toBe(days)
  expect(next.nextReviewAt).toBe(new Date(Date.UTC(2026,6,18+days)).toISOString())
})
```

- [ ] **Step 2: Confirm English tests fail**

Run: `npm run test:run -- src/features/english`  
Expected: FAIL because scheduler and English page are missing.

- [ ] **Step 3: Implement deterministic scheduling and daily plan selection**

```ts
const intervals = { 0:1, 1:3, 2:7 } as const
export function scheduleReview(progress:VocabularyProgress, rating:0|1|2, now:Date):VocabularyProgress {
  const intervalDays = rating === 2 ? Math.min(Math.max(progress.intervalDays * 2, intervals[rating]), 60) : intervals[rating]
  const next = new Date(now); next.setUTCDate(next.getUTCDate() + intervalDays)
  return { ...progress, familiarity:rating, intervalDays, nextReviewAt:next.toISOString(), updatedAt:now.toISOString() }
}
```

- [ ] **Step 4: Add content with IELTS-focused task types**

Include at least 60 academic words with definitions, collocations, examples, and scenario tags; six situational comprehension sets; four news-style reading sets; and four paper-abstract sets. Each reading set includes source attribution where applicable, main-idea, detail, inference, and summary tasks with explanations.

- [ ] **Step 5: Build the English daily workflow**

Render a daily plan with vocabulary review, situation, news reading, and paper reading cards. Ratings update the next review date; answer submission reveals explanations; summary responses persist without claiming automated band scoring. Show weekly vocabulary, accuracy, reading time, and streak metrics.

- [ ] **Step 6: Verify scheduling and daily completion**

Run: `npm run test:run -- src/features/english`  
Expected: PASS for all rating intervals, due-word selection, deterministic daily material, answer explanations, and task completion persistence.

- [ ] **Step 7: Commit**

```bash
git add src/data/englishContent.ts src/features/english
git commit -m "Add IELTS daily practice system"
```

### Task 6: Resilient Multi-Category News Feed

**Files:**
- Create: `scripts/fetch-news.mjs`, `public/data/news.json`
- Create: `src/features/news/news.ts`, `src/features/news/NewsPage.tsx`
- Test: `scripts/fetch-news.test.mjs`, `src/features/news/news.test.ts`

**Interfaces:**
- Consumes: public RSS endpoints and `public/data/news.json`
- Produces: `{ generatedAt:string, stale:boolean, items:NewsItem[], sourceHealth:SourceHealth[] }`, `loadNews(forceRefresh)`

- [ ] **Step 1: Write failing normalization and deduplication tests**

```js
test('deduplicates canonical URLs and keeps the newer item', () => {
  const result = deduplicate([older, { ...older, publishedAt:'2026-07-18T08:00:00Z', title:'Updated' }])
  assert.equal(result.length, 1)
  assert.equal(result[0].title, 'Updated')
})
```

- [ ] **Step 2: Confirm news tests fail**

Run: `node --test scripts/fetch-news.test.mjs && npm run test:run -- src/features/news/news.test.ts`  
Expected: FAIL because feed utilities do not exist.

- [ ] **Step 3: Implement source isolation, normalization, and fallback**

```js
export async function fetchSource(source, fetchImpl=fetch) {
  try {
    const response = await fetchImpl(source.url, { headers:{ 'user-agent':'MiqiLearning/1.0' } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { ok:true, items:normalizeFeed(await response.text(), source), error:null }
  } catch (error) {
    return { ok:false, items:[], error:String(error) }
  }
}
```

Use several independent, reputable RSS sources across AI, finance, sports, academic, and general categories. Strip HTML from summaries, cap summary length, require `https` links, canonicalize tracking parameters, deduplicate by canonical URL and normalized title, and limit the result to 120 newest items. If every source fails, keep the existing JSON and mark it stale instead of replacing it with an empty feed.

- [ ] **Step 4: Implement client loading and filtering**

```ts
export async function loadNews(force=false):Promise<NewsFeed> {
  const suffix = force ? `?v=${Date.now()}` : ''
  const response = await fetch(`${import.meta.env.BASE_URL}data/news.json${suffix}`, { cache:force?'no-store':'default' })
  if (!response.ok) throw new Error(`资讯加载失败（${response.status}）`)
  return NewsFeedSchema.parse(await response.json())
}
```

The page exposes category pills, search, refresh, read/save actions, last updated time, source health, empty/error states, and original links.

- [ ] **Step 5: Verify partial and total failure behavior**

Run: `node --test scripts/fetch-news.test.mjs && npm run test:run -- src/features/news`  
Expected: PASS for canonicalization, deduplication, category assignment, partial source failure, total failure fallback, cache-busting, and search/filter behavior.

- [ ] **Step 6: Generate the initial feed**

Run: `npm run news:refresh`  
Expected: `public/data/news.json` contains a non-empty `items` array, valid `generatedAt`, five categories, and no duplicate canonical URLs. If the development network is unavailable, keep a clearly dated curated starter feed and let the scheduled workflow replace it on first successful run.

- [ ] **Step 7: Commit**

```bash
git add scripts public/data/news.json src/features/news
git commit -m "Add resilient daily news feed"
```

### Task 7: Sudoku and Maze Brain Games

**Files:**
- Create: `src/features/games/sudoku.ts`, `src/features/games/maze.ts`, `src/features/games/GamesPage.tsx`
- Test: `src/features/games/sudoku.test.ts`, `src/features/games/maze.test.ts`, `src/features/games/GamesPage.test.tsx`

**Interfaces:**
- Consumes: repository game-session method
- Produces: `generateSudoku(difficulty, rng)`, `validateSudoku(board)`, `generateMaze(width,height,rng)`, `movePlayer(state,direction)`

- [ ] **Step 1: Write failing game correctness tests**

```ts
it('generates a connected perfect maze', () => {
  const maze = generateMaze(12, 12, seededRandom(42))
  expect(reachableCells(maze)).toBe(144)
  expect(openEdges(maze)).toBe(143)
})
it('recognizes a complete valid Sudoku solution', () => expect(validateSudoku(solvedBoard)).toEqual({ valid:true, complete:true }))
```

- [ ] **Step 2: Confirm game tests fail**

Run: `npm run test:run -- src/features/games`  
Expected: FAIL because both engines are missing.

- [ ] **Step 3: Implement deterministic, valid engines**

Use randomized depth-first search to generate a perfect maze with symmetric walls. Use a shuffled valid Sudoku solution template and remove cells according to difficulty while retaining the solution; validation checks rows, columns, boxes, completeness, and fixed-cell immutability.

```ts
export const difficultyClues = { easy:40, medium:34, hard:28 } as const
export function movePlayer(state:MazeState, direction:Direction):MazeState {
  const wall = directionToWall[direction]
  if (state.maze[state.player.y][state.player.x].walls[wall]) return state
  const player = offset(state.player, direction)
  return { ...state, player, moves:state.moves+1, won:player.x===state.goal.x && player.y===state.goal.y }
}
```

- [ ] **Step 4: Build accessible game interactions**

Sudoku supports keyboard number entry, candidate mode, undo, hint, mistake checking, timer, and restart. Maze supports arrow/WASD keys, swipe, screen direction buttons, timer, steps, and new maze. Winning either game saves one `GameSession` and shows a non-blocking result card.

- [ ] **Step 5: Verify correctness and persistence**

Run: `npm run test:run -- src/features/games`  
Expected: PASS for Sudoku validity, fixed cells, undo and win; maze connectivity, wall symmetry, legal movement, keyboard labels, and single-session persistence.

- [ ] **Step 6: Commit**

```bash
git add src/features/games
git commit -m "Add Sudoku and maze brain games"
```

### Task 8: Dashboard and Planning Intelligence

**Files:**
- Create: `src/features/planner/progress.ts`, `src/features/planner/PlannerPage.tsx`
- Create: `src/features/dashboard/DashboardPage.tsx`
- Test: `src/features/planner/progress.test.ts`, `src/features/dashboard/DashboardPage.test.tsx`

**Interfaces:**
- Consumes: repository tasks/progress/attempts, math and English content, news feed
- Produces: `calculateStreak(days, today)`, `aggregateWeakAreas(attempts)`, `buildDailyPlan(context)`, dashboard and planner pages

- [ ] **Step 1: Write failing planning tests**

```ts
it('counts a streak ending today across date boundaries', () => {
  expect(calculateStreak(['2026-07-16','2026-07-17','2026-07-18'], '2026-07-18')).toBe(3)
})
it('ranks weak areas by errors weighted toward recent attempts', () => {
  expect(aggregateWeakAreas(attempts)[0]).toMatchObject({ topic:'limits' })
})
```

- [ ] **Step 2: Confirm planning tests fail**

Run: `npm run test:run -- src/features/planner src/features/dashboard`  
Expected: FAIL because progress helpers and pages are missing.

- [ ] **Step 3: Implement deterministic progress analytics**

```ts
export function calculateStreak(activeDates:string[], today:string):number {
  const dates = new Set(activeDates); let cursor = new Date(`${today}T00:00:00Z`); let streak = 0
  while (dates.has(cursor.toISOString().slice(0,10))) { streak++; cursor.setUTCDate(cursor.getUTCDate()-1) }
  return streak
}
```

`buildDailyPlan` selects one current mathematics lesson, due vocabulary, one reading task, and an optional brain break. It never creates duplicate tasks for the same user/date/category/content ID.

- [ ] **Step 4: Build the learning cockpit**

Render greeting, streak, a dominant “today’s focus” mathematics card, compact English/review/reading cards, completion ring, fresh-news preview, brain-break card, weekly goal, sync state, and continue actions. Use skeletons while loading and meaningful empty states in local mode.

- [ ] **Step 5: Build the planner**

Render reorderable daily tasks, weekly target, course path, 12-week heatmap, category completion, recent accuracy, and weak-area cards. Task edits persist immediately through `LearningRepository`.

- [ ] **Step 6: Verify analytics and cockpit behavior**

Run: `npm run test:run -- src/features/planner src/features/dashboard`  
Expected: PASS for streak edge cases, weak-area ordering, duplicate prevention, task completion, local-mode state, and all primary dashboard links.

- [ ] **Step 7: Commit**

```bash
git add src/features/planner src/features/dashboard
git commit -m "Add learning cockpit and planning insights"
```

### Task 9: Sound, PWA, Accessibility, and Responsive Polish

**Files:**
- Create: `src/lib/audio.ts`, `src/components/ui/SoundToggle.tsx`, `src/components/ui/SyncBadge.tsx`
- Modify: `src/app/AppShell.tsx`, `src/styles/globals.css`, `vite.config.ts`
- Create: `public/icons/icon-192.svg`, `public/icons/icon-512.svg`
- Test: `src/lib/audio.test.ts`, `src/app/accessibility.test.tsx`

**Interfaces:**
- Consumes: account preferences
- Produces: `playControlTone(kind)`, `setMuted(value)`, installable PWA, reduced-motion and responsive behavior

- [ ] **Step 1: Write failing audio preference tests**

```ts
it('does not create an oscillator when muted', () => {
  setMuted(true); playControlTone('tap')
  expect(audioContext.createOscillator).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Confirm polish tests fail**

Run: `npm run test:run -- src/lib/audio.test.ts src/app/accessibility.test.tsx`  
Expected: FAIL because audio controls and accessibility assertions are missing.

- [ ] **Step 3: Implement restrained synthesized sound**

```ts
export function playControlTone(kind:'tap'|'success'|'error') {
  if (muted || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const ctx = context(); const osc = ctx.createOscillator(); const gain = ctx.createGain()
  osc.frequency.value = kind==='success' ? 620 : kind==='error' ? 190 : 420
  gain.gain.setValueAtTime(.025, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime+.08)
  osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+.08)
}
```

- [ ] **Step 4: Complete PWA and accessible interaction states**

Add the manifest, theme color `#dff4ea`, SVG maskable icons, offline app-shell caching, skip link, semantic landmarks, 44px minimum touch targets, keyboard-visible focus, `aria-live` status regions, contrast-safe text, and reduced-motion overrides. Sound starts only after a user interaction and every sound-producing action has an equivalent visual state.

- [ ] **Step 5: Verify accessibility and production assets**

Run: `npm run test:run -- src/lib/audio.test.ts src/app/accessibility.test.tsx && npm run build`  
Expected: PASS and `dist/manifest.webmanifest`, service worker, icons, and `/miqi/` asset paths exist.

- [ ] **Step 6: Commit**

```bash
git add src/lib/audio* src/components/ui src/app/AppShell.tsx src/styles/globals.css vite.config.ts public/icons
git commit -m "Polish Miqi interaction and accessibility"
```

### Task 10: CI, Scheduled Refresh, End-to-End Checks, and Documentation

**Files:**
- Create: `.github/workflows/ci.yml`, `.github/workflows/pages.yml`, `.github/workflows/refresh-news.yml`
- Create: `playwright.config.ts`, `e2e/core-flows.spec.ts`
- Create: `README.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: all app scripts and production build
- Produces: CI status, deployed Pages URL, scheduled feed refresh, operator setup guide

- [ ] **Step 1: Write critical browser flows**

```ts
test('local-mode learner can finish a math exercise and see progress', async ({ page }) => {
  await page.goto('/miqi/#/math')
  await page.getByRole('link', { name:/函数与图像/ }).click()
  await page.getByLabel(/答案/).fill('2')
  await page.getByRole('button', { name:'提交答案' }).click()
  await expect(page.getByText('回答正确')).toBeVisible()
  await expect(page.getByText(/本节进度/)).toBeVisible()
})
```

Add flows for local-mode notice, English rating, news filtering/refresh, Sudoku input, maze keyboard movement, mute, reduced motion, and a 390px mobile navigation viewport.

- [ ] **Step 2: Run E2E and observe missing production wiring**

Run: `npx playwright install chromium && npm run test:e2e`  
Expected: FAIL until the web server, routes, and selectors are wired consistently.

- [ ] **Step 3: Add continuous integration and Pages workflows**

`ci.yml` runs on pushes and pull requests with Node 22, `npm ci`, typecheck, unit tests, and build. `pages.yml` runs after CI on `main`, uses `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4`, and `actions/deploy-pages@v4`, with `pages: write` and `id-token: write`. It injects `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from repository variables.

- [ ] **Step 4: Add scheduled refresh workflow**

Run at Beijing 00:15, 06:15, 12:15, and 18:15 using UTC cron values `15 16,22,4,10 * * *`; also support `workflow_dispatch`. Run `npm ci`, `npm run news:refresh`, validate JSON, and commit only when the feed changed. Grant `contents: write` only to this workflow.

- [ ] **Step 5: Document local, Supabase, OAuth, and deployment setup**

README includes exact commands, architecture, local experience behavior, environment variable names, SQL migration command, Supabase site/redirect URLs, GitHub OAuth callback construction, GitHub repository variables, Pages configuration, refresh schedule, testing commands, data-source behavior, and accessibility controls. Never show a service-role key in client configuration.

- [ ] **Step 6: Run the full release gate**

Run: `npm run typecheck && npm run test:run && npm run build && npm run test:e2e`  
Expected: every command exits 0; production build contains no service-role key; all critical flows pass in Chromium.

- [ ] **Step 7: Commit**

```bash
git add .github playwright.config.ts e2e README.md .gitignore
git commit -m "Automate Miqi testing and deployment"
```

### Task 11: Remote Publication and Live Verification

**Files:**
- Modify only if verification exposes a defect in an already listed file

**Interfaces:**
- Consumes: clean `main`, GitHub repository access, optional Supabase project configuration
- Produces: public repository, successful Actions deployment, verified live URL

- [ ] **Step 1: Confirm the local release state**

Run: `git status --short --branch && git log --oneline --decorate -12`  
Expected: clean `main` with the design, plan, and implementation commits.

- [ ] **Step 2: Push the repository**

Run: `git push -u origin main`  
Expected: `main` appears at `https://github.com/Salvatorebgg/miqi`.

- [ ] **Step 3: Observe Actions and Pages**

Use GitHub Actions status to confirm CI and Pages deployment complete successfully. If Pages is not enabled for GitHub Actions, enable the GitHub Pages build source once and re-run `pages.yml`.

- [ ] **Step 4: Verify the public site**

Check `https://salvatorebgg.github.io/miqi/`, `/miqi/data/news.json`, hashed assets, hash routes, desktop and mobile layout, manual refresh, and local-mode fallback. Confirm the deployed commit SHA matches local `main`.

- [ ] **Step 5: Verify cloud authentication when credentials are available**

Register a test account, confirm email, sign out/in, complete one task, open a second browser session, and confirm synchronized progress. Test GitHub OAuth redirect and sign-out. If Supabase credentials are not yet supplied, report the precise remaining console configuration without claiming cloud login is live.

- [ ] **Step 6: Record release evidence**

Add the live URL and deployment badge to README only if missing, commit that exact documentation change, push, and recheck Pages. Preserve command output or Actions links used to support the final completion report.

## Self-Review Coverage Map

- Product scope and exclusions: Global Constraints, Tasks 1–10
- Learning cockpit and planning: Task 8
- Progressive mathematics and required lesson anatomy: Task 4
- IELTS vocabulary, scenarios, news, and paper reading: Task 5
- Multi-category scheduled news with resilient fallback: Tasks 6 and 10
- Sudoku and maze: Task 7
- Email/password, GitHub OAuth, RLS, local-first sync: Tasks 2 and 3
- Mint glass visual system, sound, motion, mobile, accessibility: Tasks 1 and 9
- Unit, browser, build, deploy, and live verification: Tasks 1–11
- Supabase and OAuth operational boundary: Tasks 3, 10, and 11
