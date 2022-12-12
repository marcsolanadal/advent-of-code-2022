# Day 11

- Keep away game
- Monkeys make desicions depending on worry level
- `Starting items` in order they will be inspected.

### parse()

```ts
interface Monkey {
  count: number;
  items: Array<number>;
  operation: (old: number) => number;
  test: number;
  receivers: Array<number>;
  turn: (void) => void
}
```

### round()

- A `round` is when all monkeys had a turn.
- `monkeyBusness` is the times the most active monkeys have inspected `items`.
- We need to have a round counter.

```ts
function round(N: number) {
  for (let round = 0; round < N; round++) {
    monkeys.forEach((monkey) => monkey.turn());
  }
}
```

### turn()

- No `items` at the start of the turn -> skip monkey

```ts
function turn() {
  for (let item of items) {
    // increase inspected item count
    count += 1;

    // calculate new worry level
    const worryLevel = Math.truncate(operation(item) / 3);

    // find which monkey will receive the item
    const monkeyIndex = worryLevel % test === 0 ? receivers[0] : receivers[1];

    monkey[monkeyIndex].items.push(worryLevel);
  }
}
```

### inspect()

- Monkeys take turns inspecting and throwing
- A `turn` is when all items have been inspected and thrown.

1. Monkey inspects item
2. Worry level is increased by `operation`
3. Worry level is divided by 3

### throw()

- Received items go to the end of the `items` list.
