import React from 'react';
import CategoryPanelContent from './categoryExtension/views';
import VendorPanelContent from './vendorExtension/views';
import CategoryStatesContent from './categoryStateExtension';
import TotalContent from './totalExtension';
import MiniMapContent from './mapExtension';
import TopBar from '../topSection';
import MapBackground from './mapBackgroundExtension/mapContent';
import { Provider } from "react-redux";
import { configureStore } from "../../../store";
export const store = configureStore();

const appWrapper = (props) => {
    return (
        <Provider store={store}>
            {props.status === 0 && (
                <TopBar />
            )}
            {props.status === 1 && (
                <CategoryPanelContent viewer={props.viewer}/>
            )}
            {props.status === 2 && (
                <VendorPanelContent/>
            )}
            {props.status === 3 && (
                <CategoryStatesContent />
            )}
            {props.status === 4 && (
                <TotalContent />
            )}
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
