import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { MessagePlugin } from 'tdesign-vue-next'

// user alova instance
export const alovaInstance = createAlova({
  baseURL: '/api',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  async responded(response, method) {
    if (response.status >= 400) {
      const res = await response.json()
      MessagePlugin.error({ placement: 'top-right', content: res.detail })
      throw new Error(res.detail)
    }
    const res = await response.json()
    MessagePlugin.success({ placement: 'top-right', content: res.message })
    return res.data
  },
})