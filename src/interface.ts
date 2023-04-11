import { IconName, IDataSchema, IUISchema } from "@ijstech/components";

export interface PageBlock {
  // Properties
  getData: () => any;
  setData: (data: any) => Promise<void>;
  getTag: () => any;
  setTag: (tag: any) => Promise<void>
  validate?: () => boolean;
  defaultEdit?: boolean;
  tag?: any;

  // Page Events
  readonly onEdit: () => Promise<void>;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  // onClear: () => void;

  // Page Block Events
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