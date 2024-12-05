import { readFileSync } from 'fs';

const input: string = readFileSync('./days/day4input.txt', 'utf-8');
const lines: string[] = input.split("\r\n");


/* PART 1 */
// i really just wanted to use recursion for this one
const searchDirection = (lines: string[], x: number, y: number, cx: number, cy: number, holder: string) => {
    if (!"XMAS".startsWith(holder)) {
        return 0;
    }
    if ("XMAS" == holder) {
        return 1;
    }

    cx += x;
    cy += y;
    holder += lines[cy].charAt(cx);
    return searchDirection(lines, x, y, cx, cy, holder);
};

const startSearchDirection = (lines: string[], x: number, y: number, cx: number, cy: number) => {
    if ((x < 0 && cx - 3 < 0) || (x > 0 && cx + 3 >= lines[0].length) || (y < 0 && cy - 3 < 0) || (y > 0 && cy + 3 >= lines.length)) {
        return 0;
    }

    return searchDirection(lines, x, y, cx, cy, "X");
};

const fanSearch = (lines: string[], x: number, y: number) => {
    let count = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i == 0 && i == j)
                continue;
            count += startSearchDirection(lines, i, j, x, y);
        }
    }

    return count;
};

const scrubForX = (lines: string[]) => {
    let count = 0;

    for (let i = 0; i < lines[0].length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (lines[j].charAt(i) == "X")
                count += fanSearch(lines, i, j);
        }
    }

    return count;
};

console.log(scrubForX(lines));

/* PART 2 */
const accepted = ["M", "S"];

const crossASearch = (lines: string[], x: number, y: number) => {
    let tl = lines[y - 1].charAt(x - 1);
    let tr = lines[y - 1].charAt(x + 1);
    let bl = lines[y + 1].charAt(x - 1);
    let br = lines[y + 1].charAt(x + 1);

    // i'm sure there's a more clever way to do this but w/e
    if (accepted.includes(tl) && accepted.includes(br) && tl != br && (((tl == bl) && (tr == br)) || ((tl == tr) && (bl == br))))
        return 1;

    return 0;
};

const scrubForA = (lines: string[]) => {
    let count = 0;

    for (let i = 1; i < lines[0].length - 1; i++) {
        for (let j = 1; j < lines.length - 1; j++) {
            if (lines[j].charAt(i) == "A")
                count += crossASearch(lines, i, j);
        }
    }

    return count;
};

console.log(scrubForA(lines));