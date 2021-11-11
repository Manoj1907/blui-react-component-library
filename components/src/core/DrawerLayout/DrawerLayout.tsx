import React, { ReactElement, HTMLAttributes, useState, CSSProperties } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DrawerProps as DrawerComponentProps } from '../Drawer/Drawer';
import { DrawerLayoutContext } from './contexts/DrawerLayoutContextProvider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            '&$expanded $content': {
                transition: theme.transitions.create('padding', {
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
        content: {
            width: '100%',
            transition: theme.transitions.create('padding', { duration: theme.transitions.duration.leavingScreen }),
            zIndex: 0,
        },
        drawer: {
            display: 'flex',
            position: 'fixed',
            height: '100%',
            alignItems: 'stretch',
            zIndex: theme.zIndex.drawer,
        },
        expanded: {},
    })
);

export type DrawerLayoutClasses = {
    /** Styles applied to the body content container */
    content?: string;

    /** Styles applied to the drawer container */
    drawer?: string;

    /** Styles applied to the body root element when the drawer is expanded */
    expanded?: string;

    /** Styles applied to the root element */
    root?: string;
};

export type DrawerLayoutProps = HTMLAttributes<HTMLDivElement> & {
    /** Custom classes for default style overrides */
    classes?: DrawerLayoutClasses;

    /** Drawer component to be embedded */
    drawer: ReactElement<DrawerComponentProps>;
};

const DrawerLayoutRender: React.ForwardRefRenderFunction<unknown, DrawerLayoutProps> = (
    props: DrawerLayoutProps,
    ref: any
) => {
    const { children, drawer, classes, ...otherDivProps } = props;
    const theme = useTheme();
    const [padding, setPadding] = useState<number | string>(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const defaultClasses = useStyles();

    const style: CSSProperties = { paddingLeft: 0, paddingRight: 0 };
    style.paddingLeft = theme.direction === 'ltr' ? padding : 0;
    style.paddingRight = theme.direction === 'rtl' ? padding : 0;

    return (
        <DrawerLayoutContext.Provider
            value={{
                setPadding,
                setDrawerOpen,
            }}
        >
            <div
                ref={ref}
                className={clsx(defaultClasses.root, classes.root, {
                    [defaultClasses.expanded]: !drawerOpen,
                    [classes.expanded]: !drawerOpen,
                })}
                {...otherDivProps}
            >
                <div className={clsx(defaultClasses.drawer, classes.drawer)}>{drawer}</div>
                <div className={clsx(defaultClasses.content, classes.content)} style={style}>
                    {children}
                </div>
            </div>
        </DrawerLayoutContext.Provider>
    );
};
/**
 * [DrawerLayout](https://brightlayer-ui-components.github.io/react/?path=/info/components-drawer--get-read-me-story) component
 *
 * The `<DrawerLayout>` component is used to provide the appropriate resizing behavior for your main application content when used in conjunction with a Brightlayer UI `<Drawer>`. It accepts a `<Drawer>` as a prop, and the main page content is passed in through child elements.
 */
export const DrawerLayout = React.forwardRef(DrawerLayoutRender);
DrawerLayout.displayName = 'DrawerLayout';
DrawerLayout.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        content: PropTypes.string,
        drawer: PropTypes.string,
    }),
    drawer: PropTypes.element.isRequired,
};
DrawerLayout.defaultProps = {
    classes: {},
};
