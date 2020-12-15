import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { InsuranceListTable, ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`)
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { CustomPagination } = require(`../../../../../../components/${PLATFORM}/atoms/pagination`)
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)

export const InsuranceList = ({
    insuranceData,
    deleteInsurance,
    insuranceCount, getInsuranceList, getINsurance, listIndex, index
}) => {
    const [editInsurance, setEditInsurance] = useState(false)
    const [delInsurance, setDeleteInsurance] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null)
    const [pageIndex, setPageIndex] = useState(index ? index : 0)
    const [openSnackBar, setOpenSnackbar] = useState(false);

    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const history = useHistory()
    const deleteInsuranceFunction = (index) => {
        setDeleteInsurance(true)
        setActiveIndex(index)
    }
    const editInsuranceFunction = (index) => {
        // setEditInsurance(true) 
        getINsurance(insuranceData[index])
        history.replace(`${ROUTES.GET_INSURANCE}?id=${insuranceData[index]._id}`)
    }
    const postData = (data) => {
        let req = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        return req
    }
    useEffect(() => {

    }, [insuranceData])
    useEffect(() => {

    }, [pageIndex])

    return (
        <>
        <div className="table-responsive table-default insurance_table my-2">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <DecisionPopup
                modalVisibility={delInsurance}
                dialogTitle={'Delete Insurance'}
                dialogContent={'Are you sure, you want to delete this insurance?'}
                confirmButtonTitle={'Confirm'}
                rejectButtonTitle={'Cancel'}
                onConfirmation={() => {
                    setDeleteInsurance(false)
                    deleteInsurance(insuranceData[activeIndex]._id, (response) => {
                        setSnackBarData({
                            variant: response.status ? 'success' : 'error',
                            message: response.msg || 'error'
                        });
                        setOpenSnackbar(true)
                        let data;
                        if (insuranceData && insuranceData.length === 1) {
                            if (pageIndex > 1) {
                                setPageIndex(pageIndex - 1)
                                listIndex(pageIndex - 1)
                                data = { limit: STRINGS.TRIP_LIMIT, index: pageIndex - 1 }
                            } else {
                                setPageIndex(0)
                                listIndex(0)
                                data = { limit: STRINGS.TRIP_LIMIT, index: 0 }
                            }
                        } else {
                            setPageIndex(pageIndex)
                            listIndex(pageIndex)
                            data = { limit: STRINGS.TRIP_LIMIT, index: pageIndex }
                        }

                        let req = postData(data)
                        getInsuranceList(req)

                    }, (response) => {
                        setSnackBarData({
                            variant: response.status ? 'success' : 'error',
                            message: response.msg || 'error'
                        });
                        setOpenSnackbar(true)
                    })
                }}
                onRejection={() => {
                    setDeleteInsurance(false)
                }}
            />

            <table className="table table-borderless">{!!(insuranceData && insuranceData.length) && <thead>
                <tr>
                    {InsuranceListTable.map((insurance, index) => {
                        return <th key={index}>{insurance}</th>
                    })}
                </tr>
            </thead>}
                <tbody>{insuranceData && insuranceData.map((insurance, index) => {
                    return <tr key={index}><td>{insurance.referenceId ? insurance.referenceId : 0}</td><td>
                        {insurance.name ? insurance.name : ''}
                    </td><td>
                            ${insurance.bond ? insurance.bond : ''}
                        </td><td>${insurance.dailyFee ? insurance.dailyFee : ''}</td>
                        <td>${insurance.excess ? insurance.excess : ''}</td>
                        <td className="edit_screen" onClick={() => { editInsuranceFunction(index) }}>edit</td>
                        <td className="delete_screen" onClick={() => deleteInsuranceFunction(index)}>delete</td>
                    </tr>
                })}</tbody>
                {
                    !(insuranceData && insuranceData.length) &&
                    <tbody>
                        <tr><td colSpan={InsuranceListTable.length}>
                            No insurance found
                        </td></tr>
                    </tbody>
                }
            </table>


        </div>
        {!!(insuranceData && insuranceData.length) && <CustomPagination
            limit={STRINGS.TRIP_LIMIT}
            totalPages={insuranceCount}
            itemsCount={insuranceData && insuranceData.length}
            currentPage={pageIndex + 1}
            onPageChange={(value) => {
                let data = { limit: STRINGS.TRIP_LIMIT, index: value && value.selected }
                let req = postData(data)
                getInsuranceList(req)
                listIndex(value && value.selected)
                setPageIndex(value && value.selected)
            }}
        />}
        </>
    )
}