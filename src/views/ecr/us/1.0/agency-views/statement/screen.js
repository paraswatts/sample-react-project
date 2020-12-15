import React, { useState, useEffect } from 'react';
import './styles.scss';
import moment from 'moment'
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    DATE_FORMAT
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

export const Screen = ({
    transactionDetails,
    transactions
}) => {
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    useEffect(() => {
        transactionDetails((response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }, [])
    return (
        <div className={'app-main_outer'}>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="container-fluid">
                <div className="branch_area mb-md-4 mb-3">
                    <h5 className="mb-4">Account Statements</h5>
                    <div className='table-pagination mt-4'>
                        <div className='table-responsive'>
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="text-nowrap">
                                        <th>
                                            Date
                                            {/* <img src={require('../../../../assets/icons/sort.png')} alt="ECR" className="img-fluid" width="16px" /> */}
                                        </th>
                                        <th className="text-nowrap">
                                            Amount
                                     </th>
                                        <th className="text-nowrap">
                                            Receipt
                                     </th>
                                    </tr>
                                </thead>
                                {
                                    transactions && transactions.map((item, index) => {
                                        return (
                                            <tbody key={index + ''}>
                                                <tr>
                                                    <td>{moment(item.created * 1000).format(DATE_FORMAT)}</td>
                                                    <td>${item.amount / 100}</td>
                                                    <td><a href={item.receipt_url}
                                                        style={{ textDecoration: "underLine", color: "#0091FF" }}
                                                        target="_blank"
                                                    >Click here</a></td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }
                                {
                                    transactions.length === 0 && <tbody>
                                        <tr >
                                            <td>No transactions found</td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}