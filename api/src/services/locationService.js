class LocationService {
    constructor(locationRepository, userRepository) {
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }

    async create(locationData, user) {
        const currentUser = await this.userRepository.findById(user.id);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.locationRepository.create(locationData, currentUser);
    }

    async findById(id, user) {
        const currentUser = await this.userRepository.findById(user.id);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.locationRepository.findById(id, currentUser);
    }

    async findAll(user) {
        const currentUser = await this.userRepository.findById(user.id);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.locationRepository.findAll(currentUser);
    }

    async update(id, locationData, user) {
        const currentUser = await this.userRepository.findById(user.id);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.locationRepository.update(id, locationData, currentUser);
    }

    async delete(id, user) {
        const currentUser = await this.userRepository.findById(user.id);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.locationRepository.delete(id, currentUser);
    }
}

module.exports = LocationService;