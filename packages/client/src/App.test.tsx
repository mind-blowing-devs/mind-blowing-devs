// @ts-expect-error - глобальный fetch не определен в типах для тестов, но нам нужно его замокать
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  expect(1).toBeDefined()
})
