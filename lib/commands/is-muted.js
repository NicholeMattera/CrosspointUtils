const Command = require('../command')
const { Audio } = require('../audioVideo')

class IsMuted extends Command {
    constructor(path, output, type) {
        super(path)
        this.output = output
        this.type = type

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write(this.output + this.type, this.writeCallback.bind(this))
        this.serialPort.on('readable', this.readCallback.bind(this))
    }

    validate() {
        if (this.output === undefined) {
            console.log('[Error] Output required.')
            return false
        }

        if (this.output < 1 || this.output > 16) {
            console.log('[Error] Invalid output.')
            return false
        }
        
        return true
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }
    }

    readCallback() {
        let response = this.serialPort.read(1)
        if (response == null) {
            return
        }

        response = parseInt(response.toString())
        if (this.validateResponse(response)) {
            console.log('Output ' + this.output + ' ' + ((this.type === Audio) ? 'audio' : 'video') + ' is' + ((response === 1) ? '' : ' not') + ' muted.')            
            process.exit(1)
        } else {
            console.log('[Error] Invalid response')
            process.exit(-3)
            return
        }
    }

    validateResponse(response) {
        return response !== NaN && (response === 0 || response === 1)
    }
}

module.exports = IsMuted
