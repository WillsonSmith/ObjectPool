# Object Object Pool

A manual memory management tool for JavaScript.

Examples.

```js
let pointPool = new ObjectPool();
let pointOne = pointPool.alloc();
// {}
pointOne.x = 5;
pointTwo.x = 5;

console.log(pointPool.totalAllocated)
// 1
console.log(pointPool.totalFree)
// 0

pointPool.free(pointOne);
pointOne = null;
console.log(pointPool.totalAllocated)
// 1
console.log(pointPool.totalFree)
// 1
```

```js
let pointPool = new ObjectPool(5);
let pointOne = pointPool.alloc();
// {}
pointOne.x = 5;
pointTwo.x = 5;

console.log(pointPool.totalAllocated)
// 5
console.log(pointPool.totalFree)
// 4

pointPool.collect();

console.log(pointPool.totalAllocated)
// 1
console.log(pointPool.totalFree)
// 0
```