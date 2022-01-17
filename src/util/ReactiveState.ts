import { makeAutoObservable } from 'mobx';

/**
 * Intended for transferring logic from react-component to controller.
 * Uses to create component-responsive state.
 *
 * Note that state will be skipped to default
 * while server side to client side switch.
 * */
export default class ReactiveState<T = boolean> {
    private _state: T;

    constructor(initial: T) {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
        this._state = initial;
    }

    public get state(): T {
        return this._state;
    }

    public set state(state: T) {
        this._state = state;
    }
}
