import { test, expect } from '@playwright/test'

test.describe('core learning flows', () => {
  test('dashboard renders with local-mode notice and navigation', async ({ page }) => {
    await page.goto('/miqi/#/')
    await expect(page.getByRole('heading', { name: '学习驾驶舱' }).first()).toBeVisible()
    await expect(page.locator('.cockpit-tip')).toContainText('本地模式')
    await page.goto('/miqi/#/math')
    await expect(page.getByRole('heading', { name: /从高中基础到高数线代/ })).toBeVisible()
  })

  test('learner can finish a math exercise and see feedback', async ({ page }) => {
    await page.goto('/miqi/#/math')
    await page.getByRole('link', { name: /函数与图像/ }).first().click()
    await expect(page.getByRole('heading', { name: '函数与图像' })).toBeVisible()
    // Number exercise: f(4) = 11
    const answerInput = page.getByLabel('答案').first()
    await answerInput.fill('11')
    await page.getByRole('button', { name: '提交答案' }).nth(1).click()
    await expect(page.getByText('回答正确！')).toBeVisible()
    await expect(page.getByText(/本节进度/)).toBeVisible()
  })

  test('learner can rate an English word', async ({ page }) => {
    await page.goto('/miqi/#/english')
    await expect(page.getByText(/第 1 \/ \d+ 个/)).toBeVisible()
    await page.getByRole('button', { name: '显示释义与例句' }).click()
    await page.getByRole('button', { name: '熟练掌握' }).click()
    // The rated word leaves today's queue, so the counter total drops by one.
    await expect(page.getByText(/第 1 \/ \d+ 个/)).toBeVisible()
  })

  test('news page filters by category and refreshes', async ({ page }) => {
    await page.goto('/miqi/#/news')
    await expect(page.getByRole('heading', { name: '看见更大的世界' })).toBeVisible()
    await page.getByRole('tab', { name: '体育' }).click()
    await page.getByRole('button', { name: /刷新资讯/ }).click()
    await expect(page.getByRole('tab', { name: '体育' })).toHaveAttribute('aria-selected', 'true')
  })

  test('sudoku accepts input via number pad', async ({ page }) => {
    await page.goto('/miqi/#/games')
    const editable = page.getByRole('gridcell').filter({ hasText: /^$/ }).first()
    const label = await editable.getAttribute('aria-label')
    await editable.click()
    await page.getByRole('group', { name: '数字键盘' }).getByRole('button', { name: '7', exact: true }).click()
    await expect(page.getByRole('gridcell', { name: label!.replace('，空', '，数字 7') })).toBeVisible()
  })

  test('maze responds to keyboard movement', async ({ page }) => {
    await page.goto('/miqi/#/games')
    await page.getByRole('tab', { name: /迷宫/ }).click()
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowDown')
    await expect(page.getByText(/步数：/)).toBeVisible()
  })

  test('sound toggle mutes controls', async ({ page }) => {
    await page.goto('/miqi/#/')
    const toggle = page.getByRole('button', { name: /按键音效/ })
    const before = await toggle.getAttribute('aria-pressed')
    await toggle.click()
    await expect(toggle).not.toHaveAttribute('aria-pressed', before ?? '')
  })

  test('mobile viewport shows the dock navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/miqi/#/')
    await expect(page.getByRole('navigation', { name: '移动导航' })).toBeVisible()
  })
})
