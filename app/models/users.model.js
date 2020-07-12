module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		"users",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			fullname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cart: {
				type: DataTypes.ARRAY(DataTypes.BIGINT),
				allowNull: true,
			},
			purchased: {
				type: DataTypes.ARRAY(DataTypes.BIGINT),
				allowNull: true,
			},
		},
		{
			timeStamp: false,
			createdAt: false,
			updatedAt: false,
		}
	);
	Users.sync({ alter: true });
	return Users;
};
