
import { promiseExec, userInput } from "./script-utils.mjs";
import { scriptMeta } from "./scripts-meta.mjs";

export async function commit() {
    const branch = await userBranch();

    const changes = await gitChanges();
    if (!changes) {
        console.log(`Commit Cancelled: ${branch} is up to date.`);
        return;
    }

    const commands = [`git add -A`];

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
        commands.push(`git commit -m "${comments}"`);
    } else if (process.argv.includes("-a")) {
        commands.push(`git commit -a`);
    } else {
        commands.push(`git commit -m "Quick Commit"`);
    }

    await promiseExec(commands.join(` && `))
        .catch(error => console.error("Make sure there are changes to commit", error));

    console.log("Hello")
    if (comments)
        push();
    else
        console.log(`Don't forget to run: npm run push`);
}

export async function gitChanges() {
    return await promiseExec(`git ls-files --others --exclude-standard`);
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