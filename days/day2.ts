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
let safe2 = 0;

// i'm allowed a little brute forcing as a treat
const signFinder = (report: number[]) => {
    let holder = 0;
    for (let i = 1; i < report.length; i++) {
        holder += report[i] - report[i - 1];
    }
    return Math.sign(holder);
}

const brokenIndex = (report: number[], signer) => {
    // makes all lists ascending
    const r: number[] = report.map(e => e * signer);

    let prev = r[0];
    for (let i = 1; i < r.length; i++) {
        if (!(r[i] > prev && r[i] <= prev + 3)) {
            return i - 1;
        }
        prev = r[i];
    }

    return -1;
}

for (const line of lines) {
    const reportString: string[] = line.split(" ");
    const report: number[] = reportString.map(e => parseInt(e));
    const signer = signFinder(report);

    const breaker = brokenIndex(report, signer);

    if (breaker < 0 || brokenIndex(report.filter((_, i) => breaker != i), signer) < 0 || brokenIndex(report.filter((_, i) => breaker + 1 != i), signer) < 0)
        safe2++;
}

console.log(safe2);