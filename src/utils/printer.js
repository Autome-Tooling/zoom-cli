import chalk from 'chalk'

export default class Printer {
    static printError(err) {
        console.log(`${chalk.red("ERROR:")} ${err.message}`);
    }
    
    static printSuccess(message) {
        console.log(`${chalk.green("SUCCESS:")} ${message}`);
    }

    static printMessage(message) {
        console.log(message);
    }
}