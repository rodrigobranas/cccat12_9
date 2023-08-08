import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";

// Abstract Factory
export default interface RepositoryFactory {
	createPassengerRepository (): PassengerRepository;
	createDriverRepository (): DriverRepository;
}
