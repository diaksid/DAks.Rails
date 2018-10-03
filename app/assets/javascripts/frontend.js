(function (window, document, MDC, Pro) {
  var turbo = window.Turbolinks !== null
  if (turbo && navigator.userAgent.match(/Firefox\/(\d+)\./)) {
    window.Turbolinks.supported = false
  }

  function ready () {
    var drawer = MDC.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'))
    MDC.list.MDCList.attachTo(document.querySelector('.mdc-list')) // list.wrapFocus = true;
    var topAppBar = MDC.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'))
    topAppBar.listen('MDCTopAppBar:nav', function () {
      drawer.open = !drawer.open
    })
    // document.querySelectorAll('.mdc-ripple-surface').forEach(function (el) {
    new Pro('.mdc-ripple-surface').each(function (el) {
      (MDC.ripple.MDCRipple.attachTo(el)).unbounded = true
    })

    new Pro('.is-active, .is-active > a, a[href="#"]').deactive()
    Pro
      .lazyload()
      .lightbox('[data-lightbox]')
      .scroll()
  }

  function load () {
  }

  Pro
    .onready(ready)
    .onload(load)

  if (turbo) {
    document.addEventListener('turbolinks:visit', function () {
      turbo = 'visit'
    })
    document.addEventListener('turbolinks:load', function () {
      if (turbo === 'visit') {
        ready()
        load()
      }
    })
    // document.addEventListener('turbolinks:before-cache', function () {})
  }
}).call(this, window, document, MDC, Pro)
