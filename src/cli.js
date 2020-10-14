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
            "--list": Boolean,

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
        list: args['--list'] || false,
    }

    checkArgumentCount(options);

    return options;
}

function checkArgumentCount(options) {
    let reducer = (accumulator, currentValue) => 
        (currentValue) ? accumulator + 1 : accumulator;

    let result = Object.values(options).reduce(reducer, 0);

    if (result > 1) {
        throw Error('Too many arguments');
    }
    else if (result < 1) {
        throw Error('Please supply an argument');
    }
}

function cli(args) {
    try {
        let options = parseArgumentsIntoOptions(args);
        run(options)
        return 0;
    }
    catch(err) {
        Printer.printError(err);
        return -1;
    }
}

export default {
    parseArgumentsIntoOptions,
    cli
}
