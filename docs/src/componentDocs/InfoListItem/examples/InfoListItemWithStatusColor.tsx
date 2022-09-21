import React from 'react';
import { Box } from '@mui/material';
import { CodeBlock, CodeBlockActionButtonRow } from '../../../shared';
import { InfoListItemWithStatusColorExample } from './InfoListItemWithStatusColorExample';

const codeSnippet = `<InfoListItem
    title="Info List Item"
    subtitle="with a status indicator"
    icon={<OfflineBolt />}
    avatar={true}
    statusColor='#2ca618'
/>`;

export const InfoListItemWithStatusColor = (): JSX.Element => (
    <Box>
        <InfoListItemWithStatusColorExample />
        <CodeBlock code={codeSnippet} language="jsx" />
        <CodeBlockActionButtonRow
            copyText={codeSnippet}
            url="componentDocs/ListItemTag/examples/InfoListItemWithStatusColorExample.tsx"
        />
    </Box>
);
