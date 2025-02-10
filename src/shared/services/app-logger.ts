import { env } from "@/env/environment";

export class AppLogger {
  public log: any;
  public debug: any;
  public info: any;
  public error: any;
  public warn: any;

  constructor(level: string) {
    this.log = this.debug = this.info = this.warn = this.error = () => {};
    this.initLogger(level);
  }

  initLogger(level: string) {
    switch (level) {
      case "debug":
        this.debug = console.debug.bind(console);
      case "error":
        this.error = console.error.bind(console);
      case "warn":
        this.warn = console.warn.bind(console);
      case "info":
        this.info = console.info.bind(console);
      case "log":
        this.log = console.log.bind(console);
        break;
      default:
        this.log = this.debug = this.info = this.warn = this.error = () => {};
    }
  }
}

export const logger = new AppLogger(env.logLevel);
