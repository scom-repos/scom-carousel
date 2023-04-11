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
/// <amd-module name="@scom/scom-carousel" />
declare module "@scom/scom-carousel" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { IConfig, IPageBlockAction, PageBlock } from "@scom/scom-carousel/interface.ts";
    interface ScomCarouselElement extends ControlElement {
        data?: IConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-carousel']: ScomCarouselElement;
            }
        }
    }
    export default class Carousel extends Module implements PageBlock {
        private carouselSlider;
        private btnPrev;
        private btnNext;
        private isSwiping;
        private _oldData;
        private _data;
        private oldTag;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        constructor(parent?: Container, options?: ScomCarouselElement);
        init(): void;
        getData(): IConfig;
        setData(data: IConfig): Promise<void>;
        getTag(): any;
        setTag(value: any): Promise<void>;
        edit(): Promise<void>;
        confirm(): Promise<void>;
        discard(): Promise<void>;
        config(): Promise<void>;
        getActions(): IPageBlockAction[];
        _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema): IPageBlockAction[];
        private updateCarousel;
        private openLink;
        private prev;
        private next;
        onSwipeStart(): void;
        onSwipeEnd(isSwiping: boolean): void;
        render(): any;
    }
}
