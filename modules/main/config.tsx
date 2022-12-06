import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  Checkbox,
  VStack,
  Control
} from '@ijstech/components';
import { IConfig, IData } from '@carousel/global';
import { textareaStyle, uploadStyle, pointerStyle } from './config.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['pageblock-carousel-config']: ControlElement;
    }
  }
}

@customModule
@customElements("pageblock-carousel-config")
export default class Config extends Module {
  // private edtSlidesToShow: Input;
  private checkAutoplay: Checkbox;
  private checkControls: Checkbox;
  private checkIndicators: Checkbox;
  private checkSwipe: Checkbox;
  private listStack: VStack;

  private itemMap: Map<number, IData> = new Map();
  private _itemList: IData[] = [];

  get data() {
    const _data: IConfig = {
      autoplay: this.checkAutoplay.checked,
      controls: this.checkControls.checked,
      indicators: this.checkIndicators.checked,
      swipe: this.checkSwipe.checked,
      data: this.itemList || []
    };
    // const slidesToShow = Number(this.edtSlidesToShow.value);
    // if (Number.isInteger(slidesToShow)) _data.slidesToShow = slidesToShow;
    return _data;
  }

  set data(config: IConfig) {
    // this.edtSlidesToShow.value = config.slidesToShow || "";
    this.checkAutoplay.checked = config.autoplay;
    this.checkControls.checked = config.controls;
    this.checkIndicators.checked = config.indicators;
    this.checkSwipe.checked = config.swipe;
  }

  get itemList() {
    return Array.from(this.itemMap).map(item => item[1]);
  }
  set itemList(data: IData[]) {
    this._itemList = data;
  }

  private addItem() {
    const lastIndex = this.itemList.length;
    const itemElm = (
      <i-vstack
        gap='0.5rem'
        padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
        border={{ width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }}
        position="relative"
      >
        <i-icon
          name="times" fill="red" width={20} height={20}
          position="absolute"
          top={10} right={10}
          class={pointerStyle}
          onClick={(source: Control) => this.deleteItem(itemElm, lastIndex)}
        ></i-icon>
        <i-hstack>
          <i-label caption="Name"></i-label>
          <i-label caption="*" font={{ color: 'red' }} margin={{left: '4px'}}></i-label>
          <i-label caption=":"></i-label>
        </i-hstack>
        <i-input width="100%" onChanged={(source: Control) => this.updateList(source, lastIndex, 'title')}></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
          onChanged={(source: Control) => this.updateList(source, lastIndex, 'description')}
        ></i-input>
        <i-label caption="Image:"></i-label>
        <i-panel>
          <i-upload
            maxHeight={200}
            maxWidth={200}
            class={uploadStyle}
            onChanged={(source: Control) => this.updateList(source, lastIndex, 'image')}
            onRemoved={() => this.onRemovedImage(lastIndex)}
          ></i-upload>
        </i-panel>
      </i-vstack>
    );
    this.listStack.appendChild(itemElm);
    this.itemMap.set(lastIndex, { title: '', description: '' });
  }

  private deleteItem(source: Control, index: number) {
    if (this.itemMap.has(index)) {
      source.remove();
      this.itemMap.delete(index);
    }
  }
  
  private onRemovedImage(index: number) {
    if (this.itemMap.has(index)) {
      const item = this.itemMap.get(index);
      item.image = undefined;
      this.itemMap.set(index, item);
    }
  }

  private updateList(source: Control, index: number, prop: 'title' | 'description' | 'image') {
    const item: IData = this.itemMap.get(index);
    if (prop === 'image') {
      const imgUploader = source.getElementsByTagName("img")[0];
      item.image = imgUploader.src || '';
    } else {
      item[prop] = (source as Input).value;
    }
  }

  render() {
    return (
      <i-vstack id="pnlConfig" gap='0.5rem' padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
        {/* <i-label caption="Slides to show:"></i-label> */}
        {/* <i-input id="edtSlidesToShow" width="100%" inputType='number'></i-input> */}
        <i-checkbox id="checkAutoplay" caption="Autoplay?"></i-checkbox>
        <i-checkbox id="checkControls" caption="Controls?"></i-checkbox>
        <i-checkbox id="checkIndicators" caption="Indicators?"></i-checkbox>
        <i-checkbox id="checkSwipe" caption="Swipe?"></i-checkbox>
        <i-panel>
          <i-button
            caption="Add Item"
            padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
            onClick={this.addItem.bind(this)}
          ></i-button>
        </i-panel>
        <i-vstack id="listStack" gap="0.5rem"></i-vstack>
      </i-vstack>
    )
  }
}