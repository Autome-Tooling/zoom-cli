import fs from 'fs'
import { homedir } from 'os';
import Platform from '../utils/platform';
import Printer from '../utils/printer';

export default class ConfigService {
  constructor() {
    try {
      fs.accessSync(this.getPath(), fs.constants.R_OK);
    } catch(err) {
      Printer.printError(new Error("Config not found"));
      Printer.printMessage("Creating config...");
      this.create();
      Printer.printSuccess("Created config!");
    }
  }

  getPath() {
    let path = homedir() + '/.zoom';
    
    // Remove extraneous 'C:'
    if (Platform.isWindows()) {
      path = path.split(/\\(.+)/)[1];
    }

    return path;
  }

  create() {
    let jsonStructure = {
      "rooms": {}
    };
  
    fs.writeFileSync(this.getPath(), JSON.stringify(jsonStructure));
  }

  getJSONFromFile() {
    return JSON.parse(fs.readFileSync(this.getPath()).toString());
  }
}