import { createRequire } from "module";
export const require = createRequire(import.meta.url);
export const fs = require('fs');
export const { exec } = require("child_process");
import path from 'path';
import url from 'url';

export { path, url };

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export function promiseExec(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });
    });
}

export async function userInput(question) {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(question, answer => {
            resolve(answer);
            readline.close();
        });
    });
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
