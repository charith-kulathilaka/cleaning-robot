const readline = require('readline')

const { startCleaningProcess } = require('../src/robotCleaner.js')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

startCleaningProcess(rl);
