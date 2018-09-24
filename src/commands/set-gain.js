const { Command } = require('../command')

class SetGain extends Command {
    constructor(path, input, gain) {
        super(path)
        this.input = input
        this.gain = gain

        if (!this.validate()) {
            process.exit(-1)
        }

        this.gain = Math.floor(this.gain)
        if (this.gain < 0) {
            this.serialPort.write(input + '*' + (this.gain * -1) + 'g', this.writeCallback.bind(this))
        } else {
            this.serialPort.write(input + '*' + this.gain + 'G', this.writeCallback.bind(this))
        }
    }

    validate() {
        if (this.input === undefined) {
            console.log('[Error] Input required.')
            return false;
        }

        if (this.gain === undefined) {
            console.log('[Error] Gain required.')
            return false;
        }

        if (this.input < 1 || this.input > 16) {
            console.log('[Error] Invalid input.')
            return false
        }

        if (this.gain < -18 || this.gain > 24) {
            console.log('[Error] Invalid gain.')
            return false
        }

        return true
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }

        console.log('Input ' + this.input + ' gain has been set to ' + this.gain + ' dB.')
        process.exit(1)
    }
}

module.exports.SetGain = SetGain
