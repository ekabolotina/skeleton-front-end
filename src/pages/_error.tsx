import NextErrorComponent, { ErrorProps } from 'next/error';
import { NextPage } from 'next';
import Logger from 'util/Logger';
import ErrorPage from 'presentation/component/page/error';

interface AppErrorProps extends ErrorProps {
    err?: Error;
    hasGetInitialPropsRun?: boolean;
}

const Error: NextPage<AppErrorProps> = ({ hasGetInitialPropsRun, err, statusCode }) => {
    if (!hasGetInitialPropsRun && err) {
        Logger.handleError('On error page, client side', err);
    }

    return <ErrorPage statusCode={statusCode} />;
};

Error.getInitialProps = async (ctx) => {
    const errorInitialProps: AppErrorProps = await NextErrorComponent.getInitialProps(ctx);

    errorInitialProps.hasGetInitialPropsRun = true;

    if (ctx.err) {
        Logger.handleError('On error page, server side', ctx.err);

        return errorInitialProps;
    }

    return errorInitialProps;
};

export default ErrorPage;
