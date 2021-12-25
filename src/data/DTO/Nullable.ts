import * as t from 'io-ts';

export default function Nullable<T extends t.Mixed>(type: T) {
    return t.union([type, t.null]);
}
