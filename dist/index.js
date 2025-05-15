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
                objectPosition: 'center'
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
                        $nest: {
                            'svg': {
                                fill: 'inherit'
                            }
                        }
                    },
                },
            },
            '.text-left': {
                textAlign: 'left',
            },
            'i-carousel-slider': {
                height: '100%',
                $nest: {
                    '> div': {
                        height: '100%'
                    },
                    'i-carousel-item': {
                        height: '100%'
                    },
                    '.wrapper-slider-list': {
                        height: '100%'
                    },
                    '.slider-list': {
                        height: '100%'
                    }
                }
            }
        }
    });
});
define("@scom/scom-carousel/schema.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISchema = exports.propertiesSchema = void 0;
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
                        imageCid: {
                            title: 'Image',
                            type: 'string',
                            format: 'data-cid'
                        },
                        imageUrl: {
                            type: 'string'
                        },
                        link: {
                            type: 'string'
                        }
                    }
                }
            },
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
    exports.propertiesSchema = propertiesSchema;
    const UISchema = {
        type: 'Categorization',
        elements: [
            {
                type: 'Category',
                label: 'General',
                elements: [
                    {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Group',
                                        label: 'Behaviour',
                                        elements: [
                                            {
                                                type: 'HorizontalLayout',
                                                elements: [
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/autoplay',
                                                    },
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/controls',
                                                    },
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/indicators',
                                                    },
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/swipe',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/data',
                                        options: {
                                            detail: {
                                                type: 'VerticalLayout',
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'Category',
                label: 'Theme',
                elements: [
                    {
                        type: 'Control',
                        scope: '#/properties/titleFontColor',
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/descriptionFontColor',
                    },
                ],
            },
        ],
    };
    exports.UISchema = UISchema;
});
define("@scom/scom-carousel/model.ts", ["require", "exports", "@ijstech/components", "@scom/scom-carousel/schema.ts"], function (require, exports, components_2, schema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    class Model {
        constructor(options) {
            this._tag = {};
            this._data = {};
            this._options = options;
        }
        get tag() {
            return this._tag;
        }
        set tag(value) {
            this._tag = value;
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this._options?.onUpdateBlock();
        }
        getData() {
            return this._data;
        }
        setData(value) {
            this._data = value;
            this._options?.onUpdateBlock();
        }
        getTag() {
            return this._tag;
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateBlock();
        }
        splitData(userInputData) {
            const { title, description, width, height, ...data } = userInputData;
            const themeSettings = { title, description, width, height };
            return [data, themeSettings];
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let _oldData = {};
                        let _oldTag = {};
                        const [dataSettings, themeSettings] = this.splitData(userInputData);
                        return {
                            execute: async () => {
                                _oldData = JSON.parse(JSON.stringify(this._data));
                                if (dataSettings?.autoplay !== undefined)
                                    this._data.autoplay = dataSettings.autoplay;
                                if (dataSettings?.controls !== undefined)
                                    this._data.controls = dataSettings.controls;
                                if (dataSettings?.indicators !== undefined)
                                    this._data.indicators = dataSettings.indicators;
                                if (dataSettings?.swipe !== undefined)
                                    this._data.swipe = dataSettings.swipe;
                                if (dataSettings?.data !== undefined)
                                    this._data.data = dataSettings.data;
                                this._options?.onUpdateBlock();
                                if (builder?.setData)
                                    builder.setData(this._data);
                                if (themeSettings) {
                                    _oldTag = { ...this.tag };
                                    if (builder)
                                        builder.setTag(themeSettings);
                                    else
                                        this.setTag(themeSettings);
                                }
                            },
                            undo: () => {
                                if (builder?.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                                if (themeSettings) {
                                    this.tag = { ..._oldTag };
                                    if (builder)
                                        builder.setTag(this.tag);
                                    else
                                        this.setTag(this.tag);
                                }
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: schema_1.UISchema
                }
                // {
                //   name: 'Theme Settings',
                //   icon: 'palette',
                //   command: (builder: any, userInputData: any) => {
                //     let oldTag = {};
                //     return {
                //       execute: async () => {
                //         if (!userInputData) return;
                //         oldTag = JSON.parse(JSON.stringify(this.tag));
                //         if (builder) builder.setTag(userInputData);
                //         else this.setTag(userInputData);
                //       },
                //       undo: () => {
                //         if (!userInputData) return;
                //         this.tag = JSON.parse(JSON.stringify(oldTag));
                //         if (builder) builder.setTag(this.tag);
                //         else this.setTag(this.tag);
                //       },
                //       redo: () => { }
                //     }
                //   },
                //   userInputDataSchema: themeSchema
                // }
            ];
            return actions;
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
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
                        return this._getActions(schema_1.propertiesSchema, themeSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/scom-carousel", ["require", "exports", "@ijstech/components", "@scom/scom-carousel/index.css.ts", "@scom/scom-carousel/model.ts"], function (require, exports, components_3, index_css_1, model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.currentTheme;
    let ScomCarousel = class ScomCarousel extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this.openLink = (url) => {
                if (this.designMode)
                    return;
                if (url && !this.isSwiping)
                    window.open(url, '_self');
            };
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        init() {
            super.init();
            this.model = new model_1.Model({
                onUpdateBlock: this.updateCarousel.bind(this),
            });
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data)
                    this.setData(data);
                const tag = this.getAttribute('tag', true);
                if (tag)
                    this.setTag(tag);
            }
        }
        async setData(data) {
            this.model.setData(data);
        }
        async setTag(value) {
            this.model.setTag(value);
        }
        get data() {
            return this.model.data;
        }
        set data(value) {
            this.model.data = value;
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        updateCarousel() {
            const config = this.model.tag;
            const { title: titleStyles, description: descriptionStyles, width, height } = config || {};
            this.isSwiping = false;
            this.carouselSlider.autoplay = this.data.autoplay;
            this.carouselSlider.swipe = this.data.swipe;
            this.btnPrev.visible = this.data.controls;
            this.btnNext.visible = this.data.controls;
            if (height)
                this.height = height;
            if (width)
                this.width = width;
            if (this.data.controls) {
                this.btnNext.classList.add('--arrow-button');
                this.btnPrev.classList.add('--arrow-button');
            }
            else {
                this.btnNext.classList.remove('--arrow-button');
                this.btnPrev.classList.remove('--arrow-button');
            }
            if (this.data.indicators)
                this.carouselSlider.classList.add('--indicators');
            else
                this.carouselSlider.classList.remove('--indicators');
            const items = (this.data.data || [
                { imageUrl: 'https://placehold.co/600x400?text=No+Image', title: 'title' }
            ]).map((item) => {
                const imageUrl = item.imageCid ? "https://ipfs.scom.dev/ipfs/" + item.imageCid : item.imageUrl || '';
                return {
                    name: item.title,
                    controls: [
                        this.$render("i-panel", { height: "100%", class: item.link ? 'pointer' : '', onClick: () => this.openLink(item.link) },
                            this.$render("i-panel", { display: "flex", width: "100%", height: "100%", overflow: "hidden", border: { radius: this.data.isFullWidth ? '0px' : '0.75rem' } },
                                this.$render("i-image", { display: "block", width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", objectFit: 'cover', url: imageUrl, overflow: "hidden", class: `--carousel-item` }),
                                this.$render("i-panel", { position: "absolute", width: "100%", height: "100%", background: {
                                        color: 'linear-gradient(transparent 45%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.55))',
                                    } }))),
                        this.$render("i-vstack", { gap: item.description ? '0.75rem' : '0rem', padding: { left: '2rem' }, position: "absolute", bottom: "1.75rem", zIndex: 1, width: "50%" },
                            this.$render("i-label", { caption: item.title || '', font: titleStyles?.font || { size: '1.125rem', color: Theme.colors.primary.contrastText }, lineHeight: "1.688rem", class: "text-left" }),
                            this.$render("i-label", { caption: item.description || '', font: descriptionStyles?.font || { size: '1.125rem', color: Theme.colors.primary.contrastText }, lineHeight: "1.688rem", class: "text-left" })),
                    ],
                };
            });
            this.carouselSlider.items = items;
            if (this.data.isFullWidth) {
                this.pnlContainer.classList.remove('container');
            }
            else {
                this.pnlContainer.classList.add('container');
            }
        }
        prev() {
            if (!this.data.controls || this.designMode)
                return;
            this.carouselSlider.prev();
        }
        next() {
            if (!this.data.controls || this.designMode)
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
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.default, maxHeight: "100%", minHeight: 48, height: "100%" },
                this.$render("i-panel", { id: "pnlCarousel", maxHeight: "100%", overflow: { y: 'hidden' }, height: "100%" },
                    this.$render("i-panel", { id: "pnlContainer", height: "100%" },
                        this.$render("i-grid-layout", { id: "gridCarousel", width: "100%", height: "100%", position: "relative" },
                            this.$render("i-vstack", { height: "100%", width: "45px", position: "absolute", left: "2rem", zIndex: 1, verticalAlignment: "center", class: "--button-wrap" },
                                this.$render("i-button", { id: "btnPrev", height: "32px", width: "32px", icon: { name: 'chevron-left', fill: '#000' }, background: { color: 'transparent' }, border: { radius: '50%', width: '0px' }, onClick: this.prev })),
                            this.$render("i-carousel-slider", { id: "carouselSlider", width: "100%", height: "100%", autoplaySpeed: 8000, onSwipeStart: this.onSwipeStart, onSwipeEnd: this.onSwipeEnd }),
                            this.$render("i-vstack", { height: "100%", width: "45px", position: "absolute", right: "2rem", zIndex: 1, verticalAlignment: "center", class: "--button-wrap" },
                                this.$render("i-button", { id: "btnNext", height: "32px", width: "32px", icon: { name: 'chevron-right', fill: '#000' }, background: { color: 'transparent' }, border: { radius: '50%', width: '0px' }, onClick: this.next })))))));
        }
    };
    ScomCarousel = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-scom-carousel', {
            icon: 'stop',
            props: {
                autoplay: {
                    type: 'boolean'
                },
                controls: {
                    type: 'boolean'
                },
                indicators: {
                    type: 'boolean'
                },
                swipe: {
                    type: 'boolean'
                },
                isFullWidth: {
                    type: 'boolean',
                    default: false
                },
                data: {
                    type: 'array',
                    default: []
                }
            },
            className: 'ScomCarousel',
            events: {},
            dataSchema: {
                type: 'object',
                properties: {
                    autoplay: {
                        type: 'boolean',
                        default: false,
                        required: false
                    },
                    controls: {
                        type: 'boolean',
                        default: false,
                        required: false
                    },
                    indicators: {
                        type: 'boolean',
                        default: false,
                        required: false
                    },
                    swipe: {
                        type: 'boolean',
                        default: false,
                        required: false
                    },
                    isFullWidth: {
                        type: 'boolean',
                        default: false,
                        required: false
                    },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                    required: false
                                },
                                description: {
                                    type: 'string',
                                    required: false
                                },
                                imageUrl: {
                                    type: 'string',
                                    required: false
                                },
                                link: {
                                    type: 'string',
                                    required: false
                                },
                                imageCid: {
                                    type: 'string',
                                    required: false
                                }
                            }
                        }
                    }
                }
            }
        })
    ], ScomCarousel);
    exports.default = ScomCarousel;
});
