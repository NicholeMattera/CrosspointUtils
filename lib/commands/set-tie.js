const Command = require('../command')

class SetTie extends Command {
    constructor(path, input, output) {
        super(path)
        this.input = input
        this.output = output

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write(input + '*' + output + '!', this.writeCallback.bind(this))
    }

    validate() {
        if (this.input === undefined) {
            console.log('[Error] Input required.')
            return false
        }

        if (this.output === undefined) {
            console.log('[Error] Output required.')
            return false
        }

        if (this.input < 1 || this.input > 16) {
            console.log('[Error] Invalid input.')
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

        console.log('Input ' + this.input + ' has been tied to output ' + this.output + '.')
        process.exit(1)
    }
}

module.exports = SetTie
