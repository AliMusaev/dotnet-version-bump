import * as core from '@actions/core';
import fs from 'fs';

const main = async () => {
    try {
        const file = await readFile();
        let index = file.indexOf('<Version>');
        let version = 'v';
        index += 9; // skip version word
        while (file[index] !== '<') {
            version = version + file[index];
        }
        core.setOutput('version', version);
    } catch (err: any) {
        core.setFailed(err.message)
    }
}

const readFile  = async () => {
    const csproj = core.getInput('csprojFile');
    core.debug(`filepath ${csproj}`);
    const file = await fs.promises.readFile(csproj, 'utf-8');
    core.debug(file);
    return file;
}
main();