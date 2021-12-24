import React, { FC } from 'react';
import { Global } from '@emotion/react';
import appContainerFactory from 'container/AppContainer';
import UiController from 'presentation/controller/ui/UiController';
import globalCss from 'presentation/component/layout/common/globalCss';
import { LayoutWrapper } from './styles';

/**
 * Warning!
 * Do not make multiple return statements.
 * */

const Layout: FC = (props) => {
    const { children } = props;
    const container = appContainerFactory.getInstance();
    const { uiConfig } = container.get(UiController);
    const { variant } = uiConfig;

    return (
        <>
            {variant === 'standard' && <LayoutWrapper>{children}</LayoutWrapper>}
            {variant === 'private' && <h1>Доступ закрыт</h1>}
            <Global styles={globalCss} />
        </>
    );
};

export default Layout;
