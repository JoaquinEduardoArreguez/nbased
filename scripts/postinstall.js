const styles = require('chalk');

console.log('/' + new Array(process.stdout.columns - 2).fill('=').join('') + '\\');

console.log([
    writeLine(''),
    writeLine('✔ Successfully installed nbased', styles.greenBright),
    writeLine(''),
    writeLine('If you need help, visit https://github.com/aeberdinelli/nbased/wiki'),
    writeLine('You can also check our new CLI by running:', styles.bold),
    writeLine(''),
    writeLine('npm install -g nbased-tools', styles.underline),
    writeLine(''),
].join('\n'));

function writeLine(text, styling = null) {
    if (styling) {
        return '|  ' + styling(text) + new Array(process.stdout.columns - text.length - 6).fill(' ').join('') + '  |';
    }

    return '|  ' + text + new Array(process.stdout.columns - text.length - 6).fill(' ').join('') + '  |';
}

console.log('\\' + new Array(process.stdout.columns - 2).fill('=').join('') + '/');
console.log('');