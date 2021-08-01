import { FormikErrors, FormikHelpers } from 'formik';

export type SubmitHandlerT<V> = (values: V, actions: FormikHelpers<V>) => void | Promise<void>;

export type ErrorsSetterT<V> = (errors: FormikErrors<V>) => void;
