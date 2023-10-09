import type { Reducer } from 'redux';

import type { Invite } from '@proton/pass/types/data/invites';
import { or } from '@proton/pass/utils/fp';
import { objectDelete } from '@proton/pass/utils/object';

import { inviteAcceptSuccess, inviteRejectSuccess, syncInvites } from '../actions';

export type InviteState = Record<string, Invite>;

const reducer: Reducer<InviteState> = (state = {}, action) => {
    if (syncInvites.match(action)) return action.payload;

    if (or(inviteAcceptSuccess.match, inviteRejectSuccess.match)(action)) {
        return objectDelete(state, action.payload.token);
    }

    return state;
};

export default reducer;