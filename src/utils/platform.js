export default class Platform {
  static isMac() {
    return process.platform === 'darwin';
  }

  static isWindows() {
    return process.platform === 'win32';
  }
}
