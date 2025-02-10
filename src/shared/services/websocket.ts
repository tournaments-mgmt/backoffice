export class WebsocketService {
  private websocket: WebSocket | null = null;
  private keepRunning = false;

  private _url = "";
  private _tag = "";

  private readonly _reconnectTimeout = 2000;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }

  private _onChangeStatus?: ((status: boolean) => void) | null;

  set onChangeStatus(value: ((status: boolean) => void) | null) {
    this._onChangeStatus = value;
  }

  private _onCommand?: ((command: any) => void) | null;

  set onCommand(value: ((command: any) => void) | null) {
    this._onCommand = value;
  }

  start = (): void => {
    console.info("Websocket Service start");

    if (this.websocket != null) return;

    const serverUrl = this.computeUrl();
    console.debug(`Connecting WS to ${serverUrl}`);

    this.keepRunning = true;

    this.websocket = new WebSocket(serverUrl);
    this.websocket.addEventListener("open", this.onOpen);
    this.websocket.addEventListener("close", this.onClose);
    this.websocket.addEventListener("error", this.onError);
    this.websocket.addEventListener("message", this.onMessage);
  };

  stop = (): void => {
    if (this.websocket == null) return;

    this.keepRunning = false;

    this.websocket.removeEventListener("open", this.onOpen);
    this.websocket.removeEventListener("close", this.onClose);
    this.websocket.removeEventListener("error", this.onError);
    this.websocket.removeEventListener("message", this.onMessage);
    this.websocket.close();

    this.websocket = null;
  };

  restart = (): void => {
    this.stop();
    this.start();
  };

  private computeUrl = (): URL => {
    if (this._url.startsWith("ws")) {
      return new URL(this._url);
    }

    const url = new URL(window.location.href);

    if (this._url.startsWith("/")) {
      url.pathname = this._url;
    }

    if (url.protocol.startsWith("https")) {
      url.protocol = "wss";
    } else {
      url.protocol = "ws";
    }

    url.search = "";
    url.hash = "";

    if (this._tag.length > 0) {
      url.pathname += "/" + this._tag;
    }

    return url;
  };

  private onOpen = (event: Event) => {
    console.info("Websocket Opened", event);

    if (this._onChangeStatus) this._onChangeStatus(true);
  };

  private onClose = () => {
    console.info("Websocket Closed");

    if (this._onChangeStatus) this._onChangeStatus(false);

    if (this.keepRunning) setTimeout(this.restart, this._reconnectTimeout);
  };

  private onError = (event: Event) => {
    console.error("Websocket ERROR");
    console.error(event);
  };

  private onMessage = (event: MessageEvent) => {
    console.info("Websocket message");
    const rawCommand = JSON.parse(event.data.toString());
    console.info(rawCommand);
    if (this._onCommand) this._onCommand(rawCommand);
  };
}

const websocketService = new WebsocketService();

export default websocketService;
