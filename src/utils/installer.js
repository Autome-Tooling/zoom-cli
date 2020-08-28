import fs from 'fs'
import path from 'path';
import axios from 'axios'
import Printer from './printer'
import { promisify } from 'util'
import { exec } from 'child_process'

export default class Installer {
    static async downloadInstaller () {  
        const url = "https://zoom.us/client/latest/ZoomInstaller.exe";
        const downloadPath = path.resolve(__dirname, './', 'ZoomInstaller.exe');
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
        await execute(path);
    }
}