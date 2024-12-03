import { readFileSync } from 'fs';

const input: string = readFileSync('./days/day2input.txt', 'utf-8');
const lines: string[] = input.split("\r\n");

/* PART 1 */
let safe = 0;

const isSafe = (report: number[]) => {
    const signer = Math.sign(report[1] - report[0]);

    if (signer == 0) return false;
    // makes all lists ascending
    const r: number[] = report.map(e => e * signer);

    let broken = false;
    let prev = r[0];
    for (let i = 1; i < r.length; i++) {
        if (!(r[i] > prev && r[i] <= prev + 3)) {
            broken = true;
            break;
        }
        prev = r[i];
    }

    return !broken;
}

for (const line of lines) {
    const reportString: string[] = line.split(" ");
    const report: number[] = reportString.map(e => parseInt(e));

    if (isSafe(report)) safe++;
}

console.log(safe);

/* PART 2 */
// i am not proud of this one! :blush:
let safe2 = 0;

for (const line of lines) {
    const reportString: string[] = line.split(" ");
    const report: number[] = reportString.map(e => parseInt(e));

    if (isSafe(report)) safe2++;
    else {
        for (let i = 0; i < report.length; i++) {
            if (isSafe(report.filter((_, index) => i != index))) {
                safe2++;
                break;
            }
        }
    }
}

console.log(safe2);