import type { PaneCommandDataImage } from "@/shared/models/commands/pane/PaneCommandDataImage.ts";
import type { PaneCommandDataText } from "@/shared/models/commands/pane/PaneCommandDataText.ts";
import type { PaneCommandDataVideo } from "@/shared/models/commands/pane/PaneCommandDataVideo.ts";
import type { PaneType } from "@/shared/models/commands/pane/PaneType.ts";

export type PaneCommandData = {
  id: number;
  duration: number;
  name: string;
  type: PaneType;
  params: PaneCommandDataImage | PaneCommandDataText | PaneCommandDataVideo;
};
