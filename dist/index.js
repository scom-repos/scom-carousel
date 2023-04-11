var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-carousel/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-carousel/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.default = components_1.Styles.style({
        $nest: {
            'i-panel.container': {
                width: Theme.layout.container.width,
                maxWidth: Theme.layout.container.maxWidth,
                overflow: Theme.layout.container.overflow,
                textAlign: Theme.layout.container.textAlign,
                margin: '0 auto',
            },
            'i-carousel-slider.--indicators .dots-pagination': {
                display: 'flex',
                position: 'absolute',
                width: '100%',
                justifyContent: 'flex-end',
                gap: '0.5rem',
                bottom: '1.75rem',
                paddingRight: '1.75rem',
                $nest: {
                    'li.--dot': {
                        zIndex: 2,
                    },
                    'li > span': {
                        display: 'inline-block',
                        height: 5,
                        width: 25,
                        transition: 'all 0.2s ease 0s',
                        borderRadius: '9999px',
                        minHeight: 0,
                        minWidth: 0,
                        backgroundColor: '#ffffff66',
                        border: 0,
                        // border: `1px solid ${Styles.Theme.ThemeVars.colors.primary.main}`
                    },
                    'li.--active > span': {
                        backgroundColor: '#fff',
                    },
                },
            },
            'i-carousel-slider .dots-pagination': {
                display: 'none',
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
                                visibility: 'visible',
                            },
                        },
                    },
                },
            },
            '.--arrow-button': {
                boxShadow: 'none',
                $nest: {
                    '& > span': {
                        display: 'none',
                    },
                    '& > i-icon': {
                        visibility: 'hidden',
                    },
                },
            },
            '.text-left': {
                textAlign: 'left',
            },
        },
    });
});
define("@scom/scom-carousel", ["require", "exports", "@ijstech/components", "@scom/scom-carousel/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    const propertiesSchema = {
        type: 'object',
        properties: {
            autoplay: {
                type: 'boolean',
                title: 'autoplay?'
            },
            controls: {
                type: 'boolean',
                title: 'controls?'
            },
            indicators: {
                type: 'boolean',
                title: 'indicators?'
            },
            swipe: {
                type: 'boolean',
                title: 'swipe?'
            },
            data: {
                type: 'array',
                required: true,
                items: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            required: true
                        },
                        description: {
                            type: 'string'
                        },
                        imageUrl: {
                            type: 'string',
                            required: true
                        },
                        color: {
                            type: 'string',
                            format: 'color',
                        },
                        link: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    };
    const UISchema = {
        type: 'Categorization',
        elements: [
            {
                type: 'Category',
                label: 'General',
                elements: [
                    {
                        type: 'Control',
                        scope: '#/properties/autoplay'
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/controls'
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/indicators'
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/swipe'
                    },
                ]
            },
            {
                type: 'Category',
                label: 'Data',
                elements: [
                    {
                        type: 'Control',
                        scope: '#/properties/data',
                        options: {
                            detail: {
                                type: 'VerticalLayout'
                            }
                        }
                    }
                ]
            }
        ]
    };
    let Carousel = class Carousel extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this._oldData = {};
            this._data = {};
            this.oldTag = {};
            this.defaultEdit = true;
            this.openLink = (url) => {
                if (url && !this.isSwiping)
                    window.open(url, '_self');
            };
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data) {
                this.setData(data);
            }
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._oldData = Object.assign({}, this._data);
            this._data = data;
            this.updateCarousel(this.tag);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            this.updateCarousel(value);
        }
        async edit() {
        }
        async confirm() {
            this.updateCarousel(this.tag);
        }
        async discard() {
        }
        async config() { }
        getActions() {
            const themeSchema = {
                type: 'object',
                properties: {
                    titleFontColor: {
                        type: 'string',
                        format: 'color',
                    },
                    descriptionFontColor: {
                        type: 'string',
                        format: 'color',
                    },
                }
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(userInputData);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._oldData);
                                this.setData(this._oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: UISchema
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                this.oldTag = Object.assign({}, this.tag);
                                this.setTag(userInputData);
                                if (builder)
                                    builder.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.setTag(this.oldTag);
                                if (builder)
                                    builder.setTag(this.oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            return actions;
        }
        updateCarousel(config) {
            const { titleFontColor = Theme.text.primary, descriptionFontColor = Theme.text.primary, } = config || {};
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
                this.carouselSlider.classList.add('--indicators');
            else
                this.carouselSlider.classList.remove('--indicators');
            this.carouselSlider.items = (this._data.data || []).map((item) => {
                const imageUrl = item.imageUrl || '';
                return {
                    name: item.title,
                    controls: [
                        this.$render("i-panel", { class: item.link ? 'pointer' : '', padding: { left: '0.5em', right: '0.5em' }, onClick: () => this.openLink(item.link) },
                            this.$render("i-panel", { display: "flex", width: "100%", height: "100%", overflow: "hidden", border: { radius: '0.75rem' } },
                                this.$render("i-image", { display: "block", class: `--carousel-item`, width: "100%", url: imageUrl, overflow: "hidden" }),
                                this.$render("i-panel", { position: "absolute", width: "100%", height: "100%", background: {
                                        color: 'linear-gradient(transparent 45%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.55))',
                                    } }))),
                        this.$render("i-vstack", { gap: item.description ? '0.75rem' : '0rem', padding: { left: '2rem' }, position: "absolute", bottom: "1.75rem", zIndex: 1, width: "50%" },
                            this.$render("i-label", { caption: item.title || '', font: { size: '1.125rem', color: titleFontColor }, lineHeight: "1.688rem", class: "text-left" }),
                            this.$render("i-label", { caption: item.description || '', font: { size: '1.125rem', color: descriptionFontColor }, lineHeight: "1.688rem", class: "text-left" })),
                    ],
                };
            });
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
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.default, maxHeight: "100%", minHeight: 48 },
                this.$render("i-panel", { id: "pnlCarousel", maxHeight: "100%", overflow: { y: 'hidden' } },
                    this.$render("i-panel", { class: "container" },
                        this.$render("i-grid-layout", { id: "gridCarousel", width: "100%", height: "100%", position: "relative" },
                            this.$render("i-vstack", { height: "100%", width: "45px", position: "absolute", left: "2rem", zIndex: 1, verticalAlignment: "center", class: "--button-wrap" },
                                this.$render("i-button", { id: "btnPrev", height: "32px", width: "32px", icon: { name: 'chevron-left', fill: '#000' }, background: { color: 'transparent' }, border: { radius: '50%', width: '0px' }, onClick: this.prev.bind(this) })),
                            this.$render("i-carousel-slider", { id: "carouselSlider", width: "100%", height: "100%", autoplaySpeed: 8000, onSwipeStart: this.onSwipeStart, onSwipeEnd: this.onSwipeEnd }),
                            this.$render("i-vstack", { height: "100%", width: "45px", position: "absolute", right: "2rem", zIndex: 1, verticalAlignment: "center", class: "--button-wrap" },
                                this.$render("i-button", { id: "btnNext", height: "32px", width: "32px", icon: { name: 'chevron-right', fill: '#000' }, background: { color: 'transparent' }, border: { radius: '50%', width: '0px' }, onClick: this.next.bind(this) })))))));
        }
    };
    Carousel = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-carousel')
    ], Carousel);
    exports.default = Carousel;
});
