import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CakeStateModel } from './cake-state-model';
import { AddCake, RemoveCake, RemoveCakesOfType } from './actions/cake.action';
import { v4 as uuidv4 } from 'uuid';
import { Cake } from '../shared/models/cake';

@State<CakeStateModel>({
  name: 'cakes',
  defaults: {
    availableCakes: [],
    cakesInCart: [],
  },
})

@Injectable()
export class CakeState {
  @Selector()
  static getAvailableCakes(state: CakeStateModel) {
    return state.availableCakes;
  }

  @Selector()
  static getCakesInCart(state: CakeStateModel) {
    return state.cakesInCart;
  }

  @Selector()
  static getNbCakesInCart(state: CakeStateModel) {
    return state.cakesInCart.length;
  }

  @Selector()
  static getQuantityOfCake(state: CakeStateModel) {
    return (cake: Cake) => state.cakesInCart.filter(item => item.name === cake.name).length;
  }

  @Selector()
  static getTotalPriceOfACake(state: CakeStateModel) {
    return (cake: Cake) => {
      return state.cakesInCart.filter((a) => a.name === cake.name).reduce((acc, a) => acc + a.price, 0);
    };
  }

  @Selector()
  static getSubTotal(state: CakeStateModel) {
    return state.cakesInCart.reduce((acc, a) => acc + a.price, 0);
  }

  @Selector()
  static getTva(state: CakeStateModel) {
    return parseFloat((state.cakesInCart.reduce((acc, a) => acc + a.price, 0) * 0.2).toFixed(2));
  }

  @Selector()
  static getTotalPrice(state: CakeStateModel) {
    return parseFloat((state.cakesInCart.reduce((acc, a) => acc + a.price, 0) * 1.2).toFixed(2));
  }

  @Action(AddCake)
  add({ getState, patchState }: StateContext<CakeStateModel>, { payload }: AddCake) {
    const state = getState();
    const cakeWithId = { ...payload, id: uuidv4() };
    patchState({
      cakesInCart: [...state.cakesInCart, cakeWithId],
    });
  }

  @Action(RemoveCake)
  remove({ getState, patchState }: StateContext<CakeStateModel>, { payload }: RemoveCake) {
    const state = getState();
    patchState({
      cakesInCart: state.cakesInCart.filter((a) => a.id !== payload.id),
    });
  }

  @Action(RemoveCakesOfType)
  removeOfType({ getState, patchState }: StateContext<CakeStateModel>, { payload }: RemoveCakesOfType) {
    const state = getState();
    patchState({
      cakesInCart: state.cakesInCart.filter((a) => a.name !== payload.name),
    });
  }
}
