import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import Menu, { MenuProps as standardMenuProps } from '@material-ui/core/Menu';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';
import { NavItem, DrawerNavGroup } from '../Drawer';
import PropTypes from 'prop-types';

export type ToolbarMenuItem = Omit<NavItem, 'itemID'> & { itemID?: string };
export type ToolbarMenuGroup = {
    /** The color used for the text */
    fontColor?: string;
    /** The color used for icons */
    iconColor?: string;
    /** List of navigation items to render */
    items: ToolbarMenuItem[];
    /** Text to display in the group header */
    title?: string;
};

export type DropdownToolbarProps = ToolbarProps & {
    /** Title text to be displayed */
    title: string;
    /** Subtitle text to be displayed */
    subtitle?: string;
    /** Navigation Icon to be displayed */
    navigationIcon?: JSX.Element;
    /** Custom content to be displayed in the menu */
    menu?: JSX.Element;
    /** Groups of menu items to display */
    menuGroups?: ToolbarMenuGroup[];
    /** Custom classes for default style overrides */
    classes?: DropdownToolbarClasses;
    /** Property overrides for the MUI Menu */
    MenuProps?: Omit<standardMenuProps, 'open'>;
    /** Function called when the menu is opened */
    onOpen?: () => void;
    /** Function called when the menu is closed */
    onClose?: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            minHeight: `4rem`,
            [theme.breakpoints.down('xs')]: {
                minHeight: `3.5rem`,
            },
        },
        navigation: {
            marginRight: theme.spacing(2),
            width: '2.5rem',
            height: '2.5rem',
            alignItems: 'center',
            justifyContent: 'flex-start',
            display: 'flex',
        },
        navGroups: {
            '&:active, &:focus': {
                outline: 'none',
            },
        },
        textContent: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            // set margins to default to avoid the height of the app bar exceeding 56px on mobile
            '&.MuiListItemText-multiline': {
                marginTop: '0.25rem',
                marginBottom: '0.25rem',
            },
        },
        title: {
            lineHeight: 1.2,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        subtitleContent: {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: 'fit-content',
            marginTop: '-0.125rem',
        },
        cursorPointer: {
            cursor: 'pointer',
        },
        subtitle: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        dropdownArrow: {
            marginLeft: theme.spacing(0.5),
        },
        rotateDropdownArrow: {
            transform: 'rotate(180deg)',
        },
    })
);

export type DropdownToolbarClasses = {
    root?: string;
    navigation?: string;
    textContent?: string;
    title?: string;
    subtitleContent?: string;
    subtitle?: string;
    dropdownArrow?: string;
    menuItem?: string;
};

const DropdownToolbarRender: React.ForwardRefRenderFunction<unknown, DropdownToolbarProps> = (
    props: DropdownToolbarProps,
    ref: any
) => {
    const {
        title,
        subtitle,
        menuGroups,
        navigationIcon,
        menu,
        MenuProps,
        onClose,
        onOpen,
        classes = {},
        ...toolbarProps
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const anchor = useRef(null);
    const theme = useTheme();
    const rtl = theme.direction === 'rtl';
    const defaultClasses = useStyles(theme);

    const getNavigationIcon = useCallback(() => {
        if (navigationIcon) {
            return <div className={clsx(defaultClasses.navigation, classes.navigation)}>{navigationIcon}</div>;
        }
    }, [navigationIcon, defaultClasses, classes]);

    const closeMenu = useCallback(() => {
        if (onClose) {
            onClose();
        }
        setAnchorEl(null);
    }, [onClose]);

    const openMenu = useCallback(
        (event: MouseEvent) => {
            if (onOpen) {
                onOpen();
            }
            setAnchorEl(event);
        },
        [onOpen]
    );

    useEffect(() => {
        console.warn(
            `DropdwonToolbar component has been deprecated and will be removed in version 6.0.0. Instead of DropdwonToolbar use ToolbarMenu component in regular Toolbar like Mui Appbar, BLUI Appbar.`
        );
    });

    useEffect(() => {
        for (const group of menuGroups) {
            for (const item of group.items) {
                const onClick = item.onClick;
                if (onClick) {
                    item.onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                        onClick(e);
                        closeMenu();
                    };
                }
            }
        }
    }, [menuGroups]);

    const getMenu = useCallback(() => {
        if (menu && Boolean(anchorEl)) {
            return React.cloneElement(menu, {
                anchorEl: anchorEl,
                open: Boolean(anchorEl),
                onClose: closeMenu,
                ...menu.props,
            });
        }
        if (menuGroups && Boolean(anchorEl)) {
            return (
                <Menu
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: rtl ? 'right' : 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: rtl ? 'right' : 'left' }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={(): void => closeMenu()}
                    {...MenuProps}
                    MenuListProps={{ style: { padding: 0 } }}
                >
                    {!menu &&
                        menuGroups.map((group: ToolbarMenuGroup, index: number) => (
                            <div className={defaultClasses.navGroups} key={index}>
                                <DrawerNavGroup
                                    divider={false}
                                    hidePadding={true}
                                    itemIconColor={group.iconColor}
                                    itemFontColor={group.fontColor}
                                    title={group.title}
                                    items={group.items.map(
                                        (item: ToolbarMenuItem, itemIndex: number): NavItem =>
                                            Object.assign({ itemID: itemIndex.toString() }, item)
                                    )}
                                />
                            </div>
                        ))}
                </Menu>
            );
        }
    }, [menuGroups, menu, anchorEl, MenuProps, defaultClasses]);

    return (
        <>
            <Toolbar ref={ref} className={clsx(defaultClasses.root, classes.root)} style={toolbarProps.style}>
                {getNavigationIcon()}
                <ListItemText
                    className={clsx(defaultClasses.textContent, classes.textContent)}
                    primary={
                        <Typography variant="h6" className={clsx(defaultClasses.title, classes.title)}>
                            {title}
                        </Typography>
                    }
                    secondary={
                        <Typography
                            ref={anchor}
                            aria-haspopup="true"
                            component={'div'}
                            onClick={(): void => {
                                openMenu(anchor.current);
                            }}
                            className={clsx(
                                defaultClasses.subtitleContent,
                                classes.subtitleContent,
                                menuGroups || menu ? defaultClasses.cursorPointer : ''
                            )}
                        >
                            <span className={clsx(defaultClasses.subtitle, classes.subtitle)}>{subtitle || ''}</span>
                            {(menuGroups || menu) && (
                                <ArrowDropDown
                                    className={clsx(
                                        defaultClasses.dropdownArrow,
                                        classes.dropdownArrow,
                                        anchorEl ? defaultClasses.rotateDropdownArrow : ''
                                    )}
                                />
                            )}
                        </Typography>
                    }
                />
                {props.children}
            </Toolbar>
            {getMenu()}
        </>
    );
};
/**
 * [DropdownToolbar](https://brightlayer-ui-components.github.io/react/?path=/info/components-dropdown-toolbar--get-read-me-story) component
 *
 * The `<DropdownToolbar>` component is used to display a toolbar with a dropdown menu for a subtitle. The Menu can be populated via the `menuGroups` prop, or can be entirely customized by supplying your own `<Menu>` via the `menu` prop.
 */
export const DropdownToolbar = React.forwardRef(DropdownToolbarRender);

DropdownToolbar.displayName = 'DropdownToolbar';

DropdownToolbar.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }),
    menu: PropTypes.element,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    // @ts-ignore
    menuGroups: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            fontColor: PropTypes.string,
            iconColor: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.element,
                    onClick: PropTypes.func,
                    statusColor: PropTypes.string,
                    subtitle: PropTypes.string,
                    title: PropTypes.string,
                    divider: PropTypes.bool,
                })
            ),
        })
    ),
    MenuProps: PropTypes.object,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
};

DropdownToolbar.defaultProps = {
    classes: {},
    menuGroups: [],
    MenuProps: {},
    onClose: (): void => {},
    onOpen: (): void => {},
};
