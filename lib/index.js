"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
const fs_1 = __importDefault(require("fs"));
try {
    const csproj = core_1.default.getInput('csprojFile');
    console.log(`filepath ${csproj}`);
    const file = fs_1.default.readFileSync(csproj).toString();
    let index = file.indexOf('<Version>');
    if (index === -1) {
        throw new Error('Not found version row');
    }
    let version = 'v';
    index += 9; // skip version word
    while (file[index] !== '<') {
        version = version + file[index];
    }
    core_1.default.setOutput('version', version);
    const payload = JSON.stringify(github_1.default.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
}
catch (error) {
    core_1.default.setFailed(error.message);
}
