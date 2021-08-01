import React, { FC } from 'react';
import { Global } from '@emotion/react';
import globalCss from 'presentation/component/layout/common/globalCss';

const Layout: FC = (props) => {
    const { children } = props;

    return (
        <>
            {children}
            <Global styles={globalCss} />
        </>
    );
};

export default Layout;
