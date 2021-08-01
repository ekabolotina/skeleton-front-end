import Container from 'framework/Container';
import isServer from 'helper/common/isServer';

export default class ContainerFactory {
    private containerInstance?: Container;

    constructor(private ContainerClass: { new (): Container }) {}

    public getInstance(reinitializeServerSide = false): Container {
        if (!this.containerInstance || (isServer() && reinitializeServerSide)) {
            this.containerInstance = new this.ContainerClass();
        }

        return this.containerInstance;
    }
}
