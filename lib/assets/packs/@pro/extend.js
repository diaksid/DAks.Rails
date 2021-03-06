(function (Pro) {
  Pro.assign({
    scroll: function (options = {}, callback) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      } else if (typeof options === 'string') {
        options = { selector: options }
      }
      new Pro(options.selector || '[data-scroll]')
        .deactive()
        .onclick(function () {
          let selector = this.dataset.scroll || this.getAttribute('href')
          if (selector &&
            !this.classList.contains('is-active') &&
            !this.parentNode.classList.contains('is-active')) {
            selector === '#' ? Pro.totop(options, callback) : Pro.toobj(selector, options, callback)
          }
        })
      return this
    }
  })

  Pro.assign({
    deactive: function () {
      return this.onclick((event) => {
        event.preventDefault()
        event.stopPropagation()
        return false
      })
    }
  }, true)
}).call(this, Pro)
