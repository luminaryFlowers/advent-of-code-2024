import { readFileSync } from 'fs';

const input: string = readFileSync('./days/day1input.txt', 'utf-8');
const lines: string[] = input.split("\r\n");

const list1: number[] = [];
const list2: number[] = [];

for (const line of lines) {
    const split = line.split('   ');
    list1.push(parseInt(split[0]));
    list2.push(parseInt(split[1]));
}

list1.sort();
list2.sort();

/* PART 1 */
let distance = 0;

for (const i in list1) {
    distance += Math.abs(list1[i] - list2[i]);
}

console.log(distance);

/* PART 2 */
const dict2: { [index: number]: number } = {};

let saved = NaN;
for (const num of list2) {
    if (saved != num) {
        dict2[num] = 0;
        saved = num;
    }
    dict2[num]++;
}

let similarity = 0;
for (const num of list1) {
    if (dict2[num])
        similarity += num * dict2[num];
}

console.log(similarity);