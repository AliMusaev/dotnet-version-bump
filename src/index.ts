import * as core from '@actions/core';
import * as github from '@actions/github';
const { promises: fs } = require('fs')

try {
    const csproj = core.getInput('csprojFile');
    console.log(`filepath ${csproj}`);
    fs.readFile(csproj, 'utf-8').then( (file: string | string[]) => {
        console.log(file);
        let index = file.indexOf('<Version>');
        if (index === -1) {
            throw new Error('Not found version row');   
        }
        let version :string = 'v';
        index += 9; // skip version word
        while (file[index] !== '<') {
            version = version + file[index];
        }
        core.setOutput('version', version);
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    }).catch(function (err: any) {
            throw err;
        });
    
} catch (error: any) {
    core.setFailed(error.message);
}