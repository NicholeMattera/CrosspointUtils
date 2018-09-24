#!/usr/bin/env node

const { Audio, Video } = require('./audioVideo')

const { Info } = require('./commands/info')
const { SetTie } = require('./commands/set-tie')
const { GetTie } = require('./commands/get-tie')
const { Untie } = require('./commands/untie')
const { SetGain } = require('./commands/set-gain')
const { GetGain } = require('./commands/get-gain')
const { SetVol } = require('./commands/set-vol')
const { GetVol } = require('./commands/get-vol')
const { Mute } = require('./commands/mute')
const { Unmute } = require('./commands/unmute')
const { IsMuted } = require('./commands/is-muted')
const { SavePreset } = require('./commands/save-preset')
const { RecallPreset } = require('./commands/recall-preset')
const { ClearPreset } = require('./commands/clear-preset')
const { ResetPresets } = require('./commands/reset-presets')
const { ResetAudioLevels } = require('./commands/reset-audio-levels')
const { ResetMutes } = require('./commands/reset-mutes')
const { SystemReset } = require('./commands/system-reset')

require('yargs')
    .demand(1)
    .command(
        'info',
        'Information about your CrossPoint.',
        {},
        opts => new Info(opts.path)
    )
    .command(
        'set-tie',
        'Tie an input to an output.',
        {},
        opts => new SetTie(opts.path, opts.input, opts.output)
    )
    .command(
        'get-tie',
        'Get the tie for a specific output.',
        {},
        opts => new GetTie(opts.path, opts.output)
    )
    .command(
        'untie',
        'Untie an output.',
        {},
        opts => new Untie(opts.path, opts.output)
    )
    .command(
        'set-gain',
        'Set the gain for a specific input.',
        {},
        opts => new SetGain(opts.path, opts.input, opts.gain)
    )
    .command(
        'get-gain',
        'Get the gain for a specific input.',
        {},
        opts => new GetGain(opts.path, opts.input)
    )
    .command(
        'set-vol',
        'Set the volume for a specific output.',
        {},
        opts => new SetVol(opts.path, opts.output, opts.volume)
    )
    .command(
        'get-vol',
        'Get the volume for a specific output.',
        {},
        opts => new GetVol(opts.path, opts.output)
    )
    .command(
        'video-mute',
        'Mute the video on a specific output.',
        {},
        opts => new Mute(opts.path, opts.output, Video)
    )
    .command(
        'video-unmute',
        'Unmute the video on a specific output.',
        {},
        opts => new Unmute(opts.path, opts.output, Video)
    )
    .command(
        'is-video-muted',
        'Check if an output\'s video is muted.',
        {},
        opts => new IsMuted(opts.path, opts.output, Video)
    )
    .command(
        'audio-mute',
        'Mute the audio on a specific output.',
        {},
        opts => new Mute(opts.path, opts.output, Audio)
    )
    .command(
        'audio-unmute',
        'Unmute the audio on a specific output.',
        {},
        opts => new Unmute(opts.path, opts.output, Audio)
    )
    .command(
        'is-audio-muted',
        'Check if an ouput\'s audio is muted.',
        {},
        opts => new IsMuted(opts.path, opts.output, Audio)
    )
    .command(
        'save-preset',
        'Save the current ties as a global preset.',
        {},
        opts => new SavePreset(opts.path, opts.preset)
    )
    .command(
        'recall-preset',
        'Recall the ties on a saved global preset.',
        {},
        opts => new RecallPreset(opts.path, opts.preset)
    )
    .command(
        'clear-preset',
        'Clear the ties on a saved global preset.',
        {},
        opts => new ClearPreset(opts.path, opts.preset)
    )
    .command(
        'reset-presets',
        'Clear all global presets and their names.',
        {},
        opts => new ResetPresets(opts.path)
    )
    .command(
        'reset-audio-levels',
        'Reset all audio levels back to 0 dB.',
        {},
        opts => new ResetAudioLevels(opts.path)
    )
    .command(
        'reset-mutes',
        'Reset all video and audio mutes.',
        {},
        opts => new ResetMutes(opts.path)
    )
    .command(
        'system-reset',
        'Returns the CrossPoint back to factory default.',
        {},
        opts => new SystemReset(opts.path)
    )
    .options({
        path: {
            alias: 'p',
            description: 'The path to the serial device. (Ex, /dev/tty0 Or COM0)',
            global: true,
            requiresArg: true,
            type: 'string'
        },
        input: {
            alias: 'i',
            description: 'The input number between 1 and 16 depending on your CrossPoint.',
            global: true,
            requiresArg: true,
            type: 'number'
        },
        output: {
            alias: 'o',
            description: 'The output number between 1 and 16 depending on your CrossPoint.',
            global: true,
            requiresArg: true,
            type: 'number'
        },
        gain: {
            alias: 'g',
            description: 'The audio gain between -18 dB and 24 dB',
            global: true,
            requiresArg: true,
            type: 'number'
        },
        volume: {
            alias: 'v',
            description: 'The audio volume between 0% and 100%, will automatically set it to the closest supported value.',
            global: true,
            requiresArg: true,
            type: 'number'
        },
        preset: {
            alias: 's',
            description: 'The global preset number between 0 and 32.',
            global: true,
            requiresArg: true,
            type: 'number'
        }
    })
    .example('$0 info -p /dev/tty-usbserial1')
    .example('$0 set-tie -p /dev/tty-usbserial1 -i 1 -o 1')
    .example('$0 get-tie -p /dev/tty-usbserial1 -o 1')
    .example('$0 untie -p /dev/tty-usbserial1 -o 1')
    .example('$0 set-gain -p /dev/tty-usbserial1 -i 1 -g 2')
    .example('$0 get-gain -p /dev/tty-usbserial1 -i 1')
    .example('$0 set-vol -p /dev/tty-usbserial1 -o 1 -v 88')
    .example('$0 get-vol -p /dev/tty-usbserial1 -o 1')
    .example('$0 video-mute -p /dev/tty-usbserial1 -o 1')
    .example('$0 video-unmute -p /dev/tty-usbserial1 -o 1')
    .example('$0 is-video-muted -p /dev/tty-usbserial1 -o 1')
    .example('$0 audio-mute -p /dev/tty-usbserial1 -o 1')
    .example('$0 audio-unmute -p /dev/tty-usbserial1 -o 1')
    .example('$0 is-audio-muted -p /dev/tty-usbserial1 -o 1')
    .example('$0 save-preset -p /dev/tty-usbserial1 -p 1')
    .example('$0 recall-preset -p /dev/tty-usbserial1 -p 1')
    .example('$0 clear-preset -p /dev/tty-usbserial1 -p 1')
    .example('$0 reset-presets -p /dev/tty-usbserial1')
    .example('$0 reset-audio-levels -p /dev/tty-usbserial1')
    .example('$0 reset-mutes -p /dev/tty-usbserial1')
    .example('$0 system-reset -p /dev/tty-usbserial1')
    .help()
    .argv
