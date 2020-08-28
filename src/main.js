import fs from 'fs'
import open from 'open'
import ora from 'ora'
import Config from './utils/config'
import Printer from './utils/printer'
import Installer from './utils/installer'

function add(room) {
    const configPath = Config.getPath();
    const pair = room.split(/:(.+)/);

    let config = Config.getJSONFromFile(configPath);
    
    if (Object.keys(config.rooms).includes(pair[0])) {
        throw Error("This room already exists")
    }
    else {
        config.rooms[pair[0]] = pair[1];
        fs.writeFileSync(configPath, JSON.stringify(config));
    }

    Printer.printSuccess("Successfully added room!")
}

function remove(roomName) {
    const configPath = Config.getPath();
    let config = Config.getJSONFromFile(configPath);
    let keys = Object.keys(config.rooms);
    if (keys.includes(roomName)) {
        delete config.rooms[roomName];
        fs.writeFileSync(configPath, JSON.stringify(config));
        Printer.printSuccess(`The '${roomName}' room has been removed`);
    }
    else {
        throw Error("This key doesn't exist")
    }
}

function launch(roomName) {
    const configPath = Config.getPath();
    const config = Config.getJSONFromFile(configPath);
    if (Object.keys(config.rooms).includes(roomName)) {
        open(config.rooms[roomName]);
    }
    else {
        throw Error('Invalid room');
    }
}

async function update() {
    const spinner = ora();

    spinner.start("Downloading...");
    const exePath = await Installer.downloadInstaller();
    spinner.succeed("Downloaded");

    spinner.start("Installing...");
    await Installer.executeInstaller(exePath);
    spinner.succeed("Installed");
}

export function run(options) {
    const action = Object.keys(options).find(key => 
        options[key] != null && options[key] != false);
    
    if (action === "add") {
        add(options[action]);
    }
    else if (action === "remove") {
        remove(options[action]);
    }
    else if(action === "launch") {
        launch(options[action]);
    }
    else if(action === "update") {
        update();
    }
}
