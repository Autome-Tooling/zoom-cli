import fs from 'fs'
import open from 'open'
import ora from 'ora'
import Printer from './utils/printer'
import Installer from './utils/installer'

function add(room, configService) {
    const pair = room.split(/:(.+)/);
    let configJson = configService.getJSONFromFile();
    
    if (Object.keys(configJson.rooms).includes(pair[0])) {
        throw Error("This room already exists")
    }
    else {
        configJson.rooms[pair[0]] = pair[1];
        fs.writeFileSync(configService.getPath(), JSON.stringify(configJson));
    }

    Printer.printSuccess("Successfully added room!")
}

function remove(roomName, configService) {
    let configJson = configService.getJSONFromFile();
    let keys = Object.keys(configJson.rooms);
    
    if (keys.includes(roomName)) {
        delete configJson.rooms[roomName];
        fs.writeFileSync(configService.getPath(), JSON.stringify(configJson));
        Printer.printSuccess(`The '${roomName}' room has been removed`);
    }
    else {
        throw Error("This key doesn't exist")
    }
}

function launch(roomName, configService) {
    const configJson = configService.getJSONFromFile();
    if (Object.keys(configJson.rooms).includes(roomName)) {
        open(configJson.rooms[roomName]);
    }
    else {
        throw Error('Invalid room');
    }
}

async function update() {
    let installer = new Installer();
    const spinner = ora();

    spinner.start("Downloading...");
    const exePath = await installer.downloadInstaller();
    spinner.succeed("Downloaded");

    spinner.start("Installing...");
    await installer.executeInstaller(exePath);
    spinner.succeed("Installed");
}

function listRooms(configService) {
    let configJson = configService.getJSONFromFile();

    for (const room in configJson.rooms) {
        Printer.printMessage(`${room}: ${configJson.rooms[room]}`);
    }
}

export function run(options, configService) {
    const action = Object.keys(options).find(key => 
        options[key] != null && options[key] != false);

    switch(action) {
        case "add":
            add(options[action], configService);
            break;
        case "remove":
            remove(options[action], configService);
            break;
        case "launch":
            launch(options[action], configService);
            break;
        case "update":
            update();
            break;
        case "list":
            listRooms(configService);
            break;  
    }
}
