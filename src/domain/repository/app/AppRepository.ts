import User from 'domain/entity/app/User';

export default abstract class AppRepository {
    public abstract getUser(): User;

    public abstract setUser(user: User): void;
}
