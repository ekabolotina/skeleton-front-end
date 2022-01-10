import { Either } from 'fp-ts/lib/Either';
import { Errors } from 'io-ts';
import reporter from 'io-ts-reporters';
import * as Sentry from '@sentry/nextjs';

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

        if (process.env.NODE_ENV === 'production') {
            if (error) {
                this.sendErrorToSentry(error).then();
            } else if (additional) {
                this.sendErrorToSentry(new Error(`${title}: ${JSON.stringify(additional)}`)).then();
            }
        }
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

    private static async sendErrorToSentry(error: Error): Promise<void> {
        if (!process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NODE_ENV !== 'production') return;

        try {
            Sentry.captureException(error);
            await Sentry.flush(2000);
        } catch {}
    }
}
