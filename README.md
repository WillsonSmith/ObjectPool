# Object Object Pool 

[![Build Status](https://travis-ci.org/WillsonSmith/ObjectPool.svg?branch=master)](https://travis-ci.org/WillsonSmith/ObjectPool)

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

## Why?
Sometimes you have a lot of objects. Sometimes having those garbage collect causes some sawtooth ugliness
![ugly sawtooth memory allocation in chrome devtools](http://cl.willsonsmith.com/0h3Y0a2V3Y3t/0tpPQ.png)

### OK but why is this bad?
Garbage collection can be slow, especially if you're working with a lot of objects.
Sometimes it is better to allocate a bunch of objects you need and just reuse them.
[see this dope article](https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/)