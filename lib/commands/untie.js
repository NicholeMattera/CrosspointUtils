const Command = require('../command')

class Untie extends Command {
    constructor(path, output) {
        super(path)
        this.output = output

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write('0*' + output + '!', this.writeCallback.bind(this))
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

        console.log('Output ' + this.output + ' has been untied to any inputs.')
        process.exit(1)
    }
}

module.exports = Untie
