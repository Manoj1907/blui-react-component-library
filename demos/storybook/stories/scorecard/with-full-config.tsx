import { List } from '@material-ui/core';
import { Cloud, ListAlt, Notifications } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import { InfoListItem, ScoreCard } from '@pxblue/react-components';
import { boolean, color, number, text } from '@storybook/addon-knobs';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import { actionItems, actionRow } from './with-actions';
import { badge } from './with-heroes';

const backgroundImage = require('../../assets/topology_40.png');

export const withFullConfig = (): StoryFnReactReturnType => (
    <ScoreCard
        style={{ width: 400, flex: '0 0 auto' }}
        headerTitle={text('headerTitle', 'Substation 3')}
        headerSubtitle={text('headerSubtitle', 'High Humidity Alarm')}
        headerInfo={text('headerInfo', '4 Devices')}
        headerColor={color('headerColor', Colors.red[500])}
        headerFontColor={color('headerFontColor', Colors.white[50])}
        headerBackgroundImage={boolean('headerBackgroundImage', true) ? backgroundImage : undefined}
        actionLimit={number('actionLimit', 3, { range: true, min: 1, max: 6, step: 1 })}
        actionItems={actionItems}
        actionRow={actionRow}
        badge={badge}
        badgeOffset={number('badgeOffset', -40)}
    >
        <List style={{ padding: '16px 0' }}>
            <InfoListItem dense style={{ height: 36 }} title={'0 Alarms'} icon={<Notifications color={'inherit'} />} />
            <InfoListItem
                dense
                style={{ height: 36 }}
                fontColor={Colors.blue[500]}
                iconColor={Colors.blue[500]}
                title={'1 Event'}
                icon={<ListAlt color={'inherit'} />}
            />
            <InfoListItem dense style={{ height: 36 }} title={'Online'} icon={<Cloud color={'inherit'} />} />
        </List>
    </ScoreCard>
);

withFullConfig.story = { name: 'with full config' };
