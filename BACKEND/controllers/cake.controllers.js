const db = require("../models");
const Cakes = db.cakes;
const { Op } = require("sequelize");

exports.get = (req, res) => {
	Cakes.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des gâteaux."
			});
		});
};

exports.search = (req, res) => {
	const name = req.body.name;
	const ingredients = req.body.ingredients;
	const minWeight = req.body.minWeight;
	const maxWeight = req.body.maxWeight;
	const minPrice = req.body.minPrice;
	const maxPrice = req.body.maxPrice;
	const description = req.body.description;
	const typeId = req.body.typeId;

	let condition = {};
	if (name) condition.name = { [Op.iLike]: `%${name}%` };
	if (ingredients) condition.ingredients = ingredients;
	if (minWeight) condition.weight = { [Op.gte]: minWeight };
	if (maxWeight) condition.weight = { [Op.lte]: maxWeight };
	if (minPrice) condition.price = { [Op.gte]: minPrice };
	if (maxPrice) condition.price = { [Op.lte]: maxPrice };
	if (description) condition.description = description;
	if (typeId) condition.cakeTypeId = typeId;

	Cakes.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la recherche des gâteaux."
			});
		});
}