export class FontService {
  getGameFont(game: string) {
    switch (game) {
      case "fifa":
        return "";
    }
  }
}

const fontService = new FontService();

export default fontService;
