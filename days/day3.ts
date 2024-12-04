import { readFileSync } from 'fs';

const input: string = readFileSync('./days/day3input.txt', 'utf-8');

/* PART 1 */
const totalFinder = (input: string) => {
    const regex = /mul\(([0-9]+),([0-9]+)\)/g;
    let res = regex.exec(input);

    let total = 0;
    while (res) {
        if (res) {
            total += parseInt(res[1]) * parseInt(res[2]);
        }
        res = regex.exec(input);
    }

    return total;
}

console.log(totalFinder(input));

/* PART 2 */
const regex = /(((do\(\)).*?don't\(\))|do\(\).*|^.*?don't\(\))/gs;
let res = regex.exec(input);

let total = 0;
while (res) {
    total += totalFinder(res[0]);
    res = regex.exec(input);
}

console.log(total);