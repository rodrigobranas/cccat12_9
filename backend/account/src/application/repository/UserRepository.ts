import User from "../../domain/user/User";

export default interface UserRepository {
	save (user: User): Promise<void>;
	getByEmail (email: string): Promise<User>;
}
