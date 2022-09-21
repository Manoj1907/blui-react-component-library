import React from 'react';
import { Box, Typography } from '@mui/material';
import { Drawer, DrawerBody, DrawerFooter, DrawerNavGroup, DrawerNavItem } from '@brightlayer-ui/react-components';
import * as colors from '@brightlayer-ui/colors';
import EatonFooterLogoLight from '../images/EatonLogoLight.png';

export const ComplexDrawerFooterExample = (): JSX.Element => (
    <Box sx={{ m: '16px 0', backgroundColor: colors.white[600], p: 4 }}>
        <Drawer open={true} width={250} sx={{ margin: '0 auto' }} noLayout>
            <DrawerBody sx={{ flex: '1 1 auto' }}>
                <DrawerNavGroup hidePadding>
                    <DrawerNavItem title="Dashboard" itemID="1" />
                    <DrawerNavItem title="Locations" itemID="2" />
                    <DrawerNavItem title="Legal" itemID="3" />
                </DrawerNavGroup>
            </DrawerBody>
            <DrawerFooter sx={{ p: 2 }}>
                <Box>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color={'text.disabled'} sx={{display: 'block'}}>
                            v2.4.0
                        </Typography>
                        <Typography variant="caption" color={'text.disabled'} sx={{display: 'block'}}>
                            10:33:05 03/12/22
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ width: 83 }} component="img" src={EatonFooterLogoLight} />
                        <Box>
                            <Typography sx={{ display: 'block' }} variant="caption">
                                Copyright © Eaton
                            </Typography>
                            <Typography sx={{ display: 'block' }} variant="caption">
                                All Rights Reserved
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </DrawerFooter>
        </Drawer>
    </Box>
);
