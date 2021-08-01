import { AxiosInstance } from 'axios';
import { fold as baseFold } from 'fp-ts/Either';
import { Type } from 'io-ts';
import Credentials from 'data/AbstractApi/Credentials';
import Logger from 'util/Logger';

export default abstract class AbstractApi {
    public abstract http: AxiosInstance;

    public abstract httpWithAuthorization: AxiosInstance;

    public abstract setCredentials(credentials: Credentials, isRemember?: boolean): void;

    public abstract initCredentials(): void;

    public abstract resetCredentials(): void;

    public static decode<Out, A, O>(
        DTO: Type<A, O>,
        left: Out,
        onRight: (i: A) => Out,
        value: unknown,
    ): Out {
        const decoded = DTO.decode(value);

        Logger.DTOError(decoded, '');

        return baseFold<unknown, A, Out>(() => left, onRight)(decoded);
    }
}
