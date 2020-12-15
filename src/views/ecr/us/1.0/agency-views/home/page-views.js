import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { analyticData
} = require(`../../../../../../redux/${PLATFORM}/actions`);


const Screen = ({
    chartData,
    agencyId, analyticData
}) => {
    const [viewLabel, setViewLabel] = useState([])
    const [viewData, setViewData] = useState([])

    useEffect(() => {
        let data = { chartData: true }
        let req = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        analyticData(req, (msg) => { }, (msg) => { })
    }, [agencyId])

    useEffect(() => {

        let labelArr = []
        let dataArr = []
        if (chartData && chartData.length > 0) {
            chartData.map((obj, index) => {
                let key = Object.keys(obj)[0]
                labelArr.push(key)
                dataArr.push(obj[key])
            })
      
            setViewLabel(labelArr)
            setViewData(dataArr)
        }
    }, [chartData])
    const views =
    {
        labels: viewLabel,
        datasets: [
            {
                label: "Page Views",
                data: viewData,
                fill: true,
                backgroundColor: "rgb(197, 225, 247)",
                borderColor: "#0091FF"
            }
        ]
    }


    return (
        <div className="app-main_outer">
            <div className="container-fluid">
                <h5>Past Listing Views</h5>
                <Line data={views} width={100}
                    height={50} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {

    return ({
        chartData: state && state.AgencyDashboardReducer && state.AgencyDashboardReducer.AnalyticData && state.AgencyDashboardReducer.AnalyticData.chartData,
        agencyId: state.CommonReducer.userData && state.CommonReducer.userData.agencyId
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        analyticData: (data, success, failure) => {
            dispatch(analyticData(data, success, failure))
        }
    }
}

export const PageViews = connect(mapStateToProps, mapDispatchToProps)(Screen);