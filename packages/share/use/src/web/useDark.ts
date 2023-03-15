import {
  useDark as vueUseDark,
  useToggle,
  usePreferredDark,
} from '@vueuse/core'

export const isDark = vueUseDark({
  selector: 'html',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})

export const toggleDark = useToggle(isDark)

export function useDark() {
  return { isDark, toggleDark }
}

export { usePreferredDark }
