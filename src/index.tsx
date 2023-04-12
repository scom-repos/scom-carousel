import {
  Module,
  customModule,
  Styles,
  Panel,
  CarouselSlider,
  Button,
  customElements,
  ControlElement,
  Container,
  IDataSchema,
  IUISchema
} from '@ijstech/components';
import { IConfig, IPageBlockAction, PageBlock } from './interface';
import customStyles from './index.css';

const Theme = Styles.Theme.ThemeVars;
const propertiesSchema: IDataSchema = {
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
          link: {
            type: 'string'
          }
        }
      }
    }
  }
}

const UISchema: IUISchema = {
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
}

interface ScomCarouselElement extends ControlElement {
  data?: IConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-carousel']: ScomCarouselElement;
    }
  }
}

@customModule
@customElements('i-scom-carousel')
export default class Carousel extends Module implements PageBlock {
  private carouselSlider: CarouselSlider;
  private btnPrev: Button;
  private btnNext: Button;

  private isSwiping: Boolean;
  private _oldData: IConfig = {};
  private _data: IConfig = {};
  private oldTag: any = {};
  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  constructor(parent?: Container, options?: ScomCarouselElement) {
    super(parent, options);
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

  async setData(data: IConfig) {
    this._oldData = { ...this._data };
    this._data = data
    this.updateCarousel(this.tag);
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
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
    const themeSchema: IDataSchema = {
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
    }
    return this._getActions(propertiesSchema, themeSchema);
  }

  _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions: IPageBlockAction[] = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          return {
            execute: async () => {
              if (builder?.setData) builder.setData(userInputData);
              this.setData(userInputData);
            },
            undo: () => {
              if (builder?.setData) builder.setData(this._oldData);
              this.setData(this._oldData);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema,
        userInputUISchema: UISchema
      },
      {
        name: 'Theme Settings',
        icon: 'palette',
        command: (builder: any, userInputData: any) => {
          return {
            execute: async () => {
              if (!userInputData) return;
              this.oldTag = { ...this.tag };
              this.setTag(userInputData);
              if (builder) builder.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.setTag(this.oldTag);
              if (builder) builder.setTag(this.oldTag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: themeSchema
      }
    ]
    return actions;
  }

  private updateCarousel(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
    } = config || {};
    this.isSwiping = false;
    this.carouselSlider.autoplay = this._data.autoplay;
    this.carouselSlider.swipe = this._data.swipe;
    this.btnPrev.visible = this._data.controls;
    this.btnNext.visible = this._data.controls;
    if (this._data.controls) {
      this.btnNext.classList.add('--arrow-button');
      this.btnPrev.classList.add('--arrow-button');
    } else {
      this.btnNext.classList.remove('--arrow-button');
      this.btnPrev.classList.remove('--arrow-button');
    }
    if (this._data.indicators) this.carouselSlider.classList.add('--indicators');
    else this.carouselSlider.classList.remove('--indicators');
    this.carouselSlider.items = (this._data.data || []).map((item) => {
      const imageUrl = item.imageUrl || '';
      return {
        name: item.title,
        controls: [
          <i-panel
            class={item.link ? 'pointer' : ''}
            padding={{ left: '0.5em', right: '0.5em' }}
            onClick={() => this.openLink(item.link)}
          >
            <i-panel
              display="flex"
              width="100%"
              height="100%"
              overflow="hidden"
              border={{ radius: '0.75rem' }}
            >
              <i-image
                display="block"
                class={`--carousel-item`}
                width="100%"
                url={imageUrl}
                overflow="hidden"
              ></i-image>
              <i-panel
                position="absolute"
                width="100%"
                height="100%"
                background={{
                  color:
                    'linear-gradient(transparent 45%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.55))',
                }}
              ></i-panel>
            </i-panel>
          </i-panel>,
          <i-vstack
            gap={item.description ? '0.75rem' : '0rem'}
            padding={{ left: '2rem' }}
            position="absolute"
            bottom="1.75rem"
            zIndex={1}
            width="50%"
          >
            <i-label
              caption={item.title || ''}
              font={{ size: '1.125rem', color: titleFontColor }}
              lineHeight="1.688rem"
              class="text-left"
            ></i-label>
            <i-label
              caption={item.description || ''}
              font={{ size: '1.125rem', color: descriptionFontColor }}
              lineHeight="1.688rem"
              class="text-left"
            ></i-label>
          </i-vstack>,
        ],
      };
    });
  }

  private openLink = (url: string) => {
    if (url && !this.isSwiping) window.open(url, '_self');
  };

  private prev() {
    if (!this._data.controls) return;
    this.carouselSlider.prev();
  }

  private next() {
    if (!this._data.controls) return;
    this.carouselSlider.next();
  }

  onSwipeStart() {
    this.isSwiping = false;
  }

  onSwipeEnd(isSwiping: boolean) {
    this.isSwiping = isSwiping;
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={customStyles} maxHeight="100%" minHeight={48}>
        <i-panel id="pnlCarousel" maxHeight="100%" overflow={{ y: 'hidden' }}>
          <i-panel class="container">
            <i-grid-layout id="gridCarousel" width="100%" height="100%" position="relative">
              <i-vstack
                height="100%"
                width="45px"
                position="absolute"
                left="2rem"
                zIndex={1}
                verticalAlignment="center"
                class="--button-wrap"
              >
                <i-button
                  id="btnPrev"
                  height="32px"
                  width="32px"
                  icon={{ name: 'chevron-left', fill: '#000' }}
                  background={{ color: 'transparent' }}
                  border={{ radius: '50%', width: '0px' }}
                  onClick={this.prev.bind(this)}
                ></i-button>
              </i-vstack>
              <i-carousel-slider
                id="carouselSlider"
                width="100%"
                height="100%"
                autoplaySpeed={8000}
                onSwipeStart={this.onSwipeStart}
                onSwipeEnd={this.onSwipeEnd}
              ></i-carousel-slider>
              <i-vstack
                height="100%"
                width="45px"
                position="absolute"
                right="2rem"
                zIndex={1}
                verticalAlignment="center"
                class="--button-wrap"
              >
                <i-button
                  id="btnNext"
                  height="32px"
                  width="32px"
                  icon={{ name: 'chevron-right', fill: '#000' }}
                  background={{ color: 'transparent' }}
                  border={{ radius: '50%', width: '0px' }}
                  onClick={this.next.bind(this)}
                ></i-button>
              </i-vstack>
            </i-grid-layout>
          </i-panel>
        </i-panel>
      </i-panel>
    );
  }
}
