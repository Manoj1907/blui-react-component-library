import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {InfoListItem} from "../index";

class DrawerNavGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined
        };
    }

    render() {
        const { classes, open, items } = this.props;
        return (
            <>
            <List
                style={{
                    'paddingBottom': '0',
                    backgroundColor: this.props.backgroundColor}}
                subheader={
                    <ListSubheader
                        className={classes.subheader}
                        style={{
                            position: 'unset',
                            color: open ? this.props.titleColor : 'transparent',
                        }}
                    >
                        {this.props.title &&
                        <Typography noWrap
                                    variant={'subtitle2'}
                                    className={classes.navGroupTextHeader}>
                            {this.props.title}
                        </Typography>}
                        {this.props.content}
                    </ListSubheader>
                }
            >
                {(this.props.title || this.props.content) && <Divider />}
                {items.map((item, index) => (
                    <>
                        {this.NavigationListItem({
                            title: item.title,
                            subtitle: item.subtitle,
                            icon: item.icon,
                            status: item.status,
                            onClick: item.onClick,
                            active: item.active,
                        })}
                    </>
                ))}
            </List>
            <Divider />
            </>
        );
    }

    NavigationListItem({ title, subtitle, icon, status, onClick, active }) {
        if (!title && !icon) {
            return <></>
        }

        const { classes, theme, selectedColor, iconColor, fontColor } = this.props;
        const defaultSelectedBackgroundColor = theme.palette.secondary[50];
        const action = () => {
            this.props.onSelect();
            onClick();
        };
        return (
            <div style={{position: 'relative'}} className={classes.listItem}>
                {active &&
                <div className={classes.selected}
                     style={{backgroundColor: selectedColor || defaultSelectedBackgroundColor}} />}
                <InfoListItem dense
                              title={title}
                              subtitle={subtitle}
                              divider={'full'}
                              statusColor={status}
                              fontColor={fontColor}
                              icon={icon}
                              iconColor={iconColor}
                              backgroundColor={'transparent'}
                              onClick={() => action()}
                />
            </div>
        );
    }
}

const styles = theme => ({
    navGroupTextHeader: {
        width: '95%',
        display: 'block',
        alignItems: 'center',
        lineHeight: '3rem',
        height: theme.spacing(6),
    },
    subheader: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        cursor: 'text',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
    },
    listItem: {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }
    },
    selected: {
        content: '""',
        zIndex: 0,
        position: 'absolute',
        height: '100%',
        width: 'calc(100% - 8px)',
        left: 0,
        top: 0,
        backgroundColor: theme.palette.primary['50'],
        borderRadius: '0px 24px 24px 0px',
        opacity: .9,
        '&hover': {
            opacity: 1,
        }
    }
});

DrawerNavGroup.propTypes = {
    open: PropTypes.bool,
    onSelect: PropTypes.func,

    content: PropTypes.element,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        icon: PropTypes.element,
        status: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func
    })),
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    selectedColor: PropTypes.string,
    iconColor: PropTypes.string,
    titleColor: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(DrawerNavGroup);
