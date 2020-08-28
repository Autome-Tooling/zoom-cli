import fs from 'fs'
import path from 'path';
import Printer from './printer'

export default class Config {
    static create(path) {
        let jsonStructure = {
            "rooms": {}
        };
        
        fs.writeFileSync(path, JSON.stringify(jsonStructure));
    }
    
    static getPath() {
        const currentFileUrl = import.meta.url;
        let configPath = path.resolve(
            new URL(currentFileUrl).pathname,
            '../../../bin',
            'config.json'
        );
    
        // Remove extraneous 'C:'
        configPath = configPath.split(/\\(.+)/)[1]
    
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

    static getJSONFromFile(path) {
        return JSON.parse(fs.readFileSync(path).toString());
    }
}