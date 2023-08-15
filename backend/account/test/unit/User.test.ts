import UUIDGenerator from "../../src/domain/identity/UUIDGenerator";
import User from "../../src/domain/user/User";

test("Deve criar um novo usuário com senha plain", function () {
	const user = User.create("john.doe@gmail.com", "123456", "plain");
	expect(user.userId).toBeDefined();
	expect(user.email.value).toBe("john.doe@gmail.com");
	expect(user.password.value).toBe("123456");
});

test("Deve restaurar um usuário existente", function () {
	const userId = UUIDGenerator.create();
	const user = User.restore(userId, "john.doe@gmail.com", "123456", "plain");
	expect(user.userId).toBe(userId);
	expect(user.email.value).toBe("john.doe@gmail.com");
	expect(user.password.value).toBe("123456");
});

test("Deve criar um novo usuário com senha encriptada", function () {
	const user = User.create("john.doe@gmail.com", "123456", "sha1");
	expect(user.userId).toBeDefined();
	expect(user.email.value).toBe("john.doe@gmail.com");
	expect(user.password.value).toBe("7c4a8d09ca3762af61e59520943dc26494f8941b");
});

test("Deve validar um usuário existente com senha plain", function () {
	const userId = UUIDGenerator.create();
	const user = User.restore(userId, "john.doe@gmail.com", "123456", "plain");
	expect(user.validatePassword("123456")).toBe(true);
});

test("Deve validar um usuário existente com senha encriptada", function () {
	const userId = UUIDGenerator.create();
	const user = User.restore(userId, "john.doe@gmail.com", "7c4a8d09ca3762af61e59520943dc26494f8941b", "sha1");
	expect(user.validatePassword("123456")).toBe(true);
});

test("Deve criar um novo usuário com senha encriptada com pbkdf2", function () {
	const user = User.create("john.doe@gmail.com", "123456", "pbkdf2");
	expect(user.userId).toBeDefined();
	expect(user.email.value).toBe("john.doe@gmail.com");
});

test("Deve validar um usuário existente com senha encriptada com pbkdf2", function () {
	const userId = UUIDGenerator.create();
	const salt = "df96fc9ef1f24caceb691edea3b680b47cb89753";
	const password = "26a0fe45769793ba6ab0cb5f0abbb30f57e81b6b351e2ea1b304bd2c9acb05d65cc27a605a8a1551bb39b635cc67aaf0d46facf1a2aeae927a346bdc48253406";
	const user = User.restore(userId, "john.doe@gmail.com", password, "pbkdf2", salt);
	expect(user.validatePassword("123456")).toBe(true);
});
