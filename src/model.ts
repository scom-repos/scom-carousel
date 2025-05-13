import { IDataSchema, Styles } from '@ijstech/components';
import { IConfig, ISettings } from './interface';
import { propertiesSchema, UISchema } from './schema';

const Theme = Styles.Theme.ThemeVars;

interface IOptions {
  onUpdateBlock: () => void;
}

export class Model {
  private _tag: ISettings = {};
  private _data: IConfig = {};
  private _options: IOptions;

  constructor(options: IOptions) {
    this._options = options;
  }

  get tag() {
    return this._tag;
  }

  set tag(value: ISettings) {
    this._tag = value;
  }

  get data() {
    return this._data
  }

  set data(value: IConfig) {
    this._data = value;
     this._options?.onUpdateBlock();
  }

  private getData() {
    return this._data;
  }

  setData(value: IConfig) {
    this._data = value;
    this._options?.onUpdateBlock();
  }

  private getTag() {
    return this._tag
  }

  async setTag(value: ISettings) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        this.tag[prop] = newValue[prop];
      }
    }

    this._options?.onUpdateBlock();
  }

  private splitData(userInputData: any) {
    const {
      title,
      description,
      width,
      height,
      ...data
    } = userInputData;

    const themeSettings = {title, description, width, height};

    return [data, themeSettings];
  }

  private _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions = [
      {
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let _oldData = {};
          let _oldTag = {};
          const [dataSettings, themeSettings] = this.splitData(userInputData)

          return {
            execute: async () => {
              _oldData = JSON.parse(JSON.stringify(this._data));
              if (dataSettings?.autoplay !== undefined) this._data.autoplay = dataSettings.autoplay;
              if (dataSettings?.controls !== undefined) this._data.controls = dataSettings.controls;
              if (dataSettings?.indicators !== undefined) this._data.indicators = dataSettings.indicators;
              if (dataSettings?.swipe !== undefined) this._data.swipe = dataSettings.swipe;
              if (dataSettings?.data !== undefined) this._data.data = dataSettings.data;
              this._options?.onUpdateBlock();
              if (builder?.setData) builder.setData(this._data);

              if (themeSettings) {
                _oldTag = {...this.tag};
                if (builder) builder.setTag(themeSettings);
                else this.setTag(themeSettings);
              }
            },
            undo: () => {
              if (builder?.setData) builder.setData(_oldData);
              this.setData(_oldData);

              if (themeSettings) {
                this.tag = {..._oldTag};
                if (builder) builder.setTag(this.tag);
                else this.setTag(this.tag);
              }
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema,
        userInputUISchema: UISchema
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
    ]
    return actions;
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
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
    ]
  }
}