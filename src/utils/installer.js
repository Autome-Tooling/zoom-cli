import fs from 'fs'
import { homedir } from 'os'
import axios from 'axios'
import Printer from './printer'
import { promisify } from 'util'
import { exec } from 'child_process'
import Platform from './platform'

export default class Installer {
    static async downloadInstaller () {
      
      let fileName = "ZoomInstaller.exe";
      let url = "https://zoom.us/client/latest/ZoomInstaller.exe";
      
      if (Platform.isMac()) {
        url = "https://zoom.us/client/latest/Zoom.pkg";
        fileName = "Zoom.pkg";
      }

      const downloadPath = homedir() + "/" + fileName;
      const writer = fs.createWriteStream(downloadPath)
    
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      })
    
      response.data.pipe(writer)
    
      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          writer.close();
          resolve(downloadPath);
        });
        writer.on('error', (err)=> {
          Printer.printError("Writer error: " + err);
          reject();
        });
      });
    }
    
    static async executeInstaller(path) {
      const execute = promisify(exec);

      let command = path;

      if (Platform.isMac()) {
        let cdPath = path.substring(0, path.lastIndexOf("/") + 1)
        process.chdir(cdPath);
        command = `sudo installer -pkg Zoom.pkg -target /;`;
      }

      await execute(command);
    }
}