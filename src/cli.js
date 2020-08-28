import arg from 'arg'
import Printer from './utils/printer'
import { run } from './main'

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            // Main
            "--add": String,
            "--remove": String,
            "--launch": String,
            "--update": Boolean,

            // Aliases
            "-a": "--add",
            "-r": "--remove",
            "-l": "--launch",
            "-u": "--update",
        },
        {
            argv: rawArgs.slice(2),
            stopAtPositional:true,
        }
    );

    if (args._.length > 0) {
        throw Error("Unknown argument")
    }

    let options = {
        add: args['--add'] || null,
        remove: args['--remove'] || null,
        launch: args['--launch'] || null,
        update: args['--update'] || false,
    }

    if (checkIfMoreThanOne(options)) {
        throw Error("Too many arguments!");
    }

    return options;
}

function checkIfMoreThanOne(options) {
    let count = 0;

    if (options.add) {
        count++;
    }

    if (options.remove) {
        count++;
    }

    if (options.launch) {
        count++;
    }

    if (options.update) {
        count++;
    }

    if (count > 1) {
        return true;
    }

    return false;
}

export function cli(args) {
    try {
        let options = parseArgumentsIntoOptions(args);
        run(options)
    }
    catch(err) {
        Printer.printError(err);
        return;
    }
}
