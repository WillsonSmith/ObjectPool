var ObjectPool = require('../lib/objectpool').default;

var assert = require('assert');

describe('ObjectPool', function() {
  var pool;
  var allocateWithNumberPool;

  beforeEach(function() {
    pool = new ObjectPool();
    allocateWithNumberPool = new ObjectPool(5);
  });

  afterEach(function() {
    pool = null;
    allocateWithNumberPool = null;
  });

  describe('instantiation', function() {

    it('should allocate the number of objects it is told or zero', function() {
      assert.equal(allocateWithNumberPool.status.totalAllocated, 5);
      assert.equal(allocateWithNumberPool.status.totalFree, 5);
    });

  });

  describe('methods', function() {

    it('adds an allocated item to its status when allocating without any available objects', function() {
      var item = pool.alloc();
      assert.equal(pool.status.totalAllocated, 1);
      assert.equal(pool.status.totalFree, 0);
    });

    it('uses an existing object if available', function() {
      allocateWithNumberPool.alloc();
      assert.equal(allocateWithNumberPool.status.totalAllocated, 5);
      assert.equal(allocateWithNumberPool.status.totalFree, 4);
    });

    it('frees an object when calling free', function() {
      var object = allocateWithNumberPool.alloc();
      assert.equal(allocateWithNumberPool.status.totalFree, 4);
      allocateWithNumberPool.free(object);
      assert.equal(allocateWithNumberPool.status.totalFree, 5);
    });

    it('clears all unallocated objects when calling collect', function() {
      var object = allocateWithNumberPool.alloc();
      allocateWithNumberPool.collect();
      assert.equal(allocateWithNumberPool.status.totalAllocated, 1);
    });

  });

});
