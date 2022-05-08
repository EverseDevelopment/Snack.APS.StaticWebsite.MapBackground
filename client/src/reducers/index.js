import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import viewerReducer from './viewerReducer';
import modelsReducer from './modelsReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
    account: accountReducer,
    viewer: viewerReducer,
    models: modelsReducer,
    toastr: toastrReducer
});

export default(state, action) => {
    return rootReducer(
        action.type === '@account/sign-out' ? undefined : state,
        action
    )
}