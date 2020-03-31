import React from 'react'
import drawCircle from './utilities/canvasLoadAnimation'


function Mem(props) {
    //destructure props for easier manupulation
    const { totalMem, freeMem, usedMem, memUsage } = props.memData
    const canvas = document.querySelector('.memCanvas')
    drawCircle(canvas, memUsage * 100)
    const totalMemInGB = totalMem/1073741824
    const freeMemInGB = freeMem/1073741824
    return (
        <div className="col-sm-3 mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <canvas className="memCanvas" width="200" height="200"></canvas>
                <div className="mem-text">{memUsage * 100}%</div>
            </div>
            <div>Total Memory: {totalMemInGB.toFixed(2)} GB</div>
            <div>Free Memory: {freeMemInGB.toFixed(2)} GB</div>
        </div>
    )
}

export default Mem;