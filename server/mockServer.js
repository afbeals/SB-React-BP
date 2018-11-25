#! /usr/local/bin/node
const   fs = require('fs'),
        path = require('path');
        commandLineArgs  = require('command-line-args'),
        readline = require('readline'),
        ServiceModule = require('./service/ServiceModule'),
        userJson = path.join(__dirname+'/../src/util/api/data/users.json'),
        stdin = process.stdin,
        stdout = process.stdout,
        optionDefinitions = [
            { name: 'name', alias: 'n', type: String },
        ],
        options = commandLineArgs(optionDefinitions);

const rdl = readline.createInterface({
    input: stdin,
    output: stdout
});

const write = (output) => {
    rdl.write(output);
}
const promptUser = (question,cb) => {
    rdl.question(question, (data)=>{
        cb(data);
    })
};

const init = () => {
    rdl.write('Hello World!\r\n');
    promptUser('How are you doing? \r\n', (answer) => {
        rdl.write('Oh, you\'re feeling ' + answer + '? interesting\r\n');
        //process.exit();
    })
}

init();

process.on('exit', ()=>{
    write('See ya!');
    process.exit();
})
process.on('SIGINT', ()=>{
    write('See ya!');
    process.exit();
});