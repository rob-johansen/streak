import { makeAutoObservable } from 'mobx';

export default class ViewModel {
  private _activeIndex: number | null = null
  private _open = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activeIndex(): number | null {
    return this._activeIndex
  }

  get open(): boolean {
    return this._open;
  }

  setActiveIndex = (index: number | null): void => {
    this._activeIndex = index
  }

  setOpen = (value: boolean): void => {
    this._open = value;
  };
}
