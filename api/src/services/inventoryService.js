const ConstraintError = require('../errors/constraintError');

class InventoryService {
    constructor() {}
    async addProduct(productId, quantity) {
        // Lógica para agregar un producto al inventario
    }
    
    async moveProduct(productId, fromLocationId, toLocationId, quantity) {
        // Lógica para mover un producto entre ubicaciones
    }

    async getInventory() {
        // Lógica para obtener el inventario actual
    }
}

module.exports = InventoryService;
