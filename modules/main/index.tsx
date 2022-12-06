import {
  Module,
  customModule,
  Panel,
  CarouselSlider,
  Button,
  GridLayout
} from '@ijstech/components';
import { IConfig, PageBlock } from '@carousel/global';
import customStyles from './index.css';
import Config from './config';
export { Config };

@customModule
export default class Module1 extends Module implements PageBlock {
  private pnlCarousel: Panel;
  private carouselSlider: CarouselSlider;
  private carouselConfig: Config;
  private btnPrev: Button;
  private btnNext: Button;

  private isSwiping: Boolean;
  private _data: IConfig = {};
  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  getData() {
    return this._data;
  }

  async setData(data: IConfig) {
    this._data = data;
    this.carouselConfig.data = data;
    this.updateCarousel();
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
  }

  async edit() {
    this.carouselConfig.data = this._data;
    this.pnlCarousel.visible = false;
    this.carouselConfig.visible = true;
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

  private updateCarousel() {
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
    if (this._data.indicators)
      this.carouselSlider.classList.add("--indicators");
    else
      this.carouselSlider.classList.remove("--indicators");
    this.carouselSlider.items = (this._data.data || []).map(item => ({
      name: item.title,
      controls: [
        <i-image
          display='block'
          class={`--carousel-item`}
          width="100%"
          padding={{ left: '0.5em', right: '0.5em' }}
          url={item.image}
        ></i-image>,
        <i-vstack gap="0.75rem" padding={{left: '2rem'}} position="absolute" bottom="1.75rem" zIndex={999} width="50%">
          <i-label caption={item.title || ''} font={{ size: '1.125rem', color: '#fff' }} lineHeight='1.688rem'></i-label>
          <i-label caption={item.description || ''} font={{size: '1.125rem', color: '#fff'}} lineHeight='1.688rem'></i-label>
        </i-vstack>
      ]
    }));
  }

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
      <i-panel id="pnlBlock" class={customStyles} maxHeight="100%">
        <i-panel id="pnlCarousel" maxHeight="100%" overflow={{y: 'hidden'}}>
          <i-grid-layout id="gridCarousel" width="100%" height="100%" position='relative'>
            <i-vstack height="100%" width="45px" position="absolute" left="2rem" zIndex={999} verticalAlignment="center" class="--button-wrap">
              <i-button
                id="btnPrev"
                height="32px"
                width="32px"
                icon={{ name: 'chevron-left', fill: '#000' }}
                background={{ color: 'transparent' }}
                border={{radius: '50%', width: '0px'}}
                onClick={this.prev.bind(this)}
              ></i-button>
            </i-vstack>
            <i-carousel-slider id="carouselSlider" width="100%" height="100%" onSwipeStart={this.onSwipeStart} onSwipeEnd={this.onSwipeEnd}></i-carousel-slider>
            <i-vstack height="100%" width="45px" position="absolute" right="2rem" zIndex={999} verticalAlignment="center" class="--button-wrap">
              <i-button
                id="btnNext"
                height="32px"
                width="32px"
                icon={{ name: 'chevron-right', fill: '#000' }}
                background={{ color: 'transparent' }}
                border={{radius: '50%', width: '0px'}}
                onClick={this.next.bind(this)}
              ></i-button>
            </i-vstack>
          </i-grid-layout>
        </i-panel>
        <pageblock-carousel-config id="carouselConfig" visible={false}></pageblock-carousel-config>
      </i-panel>
    )
  }
}