
import { promiseExec, userInput } from "./script-utils.mjs";
import { scriptMeta } from "./scripts-meta.mjs";

const getCommands = {
    "add-all": `git add -A`,
    "commit-message": `git commit -m`,
    "commit-file-message": `git commit -a`
}

export async function commit() {
    const branch = await userBranch();

    await promiseExec(getCommands["add-all"])
        .catch(error => console.error(error));

    if (process.argv.includes("-m")) {
        let comments = "";
        if (process.argv.indexOf("-m") === process.argv.length - 2)
            comments = process.argv[process.argv.indexOf("-m") + 1];
        else
            comments = await userInput('What is your commit message?');

        if (!comments) {
            console.log("⚠️", "batch-git-user-input cancelled: no user input");
            return;
        }
        await promiseExec(`${getCommands["commit-message"]} "${comments}"`)
            .catch(error => console.error(error));
    } else if (process.argv.includes("-a")) {
        await promiseExec(getCommands["commit-file-message"])
            .catch(error => console.error(error));
    } else {
        await promiseExec(`${getCommands["commit-message"]} "Quick Commit"`)
            .catch(error => console.error(error));
    }
    return await promiseExec(`git push origin ${branch} -u`)
        .catch(error => console.error(error));
}

export async function userBranch() {
    const meta = await scriptMeta();
    if (meta.git.branch !== meta.user.git.branch)
        await promiseExec(`git checkout ${meta.user.git.branch}`).catch(error => console.error(error, "Error switching git to user branch."));
    return meta.user.git.branch;
}
