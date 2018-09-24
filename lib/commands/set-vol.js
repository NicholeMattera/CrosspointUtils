const Command = require('../command')

class SetVol extends Command {
    constructor(path, output, volume) {
        super(path)
        this.output = output
        this.volume = volume

        if (!this.validate()) {
            process.exit(-1)
        }

        this.volume = this.convertPercentageToNumber()
        this.serialPort.write(output + '*' + this.volume + 'V', this.writeCallback.bind(this))
    }

    validate() {
        if (this.output === undefined) {
            console.log('[Error] Output required.')
            return false
        }

        if (this.volume === undefined) {
            console.log('[Error] Volume required.')
            return false
        }

        if (this.output < 1 || this.output > 16) {
            console.log('[Error] Invalid output.')
            return false
        }

        if (this.volume < 0|| this.volume > 100) {
            console.log('[Error] Invalid volume.')
            return false
        }

        return true
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }

        console.log('Output ' + this.output + ' volume has been set to ' + this.convertNumberToPercentage(this.volume) + '%.')
        process.exit(1)
    }

    convertPercentageToNumber() {
        if (this.volume === 0) {
            return 0
        } else if (this.volume > 0 && this.volume <= 5.5) {
            return 1
        }

        return Math.round((this.volume - 5.5) / 1.5) + 1
    }
    
    convertNumberToPercentage(response) {
        if (response == 0) {
            return 0
        }
        else if (response == 1) {
            return 5.5
        }

        return 1.5 * (response - 1) + 5.5
    }
}

module.exports = SetVol
