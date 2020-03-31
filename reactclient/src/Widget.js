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
        const { freeMem, totalMem, usedMem, memUsage, osType, uptime, cpuModel, cpuSpeed, numCores, cpuLoad, macAddress } = this.props.data
        const cpu = { cpuLoad }
        const mem = { totalMem, freeMem, usedMem, memUsage }
        const info = { macAddress, osType, uptime, cpuModel, cpuSpeed, numCores }
        return (
            <div>
                <Cpu cpuData={cpu} />
                <Mem memData={mem} />
                <Info infoData={info} />
            </div>
        )
    }
}

export default Widget