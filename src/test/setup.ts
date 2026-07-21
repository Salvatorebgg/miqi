import '@testing-library/jest-dom/vitest'

// jsdom does not implement HTMLCanvasElement.getContext — stub it so the
// interactive math graph renders without crashing in the test environment.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => null
}
