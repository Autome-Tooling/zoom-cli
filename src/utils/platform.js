export default class Platform {
  static isMac() {
    if (process.platform === "darwin") {
      return true;
    }
    
    return false;
  }

  static isWindows() {
    if (process.platform === "win32") {
      return true;
    }

    return false;
  }
}