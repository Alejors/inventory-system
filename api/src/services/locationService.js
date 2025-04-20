class LocationService {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }

    async create(locationData) {
        return await this.locationRepository.create(locationData);
    }

    async findById(id) {
        return await this.locationRepository.findById(id);
    }

    async findAll() {
        return await this.locationRepository.findAll();
    }

    async update(id, locationData) {
        return await this.locationRepository.update(id, locationData);
    }

    async delete(id) {
        return await this.locationRepository.delete(id);
    }
}

module.exports = LocationService;