import { combineReducers } from 'redux';
import viewerReducer from './viewerReducer';

const rootReducer = combineReducers({
    viewer: viewerReducer
});

export default(state, action) => {
    return rootReducer(
        action.type === '@account/sign-out' ? undefined : state,
        action
    )
}