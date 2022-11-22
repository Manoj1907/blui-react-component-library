import React from 'react';
import Box from '@mui/material/Box';
import { CodeBlock, CodeBlockActionButtonRow } from '../../../shared';
import { HeroBannerWithIconSizeExample } from './HeroBannerWithIconSizeExample';

const codeSnippet = `{[36, 48, 72].map((iconSize, index) => (
    <HeroBanner key={index}>
        <Hero
            icon={<VoltageCircledOutline fontSize={'inherit'} />}
            iconSize={iconSize}
            label={'SVG'}
            ChannelValueProps={{ value: iconSize, units: 'px', unitSpace: 'hide' }}
        />
        <Hero
            icon={<Schedule fontSize={'inherit'} />}
            iconSize={iconSize}
            label={'Mui Icon'}
            ChannelValueProps={{ value: iconSize, units: 'px', unitSpace: 'hide' }}
        />
        <Hero
            icon={<i className="blui-current_circled"></i>}
            iconSize={iconSize}
            label={'icon font'}
            ChannelValueProps={{ value: iconSize, units: 'px', unitSpace: 'hide' }}
        />
        <Hero
            icon={<img src={Trex} height={iconSize} alt="A T-Rex as the avatar image" />}
            iconSize={iconSize}
            label={'PNG'}
            ChannelValueProps={{ value: iconSize, units: 'px', unitSpace: 'hide' }}
        />
    </HeroBanner>
))}`;

export const HeroBannerWithIconSize = (): JSX.Element => (
    <Box>
        <HeroBannerWithIconSizeExample />
        <CodeBlock code={codeSnippet} language="jsx" dataLine={'4, 10, 16, 22'} />
        <CodeBlockActionButtonRow
            copyText={codeSnippet}
            url="componentDocs/Hero/examples/HeroBannerWithIconSizeExample.tsx"
        />
    </Box>
);
