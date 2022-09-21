import React from 'react';
import { Box } from '@mui/material';
import { CodeBlock, CodeBlockActionButtonRow } from '../../../shared';
import { ComplexDrawerFooterExample } from './ComplexDrawerFooterExample';

const codeSnippet = `<Drawer open={true} width={250}>
    <DrawerBody>
        <DrawerNavGroup hidePadding>
            <DrawerNavItem title="Dashboard" itemID="1" />
            <DrawerNavItem title="Locations" itemID="2" />
            <DrawerNavItem title="Legal" itemID="3" />
        </DrawerNavGroup>
    </DrawerBody>
    <DrawerFooter>
        <Box>
            <Typography variant="caption" color={'text.disabled'}>
                v2.4.0
            </Typography>
            <Typography variant="caption" color={'text.disabled'}>
                10:33:05 03/12/22
            </Typography>
        </Box>
            <Box>
                <Box component="img" src={EatonFooterLogoLight} />
                <Box>
                    <Typography variant="caption">
                        Copyright © Eaton
                    </Typography>
                    <Typography variant="caption">
                        All Rights Reserved
                    </Typography>
                </Box>
            </Box>
        </Box>
    </DrawerFooter>
</Drawer>
`;

export const ComplexDrawerFooter = (): JSX.Element => (
    <Box>
        <ComplexDrawerFooterExample />
        <CodeBlock code={codeSnippet} language="jsx" dataLine="9-34" />
        <CodeBlockActionButtonRow
            copyText={codeSnippet}
            url="componentDocs/DrawerFooter/examples/ComplexDrawerFooterExample.tsx"
        />
    </Box>
);
