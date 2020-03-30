require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
const Machine = require('./models/Machine')

function socketMain(io, socket) {
    let macAddress
    socket.on('clientAuth', (key) => {
        if (key === '41j2412jrp12rp'){
            //valid node client
            socket.join('clients')
        } else if (key === 'jq90i1kf012fkj290saf'){
            //valid UI client
            socket.join('ui')
        } else {
            //invalid client has join
            socket.disconnect(true)
        }
    })

    // check if connected machine is new, if so add it
    socket.on('initPerfData', (data)=>{
        macAddress = data.macAddress
        // check Mongo
        checkAndAdd(macAddress)
    })

    socket.on('perfData', (data) => {
        console.log(data)
    })
}

module.exports = socketMain