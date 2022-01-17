import { FC } from 'react';
import HttpStatusCode from 'constant/HttpStatusCode';

type PropsT = {
    statusCode: HttpStatusCode;
};

const ErrorPage: FC<PropsT> = (props) => {
    const { statusCode } = props;
    const message =
        statusCode === HttpStatusCode.NotFound
            ? 'Страница не найдена или еще не создана'
            : 'Что-то пошло не так';

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default ErrorPage;
