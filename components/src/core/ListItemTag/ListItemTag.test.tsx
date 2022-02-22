import React from 'react';
import ReactDOM from 'react-dom';
// import { Mount, Shallow } from '../types';
import { ListItemTag } from './ListItemTag';
import { findByTestId, getComputedStyleFromHTMLString, mountWithTheme } from '../test-utils';
import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as Colors from '@brightlayer-ui/colors';
import color from 'color';

// import { createMount, createShallow } from '@mui/material/test-utils';
import {createTheme, ThemeProvider } from '@mui/material/styles';


// import { createMount, createShallow } from '@mui/material/test-utils';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });
// let mount: Mount;
// let shallow: Shallow;

describe('ListItemTag', () => {
    beforeEach(() => {
        // mount = createMount({ strict: true });
        // shallow = createShallow();
    });

    afterEach(() => {
        // mount.cleanUp();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ThemeProvider theme={theme}><ListItemTag label={'test'} /></ThemeProvider>, div);
    });

    it('should render list-item-tag wrapper', () => {
        const wrapper = mountWithTheme(<ListItemTag label={'test'} />, theme);
        expect(findByTestId('list-item-tag', wrapper)).toBeTruthy();
    });

    it('renders the correct label text', () => {
        const wrapper = mountWithTheme(<ListItemTag label={'test'} />, theme);
        expect(wrapper.text()).toEqual('test');
    });

    it('renders with correct colors', () => {
        const fontColor = Colors.gold[200];
        const backgroundColor = Colors.green[900];
        const wrapper = mountWithTheme(<ListItemTag label={'test'} fontColor={fontColor} backgroundColor={backgroundColor} />, theme);
        const computedStyle = getComputedStyleFromHTMLString(wrapper.html());

        expect(computedStyle.color).toEqual(color(fontColor).rgb().string());
        expect(computedStyle.backgroundColor).toEqual(color(backgroundColor).rgb().string());
    });
});
