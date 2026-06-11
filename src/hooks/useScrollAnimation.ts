import { useEffect, useRef } from 'react'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {},
) {
  const ref = useRef<T>(null)
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('in-view')
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}

export function useScrollAnimationGroup<T extends HTMLElement>(
  options: ScrollAnimationOptions = {},
) {
  const ref = useRef<T>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', once = true } = options

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = container.querySelectorAll('.animate-fade-up, .animate-fade-in')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('in-view')
          }
        })
      },
      { threshold, rootMargin },
    )

    children.forEach((child) => {
      // Reveal anything already in the viewport synchronously, so content is
      // never stuck invisible if the observer's first async callback is missed.
      const rect = child.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) child.classList.add('in-view')
      observer.observe(child)
    })
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
