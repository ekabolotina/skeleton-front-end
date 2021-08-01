import { ParsedUrlQuery } from 'querystring';
import React, { Component, ComponentType, useEffect } from 'react';
import { observer } from 'mobx-react';
import User from 'domain/entity/app/User';
import appContainerFactory from 'container/AppContainer';
import AppController from 'presentation/controller/app/AppController';
import { PageContextT } from 'presentation/type/Page';
import { withContainerContext } from 'presentation/context/Container';
import Private from 'presentation/component/layout/Private';

type PageInitialPropsT = {
    appData: Record<string, unknown>;
};

type OptionsT<Q> = {
    effectCallback?: (
        container: ReturnType<typeof appContainerFactory.getInstance>,
    ) => Promise<void>;
    getInitialProps?: (
        container: ReturnType<typeof appContainerFactory.getInstance>,
        nextPageContext: PageContextT<Q>,
    ) => Promise<void>;
    roles?: User['role'][];
};

export default function createPage<Q extends ParsedUrlQuery = ParsedUrlQuery>(
    PageComponent: ComponentType,
    options: OptionsT<Q> = {},
) {
    const { effectCallback, getInitialProps, roles } = options;
    const withAppContainerContext = withContainerContext(appContainerFactory);

    const OriginalPage = withAppContainerContext(() => {
        useEffect(() => {
            if (effectCallback) {
                effectCallback(appContainerFactory.getInstance())
                    .then(() => {})
                    .catch(() => {});
            }
        }, []);

        return <PageComponent />;
    });

    const PrivatePage = withAppContainerContext(Private);

    class Page extends Component<PageInitialPropsT> {
        static getInitialProps: (ctx: PageContextT<Q>) => Promise<PageInitialPropsT>;

        constructor(props: PageInitialPropsT) {
            super(props);

            const { appData } = props;
            const container = appContainerFactory.getInstance();

            container.hydrateData(appData);
        }

        render() {
            const container = appContainerFactory.getInstance();
            const appController = container.get(AppController);
            const { user } = appController;

            if (!roles || roles.includes(user.role)) {
                return <OriginalPage />;
            }

            return <PrivatePage />;
        }
    }

    if (getInitialProps) {
        Page.getInitialProps = async (ctx) => {
            const container = appContainerFactory.getInstance(true);

            await getInitialProps(container, ctx);

            return {
                appData: container.serializeData(),
            };
        };
    }

    return observer(Page);
}
