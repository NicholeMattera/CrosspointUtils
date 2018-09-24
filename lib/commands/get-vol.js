const Command = require('../command')

class GetVol extends Command {
    constructor(path, output) {
        super(path)
        this.output = output

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write(output + 'V', this.writeCallback.bind(this))
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
        let response = this.serialPort.read(3)
        if (response == null) {
            return
        }

        response = parseInt(response.toString())
        if (this.validateResponse(response)) {
            console.log('Output ' + this.output + ' has a volume of ' + this.convertResponseToPercentage(response) + '%')
            process.exit(1)
        } else {
            console.log('[Error] Invalid response')
            process.exit(-3)
            return
        }
    }

    validateResponse(response) {
        return response != NaN && response >= 0 && response <= 64
    }

    convertResponseToPercentage(response) {
        if (response == 0) {
            return 0
        }
        else if (response == 1) {
            return 5.5
        }

        return 1.5 * (response - 1) + 5.5
    }
}

module.exports = GetVol
