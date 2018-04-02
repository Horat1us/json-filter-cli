# Json Filter (CLI)
Simple console utility that takes JSON file and removes some properties from main object.
## Installation
```bash
npm i -g json-filter-cli
```
## Usage
For example, you have `input.json`:
```json
{
  "a": 1,
  "b": 2,
  "c": 3
}
```
then, when you run 
```bash
json-filter --from=input.json --to=output.json --only=a --only=b --space=2
```
you will get `output.json` that contains:
```json
{
  "a": 1,
  "b": 2
}
```

## Options
- If no `--from` argument specified error will be returned.
- If `--only` arguments present, all properties except specified as arguments will be removed.
- If `--except` arguments present, all properties that specified as arguments will be removed.
- If `--to` argument specified output will be saved in specified path.
If no `--to` argument present input file will be overwritten.
- `--space` - see third argument of *JSON.stringify* function.

## Authors
- [Alexander <horat1us> Letnikow](mailto:reclamme@gmail.com)

## License
[MIT](./LICENSE)
