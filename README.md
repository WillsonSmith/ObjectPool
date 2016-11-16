# Object Object Pool 

[![Build Status](https://travis-ci.org/WillsonSmith/ObjectPool.svg?branch=master)](https://travis-ci.org/WillsonSmith/ObjectPool)

A manual memory management tool for JavaScript.

## Why?
Sometimes you have a lot of objects. Sometimes having those garbage collect causes some sawtooth ugliness
![ugly sawtooth memory allocation in chrome devtools](http://cl.willsonsmith.com/0h3Y0a2V3Y3t/0tpPQ.png)

### OK but why is this bad?
Garbage collection can be slow, especially if you're working with a lot of objects.
Sometimes it is better to allocate a bunch of objects you need and just reuse them.
[see this dope article](https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/)


## API
The API for this is fairly simple and straight forward. You have an `alloc()` method, a `free(object)` method, and a `collect()` method available.

### constructor
the constructor for an ObjectPool has an optional number of objects you can give it. If you pass a number, it will preallocate that many objects.

```js
let pool = new ObjectPool();
console.log(pool.status.totalAllocated);
// 0

let poolPreAlloc = new ObjectPool(5);
console.log(pool.status.totalAllocated);
// 5

```

The following all assume you have created an object pool.

```js
let pool = new ObjectPool();
```

### alloc()
This will assign `myObject` to be `{}`. You can use this object as you wish.
When you are done with this obect you can `free` it.
```js
console.log(pool.status.totalAllocated)
// 0

let myObject = pool.alloc();
// {}
console.log(pool.status.totalAllocated)
// 1
console.log(pool.status.totalFree)
// 0
```

### free()
When you are finished with an object, calling `pool.free(object)` will mark it as free to use again.
When you do this, you should also mark your reference to the object as `null`.

```js
let myObject = pool.alloc();
// {}
console.log(pool.status.totalAllocated)
// 1
console.log(pool.status.totalFree)
// 0
pool.free(myObject); // internally recycles object
myObject = null;
console.log(pool.status.totalAllocated)
// 1
console.log(pool.status.totalFree)
// 1
```

### collect()
`collect()` will remove all _unused_ objects from your pool. If you have allocated 5 objects, and one is in use,
internally you will have one allocated object and zero free objects. 

```js
let objectOne = pool.alloc();
let objectTwo = pool.alloc();

console.log(pool.status.totalAllocated);
// 2
console.log(pool.status.totalFree);
// 0

pool.free(objectTwo); // internally recycles object
objectTwo = null;

console.log(pool.status.totalAllocated)
// 2
console.log(pool.status.totalFree)
// 1

pool.collect();

console.log(pool.status.totalAllocated)
// 1
console.log(pool.status.totalFree)
// 0
```

