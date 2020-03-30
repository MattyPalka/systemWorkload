// this is the program that captures the local performance data and sends it 
// to socket.io server

const os = require('os')
const io = require('socket.io-client')
const socket = io('http://127.0.0.1:8181')

socket.on('connect', () => {
    //first need to identify the machine
    const networkInterface = os.networkInterfaces()
    let macAddress
    //loop through all network interfaces and find the non-internal one to use mac address from
    for (let key in networkInterface) {
        if (!networkInterface[key][0].internal) {
            macAddress = networkInterface[key][0].mac
            break
        }
    }

    // Client auth with single key value
    socket.emit('clientAuth', '41j2412jrp12rp')


    performanceData().then((data) => {
        data.macAddress = macAddress
        socket.emit('initPerfData', data)
    })

    // Start sendind data over 1 sec interval
    let perfDataInterval = setInterval(() => {
        performanceData().then((data) => {
            socket.emit('perfData', data)
        })
    }, 1000)

    socket.on('disconnect', ()=>{
        clearInterval(perfDataInterval)
    })
})

function performanceData() {
    return new Promise(async (resolve, reject) => {


        // get cpu info
        const cpus = os.cpus()

        // get OS
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type()

        // get uptime (in seconds)
        const uptime = os.uptime()

        // get free sys memory (in bytes as int)
        const freeMem = os.freemem()

        // get total sys memory (in bytes as int)
        const totalMem = os.totalmem()

        // calculate memory usage
        const usedMem = totalMem - freeMem
        const memUsage = Math.floor(usedMem / totalMem * 100) / 100

        // CPU INFO
        const cpuModel = cpus[0].model
        const cpuSpeed = cpus[0].speed
        const numCores = cpus.length
        const cpuLoad = await getCpuLoad()
        resolve({
            freeMem,
            totalMem,
            usedMem,
            memUsage,
            osType,
            uptime,
            cpuModel,
            cpuSpeed,
            numCores,
            cpuLoad
        })
    })
}
// average of all CPU cores load
function cpuAverage() {
    // get ms in all cores (this number is since reboot)
    // get now and in 100ms to compare
    const cpus = os.cpus()
    let idleMs = 0
    let totalMs = 0
    cpus.forEach((core) => {
        for (type in core.times) {
            totalMs += core.times[type]
        }
        idleMs += core.times.idle
    })
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

function getCpuLoad() {
    return new Promise((resolve, reject) => {
        const start = cpuAverage()
        setTimeout(() => {
            const end = cpuAverage()
            const idleDifference = end.idle - start.idle
            const totalDifference = end.total - start.total
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference)
            resolve(percentageCpu)
        }, 100)
    })
}

