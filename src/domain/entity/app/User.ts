export default class User {
    public static Hydrate(data: User): User {
        try {
            return new User(data.id || NaN, data.role);
        } catch {
            return User.CreateEmpty();
        }
    }

    public static CreateEmpty(): User {
        return new User(NaN, 'visitor');
    }

    constructor(public readonly id: number, public readonly role: 'visitor') {}

    public isAnonymous(): boolean {
        return this.role === 'visitor';
    }
}
