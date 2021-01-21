import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Drawer, DrawerProps } from '@material-ui/core';
import { DrawerBodyProps } from './DrawerBody';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDrawerLayout } from '../DrawerLayout/contexts/DrawerLayoutContextProvider';
import { DrawerContext } from './DrawerContext';
import { NavItemSharedStyleProps, SharedStyleProps } from './types';
import { mergeStyleProp } from './utilities';

export const RAIL_WIDTH = 72;
export const RAIL_WIDTH_CONDENSED = 56;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transition: theme.transitions.create('width', { duration: theme.transitions.duration.leavingScreen }),
            minHeight: '100%',
            '&$expanded': {
                transition: theme.transitions.create('width', {
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        },
        expanded: {},
        paper: {
            overflow: 'hidden',
            position: 'inherit',
            boxShadow: theme.shadows[4],
            borderWidth: 0,
            '&$sideBorder': {
                borderWidth: 1,
                boxShadow: 'none',
            },
        },
        sideBorder: {},
    })
);

type DrawerClasses = {
    /** Styles applied to the drawer content container */
    content?: string;

    /** Styles applied to the root element when the drawer is expanded */
    expanded?: string;

    /** MUI Drawer style override for the root element */
    root?: string;

    /** MUI Drawer style override for desktop viewports */
    paper?: string;
    sideBorder?: string;
};

const findChildByType = (children: ReactNode, type: string): JSX.Element[] =>
    React.Children.map(children, (child: any) => {
        if (child && child.type) {
            const name = child.type.displayName;
            if (name && name.includes(type)) {
                return child;
            }
        }
    }) || [];

export type DrawerComponentProps = Omit<DrawerProps, 'translate' | 'variant'> &
    SharedStyleProps &
    NavItemSharedStyleProps & {
        // the id for the currently active item
        activeItem?: string;

        // custom classes for default style overrides
        classes?: DrawerClasses;

        // Sets a smaller width when the drawer is using the rail variant
        condensed?: boolean;

        // Describes if this Drawer is used outside of a DrawerLayout
        noLayout?: boolean;

        // Function called whenever a navigation item or rail item is clicked
        onItemSelect?: (id: string) => void;

        // Controls the open/closed state of the drawer
        open: boolean;

        // Enables Drawer to automatically open on hover for persistent variants.
        openOnHover?: boolean;

        // Toggles the drawer side border instead of a drop shadow
        sideBorder?: boolean;

        // Drawer variant type
        variant?: 'persistent' | 'permanent' | 'temporary' | 'rail';

        // Sets the width of the drawer (in px) when open
        width?: number;
    };

const DrawerRenderer: React.ForwardRefRenderFunction<unknown, DrawerComponentProps> = (
    props: DrawerComponentProps,
    ref: any
) => {
    let hoverDelay: NodeJS.Timeout;
    const defaultClasses = useStyles(props);
    const theme = useTheme();
    const { setPadding, setDrawerOpen } = useDrawerLayout();
    const [hover, setHover] = useState(false);
    const {
        // Inheritable Props
        activeItemBackgroundColor,
        activeItemBackgroundShape,
        activeItemFontColor,
        activeItemIconColor,
        chevron,
        collapseIcon,
        disableActiveItemParentStyles,
        divider,
        expandIcon,
        hidePadding,
        itemFontColor,
        itemIconColor,
        nestedBackgroundColor,
        nestedDivider,
        ripple,
        // Drawer-specific props
        activeItem,
        classes,
        condensed,
        noLayout = false,
        open,
        openOnHover,
        onItemSelect,
        sideBorder = false,
        variant: variantProp,
        width,
        // Other MUI Drawer Props
        ...drawerProps
    } = props;

    const variant = variantProp || 'persistent'; // to allow drawerLayout to override this
    const isRail = variant === 'rail';

    const isDrawerOpen = useCallback((): boolean => {
        if (variant === 'persistent') return hover || open;
        if (variant === 'permanent' || variant === 'rail') return true;
        return open;
    }, [variant, hover, open]);

    const getHeader = useCallback(
        (): JSX.Element[] =>
            findChildByType(props.children, 'DrawerHeader')
                .slice(0, 1)
                .map((child) => React.cloneElement(child)),
        [props.children]
    );

    const getSubHeader = useCallback(
        (): JSX.Element[] =>
            findChildByType(props.children, 'DrawerSubheader')
                .slice(0, 1)
                .map((child) => React.cloneElement(child)),
        [props.children]
    );

    const getBody = useCallback(
        (): JSX.Element[] =>
            findChildByType(props.children, 'DrawerBody')
                .slice(0, 1)
                .map((child) =>
                    React.cloneElement(child, {
                        // Inherited Props
                        activeItemBackgroundColor: mergeStyleProp(
                            activeItemBackgroundColor,
                            child.props.activeItemBackgroundColor
                        ),
                        activeItemBackgroundShape: mergeStyleProp(
                            activeItemBackgroundShape,
                            child.props.activeItemBackgroundShape
                        ),
                        activeItemFontColor: mergeStyleProp(activeItemFontColor, child.props.activeItemFontColor),
                        activeItemIconColor: mergeStyleProp(activeItemIconColor, child.props.activeItemIconColor),
                        chevron: mergeStyleProp(chevron, child.props.chevron),
                        collapseIcon: mergeStyleProp(collapseIcon, child.props.collapseIcon),
                        disableActiveItemParentStyles: mergeStyleProp(
                            disableActiveItemParentStyles,
                            child.props.disableActiveItemParentStyles
                        ),
                        divider: mergeStyleProp(divider, child.props.divider),
                        expandIcon: mergeStyleProp(expandIcon, child.props.expandIcon),
                        hidePadding: mergeStyleProp(hidePadding, child.props.hidePadding),
                        itemFontColor: mergeStyleProp(itemFontColor, child.props.itemFontColor),
                        itemIconColor: mergeStyleProp(itemIconColor, child.props.itemIconColor),
                        nestedBackgroundColor: mergeStyleProp(nestedBackgroundColor, child.props.nestedBackgroundColor),
                        nestedDivider: mergeStyleProp(nestedDivider, child.props.nestedDivider),
                        ripple: mergeStyleProp(ripple, child.props.ripple),
                    } as DrawerBodyProps)
                ),
        [
            activeItemBackgroundColor,
            activeItemBackgroundShape,
            activeItemFontColor,
            activeItemIconColor,
            chevron,
            collapseIcon,
            disableActiveItemParentStyles,
            divider,
            expandIcon,
            hidePadding,
            itemFontColor,
            itemIconColor,
            nestedBackgroundColor,
            nestedDivider,
            ripple,
            onItemSelect,
            props.children,
        ]
    );

    const getFooter = useCallback(
        (): JSX.Element[] =>
            findChildByType(props.children, 'DrawerFooter')
                .slice(0, 1)
                .map((child) => React.cloneElement(child)),
        [props.children]
    );

    const getDrawerContents = useCallback(
        (): JSX.Element => (
            <>
                {getHeader()}
                <div
                    style={{ flexDirection: 'column', flex: '1 1 0px', display: 'flex' }}
                    onMouseEnter={
                        openOnHover
                            ? (): void => {
                                  hoverDelay = setTimeout(() => setHover(true), 500);
                              }
                            : undefined
                    }
                    onMouseLeave={
                        openOnHover
                            ? (): void => {
                                  clearTimeout(hoverDelay);
                                  setHover(false);
                              }
                            : undefined
                    }
                >
                    {getSubHeader()}
                    {getBody()}
                    {getFooter()}
                </div>
            </>
        ),
        [setHover, hoverDelay, getSubHeader, getBody, getFooter]
    );

    /* Default Drawer Sizes */
    const EXPANDED_DRAWER_WIDTH_DEFAULT = theme.spacing(45);
    const COLLAPSED_DRAWER_WIDTH_DEFAULT = theme.spacing(7);

    // Determine the visible width of the drawer
    const getDrawerWidth = useCallback((): number => {
        if (isRail) return condensed ? RAIL_WIDTH_CONDENSED : RAIL_WIDTH;
        if (isDrawerOpen()) return width || EXPANDED_DRAWER_WIDTH_DEFAULT;
        return COLLAPSED_DRAWER_WIDTH_DEFAULT;
    }, [isRail, condensed, theme, isDrawerOpen, width]);

    // Get the width of the content inside the drawer - if the drawer is collapsed, content maintains its size in order to clip
    const getContentWidth = useCallback((): number => {
        if (isRail) return condensed ? RAIL_WIDTH_CONDENSED : RAIL_WIDTH;
        return width || EXPANDED_DRAWER_WIDTH_DEFAULT;
    }, [isRail, condensed, width, theme]);

    // Update the drawer layout padding when the drawer changes
    useEffect(() => {
        if (!noLayout) {
            setPadding(variant === 'temporary' ? 0 : getDrawerWidth());
            setDrawerOpen(isDrawerOpen());
        }
    }, [variant, noLayout, isDrawerOpen, getDrawerWidth]);

    return (
        <Drawer
            ref={ref}
            {...drawerProps}
            variant={variant === 'temporary' ? variant : 'permanent'}
            open={isDrawerOpen()}
            classes={{
                root: clsx(defaultClasses.root, classes.root, {
                    [defaultClasses.expanded]: isDrawerOpen(),
                    [classes.expanded]: isDrawerOpen(),
                }),
                paper: clsx(defaultClasses.paper, classes.paper, {
                    [defaultClasses.sideBorder]: sideBorder,
                    [classes.sideBorder]: sideBorder,
                }),
            }}
            style={Object.assign(
                {
                    width: getDrawerWidth(),
                },
                drawerProps.style
            )}
        >
            <DrawerContext.Provider
                value={{
                    open: isDrawerOpen(),
                    variant: variant,
                    condensed: condensed,
                    activeItem: activeItem,
                }}
            >
                <div className={clsx(defaultClasses.content, classes.content)} style={{ width: getContentWidth() }}>
                    {getDrawerContents()}
                </div>
            </DrawerContext.Provider>
        </Drawer>
    );
};

export const DrawerComponent = React.forwardRef(DrawerRenderer);
DrawerComponent.displayName = 'PXBlueDrawer';

// TODO FIX ME
export const PXBlueDrawerInheritablePropertiesPropTypes = {
    activeItemBackgroundColor: PropTypes.string,
    activeItemFontColor: PropTypes.string,
    activeItemIconColor: PropTypes.string,
    activeItemBackgroundShape: PropTypes.oneOf(['round', 'square']),
    chevron: PropTypes.bool,
    collapseIcon: PropTypes.element,
    divider: PropTypes.bool,
    expandIcon: PropTypes.element,
    hidePadding: PropTypes.bool,
    InfoListItemProps: PropTypes.object,
    ButtonBaseProps: PropTypes.object,
    itemFontColor: PropTypes.string,
    itemIconColor: PropTypes.string,
    ripple: PropTypes.bool,
};
export const PXBlueDrawerNavGroupInheritablePropertiesPropTypes = {
    activeItem: PropTypes.string,
    nestedDivider: PropTypes.bool,
    onItemSelect: PropTypes.func,
    titleColor: PropTypes.string,
};

// @ts-ignore
DrawerComponent.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        content: PropTypes.string,
        paper: PropTypes.string,
    }),
    condensed: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    openOnHover: PropTypes.bool,
    sideBorder: PropTypes.bool,
    variant: PropTypes.oneOf(['persistent', 'permanent', 'temporary', 'rail']),
    width: PropTypes.number,
};
DrawerComponent.defaultProps = {
    classes: {},
    openOnHover: true,
    sideBorder: false,
    variant: 'persistent',
    condensed: false,
};
