import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";
import UserRepository from "../repository/UserRepository";

// Abstract Factory
export default interface RepositoryFactory {
	createPassengerRepository (): PassengerRepository;
	createDriverRepository (): DriverRepository;
	createUserRepository (): UserRepository;
}
