const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

interface Arguments {
    from?: string;
    to?: string;
    only?: string | string[];
    exclude?: string | string[];
    space?: number | string;
}

const argv = minimist(process.argv.slice(2)) as Arguments;
if (!argv.from || 'string' !== typeof argv.from) {
    console.error("Missing or invalid `--from` option");
    process.exit(-1);
}
if (!path.isAbsolute(argv.from)) {
    argv.from = process.cwd() + `/${argv.from}`;
}
if (!fs.existsSync(argv.from)) {
    console.error(`File ${argv.from} does not exist`);
    process.exit(-2);
}
const jsonContents = require(argv.from as string);
if ("object" !== typeof jsonContents) {
    console.error("File have to container JSON object");
    process.exit(-3);
}

if (!argv.to) {
    argv.to = argv.from;
}

const newObject = {};

if (argv.only) {
    if (!Array.isArray(argv.only)) {
        argv.only = [argv.only];
    }

    argv.only
        .filter((property: string) => jsonContents[property] !== undefined)
        .forEach((property: string) => newObject[property] = jsonContents[property]);
} else if (argv.exclude) {
    const exclude: string[] = Array.isArray(argv.exclude) ? argv.exclude : [argv.exclude];

    Object.keys(jsonContents)
        .filter((property) => !exclude.includes(property))
        .forEach((property) => newObject[property] = jsonContents[property]);
} else {
    console.error(`No options for filtering: --only or --exclude options should be specified`);
    process.exit(-4);
}

fs.writeFileSync(argv.to, JSON.stringify(newObject, undefined, argv.space));
