function socketMain(io, socket) {

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

    socket.on('perfData', (data) => {
        console.log(data)
    })
}

module.exports = socketMain