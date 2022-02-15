import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';

const main = async () => {
    try {
        const file = await readFile();
        let index = 2
        console.log('index ' + index)
        // let version :string = 'v';
        // index += 9; // skip version word
        // while (file[index] !== '<') {
        //     version = version + file[index];
        // }
        core.setOutput('version', 2);
    } catch (err: any) {
        core.setFailed(err.message)
    }
}

const readFile  = async () => {
    const csproj = core.getInput('csprojFile');
    console.log(`filepath ${csproj}`);
    const file = await fs.promises.readFile(csproj, 'utf-8');
    console.log(file);
    return file;
}
main();

