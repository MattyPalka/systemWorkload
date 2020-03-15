// this is the program that captures the local performance data and sends it 
// to socket.io server

const os = require('os')
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
const memUsage = Math.floor(usedMem / totalMem * 100)/100

// CPU INFO
const cpuModel = cpus[0].model
const cpuSpeed = cpus[0].speed
const numCores = cpus.length

