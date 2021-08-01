import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import User from 'domain/entity/app/User';
import AppRepository from 'domain/repository/app/AppRepository';

@injectable()
export default class AppRepositoryImpl implements AppRepository {
    private user: User = new User(NaN, 'visitor');

    constructor() {
        makeAutoObservable(this);
    }

    // eslint-disable-next-line class-methods-use-this
    public getUser(): User {
        return this.user;
    }

    // eslint-disable-next-line class-methods-use-this
    public setUser(user: User): void {
        this.user = user;
    }
}
