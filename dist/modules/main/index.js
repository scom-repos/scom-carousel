var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@carousel/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = components_1.Styles.style({
        $nest: {
            'i-carousel-slider.--indicators .dots-pagination': {
                display: 'flex',
                position: 'absolute',
                width: '100%',
                justifyContent: 'flex-end',
                gap: '0.5rem',
                bottom: '1.75rem',
                paddingRight: '1.75rem',
                $nest: {
                    'li > span': {
                        display: 'inline-block',
                        height: 4,
                        width: 24,
                        transition: 'all 0.2s ease 0s',
                        borderRadius: '9999px',
                        minHeight: 0,
                        minWidth: 0,
                        border: `1px solid ${components_1.Styles.Theme.ThemeVars.colors.primary.main}`
                    }
                }
            },
            'i-carousel-slider .dots-pagination': {
                display: 'none'
            },
            '.--carousel-item > img': {
                width: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                // borderRadius: 13
            },
            '.--button-wrap:hover': {
                $nest: {
                    '.--arrow-button:not(.disabled)': {
                        boxShadow: 'none',
                        display: 'flex !important',
                        background: '#fff !important',
                        borderRadius: '50%',
                        $nest: {
                            '> i-icon': {
                                visibility: 'visible'
                            }
                        }
                    }
                }
            },
            '.--arrow-button': {
                boxShadow: 'none',
                $nest: {
                    '& > span': {
                        display: 'none'
                    },
                    '& > i-icon': {
                        visibility: 'hidden'
                    }
                }
            },
        }
    });
});
define("@carousel/main/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pointerStyle = exports.uploadStyle = exports.textareaStyle = void 0;
    exports.textareaStyle = components_2.Styles.style({
        $nest: {
            'textarea': {
                border: 'none',
                outline: 'none'
            }
        }
    });
    exports.uploadStyle = components_2.Styles.style({
        $nest: {
            '.i-upload_preview-img': {
                maxHeight: '100%',
                display: 'block'
            },
            '.i-upload-wrapper': {
                maxHeight: 'inherit',
                overflow: 'hidden'
            }
        }
    });
    exports.pointerStyle = components_2.Styles.style({
        cursor: 'pointer'
    });
});
define("@carousel/main/config.tsx", ["require", "exports", "@ijstech/components", "@carousel/main/config.css.ts"], function (require, exports, components_3, config_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Config = class Config extends components_3.Module {
        constructor() {
            super(...arguments);
            this.itemMap = new Map();
            this._itemList = [];
        }
        get data() {
            const _data = {
                autoplay: this.checkAutoplay.checked,
                controls: this.checkControls.checked,
                indicators: this.checkIndicators.checked,
                swipe: this.checkSwipe.checked,
                data: this.itemList || []
            };
            return _data;
        }
        set data(config) {
            this.checkAutoplay.checked = config.autoplay;
            this.checkControls.checked = config.controls;
            this.checkIndicators.checked = config.indicators;
            this.checkSwipe.checked = config.swipe;
            this.itemList = config.data || [];
            this.listStack.clearInnerHTML();
            this.itemMap = new Map();
            this._itemList.forEach(item => {
                this.addItem(item);
            });
        }
        get itemList() {
            return Array.from(this.itemMap).map(item => item[1]);
        }
        set itemList(data) {
            this._itemList = data;
        }
        addItem(item) {
            const lastIndex = this.itemList.length;
            const uploadElm = (this.$render("i-upload", { maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, fileList: (item === null || item === void 0 ? void 0 : item.file) ? [item.file] : [], onChanged: (source, files) => this.updateList(source, lastIndex, 'image', files), onRemoved: () => this.onRemovedImage(lastIndex) }));
            const itemElm = (this.$render("i-vstack", { gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, border: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }, position: "relative" },
                this.$render("i-icon", { name: "times", fill: "red", width: 20, height: 20, position: "absolute", top: 10, right: 10, class: config_css_1.pointerStyle, onClick: (source) => this.deleteItem(itemElm, lastIndex) }),
                this.$render("i-hstack", null,
                    this.$render("i-label", { caption: "Name" }),
                    this.$render("i-label", { caption: "*", font: { color: 'red' }, margin: { left: '4px' } }),
                    this.$render("i-label", { caption: ":" })),
                this.$render("i-input", { width: "100%", value: (item === null || item === void 0 ? void 0 : item.title) || '', onChanged: (source) => this.updateList(source, lastIndex, 'title') }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea', value: (item === null || item === void 0 ? void 0 : item.description) || '', onChanged: (source) => this.updateList(source, lastIndex, 'description') }),
                this.$render("i-hstack", null,
                    this.$render("i-label", { caption: "Image" }),
                    this.$render("i-label", { caption: "*", font: { color: 'red' }, margin: { left: '4px' } }),
                    this.$render("i-label", { caption: ":" })),
                this.$render("i-panel", null, uploadElm)));
            if (item === null || item === void 0 ? void 0 : item.image)
                uploadElm.preview(item === null || item === void 0 ? void 0 : item.image);
            this.listStack.appendChild(itemElm);
            this.itemMap.set(lastIndex, item || { title: '', description: '' });
        }
        deleteItem(source, index) {
            if (this.itemMap.has(index)) {
                source.remove();
                this.itemMap.delete(index);
            }
        }
        onRemovedImage(index) {
            if (this.itemMap.has(index)) {
                const item = this.itemMap.get(index);
                delete item.image;
                item.file = undefined;
                this.itemMap.set(index, item);
            }
        }
        async updateList(source, index, prop, files) {
            const item = this.itemMap.get(index);
            if (prop === 'image') {
                const uploadElm = source;
                item.image = files ? await uploadElm.toBase64(files[0]) : '';
                item.file = files[0];
            }
            else {
                item[prop] = source.value;
            }
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-checkbox", { id: "checkAutoplay", caption: "Autoplay?" }),
                this.$render("i-checkbox", { id: "checkControls", caption: "Controls?" }),
                this.$render("i-checkbox", { id: "checkIndicators", caption: "Indicators?" }),
                this.$render("i-checkbox", { id: "checkSwipe", caption: "Swipe?" }),
                this.$render("i-panel", null,
                    this.$render("i-button", { caption: "Add Item", padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, onClick: () => this.addItem() })),
                this.$render("i-vstack", { id: "listStack", gap: "0.5rem" })));
        }
    };
    Config = __decorate([
        components_3.customModule,
        components_3.customElements("pageblock-slideshow-config")
    ], Config);
    exports.default = Config;
});
define("@carousel/main", ["require", "exports", "@ijstech/components", "@carousel/main/index.css.ts", "@carousel/main/config.tsx"], function (require, exports, components_4, index_css_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    exports.Config = config_1.default;
    let Module1 = class Module1 extends components_4.Module {
        constructor() {
            super(...arguments);
            this._data = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.carouselConfig.data = data;
            this.updateCarousel();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        async edit() {
            this.carouselConfig.data = this._data;
            this.pnlCarousel.visible = false;
            this.carouselConfig.visible = true;
        }
        validate() {
            var _a;
            const dataList = ((_a = this.carouselConfig.data) === null || _a === void 0 ? void 0 : _a.data) || [];
            if (dataList.length < 1)
                return false;
            const emptyProp = dataList.find(item => !item.title || !item.image);
            return !emptyProp;
        }
        async confirm() {
            this._data = this.carouselConfig.data;
            this.pnlCarousel.visible = true;
            this.carouselConfig.visible = false;
            this.updateCarousel();
        }
        async discard() {
            this.pnlCarousel.visible = true;
            this.carouselConfig.visible = false;
        }
        async config() { }
        updateCarousel() {
            this.isSwiping = false;
            this.carouselSlider.autoplay = this._data.autoplay;
            this.carouselSlider.swipe = this._data.swipe;
            this.btnPrev.visible = this._data.controls;
            this.btnNext.visible = this._data.controls;
            if (this._data.controls) {
                this.btnNext.classList.add('--arrow-button');
                this.btnPrev.classList.add('--arrow-button');
            }
            else {
                this.btnNext.classList.remove('--arrow-button');
                this.btnPrev.classList.remove('--arrow-button');
            }
            if (this._data.indicators)
                this.carouselSlider.classList.add("--indicators");
            else
                this.carouselSlider.classList.remove("--indicators");
            this.carouselSlider.items = (this._data.data || []).map(item => ({
                name: item.title,
                controls: [
                    this.$render("i-image", { display: 'block', class: `--carousel-item`, width: "100%", padding: { left: '0.5em', right: '0.5em' }, url: item.image }),
                    this.$render("i-vstack", { gap: item.description ? '0.75rem' : '0rem', padding: { left: '2rem' }, position: "absolute", bottom: "1.75rem", zIndex: 999, width: "50%" },
                        this.$render("i-label", { caption: item.title || '', font: { size: '1.125rem', color: '#fff' }, lineHeight: '1.688rem' }),
                        this.$render("i-label", { caption: item.description || '', font: { size: '1.125rem', color: '#fff' }, lineHeight: '1.688rem' }))
                ]
            }));
        }
        prev() {
            if (!this._data.controls)
                return;
            this.carouselSlider.prev();
        }
        next() {
            if (!this._data.controls)
                return;
            this.carouselSlider.next();
        }
        onSwipeStart() {
            this.isSwiping = false;
        }
        onSwipeEnd(isSwiping) {
            this.isSwiping = isSwiping;
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.default, maxHeight: "100%" },
                this.$render("i-panel", { id: "pnlCarousel", maxHeight: "100%", overflow: { y: 'hidden' } },
                    this.$render("i-grid-layout", { id: "gridCarousel", width: "100%", height: "100%", position: 'relative' },
                        this.$render("i-vstack", { height: "100%", width: "45px", position: "absolute", left: "2rem", zIndex: 999, verticalAlignment: "center", class: "--button-wrap" },
                            this.$render("i-button", { id: "btnPrev", height: "32px", width: "32px", icon: { name: 'chevron-left', fill: '#000' }, background: { color: 'transparent' }, border: { radius: '50%', width: '0px' }, onClick: this.prev.bind(this) })),
                        this.$render("i-carousel-slider", { id: "carouselSlider", width: "100%", height: "100%", onSwipeStart: this.onSwipeStart, onSwipeEnd: this.onSwipeEnd }),
                        this.$render("i-vstack", { height: "100%", width: "45px", position: "absolute", right: "2rem", zIndex: 999, verticalAlignment: "center", class: "--button-wrap" },
                            this.$render("i-button", { id: "btnNext", height: "32px", width: "32px", icon: { name: 'chevron-right', fill: '#000' }, background: { color: 'transparent' }, border: { radius: '50%', width: '0px' }, onClick: this.next.bind(this) })))),
                this.$render("pageblock-slideshow-config", { id: "carouselConfig", visible: false })));
        }
    };
    Module1 = __decorate([
        components_4.customModule
    ], Module1);
    exports.default = Module1;
});
