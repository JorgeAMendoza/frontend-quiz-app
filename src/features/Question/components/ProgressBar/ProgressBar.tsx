import { useTestData } from '@/routes/Test/context/useTestData'
import { useEffect, useRef } from 'react'
import style from './progress-bar.module.css'

export const ProgressBar = () => {
  const { testData } = useTestData()
  const refBar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refBar.current) {
      const scale = (
        testData.answerSheet.filter((x) => x !== null).length /
        testData.questions.length
      ).toFixed(2)
      refBar.current.style.transform = `scaleX(${scale})`
    }
  }, [testData])

  return (
    <div className={style.progressBar}>
      <div ref={refBar}></div>
    </div>
  )
}
