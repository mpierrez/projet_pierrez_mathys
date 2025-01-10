import { Cake } from "../../models/cake";

export class AddCake {
  static readonly type = '[Cake] Add';
  constructor(public payload: Cake) {}
}

export class RemoveCake {
  static readonly type = '[Cake] Remove';
  constructor(public payload: Cake) {}
}

export class RemoveCakesOfType {
  static readonly type = '[Cake] RemoveOfType';
  constructor(public payload: Cake) {}
}
