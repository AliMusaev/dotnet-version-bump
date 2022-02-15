import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';

const main = async () => {
    const csproj = core.getInput('csprojFile');
    console.log(`filepath ${csproj}`);
    const file = await fs.promises.readFile(csproj, 'utf-8');
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
}

main().then().catch(err =>  core.setFailed(err.message));