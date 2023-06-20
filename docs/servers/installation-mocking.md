# CoreMedia Headless Stitching Server Documentation

[Documentation](../README.md) / Installation and Start (Mocking Server)

---

# Installation and Start (Mocking Server)

The following commands should all be called in the mocking directory.

```bash
cd servers/mocking
```

## Installation

```bash
pnpm install
```

## Usage in default mocking mode

```bash
pnpm start
```
The mocking server is using by default server port 5000, and the sub-directory "mocks"
where all  pre-fabricated mock files are located.

## Usage in advanced recording mode

```bash
mkdir work
./bin/smoke -r http://<commerce-headless-server>/graphql -o all -d 10 work
```
The command line parameters have the following meaning:
```
  -o, --allow-cors [all|<hosts>]    Enable CORS requests  [default: none]
  -r, --record <host>               Proxy & record requests if no mock found
  -d, --depth <N>                   Folder depth for mocks  [default: 1]
```
See [the original smoke documentation](https://github.com/sinedied/smoke/blob/main/README.md) 
to get the full description of all possible command line parameters.

## Usage in advanced replay mode


```bash
mkdir work
./bin/smoke -o all -d 10 work
```
The command line parameters have the following meaning:
```
  -o, --allow-cors [all|<hosts>]    Enable CORS requests  [default: none]
  -d, --depth <N>                   Folder depth for mocks  [default: 1]
```
See [the original smoke documentation](https://github.com/sinedied/smoke/blob/main/README.md) 
to get the full description of all possible command line parameters.
