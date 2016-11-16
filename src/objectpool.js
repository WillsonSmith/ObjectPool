export default class ObjectPool {
  constructor(objects = 0) {
    this._objectPool = [];
    this.status = {
      totalAllocated: objects,
      totalFree: objects,
    };

    for (let i = 0; i < objects; i++) {
      this._objectPool.push({});
    }
  }

  alloc() {
    if (this._objectPool.length === 0) {
      this.status.totalAllocated++;
      return {};
    }
    this.status.totalFree--;
    return this._objectPool.pop();
  }

  free(obj) {
    this.status.totalFree++;
    this._objectPool.push(obj);
  }

  collect() {
    this._objectPool.length = 0;
    this._clearStatus();
  }

  _clearStatus() {
    const allocated = this.status.totalAllocated - this.status.totalFree;
    this.status.totalAllocated = allocated || 0;
    this.status.totalFree = 0;
  }
}
