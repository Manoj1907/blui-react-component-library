/* eslint-disable react/display-name */
import React, { HTMLAttributes } from 'react';
import { Typography, TypographyProps, SvgIconProps, Box, TableProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';
import { REGULAR_WIDTH_STYLE, getHash } from '../shared';
import * as Colors from '@brightlayer-ui/colors';
import { useTheme, Theme } from '@mui/material/styles';
import { cx } from '@emotion/css';

import './markdown.css';
import { BoxProps } from '@mui/system';

export const ExternalLink = (tProps: TypographyProps<'a'>): JSX.Element => {
    const theme = useTheme();
    return (
        <Typography
            component={'a'}
            target={'_blank'}
            rel={'noopener noreferrer'}
            sx={{ fontWeight: 400, textDecoration: 'none', fontSize: '14px', color: theme.palette.primary.main }}
            {...tProps}
        />
    );
};

export const InternalLink = (props: LinkProps): JSX.Element => {
    const theme = useTheme();
    return (
        <Link
            rel={'noopener noreferrer'}
            style={{ fontWeight: 400, textDecoration: 'none', fontSize: '14px', color: theme.palette.primary.main }}
            {...props}
        />
    );
};

type HeadlineType = HTMLAttributes<HTMLDivElement> & {
    hash: string;
    TypographyProps: TypographyProps;
    SvgIconProps?: SvgIconProps;
};

const Headline: React.FC<HeadlineType> = ({
    hash,
    className,
    TypographyProps: otherTypographyProps,
    SvgIconProps: otherSvgIconProps,
    ...otherDivProps
}) => {
    return (
        <Box
            className={cx(className, 'headline')}
            {...otherDivProps}
            sx={{ ...REGULAR_WIDTH_STYLE, ...otherDivProps.style }}
        >
            <Box component="span" id={hash} sx={{ position: 'relative', top: -90 }} />
            <Typography
                paragraph
                color={'primary'}
                component={'span'}
                {...otherTypographyProps}
                className={'headline-text'}
                sx={{ hyphens: 'auto', ...otherTypographyProps.style }}
            >
                {otherTypographyProps.children}
            </Typography>
        </Box>
    );
};

export const componentsMap = {
    h1: (props: TypographyProps): JSX.Element => (
        <Headline
            className={'markdownH1'}
            style={{ marginBottom: 32, hyphens: 'auto' }}
            hash={getHash(props.children?.toString() || 'h1')}
            TypographyProps={{ variant: 'h4', ...props }}
        />
    ),
    h2: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 64, marginBottom: 16 }}
            hash={getHash(props.children?.toString() || 'h2')}
            TypographyProps={{ variant: 'h6', ...props }}
        />
    ),
    h3: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 32, marginBottom: 16 }}
            hash={getHash(props.children?.toString() || 'h3')}
            TypographyProps={{ variant: 'body1', style: { fontWeight: 600 }, ...props }}
        />
    ),
    h4: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 16 }}
            hash={getHash(props.children?.toString() || 'h4')}
            TypographyProps={{ variant: 'subtitle1', ...props }}
        />
    ),
    h5: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 8 }}
            hash={getHash(props.children?.toString() || 'h5')}
            TypographyProps={{ variant: 'body2', ...props }}
        />
    ),
    h6: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 8, fontSize: '0.75rem' }}
            hash={getHash(props.children?.toString() || 'h6')}
            TypographyProps={{ variant: 'body2', ...props }}
        />
    ),
    a: (props: React.LinkHTMLAttributes<HTMLLinkElement>): JSX.Element => {
        let tProps;
        if (props.href?.includes('#')) {
            tProps = props as TypographyProps<'a'>;

            return (
                <Typography
                    component={'a'}
                    sx={{
                        fontWeight: 400,
                        textDecoration: 'none',
                        color: (theme: Theme) => theme.palette.primary.main,
                        fontSize: '14px',
                    }}
                    {...tProps}
                />
            );
        }
        if (props.href && (props.href.match(/^http/gi) || props.href.match(/^mailto/gi))) {
            tProps = props as TypographyProps<'a'>;
            return <ExternalLink {...tProps} />;
        }
        tProps = props as LinkProps;
        //@ts-ignore
        return <InternalLink to={props.href} {...tProps} />;
    },
    p: (props: TypographyProps): JSX.Element => (
        <Typography
            sx={{ ...REGULAR_WIDTH_STYLE, fontSize: '14px', lineHeight: '1.6', m: '15px auto' }}
            paragraph
            {...props}
        />
    ),
    ul: (props: BoxProps): JSX.Element => (
        <Box component={'ul'} sx={{ ...REGULAR_WIDTH_STYLE, fontSize: '14px', m: '15px 0', pl: '60px' }} {...props} />
    ),
    li: (props: TypographyProps<'li'>): JSX.Element => (
        <Typography
            component={'li'}
            className={'mdLi'}
            sx={{ ...REGULAR_WIDTH_STYLE, fontSize: '14px', m: '15px 0' }}
            {...props}
        />
    ),
    blockquote: (props: TypographyProps<'blockquote'>): JSX.Element => {
        return (
            <Typography
                component={'blockquote'}
                sx={{
                    pr: 2,
                    mb: 1,
                    borderLeft: ' 4px solid #DDDDDD',
                    p: '0 15px',
                    m: '15px 0',
                    color: '#666666',
                    ...REGULAR_WIDTH_STYLE,
                }}
                {...props}
            />
        );
    },
    pre: (props: TypographyProps<'pre'>): JSX.Element => {
        return (
            <Typography
                component={'pre'}
                color={'textPrimary'}
                sx={{
                    paddingRight: 16,
                    marginBottom: 8,
                    display: 'flex',
                    backgroundColor: (theme: Theme) =>
                        theme.palette.mode === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                    ...REGULAR_WIDTH_STYLE,
                }}
                {...props}
            />
        );
    },
    code: (props: TypographyProps<'code'>): JSX.Element => {
        return (
            <Typography
                component={'code'}
                color={'textPrimary'}
                sx={{
                    fontSize: 14,
                    m: '0px 2px',
                    p: '0px 5px',
                    whiteSpace: 'nowrap',
                    border: '1px solid #EEEEEE',
                    backgroundColor: '#F8F8F8',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    lineHeight: '1.6',
                }}
                {...props}
            />
        );
    },
    inlineCode: (props: TypographyProps<'code'>): JSX.Element => {
        return (
            <Typography
                component={'code'}
                color={'textPrimary'}
                sx={{
                    backgroundColor: (theme: Theme) =>
                        theme.palette.mode === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                    fontFamily: 'Roboto Mono, Monospaced',
                    border: (theme: Theme) =>
                        theme.palette.mode === 'light' ? undefined : `${theme.palette.divider} 1px solid`,
                }}
                {...props}
            />
        );
    },
    table: (props: TableProps): JSX.Element => {
        return (
            <Box
                sx={{
                    mx: '43px',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                    mb: 2,

                    table: {
                        p: '6px 13px',
                        textAlign: 'left',
                        borderCollapse: 'collapse',
                        minWidth: 750,
                        border: `1px solid ${Colors.black[100]}`,
                    },
                    a: {
                        fontSize: '14px',
                    },
                    tr: {
                        border: 'unset',
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: `1px solid ${Colors.black[100]}`,
                    },
                    th: {
                        border: 'unset',
                        borderLeft: 0,
                        borderRight: 0,
                        p: '1rem',
                        fontSize: '0.875rem',
                        borderBottom: `1px solid ${Colors.black[100]}`,
                    },
                    'tr:last-of-type': {
                        borderBottom: 0,
                    },
                    thead: {
                        backgroundColor: Colors.white[100],
                    },
                    'tbody tr:nth-child(odd)': {
                        backgroundColor: Colors.white[50],
                    },
                    'tbody tr:nth-child(even)': {
                        backgroundColor: Colors.white[100],
                    },
                    td: {
                        fontSize: '0.875rem',
                        p: '1rem',
                    },
                }}
            >
                <table {...props} />
            </Box>
        );
    },
};
