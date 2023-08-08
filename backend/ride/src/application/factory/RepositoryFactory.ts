import RideRepository from "../repository/RideRepository";

// Abstract Factory
export default interface RepositoryFactory {
	createRideRepository (): RideRepository;
}
