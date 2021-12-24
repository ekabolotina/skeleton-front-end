import { Either } from 'fp-ts/lib/Either';
import { Errors } from 'io-ts';
import reporter from 'io-ts-reporters';

export type AdditionalInfoT = {
    title: string;
    value?: string;
};

export default class Logger {
    static handleError(
        title = '',
        route = '',
        error?: Error | null,
        additional: AdditionalInfoT[] = [],
    ) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log({
                title,
                route,
                error,
                additional,
            });
        }

        if (process.env.NODE_ENV === 'production') {
            // Report to Slack, Sentry etc.
        }
    }

    static handleDTOError<O>(result: Either<Errors, O>, route: string): void {
        const report = reporter.report(result);

        if (report.length > 0) {
            this.handleError(
                'Decode/Encode error (DTO)',
                route,
                null,
                report.map((error, index) => ({
                    title: `Problem ${index + 1}`,
                    error,
                })),
            );
        }
    }
}
