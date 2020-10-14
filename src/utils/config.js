import fs from 'fs'
import Printer from './printer'
import Platform from './platform'
import { homedir } from 'os'

export default class Config {
    create(path) {
        let jsonStructure = {
            "rooms": {}
        };
        
        fs.writeFileSync(path, JSON.stringify(jsonStructure));
    }
    
    getPath(configPath = homedir() + "/.zoom") {        
        if (Platform.isWindows()) {
            // Remove extraneous 'C:'
            configPath = configPath.split(/\\(.+)/)[1]
        }
    
        try {
            fs.accessSync(configPath, fs.constants.R_OK);
        } catch (err) {
            Printer.printError(new Error("Config not found"));
            Printer.printMessage("Creating config...");
            this.create(configPath);
            Printer.printSuccess("Created config!");
        }
    
        return configPath;
    }

    getJSONFromFile(path) {
        return JSON.parse(fs.readFileSync(path).toString());
    }
}
