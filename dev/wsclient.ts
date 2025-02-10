import * as WebSocket from "ws";

export class WSClient {
  private _url = "";
  private _tag = "";

  private websocket: WebSocket.WebSocket | null = null;
  private keepRunning = false;

  constructor(url = "", tag = "") {
    this._url = url;
    this._tag = tag;
  }

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

  public start(): void {
    if (this.websocket != null) return;

    const serverUrl = new URL(this._url);
    if (this._tag.length > 0) serverUrl.pathname += "/" + this._tag;

    this.keepRunning = true;

    this.websocket = new WebSocket.WebSocket(serverUrl);
    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    this.websocket.onerror = this.onError;
    this.websocket.onmessage = this.onMessage;
  }

  public stop(): void {
    if (this.websocket == null) return;

    this.keepRunning = false;

    this.websocket.close();
    this.websocket = null;
  }

  public restart(): void {
    this.stop();
    this.start();
  }

  private onOpen(event: WebSocket.Event) {
    console.info("Websocket Opened");
  }

  private onClose(event: WebSocket.CloseEvent) {
    console.info("Websocket Closed");
  }

  private onError(event: WebSocket.Event) {
    console.error("Websocket ERROR");
    console.error(event);

    if (this.keepRunning) setTimeout(this.restart, 1000);
  }

  private onMessage(event: WebSocket.MessageEvent) {
    console.debug("Websocket message");

    const data = JSON.parse(event.data.toString());
    console.debug(data);
  }
}

const wsClient = new WSClient();
wsClient.url = "ws://localhost:8080/api/public/v1/ws/showcase";
wsClient.tag = "prova";

process.on("SIGINT", () => {
  wsClient.stop();
});
process.on("SIGTERM", () => {
  wsClient.stop();
});
process.on("SIGBREAK", () => {
  wsClient.stop();
});

wsClient.start();
