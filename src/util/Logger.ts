import { Either } from 'fp-ts/lib/Either';
import { Errors } from 'io-ts';
import reporter from 'io-ts-reporters';
import slack from 'slack';

export type AdditionalInfoT = {
    title: string;
    value?: string;
};

export default class Logger {
    static error(title = '', route = '', error?: Error | null, additional: AdditionalInfoT[] = []) {
        if (
            !process.env.NEXT_STATIC_SLACK_API_TOKEN ||
            !process.env.NEXT_STATIC_SLACK_API_CHANNEL
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

            return;
        }

        try {
            let fields = [
                {
                    title: 'Message',
                    value: error?.message,
                    short: false,
                },
                {
                    title: 'Error stacktrace',
                    value: error?.stack,
                    short: true,
                },
            ];

            if (additional) {
                fields = fields.concat(
                    additional.map(({ title: fieldTitle, value }) => ({
                        value,
                        title: fieldTitle,
                        short: true,
                    })),
                );
            }

            slack.chat.postMessage({
                token: process.env.NEXT_STATIC_SLACK_API_TOKEN,
                channel: process.env.NEXT_STATIC_SLACK_API_CHANNEL,
                text: '',
                attachments: JSON.stringify([
                    {
                        color: '#00FF00',
                        title,
                        author_name: route,
                        fields,
                    },
                ]),
                icon_emoji: ':skull_and_crossbones',
            });
        } catch (e) {}
    }

    static DTOError<O>(result: Either<Errors, O>, route: string): void {
        const report = reporter.report(result);

        if (report.length > 0) {
            this.error(
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
