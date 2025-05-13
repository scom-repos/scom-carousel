/// <reference path="@ijstech/components/index.d.ts" />
/// <amd-module name="@scom/scom-carousel/interface.ts" />
declare module "@scom/scom-carousel/interface.ts" {
    import { IFont } from "@ijstech/components";
    export interface IConfig {
        autoplay?: boolean;
        controls?: boolean;
        indicators?: boolean;
        swipe?: boolean;
        isFullWidth?: boolean;
        data?: IData[];
    }
    export interface IData {
        title?: string;
        description?: string;
        imageUrl?: string;
        imageCid?: string;
        link?: string;
    }
    interface IStyles {
        font?: IFont;
    }
    export interface ISettings {
        title?: IStyles;
        description?: IStyles;
        width?: string | number;
        height?: string | number;
    }
}
/// <amd-module name="@scom/scom-carousel/index.css.ts" />
declare module "@scom/scom-carousel/index.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-carousel/schema.ts" />
declare module "@scom/scom-carousel/schema.ts" {
    import { IUISchema } from "@ijstech/components";
    const propertiesSchema: any;
    const UISchema: IUISchema;
    export { propertiesSchema, UISchema };
}
/// <amd-module name="@scom/scom-carousel/model.ts" />
declare module "@scom/scom-carousel/model.ts" {
    import { IDataSchema } from '@ijstech/components';
    import { IConfig, ISettings } from "@scom/scom-carousel/interface.ts";
    interface IOptions {
        onUpdateBlock: () => void;
    }
    export class Model {
        private _tag;
        private _data;
        private _options;
        constructor(options: IOptions);
        get tag(): ISettings;
        set tag(value: ISettings);
        get data(): IConfig;
        set data(value: IConfig);
        private getData;
        setData(value: IConfig): void;
        private getTag;
        setTag(value: ISettings): Promise<void>;
        private splitData;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: import("@ijstech/components").IUISchema;
            }[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
    }
}
/// <amd-module name="@scom/scom-carousel" />
declare module "@scom/scom-carousel" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig, ISettings } from "@scom/scom-carousel/interface.ts";
    interface ScomCarouselElement extends ControlElement {
        lazyLoad?: boolean;
        data?: IConfig;
        tag?: ISettings;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-carousel']: ScomCarouselElement;
            }
        }
    }
    export default class ScomCarousel extends Module {
        private pnlContainer;
        private carouselSlider;
        private btnPrev;
        private btnNext;
        private isSwiping;
        private model;
        constructor(parent?: Container, options?: ScomCarouselElement);
        init(): void;
        private setData;
        private setTag;
        get data(): IConfig;
        set data(value: IConfig);
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: import("@ijstech/components").IDataSchema;
                userInputUISchema: import("@ijstech/components").IUISchema;
            }[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        private updateCarousel;
        private openLink;
        private prev;
        private next;
        private onSwipeStart;
        private onSwipeEnd;
        render(): any;
    }
}
