module.exports = (sequelize, DataTypes) => {
	const Movies = sequelize.define(
		"movies",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			year: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			genres: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imdb: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tmdb: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageLink: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			purchasedby: {
				type: DataTypes.STRING,
				defaultValue: "null",
			},
			purchasedtill: {
				type: DataTypes.STRING,
				defaultValue: "null",
			},
		},
		{
			timeStamp: false,
			createdAt: false,
			updatedAt: false,
		}
	);
	Movies.sync({ alter: true });
	return Movies;
};
