exports.get = (req, res) => {

const cakes = [
		{
			name: "Gâteau au chocolat",
			type: "Chocolat",
			ingredients: ["farine", "sucre", "cacao", "beurre", "oeufs"],
			weight: 210,
			price: 25.00,
			description: "Un délicieux gâteau au chocolat moelleux.",
			recipeUrl: "https://www.croquonslavie.fr/recettes/gateau-chocolat-0",
			imageUrl: "https://www.croquonslavie.fr/sites/default/files/srh_recipes/786c9164177d449db9ac600b253d7956.jpeg"
		},
		{
			name: "Gâteau Red Velvet",
			type: "Chocolat",
			ingredients: ["farine", "sucre", "cacao", "colorant rouge", "crème"],
			weight: 325,
			price: 35.00,
			description: "Un gâteau rouge au chocolat avec un glaçage crémeux.",
			recipeUrl: "https://www.ricardocuisine.com/recettes/8622-gateau-red-velvet",
			imageUrl: "https://images.ricardocuisine.com/services/recipes/8622.jpg"
		},
		{
			name: "Brownies au chocolat et noix de pécan",
			type: "Chocolat",
			ingredients: ["farine", "sucre", "cacao", "noix de pécan", "beurre", "oeufs"],
			weight: 280,
			price: 30.00,
			description: "Un gâteau au chocolat avec des noix de pécan, fondant et croquant.",
			recipeUrl: "https://www.marmiton.org/recettes/recette_brownies-aux-noix-de-pecan_15024.aspx",
			imageUrl: "https://assets.afcdn.com/recipe/20200907/113974_w1024h576c1cx1061cy706cxt0cyt0cxb2122cyb1413.webp"
		},
		{
			name: "Fondant au chocolat au coeur coulant",
			type: "Chocolat",
			ingredients: ["farine", "sucre", "cacao", "beurre", "oeufs", "chocolat"],
			weight: 125,
			price: 15.00,
			description: "Un gâteau au chocolat avec un coeur coulant de chocolat.",
			recipeUrl: "https://empreintesucree.fr/fondant-au-chocolat/",
			imageUrl: "https://empreintesucree.fr/wp-content/uploads/2018/02/1-fondant-chocolat-recette-patisserie-empreinte-sucree-1.jpg"
		},
		{
			name: "Gâteau aux fraises",
			type: "Fruits",
			ingredients: ["farine", "sucre", "fraises", "crème", "oeufs"],
			weight: 280,
			price: 30.00,
			description: "Un gâteau léger et frais garni de fraises.",
			recipeUrl: "https://sweetlycakes.com/gateau-aux-fraises/",
			imageUrl: "https://sweetlycakes.com/wp-content/uploads/2023/08/strawberrycake-13.jpg"
		},
		{
			name: "Gâteau au citron",
			type: "Fruits",
			ingredients: ["farine", "sucre", "jus de citron", "beurre", "oeufs"],
			weight: 245,
			price: 22.00,
			description: "Un gâteau frais et acidulé parfait pour l'été.",
			recipeUrl: "https://www.cuisineaz.com/recettes/gateau-au-citron-moelleux-80428.aspx",
			imageUrl: "https://img.cuisineaz.com/660x660/2023/04/12/i192692-gateau-au-citron-moelleux.jpg"
		},
		{
			name: "Gâteau aux pommes",
			type: "Fruits",
			ingredients: ["farine", "sucre", "pommes", "beurre", "oeufs"],
			weight: 220,
			price: 25.00,
			description: "Un gâteau moelleux aux pommes, parfait pour le goûter.",
			recipeUrl: "https://aufilduthym.fr/gateau-aux-pommes-ancienne/",
			imageUrl: "https://aufilduthym.fr/wp-content/uploads/2023/09/gateau-pommes-ancienne-aft-scaled.jpg"
		},
		{
			name: "Gâteau à la noix de coco",
			type: "Fruits",
			ingredients: ["farine", "sucre", "noix de coco", "beurre", "oeufs"],
			weight: 330,
			price: 25.00,
			description: "Un gâteau exotique à la noix de coco, parfait pour les amateurs de coco.",
			recipeUrl: "https://cookidoo.fr/recipes/recipe/fr-FR/r134112",
			imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/CE29196B-BE9F-458F-BCF8-8F64ABD54941/Derivates/B8ED4B20-1E23-49F1-9D7F-9C944682D1C3.jpg"
		},
		{
			name: "Gâteau vanille classique",
			type: "Vanille",
			ingredients: ["farine", "sucre", "beurre", "oeufs", "extrait de vanille"],
			weight: 310,
			price: 20.00,
			description: "Un classique, moelleux et parfumé à la vanille.",
			recipeUrl: "https://cookidoo.fr/recipes/recipe/fr-FR/r145334",
			imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/1830C94F-5A5E-4FEF-AA4F-A01AFEEAACCD/Derivates/FD862711-88C7-4CE9-AB4F-F5497EC6B8F6.jpg"
		},
		{
			name: "Gâteau vanille à la crème",
			type: "Vanille",
			ingredients: ["farine", "sucre", "beurre", "oeufs", "extrait de vanille", "crème"],
			weight: 240,
			price: 28.00,
			description: "Un gâteau moelleux à la vanille garni de crème.",
			recipeUrl: "https://francais.redpathsugar.com/recettes/gateau-etage-la-vanille",
			imageUrl: "https://francais.redpathsugar.com/sites/francais_redpathsugar_com/files/styles/m/public/Vanilla_Layer_Cake_500x400.png.webp?itok=eHj0I3WK"
		},
		{
			name: "Gâteau au caramel",
			type: "Caramel",
			ingredients: ["farine", "sucre", "beurre", "caramel", "oeufs"],
			weight: 360,
			price: 30.00,
			description: "Un gâteau gourmand au caramel, fondant et délicieux.",
			recipeUrl: "https://www.regilait.com/recettes/gateau-au-yaourt-et-caramel-au-beurre-sale/",
			imageUrl: "https://www.regilait.com/app/uploads/2020/09/gateau_yaourt_caramel_regilait.jpg"
		},
		{
			name: "Gâteau au caramel salé",
			type: "Caramel",
			ingredients: ["farine", "sucre", "beurre", "caramel salé", "oeufs"],
			weight: 290,
			price: 32.00,
			description: "Un gâteau au caramel salé, parfait pour les gourmands.",
			recipeUrl: "https://cookidoo.ca/recipes/recipe/fr-CA/r145342",
			imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/B4B142E0-164D-4B77-9D4B-A6F1777E8992/Derivates/5CDA8F4B-FB72-4D13-95ED-E6A427B634BC.jpg"
		},
		{
			name: "Gâteau au carambar",
			type: "Caramel",
			ingredients: ["farine", "sucre", "beurre", "carambar", "oeufs"],
			weight: 240,
			price: 35.00,
			description: "Un gâteau au carambar, fondant et délicieux.",
			recipeUrl: "https://www.papillesetpupilles.fr/2012/10/cake-aux-carambar-recette-facile-et-inratable.html/",
			imageUrl: "https://www.papillesetpupilles.fr/wp-content/uploads/2012/10/Cake-aux-Carambar-1.jpg"
		},
		{
			name: "Gâteau au café",
			type: "Café",
			ingredients: ["farine", "sucre", "café", "beurre", "oeufs"],
			weight: 350,
			price: 35.00,
			description: "Un gâteau parfumé au café, idéal pour les amateurs de caféine.",
			recipeUrl: "https://www.guydemarle.com/recettes/cake-moelleux-au-cafe-36781",
			imageUrl: "https://www.guydemarle.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNlRLQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--187550f52df7f9ea933fb1b40182e47ed7f6e97f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VWTI5dFltbHVaVjl2Y0hScGIyNXpld2c2QzNKbGMybDZaVWtpRFRZd01IZzJNREJlQmpvR1JWUTZER2R5WVhacGRIbEpJZ3REWlc1MFpYSUdPd2RVT2dsamNtOXdTU0lRTmpBd2VEWXdNQ3N3S3pBR093ZFUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--929a1958a8630156464b089800ca739f1b4570de/blob"
		},
		{
			name: "Gâteau au café moka",
			type: "Café",
			ingredients: ["farine", "sucre", "café", "chocolat", "beurre", "oeufs"],
			weight: 240,
			price: 38.00,
			description: "Un gâteau au café moka, riche en saveurs.",
			recipeUrl: "https://www.meilleurduchef.com/fr/recette/moka.html",
			imageUrl: "https://files.meilleurduchef.com/mdc/photo/recette/moka/moka-1200.jpg"
		},
		{
			name: "Gâteau aux amandes",
			type: "Amandes",
			ingredients: ["farine", "sucre", "amandes", "beurre", "oeufs"],
			weight: 220,
			price: 30.00,
			description: "Un gâteau moelleux aux amandes, parfait pour le goûter.",
			recipeUrl: "https://www.passionnutrition.com/2016-03-gateau-aux-amandes/",
			imageUrl: "https://i0.wp.com/www.passionnutrition.com/wp-content/uploads/2016/03/gateau-amandes.jpeg?fit=1253%2C835&ssl=1"
		},
		{
			name: "Gâteau aux amandes et miel",
			type: "Amandes",
			ingredients: ["farine", "sucre", "amandes", "miel", "beurre", "oeufs"],
			weight: 210,
			price: 32.00,
			description: "Un gâteau aux amandes et miel, doux et savoureux.",
			recipeUrl: "https://gateaux-et-delices.com/gateau-au-miel-et-aux-amandes/",
			imageUrl: "https://gateaux-et-delices.com/wp-content/uploads/2016/10/G%C3%A2teau-au-Miel-et-aux-Amandes.jpg"
		},
		{
			name: "Gâteau aux amandes à la fleur d'oranger",
			type: "Amandes",
			ingredients: ["farine", "sucre", "amandes", "fleur d'oranger", "beurre", "oeufs"],
			weight: 230,
			price: 34.00,
			description: "Un gâteau parfumé à la fleur d'oranger et aux amandes.",
			recipeUrl: "https://cookidoo.ch/recipes/recipe/fr-CH/r773515",
			imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/42118f7fb9b29cc5890fcc6cddeaa35b/Derivates/6049b3b87acf9ebacb530efb548f58a3dec25c73.jpg"
		},
		{
			name: "Gâteau à la pistache",
			type: "Fruits",
			ingredients: ["farine", "sucre", "pistaches", "beurre", "oeufs"],
			weight: 260,
			price: 35.00,
			description: "Un gâteau à la pistache, riche en saveurs.",
			recipeUrl: "https://www.academiedugout.fr/recettes/cake-a-la-pistache_15381_2",
			imageUrl: "https://www.academiedugout.fr/images/73666/948-580/cakiiit.jpg?poix=50&poiy=50"
		},
		{
			name: "Gâteau à la cerise",
			type: "Fruits",
			ingredients: ["farine", "sucre", "cerises", "beurre", "oeufs"],
			weight: 280,
			price: 30.00,
			description: "Un gâteau moelleux aux cerises, parfait pour le goûter.",
			recipeUrl: "https://www.cuisineaz.com/recettes/gateau-aux-cerises-fraiches-105239.aspx",
			imageUrl: "https://img.cuisineaz.com/660x495/2018/12/12/i145059-gateau-cerise-fraiche.webp"
		},
		{
			name: "Gâteau au yaourt",
			type: "Nature",
			ingredients: ["farine", "sucre", "yaourt", "beurre", "oeufs"],
			weight: 300,
			price: 20.00,
			description: "Un gâteau simple, délicieux et moelleux.",
			recipeUrl: "https://cuisinons-tous.com/desserts/desserts-gateaux-et-tartes/gateau-au-yaourt-sans-farine/",
			imageUrl: "https://cuisinons-tous.com/wp-content/uploads/2024/03/gateau-yaourt-sans-farine-recette-500x500.jpeg"
		}
		]
		
res.setHeader('Content-Type', 'application/json');
	
res.send(cakes);

};    	