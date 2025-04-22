class ProductEvent {
  constructor(id, productId, eventType, previousData, newData, userId, createdAt) {
    this.id = id;
    this.productId = productId;
    this.eventType = eventType;
    this.previousData = previousData;
    this.newData = newData;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  static fromObject(obj) {
    return new ProductEvent(obj.id, obj.productId, obj.eventType, obj.previousData, obj.newData, obj.userId, obj.createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      productId: this.productId,
      eventType: this.eventType,
      previousData: this.previousData,
      newData: this.newData,
      createdAt: this.createdAt,
      userId: this.userId,
    };
  }
}

module.exports = ProductEvent;
