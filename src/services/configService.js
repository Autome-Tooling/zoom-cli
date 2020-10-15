import fs from 'fs'
import { homedir } from 'os';
import Platform from '../utils/platform';
import Printer from '../utils/printer';

export default class ConfigService {
  constructor() {}

  getPath() {
    let path = homedir() + '/.zoom';
    
    // Remove extraneous 'C:'
    if (Platform.isWindows()) {
      path = path.split(/\\(.+)/)[1];
    }

    return path;
  }

  configExists() {
    return fs.existsSync(this.getPath());
  }

  create() {
    if (!this.configExists()) {
      Printer.printError(new Error("Config not found"));

      let jsonStructure = {
        "rooms": {}
      };
      
      try {
        Printer.printMessage("Creating config...");
        
        fs.writeFileSync(this.getPath(), JSON.stringify(jsonStructure));
        
        Printer.printSuccess("Created config!");
        return 0;
      } 
      catch(err) {
        Printer.printError('Could not create config');
        return -1;
      }
    }
    return 0;
  }

  getJSONFromFile() {
    return JSON.parse(fs.readFileSync(this.getPath()).toString());
  }
}