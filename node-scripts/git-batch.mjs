
import { promiseExec, userInput } from "./script-utils.mjs";
import { scriptMeta } from "./scripts-meta.mjs";

const getCommands = {
    "add-all": `git add -A`,
    "commit-message": `git commit -m`,
    "commit-file-message": `git commit -a`
}

export async function commit() {
    const branch = await userBranch();
    let aFlag = false;
    await promiseExec(getCommands["add-all"]);

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
        await promiseExec(`${getCommands["commit-message"]} "${comments}"`);
    } else if (process.argv.includes("-a")) {
        await promiseExec(getCommands["commit-file-message"]);
        console.log("Test")
    } else {
        await promiseExec(`${getCommands["commit-message"]} "Quick Commit"`);
    }

    // if (!aFlag)
    //     push();
    // else
    //     console.log(`Don't forget to run: npm run push`);
}

export async function push() {
    const meta = await scriptMeta();
    return await promiseExec(`git push origin ${meta.user.git.branch} -u`)
        .catch(error => console.error("Unknown error: ", error))

}

export async function userBranch() {
    const meta = await scriptMeta();
    if (meta.git.branch !== meta.user.git.branch)
        await promiseExec(`git checkout ${meta.user.git.branch}`).catch(error => console.error(error, "Error switching git to user branch."));
    return meta.user.git.branch;
}

/* 
gitChanges doesn't work if the files were already added to the queue.

if (!changes) {
    console.log(`Commit Cancelled: ${branch} is up to date.`);
    return;
}

export async function gitChanges() {
    return await promiseExec(`git ls-files --others --exclude-standard`);

    const changes = await gitChanges();
}

*/
