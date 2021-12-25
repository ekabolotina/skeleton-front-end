import { makeAutoObservable } from 'mobx';

export default class LoadState {
    private _isLoading = false;

    constructor(defaultState = false) {
        this._isLoading = defaultState;
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading;
    }
}
