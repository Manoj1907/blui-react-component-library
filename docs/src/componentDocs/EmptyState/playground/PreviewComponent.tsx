import React from 'react';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';
import {
    createProps,
    getIcon,
    getIconWithProp,
    hideDefaultPropsFromSnippet,
    removeEmptyLines,
} from '../../../shared/utilities';
import { PropsType } from '../../../__types__';
import PreviewComponentWithCode from '../../../shared/PreviewComponentWithCode';
import { EmptyState } from '@brightlayer-ui/react-components/core/EmptyState';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export const PreviewComponent = (): JSX.Element => {
    const emptyStateJson = useAppSelector((state: RootState) => state.componentsPropsState.emptyStateComponent);

    const emptyStateProps = createProps(emptyStateJson.props as PropsType[]);
    const emptyStateOtherProps = createProps(emptyStateJson.otherProps as PropsType[]);

    const toggleActionSection = (showAction: boolean): JSX.Element | undefined =>
        showAction ? (
            <Button variant={'outlined'} color={'primary'} startIcon={<AddIcon />}>
                {'Add Device'}
            </Button>
        ) : undefined;

    const toggleActionSnippet = (showActionSnippet: boolean): string =>
        showActionSnippet
            ? `actions={
        <Button variant={"outlined"} color={"primary"} startIcon={<AddIcon />}>
            {"Add Device"}
        </Button>
    }`
            : ``;

    const toggleDefaultProp = (propName: string, currentValue: any, groupType?: string): string =>
        hideDefaultPropsFromSnippet(emptyStateJson, propName, currentValue, groupType);

    const generateCodeSnippet = (): string => {
        const jsx = `<EmptyState
    icon={${getIconWithProp(emptyStateProps.icon, { fontSize: 'inherit' })}}
    title={"${emptyStateProps.title}"}
    ${toggleDefaultProp('description', emptyStateProps.description)}
    ${toggleActionSnippet(emptyStateOtherProps.showAction)}
/>`;
        return removeEmptyLines(jsx);
    };

    return (
        <PreviewComponentWithCode
            previewContent={
                <EmptyState
                    icon={getIcon(emptyStateProps.icon, { fontSize: 'inherit' })}
                    title={emptyStateProps.title}
                    description={emptyStateProps.description}
                    actions={toggleActionSection(emptyStateOtherProps.showAction)}
                />
            }
            code={generateCodeSnippet()}
        />
    );
};
