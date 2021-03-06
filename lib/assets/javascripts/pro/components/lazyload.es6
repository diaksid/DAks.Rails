((window, document, Pro) => {

    class Lazy {
        constructor(el, options) {
            this.el = el;
            this.options = options;
            this.obj = new Pro(this.el).on('lazyload', this.appear.bind(this));
            this.opacity = this.el.dataset[`${this.options.attribute}Opacity`] || 1;
            this.appearance = this.opacity
                * Pro.animation.delay
                / (this.el.dataset[`${this.options.attribute}Duration`] || this.options.duration);
            this.delay = this.el.dataset[`${ this.options.attribute }Delay`] || this.options.delay
        }

        appear() {
            const res = !this.above() && !this.below() && !this.right() && !this.left();
            if (res) {
                if (typeof this.options.before === 'function') {
                    this.options.before.call(this.el)
                }
                this.loader();
                this.obj.off('lazyload', this.appear)
            }
            return res
        }

        loader() {
            const data = this.el.dataset[this.options.attribute];
            if (this.options.mask) {
                if (this.el.tagName === 'IMG') {
                    this.el.src = this.options.mask
                } else {
                    this.el.style.backgroundImage = `url("${this.options.mask}")`
                }
            }
            let img = new Image();
            img.onload = () => {
                this.el.style.opacity = 0;
                if (this.el.tagName === 'IMG') {
                    this.el.src = data
                } else {
                    this.el.style.backgroundImage = `url(${data})`
                }
                if (this.delay >= Pro.animation.delay) {
                    Pro.animation.request(this.wait.bind(this))
                } else {
                    Pro.animation.request(this.animate.bind(this))
                }
            };
            img.src = data;
            return this
        }

        above() {
            const val = this.options.scope ?
                this.options.scope.offset().top
                :
                window.pageYOffset;
            return val >= this.obj.outerHeight() + this.obj.offset().top + this.options.threshold
        }

        below() {
            const val = this.options.scope ?
                this.options.scope.innerHeight() + this.options.scope.offset().top
                :
                window.innerHeight + window.pageYOffset;
            return val <= this.obj.offset().top - this.options.threshold
        }

        right() {
            const val = this.options.scope ?
                this.options.scope.innerWidth() + this.options.scope.offset().left
                :
                window.innerWidth + window.pageXOffset;
            return val <= this.obj.offset().left - this.options.threshold
        }

        left() {
            const val = this.options.scope ?
                this.options.scope.offset().left
                :
                window.pageXOffset;
            return val >= this.obj.outerWidth() + this.obj.offset().left + this.options.threshold
        }

        wait() {
            this.delay -= Pro.animation.delay;
            if (this.delay >= Pro.animation.delay) {
                Pro.animation.request(this.wait.bind(this))
            } else {
                Pro.animation.request(this.animate.bind(this))
            }
            return this
        }

        animate () {
            this.el.style.opacity = parseFloat(this.el.style.opacity) + this.appearance;
            if (this.opacity - this.el.style.opacity >= this.appearance) {
                Pro.animation.request(this.animate.bind(this))
            } else {
                this.el.style.opacity = this.opacity;
                if (typeof this.options.after === 'function') {
                    this.options.after.call(this.el)
                }

            }
            return this
        }
    }


    class Lazyload {
        constructor(selector, options) {
            if (Pro.isObject(selector)) {
                options = selector;
                selector = null
            }
            this.options = Object.assign({}, {
                scope: null,
                threshold: 0,
                attribute: 'lazy',
                event: 'scroll',
                duration: Pro.animation.duration,
                delay: 0,
                before: null,
                after: null,
                mask: "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23ccc' fill-opacity='.2' height='100%' width='100%'/%3E%3C/svg%3E"
            }, options);
            this.options.scope = Pro.to(this.options.scope);
            this.container = Pro.to(selector);
            this.target = new Pro(`[data-${this.options.attribute}]`, this.container);
            this.items = [];
            this.target.each(item => {
                item = new Lazy(item, this.options);
                if (!item.appear()) {
                    this.items.push(item)
                }
            });
            if (this.items.length) {
                if (this.container) {
                    this.container.on(this.options.event, this.update.bind(this))
                } else {
                    window.addEventListener(this.options.event, this.update.bind(this))
                }
                window.addEventListener('resize', this.update.bind(this));
                document.addEventListener('turbolinks:before-cache', this.reset.bind(this))
            } else {
                delete this
            }
        }

        update() {
            let counter = 0;
            this.items.forEach((item, idx) => {
                if (item.appear()) {
                    delete this.items[idx]
                } else {
                    counter++
                }
            });
            if (!counter) {
                if (this.container) {
                    this.container.off(this.options.event, this.update)
                } else {
                    window.removeEventListener(this.options.event, this.update)
                }
                window.removeEventListener('resize', this.update)
            }
            return this
        }

        reset() {
            this.target.each(item => {
                if (item.tagName === 'IMG') {
                    item.src = this.options.mask
                } else {
                    item.style.backgroundImage = `url("${this.options.mask}")`
                }
            })
        }

    }


    Pro.lazyload = function (selector, options) {
        new Lazyload(selector, options);
        return this
    }
})(window, document, Pro);
