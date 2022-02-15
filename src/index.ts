import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';

const main = async () => {
    try {
        const csproj = core.getInput('csprojFile');
        console.log(`filepath ${csproj}`);
        const file = await fs.promises.readFile(csproj, 'utf-8');
        console.log(file);
        let index = file.includes('<Version>');
        if (index === false) {
            throw new Error('Not found version row');   
        }
        console.log('index ' + index)
        // let version :string = 'v';
        // index += 9; // skip version word
        // while (file[index] !== '<') {
        //     version = version + file[index];
        // }
        // core.setOutput('version', version);
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    } catch (err: any) {
        core.setFailed(err.message)
    }
}

main();

