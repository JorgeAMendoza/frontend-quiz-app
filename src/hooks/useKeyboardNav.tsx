import { useEffect, useRef } from 'react'

export const useKeyboardNav = (
  selectRange: string,
  firstElementID?: string,
  secondElementID?: string,
) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targetDOM = ref.current
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetItems = Array.from(
        targetDOM?.querySelectorAll(selectRange) as NodeListOf<HTMLElement>,
      )
      const firstElement = firstElementID
        ? document.getElementById(firstElementID)
        : null
      const secondElement = secondElementID
        ? document.getElementById(secondElementID)
        : null
      const list = [...targetItems]

      if (firstElement && firstElement !== list[0]) list.unshift(firstElement)
      if (secondElement && secondElement !== list[list.length - 1])
        list.push(secondElement)

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight': {
          e.preventDefault()
          const focusedElement = e.target as HTMLElement
          const currentIndex = list.indexOf(focusedElement)
          if (currentIndex === 0) list[list.length - 1].focus()
          else list[currentIndex - 1].focus()
          break
        }
        case 'ArrowDown':
        case 'ArrowLeft': {
          e.preventDefault()
          const focusedElement = e.target as HTMLElement
          const currentIndex = list.indexOf(focusedElement)
          if (currentIndex === list.length - 1) list[0].focus()
          else list[currentIndex + 1].focus()
          break
        }
        default: {
          break
        }
      }
    }

    targetDOM?.addEventListener('keydown', handleKeyDown)
    return () => {
      targetDOM?.removeEventListener('keydown', handleKeyDown)
    }
  })
  return ref
}
