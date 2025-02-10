import type { CommandType } from "@/shared/models/commands/CommandType.ts";

export type Command = {
  type: CommandType;
  data?: any;
};
