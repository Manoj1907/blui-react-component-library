import { Spacer } from '@pxblue/react-components';
import { COMPONENT_SECTION_NAME } from '../../src/constants';
import { storyParams, storyWrapper } from '../../src/utils';

const spacerModule = {
    title: `${COMPONENT_SECTION_NAME}/Spacer`,
    component: Spacer,
    decorators: [storyWrapper],
    parameters: {...storyParams, notes: { markdown: require('./../../../../docs/Spacer.md') } }
};

/* Display order goes here */
export * from './flex-layout';
export * from './static-layout';

export default spacerModule;
