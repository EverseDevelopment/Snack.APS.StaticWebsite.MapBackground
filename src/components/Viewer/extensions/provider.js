import React from 'react';
import MiniMapContent from './mapExtension';
import MapBackground from './mapBackgroundExtension/mapContent';
import { Provider } from "react-redux";
import { configureStore } from "../../../store";
export const store = configureStore();

const appWrapper = (props) => {
    return (
        <Provider store={store}>
            {props.status === 5 && (
                <MiniMapContent viewer={props.viewer} />
            )}
            {props.status === 6 && (
                <MapBackground viewer={props.viewer} />
            )}
        </Provider>
    ) 
}

export default appWrapper;
