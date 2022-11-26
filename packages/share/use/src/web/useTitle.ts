import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { watch, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useTitle as vueUseTitle } from '@vueuse/core'

/**
 * 监听页面变化和动态改变网站标题
 */
export const useTitle = (
  title: string,
  preventHandler: (
    route: RouteLocationNormalizedLoaded,
  ) => Promise<boolean> | boolean,
) => {
  const { currentRoute } = useRouter()

  const pageTitle = vueUseTitle()

  watch(
    [() => currentRoute.value.path],
    async () => {
      const route = unref(currentRoute)

      if (!preventHandler(route)) {
        return
      }

      const tTitle = route?.meta?.title ?? ''
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
    },
    { immediate: true },
  )
}
