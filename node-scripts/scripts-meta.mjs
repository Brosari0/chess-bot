import { __dirname, fs, promiseExec, require } from './script-utils.mjs';
export const userSettingsPath = "./user-setting.json";

export async function scriptMeta() {
    const path = __dirname + userSettingsPath.substring(1);

    if (!fs.existsSync(path)) {
        const branch = await getCurrentBranch();
        const settings = { "git": { branch } };
        let data = JSON.stringify(settings, null, 2);
        fs.writeFileSync(path, data);
    }

    const git = await gitMeta();
    const user = require(path);
    return {
        git, user
    }
}

async function gitMeta() {
    let branch = await getCurrentBranch();
    return {
        branch
    }
}

export async function getCurrentBranch() {
    const branch = await promiseExec(`git branch --show-current`);
    return branch.replace(/\\n/g, '').replace(/\n/g, '');
}
