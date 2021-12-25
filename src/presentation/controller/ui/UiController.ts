import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import LayoutConfig from 'presentation/type/LayoutConfig';

const DEFAULT_UI_CONFIG: LayoutConfig = {
    variant: 'standard',
};

@injectable()
export default class UiController {
    public uiConfig: LayoutConfig = DEFAULT_UI_CONFIG;

    constructor() {
        makeObservable(this, {
            uiConfig: observable,
            setLayoutConfig: action.bound,
        });
    }

    public setLayoutConfig(config: LayoutConfig): void {
        this.uiConfig = config;
    }

    public handleLayoutUpdateOnRouteChange = (config?: LayoutConfig): void => {
        this.setLayoutConfig(config || DEFAULT_UI_CONFIG);
    };
}
