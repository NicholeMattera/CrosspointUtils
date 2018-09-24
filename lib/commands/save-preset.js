const Command = require('../command')

class SavePreset extends Command {
    constructor(path, preset) {
        super(path)
        this.preset = preset

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write(this.preset + ',', this.writeCallback.bind(this))
    }

    validate() {
        if (this.preset === undefined) {
            console.log('[Error] Preset required.')
            return false
        }

        if (this.preset < 0 || this.preset > 32) {
            console.log('[Error] Invalid preset.')
            return false
        }

        if (this.preset === 0) {
            console.log('[Error] Can not save to preset 0 as it\s reserved for current configuration.')
            return false
        }
        
        return true
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }

        console.log('Current ties save to global preset ' + this.preset + '.')
        process.exit(1)
    }
}

module.exports = SavePreset
