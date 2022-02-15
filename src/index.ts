import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';

try {
    const csproj = core.getInput('csprojFile');
    console.log(`filepath ${csproj}`);
    const file = fs.readFileSync(csproj).toString();
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
} catch (error: any) {
    core.setFailed(error.message);
}