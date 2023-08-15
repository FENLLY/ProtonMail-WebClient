import { render } from '@testing-library/react';

import { Conversation } from 'proton-mail/models/conversation';
import { Element } from 'proton-mail/models/element';

import ItemDate from './ItemDate';

const element = {
    ID: 'elementID',
    Time: 1672531200,
} as Element;

const snoozedElement = {
    ID: 'elementID',
    Time: 1672531200,
    Labels: [
        {
            ID: '16',
            ContextSnoozeTime: 1704067200,
        },
    ],
} as Conversation;

describe('ItemDate', () => {
    it('Should display regular date with simple mode', () => {
        const { getByTestId } = render(<ItemDate element={element} labelID="1" />);
        expect(getByTestId('item-date-simple'));
    });
    it('Should display regular date with distance mode', () => {
        const { getByTestId } = render(<ItemDate element={element} labelID="1" mode="distance" />);
        expect(getByTestId('item-date-distance'));
    });
    it('Should display the snooze time when snooze time and in list view while in snooze folder', () => {
        const { getByTestId } = render(<ItemDate element={snoozedElement} labelID="16" isInListView />);
        expect(getByTestId('item-date-snoozed'));
    });
    it('Should not display the snooze time when snooze time and in list view and in inbox', () => {
        const { queryByTestId } = render(<ItemDate element={snoozedElement} labelID="0" isInListView />);
        expect(queryByTestId('item-date-snoozed')).toBeNull();
    });
    it('Should display regular date with simple mode when not in list', () => {
        const { getByTestId } = render(<ItemDate element={snoozedElement} labelID="1" />);
        expect(getByTestId('item-date-simple'));
    });
    it('Should display regular date with distance mode when not in list', () => {
        const { getByTestId } = render(<ItemDate element={snoozedElement} labelID="1" mode="distance" />);
        expect(getByTestId('item-date-distance'));
    });
});
