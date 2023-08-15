import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/user/User";
import DatabaseConnection from "../database/DatabaseConnection";

export default class UserRepositoryDatabase implements UserRepository {

	constructor (readonly connection: DatabaseConnection) {
	}
	
	async save(user: User): Promise<void> {
		await this.connection.query("insert into cccat12.user (user_id, email, password, salt, password_type) values ($1, $2, $3, $4, $5)", [user.userId, user.email.value, user.password.value, user.password.salt, user.passwordType]);
	}
	
	async getByEmail(email: string): Promise<User> {
		const [userData] = await this.connection.query("select * from cccat12.user where email = $1", [email]);
		return User.restore(userData.user_id, userData.email, userData.password, userData.password_type, userData.salt);
	}
	
}
