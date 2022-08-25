import React from 'react';
import { Box, Divider } from '@mui/material';
import { Drawer, DrawerBody, DrawerNavGroup, DrawerNavItem, Spacer } from '@brightlayer-ui/react-components';
import * as colors from '@brightlayer-ui/colors';

export const SpacingNavGroupsExample = (): JSX.Element => (
    <Box sx={{ m: '16px 0', backgroundColor: colors.white[600], p: 4 }}>
        <Drawer open={true} width={250} sx={{ margin: '0 auto' }} noLayout>
            <DrawerBody sx={{ flex: '1 1 auto' }}>
                <DrawerNavGroup title="Group 1" hidePadding>
                    <DrawerNavItem title="Item 1" itemID="1" />
                    <DrawerNavItem title="Item 2" itemID="2" />
                </DrawerNavGroup>
                <Spacer sx={{ display: 'list-item' }} />
                <Divider />
                <DrawerNavGroup title="Group 2" hidePadding>
                    <DrawerNavItem title="Item 3" itemID="1" />
                    <DrawerNavItem title="Item 4" itemID="2" />
                </DrawerNavGroup>
            </DrawerBody>
        </Drawer>
    </Box>
);
