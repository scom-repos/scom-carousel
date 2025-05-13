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