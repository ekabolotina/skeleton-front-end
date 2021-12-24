import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import LayoutConfig from 'presentation/type/LayoutConfig';

@injectable()
export default class UiController {
    public uiConfig: LayoutConfig = {
        variant: 'standard',
    };

    constructor() {
        makeObservable(this, {
            uiConfig: observable,
            setUiConfig: action.bound,
        });
    }

    public setUiConfig(config: LayoutConfig): void {
        this.uiConfig = config;
    }
}
