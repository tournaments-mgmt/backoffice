import type { ImageData } from "@/shared/models/ImageData.ts";

export type PaneCommandDataText = {
  title: string;
  subTitle: string;
  textMessage: string;
  background?: ImageData;
};
