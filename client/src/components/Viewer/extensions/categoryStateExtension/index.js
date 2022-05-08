import React from 'react';
import { connect } from 'react-redux';
import { updateVendorCheckResult } from '../../../../actions/viewerActions';

const panelContent = (props) => {

    return (
        <div className="react-content">
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Number of instances</td>
                            <td className="text-right">
                                {props.selectedCategory && props.selectedCategory.count}
                            </td>
                        </tr>
                        <tr>
                            <td>Installation cost</td>
                            <td className="text-right">
                                $1000
                            </td>
                        </tr>
                        <tr>
                            <td>Unitary Cost</td>
                            <td className="text-right">
                                {props.vendorList && props.vendorSelectedStatus && (
                                    props.vendorSelectedStatus[props.vendorList[props.vendorList.length - 1].order].price
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Total Cost</td>
                            <td className="text-right">
                                {props.selectedCategory && props.vendorList && props.vendorSelectedStatus && (
                                    `$${props.vendorSelectedStatus[props.vendorList[props.vendorList.length - 1].order].price * props.selectedCategory.count + 1000}`
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { variant, total, vendorList, vendorSelectedStatus, selectedCategory } = state.viewer;
    return { variant, total, vendorList, vendorSelectedStatus, selectedCategory };
}
  
export default connect(mapStateToProps, { updateVendorCheckResult })(panelContent);