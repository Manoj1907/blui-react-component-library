import React from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

export type DrawerSubheaderProps = {
    drawerOpen?: boolean;
};

export const DrawerSubheader: React.FC<DrawerSubheaderProps> = (props) => (
    <>
        <div style={{ visibility: props.drawerOpen ? 'inherit' : 'hidden' }}>{props.children}</div>
        <Divider />
    </>
);

DrawerSubheader.displayName = 'DrawerSubheader';

DrawerSubheader.propTypes = {
    drawerOpen: PropTypes.bool,
};
