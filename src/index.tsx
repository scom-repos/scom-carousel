import {
  Module,
  customModule,
  Styles,
  CarouselSlider,
  Button,
  customElements,
  ControlElement,
  Container,
  Panel
} from '@ijstech/components';
import { IConfig, ISettings } from './interface';
import customStyles from './index.css';
import { Model } from './model';

const Theme = Styles.Theme.currentTheme;

interface ScomCarouselElement extends ControlElement {
  lazyLoad?: boolean;
  data?: IConfig;
  tag?: ISettings;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-carousel']: ScomCarouselElement;
    }
  }
}

@customModule
@customElements('i-scom-carousel', {
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
export default class ScomCarousel extends Module {
  private pnlContainer: Panel;
  private carouselSlider: CarouselSlider;
  private btnPrev: Button;
  private btnNext: Button;

  private isSwiping: Boolean;
  private model: Model;

  constructor(parent?: Container, options?: ScomCarouselElement) {
    super(parent, options);
  }

  static async create(options?: ScomCarouselElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  init() {
    super.init();
    this.model = new Model({
      onUpdateBlock: this.updateCarousel.bind(this),
    });
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const data = this.getAttribute('data', true);
      if (data) this.setData(data);
      const tag = this.getAttribute('tag', true);
      if (tag) this.setTag(tag);
    }
  }

  async setData(data: IConfig) {
    this.model.setData(data)
  }

  async setTag(value: ISettings) {
    this.model.setTag(value);
  }

  get data() {
    return this.model.data;
  }

  set data(value: IConfig) {
    this.model.data = value;
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  private updateCarousel() {
    const config = this.model.tag;
    const {
      title: titleStyles,
      description: descriptionStyles,
      width,
      height
    } = config || {};

    this.isSwiping = false;
    this.carouselSlider.autoplay = this.data.autoplay;
    this.carouselSlider.swipe = this.data.swipe;
    this.btnPrev.visible = this.data.controls;
    this.btnNext.visible = this.data.controls;
    if (height) this.height = height;
    if (width) this.width = width;

    if (this.data.controls) {
      this.btnNext.classList.add('--arrow-button');
      this.btnPrev.classList.add('--arrow-button');
    } else {
      this.btnNext.classList.remove('--arrow-button');
      this.btnPrev.classList.remove('--arrow-button');
    }

    if (this.data.indicators) this.carouselSlider.classList.add('--indicators');
    else this.carouselSlider.classList.remove('--indicators');

    const items = (this.data.data || [
      { imageUrl: 'https://placehold.co/600x400?text=No+Image', title: 'title' }
    ]).map((item) => {
      const imageUrl = item.imageCid ? "https://ipfs.scom.dev/ipfs/" + item.imageCid : item.imageUrl || '';
      return {
        name: item.title,
        controls: [
          <i-panel
            height="100%"
            class={item.link ? 'pointer' : ''}
            onClick={() => this.openLink(item.link)}
          >
            <i-panel
              display="flex"
              width="100%"
              height="100%"
              overflow="hidden"
              border={{ radius: this.data.isFullWidth ? '0px' : '0.75rem' }}
            >
              <i-image
                display="block"
                width="100%" height="100%"
                maxWidth="100%" maxHeight="100%"
                objectFit='cover'
                url={imageUrl}
                overflow="hidden"
                class={`--carousel-item`}
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
              font={titleStyles?.font || { size: '1.125rem', color: Theme.colors.primary.contrastText }}
              lineHeight="1.688rem"
              class="text-left"
            ></i-label>
            <i-label
              caption={item.description || ''}
              font={descriptionStyles?.font || { size: '1.125rem', color: Theme.colors.primary.contrastText }}
              lineHeight="1.688rem"
              class="text-left"
            ></i-label>
          </i-vstack>,
        ],
      };
    });

    this.carouselSlider.items = items;

    if (this.data.isFullWidth) {
      this.pnlContainer.classList.remove('container');
    } else {
      this.pnlContainer.classList.add('container');
    }
  }

  private openLink = (url: string) => {
    if (this.designMode) return;
    if (url && !this.isSwiping) window.open(url, '_self');
  };

  private prev() {
    if (!this.data.controls || this.designMode) return;
    this.carouselSlider.prev();
  }

  private next() {
    if (!this.data.controls || this.designMode) return;
    this.carouselSlider.next();
  }

  private onSwipeStart() {
    this.isSwiping = false;
  }

  private onSwipeEnd(isSwiping: boolean) {
    this.isSwiping = isSwiping;
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={customStyles} maxHeight="100%" minHeight={48} height="100%">
        <i-panel id="pnlCarousel" maxHeight="100%" overflow={{ y: 'hidden' }} height="100%">
          <i-panel id="pnlContainer" height="100%">
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
                  onClick={this.prev}
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
                  onClick={this.next}
                ></i-button>
              </i-vstack>
            </i-grid-layout>
          </i-panel>
        </i-panel>
      </i-panel>
    );
  }
}
