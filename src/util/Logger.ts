import { Either } from 'fp-ts/lib/Either';
import { Errors } from 'io-ts';
import reporter from 'io-ts-reporters';

export type AdditionalInfoT = {
    title: string;
    value?: string;
};

export default class Logger {
    public static handleError(
        title = '',
        error?: Error | null,
        additional: AdditionalInfoT[] = [],
    ) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log({ title, error, additional });
        }

        // if (process.env.NODE_ENV === 'production') {
        //    // Report to Slack, Sentry etc.
        // }
    }

    public static handleDTOError<O>(result: Either<Errors, O>): void {
        const report = reporter.report(result);

        if (report.length > 0) {
            this.handleError(
                'Decode/Encode error (DTO)',
                null,
                report.map((error, index) => ({
                    title: `Problem ${index + 1}`,
                    error,
                })),
            );
        }
    }
}
