import React from 'react';
import { Box } from '@mui/material';
import { CodeBlock, CopyToClipboard } from '../../../shared';
import { SpacingNavGroupsExample } from './SpacingNavGroupsExample';

const codeSnippet = `<Drawer>
    <DrawerBody>
        <DrawerNavGroup title="Group 1" hidePadding>
            <DrawerNavItem title="Item 1" itemID="1" />
            <DrawerNavItem title="Item 2" itemID="2" />
        </DrawerNavGroup>
        <Spacer sx={{display: 'list-item'}} />
        <Divider />
        <DrawerNavGroup title="Group 2" hidePadding>
            <DrawerNavItem title="Item 3" itemID="1" />
            <DrawerNavItem title="Item 4" itemID="2" />
        </DrawerNavGroup>
    </DrawerBody>
</Drawer>
`;
export const SpacingNavGroups = (): JSX.Element => (
    <Box>
        <SpacingNavGroupsExample />
        <CodeBlock code={codeSnippet} language="jsx" dataLine="3-12" />
        <CopyToClipboard title={'Copy All'} copyText={codeSnippet} />
    </Box>
);
