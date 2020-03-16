import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Chevron from '@material-ui/icons/ChevronRight';
import * as Colors from '@pxblue/colors';
import color from 'color';

import { separate, withKeys } from '../utilities';

//Material-UI Components
import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemProps as StandardListItemProps,
    ListItemAvatarProps as StandardListItemAvatarProps,
    ListItemTextProps as StandardListItemTextProps,
    ListItemIconProps as StandardListItemIconProps,
    ListItemSecondaryActionProps as StandardListItemSecondaryActionProps,
    ListItemText,
    Typography,
    ListItemSecondaryAction,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
        statusStripe: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            zIndex: 100,
        },
        withSmallMargins: {
            margin: `0 ${theme.spacing(0.5)}`,
        },
        title: {
            fontWeight: 600,
            lineHeight: 1.2,
            display: 'block',
        },
        subtitle: {
            fontWeight: 400,
            lineHeight: 1.3,
        },
        separator: {
            display: 'inline-block',
            lineHeight: 1.3,
            color: 'inherit',
        },
        rightComponent: {
            flex: '0 0 auto',
            marginLeft: 16,
            display: 'flex',
            alignItems: 'center'
        }
    })
);

const MAX_SUBTITLE_ELEMENTS = 6;

type InfoListItemClasses = {
     title?: string;
     subtitle?: string;
     icon?: string;
     avatar?: string;
}

export type DividerType = 'full' | 'partial';
export type InfoListItemProps = {
    avatar?: boolean;
    backgroundColor?: string;
    chevron?: boolean;
    classes?: InfoListItemClasses;
    dense?: boolean;
    divider?: DividerType;
    fontColor?: string;
    hidePadding?: boolean;
    icon?: JSX.Element;
    iconColor?: string;
    ListItemAvatarProps?: StandardListItemAvatarProps;
    ListItemProps?: Omit<StandardListItemProps, 'button'|'onClick'>;
    ListItemTextProps?: StandardListItemTextProps;
    ListItemIconProps?: StandardListItemIconProps;
    ListItemSecondaryActionProps?: StandardListItemSecondaryActionProps;
    leftComponent?: JSX.Element;
    onClick?: Function;
    rightComponent?: JSX.Element;
    ripple?: boolean;
    statusColor?: string;
    style?: CSSProperties;
    subtitle?: string | Array<string | JSX.Element>;
    subtitleSeparator?: string;
    title: string;
};

export const InfoListItem: React.FC<InfoListItemProps> = (props) => {
    const theme = useTheme();
    const defaultClasses = useStyles(theme);
    const {
        avatar,
        backgroundColor,
        chevron,
        classes,
        dense,
        divider,
        fontColor,
        hidePadding,
        icon,
        iconColor,
        ListItemSecondaryActionProps,
        ListItemAvatarProps,
        ListItemProps,
        ListItemTextProps,
        ListItemIconProps,
        leftComponent,
        onClick,
        rightComponent,
        statusColor,
        style,
        subtitle,
        subtitleSeparator,
        title,
        ripple,
    } = props;

    const getIconColor = (): string => {
        if (iconColor) return iconColor;
        if (avatar) {
            return statusColor
                ? color(statusColor).isDark()
                    ? Colors.white[50]
                    : Colors.black[500]
                : Colors.white[50]; // default avatar is dark gray -> white text
        }
        return statusColor ? statusColor : 'inherit';
    };

    const getIcon = (): JSX.Element | undefined => {
        if (icon && avatar) {
            return (
                <ListItemAvatar {...ListItemAvatarProps}>
                    <Avatar
                        style={{
                            backgroundColor: statusColor || Colors.black[500],
                            color: getIconColor(),
                        }}
                    >
                        {icon}
                    </Avatar>
                </ListItemAvatar>
            );
        } else if (icon) {
            return <ListItemIcon style={{ color: getIconColor() }} {...ListItemIconProps}>{icon}</ListItemIcon>;
        } else if (!hidePadding) {
            return (
                // a dummy component to maintain the padding
                <ListItemAvatar {...ListItemAvatarProps}>
                    <Avatar style={{ opacity: 0 }} />
                </ListItemAvatar>
            );
        }
    };

    const getRightComponent = (): JSX.Element | undefined => {
        if (rightComponent) {
            return (
                <div className={defaultClasses.rightComponent}>
                    {rightComponent}
                </div>
            );
        } else if (chevron) {
            return (
                <ListItemSecondaryAction style={{ display: 'flex' }} {...ListItemSecondaryActionProps}>
                    <Chevron color={'inherit'} />
                </ListItemSecondaryAction>
            );
        }
    };

    const interpunct = (): JSX.Element => (
        <Typography className={`${defaultClasses.withSmallMargins} ${defaultClasses.separator}`}>
            {subtitleSeparator || '\u00B7'}
        </Typography>
    );

    const getSubtitle = (): string | null => {
        if (!subtitle) {
            return null;
        }
        if (typeof subtitle === 'string') {
            return subtitle;
        }

        const subtitleParts = Array.isArray(subtitle) ? [...subtitle] : [subtitle];
        const renderableSubtitleParts = subtitleParts.splice(0, MAX_SUBTITLE_ELEMENTS);

        return withKeys(separate(renderableSubtitleParts, () => interpunct()));
    };

    const getWrapperStyle = (): CSSProperties =>
        Object.assign(
            {
                backgroundColor: backgroundColor || 'transparent',
                cursor: onClick ? 'pointer' : 'default',
                height: dense ? 52 : 72,
            },
            style
        );

    return (
        <ListItem
            style={getWrapperStyle()}
            onClick={onClick ? (): void => onClick() : undefined}
            dense={dense}
            button={ripple ? true : undefined}
            {...ListItemProps as any}
        >
            <>
                <div className={defaultClasses.statusStripe} style={{ backgroundColor: statusColor }} />
                {divider && (
                    <Divider className={defaultClasses.divider} style={{ zIndex: 0, left: divider === 'full' ? 0 : 72 }} />
                )}
                {(icon || !hidePadding) && getIcon()}
                {leftComponent}
                <ListItemText
                    style={leftComponent ? { marginLeft: 16 } : {}}
                    primary={title}
                    secondary={getSubtitle()}
                    primaryTypographyProps={{
                        noWrap: true,
                        variant: 'body1',
                        className: defaultClasses.title,
                        style: { color: fontColor },
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        variant: 'subtitle2',
                        className: defaultClasses.subtitle,
                        style: { color: fontColor || 'inherit' },
                    }}
                    {...ListItemTextProps}
                />
                {getRightComponent()}
            </>
        </ListItem>
    );
};

InfoListItem.displayName = 'InfoListItem';
InfoListItem.propTypes = {
    avatar: PropTypes.bool,
    backgroundColor: PropTypes.string,
    chevron: PropTypes.bool,
    dense: PropTypes.bool,
    divider: PropTypes.oneOf(['full', 'partial']),
    fontColor: PropTypes.string,
    hidePadding: PropTypes.bool,
    icon: PropTypes.element,
    iconColor: PropTypes.string,
    leftComponent: PropTypes.element,
    onClick: PropTypes.func,
    rightComponent: PropTypes.element,
    statusColor: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    subtitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
    ]),
    subtitleSeparator: PropTypes.string,
    title: PropTypes.string.isRequired,
};
InfoListItem.defaultProps = {
    avatar: false,
    chevron: false,
    dense: false,
    hidePadding: false,
    ripple: false,
    subtitleSeparator: '\u00B7',
    fontColor: 'inherit',
};
