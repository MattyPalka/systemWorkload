import React, { Component } from 'react'
import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'
import './widget.css'

class Widget extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        // destructure data object for easier handling
        const { freeMem, totalMem, usedMem, memUsage, osType, uptime, cpuModel, cpuSpeed, numCores, cpuLoad, macAddress, isActive } = this.props.data

        const cpuWidgetId = `cpu-widget-${macAddress.split(":").join("")}`
        const memWidgetId = `mem-widget-${macAddress.split(":").join("")}`

        const cpu = { cpuLoad, cpuWidgetId }
        const mem = { totalMem, freeMem, usedMem, memUsage, memWidgetId }
        const info = { macAddress, osType, uptime, cpuModel, cpuSpeed, numCores }



        let notActiveDiv = ''
        if (!isActive) {
            notActiveDiv = <div className="not-active">OFFLINE</div>
        }
        return (
            <div className="widget col-sm-12">
                {notActiveDiv}
                <Cpu cpuData={cpu} />
                <Mem memData={mem} />
                <Info infoData={info} />
            </div>
        )
    }
}

export default Widget