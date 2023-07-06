/// <amd-module name="@scom/scom-carousel/interface.ts" />
declare module "@scom/scom-carousel/interface.ts" {
    import { IconName, IDataSchema, IUISchema } from "@ijstech/components";
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
    export interface IConfig {
        autoplay?: boolean;
        controls?: boolean;
        indicators?: boolean;
        swipe?: boolean;
        data?: IData[];
    }
    export interface IData {
        title?: string;
        description?: string;
        imageUrl: string;
        link?: string;
    }
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
    export interface IPageBlockAction {
        name?: string;
        icon?: IconName;
        command?: (builder: any, userInputData: any) => ICommand;
        userInputDataSchema?: IDataSchema;
        userInputUISchema?: IUISchema;
    }
}
/// <amd-module name="@scom/scom-carousel/index.css.ts" />
declare module "@scom/scom-carousel/index.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-carousel/data.json.ts" />
declare module "@scom/scom-carousel/data.json.ts" {
    const _default_1: {};
    export default _default_1;
}
/// <amd-module name="@scom/scom-carousel" />
declare module "@scom/scom-carousel" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig, IPageBlockAction } from "@scom/scom-carousel/interface.ts";
    interface ScomCarouselElement extends ControlElement {
        lazyLoad?: boolean;
        data?: IConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-carousel']: ScomCarouselElement;
            }
        }
    }
    export default class Carousel extends Module {
        private carouselSlider;
        private btnPrev;
        private btnNext;
        private isSwiping;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        constructor(parent?: Container, options?: ScomCarouselElement);
        init(): void;
        private getData;
        private setData;
        private getTag;
        private setTag;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => IPageBlockAction[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
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
