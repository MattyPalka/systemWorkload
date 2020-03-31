require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const Machine = require('./models/Machine')

function socketMain(io, socket) {
    let macAddress
    socket.on('clientAuth', (key) => {
        if (key === '41j2412jrp12rp') {
            //valid node client
            socket.join('clients')
        } else if (key === 'jq90i1kf012fkj290saf') {
            //valid UI client
            socket.join('ui')
        } else {
            //invalid client has join
            socket.disconnect(true)
        }
    })

    // check if connected machine is new, if so add it
    socket.on('initPerfData', async (data) => {
        macAddress = data.macAddress
        // check Mongo
        const mongooseResponse = await checkAndAdd(data)
        console.log(mongooseResponse)
    })

    socket.on('perfData', (data) => {
        console.log(data)
    })
}

function checkAndAdd(data) {
    // promise because it's db handling that js won't wait for
    return new Promise((resolve, reject) => {
        Machine.findOne({ macAddress: data.macAddress }, (err, doc) => {
            if (err) {
                throw err
                reject(err)
            } else if (doc === null) {
                // record is not in db -> add it
                let newMachine = new Machine(data)
                newMachine.save() // save it in database
                resolve('added')
            } else {
                // is in db
                resolve('found')
            }

        })
    })
}

module.exports = socketMain