alias b := build
alias d := dev
alias t := test

build:
    pnpm run build
    echo 'Done building!'

dev:
    pnpm run dev

test:
    pnpm run test

lint:
    pnpm run lint
