import testData from '@assets/data.json'

export function rootLoader() {
  const quizNames = testData.quizzes.map((quiz) => quiz.title)
  return { quizNames }
}

export type LoaderReturn = ReturnType<typeof rootLoader>
