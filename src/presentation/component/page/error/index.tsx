import { FC } from 'react';
import Layout from 'presentation/component/layout/Main';
import HttpStatusCode from 'enum/HttpStatusCode';

type PropsT = {
    statusCode: HttpStatusCode;
};

const ErrorPage: FC<PropsT> = (props: PropsT) => {
    const { statusCode } = props;
    const message =
        statusCode === HttpStatusCode.NotFound
            ? 'Страница не найдена или еще не создана'
            : 'Что-то пошло не так';

    return (
        <Layout>
            <h1>{message}</h1>
        </Layout>
    );
};

export default ErrorPage;
