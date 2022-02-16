import * as core from '@actions/core';
import fs from 'fs';

const main = async () => {
    try {
        const file = await readFile(core.getInput('filename'));
        let oldVersion = ''
        let newVersion = '';
        
        switch (core.getInput('dotnetVersion')) {
            case '4':
                oldVersion = readVersion(file, 'Version(\"', '\"');
                break;
            case '5':
                oldVersion = readVersion(file, '<Version>', '<');

        }
        newVersion = castArrayVersionToString(upVersion(castStringVersionToArray(oldVersion)));
        const newFile = file.replace(oldVersion, newVersion);
        await fs.promises.writeFile(core.getInput('filename'), newFile);
        core.setOutput('version', newVersion);
    } catch (err: any) {
        core.setFailed(err.message)
    }
}

const updateAssemblyFile = async(filename: string) => {
    const file = await readFile(filename);
    
}

const readVersion = (file: string, substring: string, lastSymbol: string) => {
    let index: number = file.indexOf(substring);
    if (index === -1) {
        throw new Error(`Not found substring ${substring} in file`);
    }
    let version: string = '';
    index += substring.length; // skip version word
    while (file[index] !== lastSymbol) {
        version = version + file[index];
        index++
    }
    return version;
}
const readFile  = async (filename: string) => {
    if (!filename){
        throw new Error('file name is empty')
    }
    const file = await fs.promises.readFile(filename, 'utf-8');
    return file;
}

const upVersion = (version: string[]): string[] => {
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
    return version;
   
}
const castArrayVersionToString = (version: string[]): string => {
    let retVal = ''
    for (let index = 0; index < version.length; index++) {
       retVal = retVal + version[index];
       if (index + 1 !== version.length) {
           retVal = retVal + '.';
       }
    }
    return retVal;
}
const castStringVersionToArray = (version: string): string[] => {
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