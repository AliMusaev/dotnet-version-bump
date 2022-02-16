import * as core from '@actions/core';
import fs from 'fs';

const main = async () => {
    try {
        const file = await readFile();
        let index = file.indexOf('<Version>');
        let version = '';
        index += 9; // skip version word
        while (file[index] !== '<') {
            version = version + file[index];
            index++
        }
        var newVersion = upVersion(getVersion(version))
        const newFile = file.replace(version, newVersion);
        await fs.promises.writeFile(core.getInput('csprojFile'), newFile);
        console.log(await readFile());
        core.setOutput('version', newVersion);
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

const upVersion = (version: string[]): string => {
    let i = 0;
    if(core.getInput('updType') === 'patch'){
        i = 2;
    } else if (core.getInput('updType') === 'minor') {
        i = 1;
    } else if (core.getInput('updType') === 'major') {
        i = 0;
    } else {
        throw new Error('updType is wrong');
    }
    let value = Number(version[i]);
    value++;
    version[i] = value.toString();
    let retVal = ''
    for (let index = 0; index < version.length; index++) {
       retVal = retVal + version[index];
       if (index + 1 !== version.length) {
           retVal = retVal + '.';
       }
    }
    return retVal;
}
const getVersion = (version: string): string[] => {
    let ver: string[] = [];
    let nextPos = 0;
    while (version.indexOf('.', nextPos) !== -1) {
        ver.push(version.slice(nextPos, version.indexOf('.', nextPos)));
        nextPos =  version.indexOf('.', nextPos) + 1
    }
    if (version[version.length -1 ] !== '.'){
        ver.push(version.slice(nextPos));
    }
    
    return ver;
}
main();