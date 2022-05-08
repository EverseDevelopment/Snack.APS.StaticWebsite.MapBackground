import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { updateVendorCheckResult } from '../../../../actions/viewerActions';

let doors = 0;
let windows = 0;
let sensors = 0;

const panelContent = (props) => {
    
    const [total, setTotal] = useState(undefined);
    const [totalPrice, setTotalPrice] = useState(undefined);

    useEffect(() => {
        if(props.nodeList && (doors === 0 || windows === 0 || sensors === 0)) {
            //For door elements;
            const doorItems = findElement('Doors');
            if(doorItems) {
                doors = doorItems.count;
            }

            //For windows element
            const windowItems = findElement('Windows');
            if(windowItems) {
                windows = windowItems.count;
            } else {
                const curtainItems = findElement('Curtain Wall');
                if(curtainItems) {
                    windows = curtainItems.count;
                }
            }

            //For sensor items
            const floorItems = findElement('Floors');
            const basicWallItems = findElement('Basic Wall');
            if(floorItems && basicWallItems) {
                sensors = floorItems.count + basicWallItems.count;
            } else if(!floorItems && basicWallItems) {
                sensors = basicWallItems.count;
            } else if(floorItems && !basicWallItems) {
                sensors = floorItems.count;
            } else {
                sensors = 0;
            }
            setTotal(doors + windows + sensors);
        }

        setTotalPrice(
            doors * props.vendorSelectedStatus[0].price +
            windows * props.vendorSelectedStatus[1].price +
            sensors * props.vendorSelectedStatus[2].price +
            3000
        );
    }, [props.nodeList, props.vendorSelectedStatus])

    const findElement = (name) => {
        let node = 0;
        if(props.nodeList) {
            node = props.nodeList.find(item => item.Name === name);
        }
        return node;
    }
    
    return (
        <div className="react-content">
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Total items</td>
                            <td className="text-right">
                                {total && total}
                            </td>
                        </tr>
                        <tr>
                            <td>Total cost</td>
                            <td className="text-right">
                                ${totalPrice && totalPrice}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { variant, total, vendorList, vendorSelectedStatus, selectedCategory, nodeList } = state.viewer;
    return { variant, total, vendorList, vendorSelectedStatus, selectedCategory, nodeList };
}
  
export default connect(mapStateToProps, { updateVendorCheckResult })(panelContent);