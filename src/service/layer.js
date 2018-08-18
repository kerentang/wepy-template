/**
 * 封装弹窗服务
 * @module service/layer
 * @author bigfact
 */

import wepy from 'wepy'

// 导出默认对象
export default {
  /**
   * loading
   */
  loading(content, options = {}) {
    wepy.showLoading({
      title: content || '加载中...',
      mask: options.mask || true
    })
  },
  /**
   * 简单提示
   */
  tip(content, options = {}) {
    wepy.showToast({
      title: content,
      icon: options.icon || 'none',
      image: options.icon || null,
      duration: options.duration || 1500,
      mask: options.mask || false
    })
  },
  /**
   * 弹窗提示
   */
  warning(content, options = {}) {
    wepy.showModal({
      title: options.title || '提示',
      content: content,
      showCancel: false,
      confirmText: options.confirmText || '确定',
      confirmColor: '#ff6300',
      success: options.success || undefined
    })
  },
  /**
   * message 提示
   */
  message(content, options = {}) {
    wepy
      .showModal({
        title: options.title || '提示',
        content: content,
        cancelText: options.cancelText || '取消',
        cancelColor: '#333333',
        confirmText: options.confirmText || '确定',
        confirmColor: '#ff6300'
      })
      .then(res => {
        if (res.confirm) {
          typeof options.success === 'function' && options.success()
        } else if (res.cancel) {
          typeof options.fail === 'function' && options.fail()
        }
      })
  },
  /**
   * 关闭弹窗
   */
  close() {
    wepy.hideLoading()
  }
}
