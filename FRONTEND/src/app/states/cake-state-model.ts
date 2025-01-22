import { Cake } from "../shared/models/cake";

export class CakeStateModel {
  availableCakes: Cake[]; // tous les gâteaux disponibles (pour la liste des produits)
  cakesInCart: Cake[]; // les gâteaux dans le panier
}
