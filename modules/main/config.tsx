import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  Checkbox,
  VStack,
  Control,
  Upload
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
    this.itemList = config.data || [];
    this.listStack.clearInnerHTML();
    this.itemMap = new Map();
    this._itemList.forEach(item => {
      this.addItem(item);
    })
  }

  get itemList() {
    return Array.from(this.itemMap).map(item => item[1]);
  }
  set itemList(data: IData[]) {
    this._itemList = data;
  }

  private addItem(item?: IData) {
    const lastIndex = this.itemList.length;
    const uploadElm = (
      <i-upload
        maxHeight={200}
        maxWidth={200}
        class={uploadStyle}
        fileList={item?.file ? [item.file] : [] }
        onChanged={(source: Control, files: File[]) => this.updateList(source, lastIndex, 'image', files)}
        onRemoved={() => this.onRemovedImage(lastIndex)}
      ></i-upload>
    )
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
        <i-label caption="Name:"></i-label>
        <i-input width="100%" value={item?.title || ''} onChanged={(source: Control) => this.updateList(source, lastIndex, 'title')}></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
          value={item?.description || ''}
          onChanged={(source: Control) => this.updateList(source, lastIndex, 'description')}
        ></i-input>
        <i-hstack>
          <i-label caption="Image"></i-label>
          {/* <i-label caption="*" font={{ color: 'red' }} margin={{left: '4px'}}></i-label> */}
          <i-label caption=":"></i-label>
        </i-hstack>
        <i-panel>
          {uploadElm}
        </i-panel>
      </i-vstack>
    );
    if (item?.image)
      uploadElm.preview(item?.image);
    this.listStack.appendChild(itemElm);
    this.itemMap.set(lastIndex, item || { title: '', description: '' });
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
      delete item.image;
      item.file = undefined;
      this.itemMap.set(index, item);
    }
  }

  private async updateList(source: Control, index: number, prop: 'title' | 'description' | 'image', files?: File[]) {
    const item: any = this.itemMap.get(index);
    if (prop === 'image') {
      const uploadElm = source as Upload;
      item.image = files ? await uploadElm.toBase64(files[0]) : '';
      item.file = files[0];
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
            onClick={() => this.addItem()}
          ></i-button>
        </i-panel>
        <i-vstack id="listStack" gap="0.5rem"></i-vstack>
      </i-vstack>
    )
  }
}