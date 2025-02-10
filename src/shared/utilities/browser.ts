class BrowserUtility {
  getCurrentUrlTag(): string {
    const url = this.getCurrentURL();
    let tag = url.pathname;
    if (tag.startsWith("/")) {
      tag = tag.replace(/^\//, "");
    }
    return tag;
  }

  redirectTag(tag: string) {
    const url = this.getCurrentURL();
    url.pathname = "/" + tag;
    window.location.href = url.toString();
  }

  private getCurrentURL(): URL {
    const rawUrl = window.location.href;
    return new URL(rawUrl);
  }
}
const browserUtility = new BrowserUtility();
export default browserUtility;
