# Package Sorter — Robotic Arm Dispatch

Sorts packages into **STANDARD**, **SPECIAL**, or **REJECTED** stacks based on volume and mass.

## Rules

- **Bulky**: volume (W × H × L) ≥ 1,000,000 cm³ **or** any dimension ≥ 150 cm  
- **Heavy**: mass ≥ 20 kg  

| Stack      | Condition                          |
|-----------|-------------------------------------|
| STANDARD  | Not bulky and not heavy            |
| SPECIAL   | Bulky or heavy (but not both)      |
| REJECTED  | Both bulky and heavy               |

## Quick Start

```bash
npm install
npm run build   # compile TypeScript
npm test        # run tests
```

## API

```ts
function sort(width: number, height: number, length: number, mass: number): string
```

- **Parameters**: `width`, `height`, `length` in **cm**; `mass` in **kg**
- **Returns**: `"STANDARD"` | `"SPECIAL"` | `"REJECTED"`

## Example

```ts
import { sort } from "./src/sort";

sort(100, 100, 100, 10);  // "SPECIAL" (bulky: volume = 1,000,000)
sort(10, 10, 10, 20);     // "SPECIAL" (heavy)
sort(100, 100, 100, 20);  // "REJECTED" (bulky and heavy)
sort(50, 50, 50, 10);     // "STANDARD"
```

## Tests

Tests cover:

- STANDARD: small/light, volume just below 1M, mass just below 20 kg  
- SPECIAL: bulky by volume or by dimension; heavy only  
- REJECTED: both heavy and bulky  
- Boundaries: volume 999,999 vs 1,000,000; dimensions 149 vs 150; mass 19 vs 20  

Run: `npm test`
