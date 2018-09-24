const Command = require('../command')

class GetGain extends Command {
    constructor(path, input) {
        super(path)
        this.input = input

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write(input + 'G', this.writeCallback.bind(this))
        this.serialPort.on('readable', this.readCallback.bind(this))
    }

    validate() {
        if (this.input === undefined) {
            console.log('[Error] Input required.')
            return false
        }

        if (this.input < 1 || this.input > 16) {
            console.log('[Error] Invalid input.')
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
        let response = this.serialPort.read(3)
        if (response == null) {
            return
        }

        response = parseInt(response.toString())
        if (this.validateResponse(response)) {
            console.log('Input ' + this.input + ' has a gain of ' + response + ' dB.')
            process.exit(1)
        } else {
            console.log('[Error] Invalid response')
            process.exit(-3)
            return
        }
    }

    validateResponse(response) {
        return response != NaN && response >= -18 && response <= 24
    }
}

module.exports = GetGain
