# Crosspoint Utils

A simple to use CLI script for interfacing with 300 series CrossPoint devices from Extron.

## Installation

```bash
npm install -g crosspoint-utils
```

## Usage

```
crosspoint-utils <command>
```

## Commands

| Command            | Description                                     |
|--------------------|-------------------------------------------------|
| info               | Information about your CrossPoint.              |
| set-tie            | Tie an input to an output.                      |
| get-tie            | Get the tie for a specific output.              |
| untie              | Untie an output.                                |
| set-gain           | Set the gain for a specific input.              |
| get-gain           | Get the gain for a specific input.              |
| set-vol            | Set the volume for a specific output.           |
| get-vol            | Get the volume for a specific output.           |
| video-mute         | Mute the video on a specific output.            |
| video-unmute       | Unmute the video on a specific output.          |
| is-video-muted     | Check if an output's video is muted.            |
| audio-mute         | Mute the audio on a specific output.            |
| audio-unmute       | Unmute the audio on a specific output.          |
| is-audio-muted     | Check if an ouput's audio is muted.             |
| save-preset        | Save the current ties as a global preset.       |
| recall-preset      | Recall the ties on a saved global preset.       |
| clear-preset       | Clear the ties on a saved global preset.        |
| reset-presets      | Clear all global presets and their names.       |
| reset-audio-levels | Reset all audio levels back to 0 dB.            |
| reset-mutes        | Reset all video and audio mutes.                |
| system-reset       | Returns the CrossPoint back to factory default. |

## Options

| Option    | Alias | Description                                                                                     | Type    |
|-----------|:------|-------------------------------------------------------------------------------------------------|:--------|
| --version |       | Show version number                                                                             | boolean |
| --path    | -p    | The path to the serial device. (Ex. /dev/tty0 -or- COM0)                                        | string  |
| --input   | -i    | The input number between 1 and 16 depending on your CrossPoint.                                 | number  |
| --output  | -o    | The output number between 1 and 16 depending on your CrossPoint.                                | number  |
| --gain    | -g    | The audio gain between -18 dB and 24 dB.                                                        | number  |
| --volume  | -v    | The audio volume between 0% and 100%, will automatically set it to the closest supported value. | number  |
| --preset  | -s    | The global preset number between 0 and 32. 0 is reserved for the current configuration.         | number  |
| --help    |       | Show help                                                                                       | boolean |

## Examples

Get information about your Extron CrossPoint.
```bash
crosspoint-utils info -p /dev/ttyUSB0
```

Tie input 3 to output 1.
```bash
crosspoint-utils set-tie -p /dev/ttyUSB0 -i 3 -o 1
```

Get the tie for output 1.
```bash
crosspoint-utils get-tie -p /dev/ttyUSB0 -o 1
```

Remove the tie for output 1.
```bash
crosspoint-utils untie -p /dev/ttyUSB0 -o 1
```

Set the gain to 2 dB for input 4.
```bash
crosspoint-utils set-gain -p /dev/ttyUSB0 -i 4 -g 2
```

Get the current gain for input 3
```bash
crosspoint-utils get-gain -p /dev/ttyUSB0 -i 3
```

Set the volume to output 2 to 88%.
```bash
crosspoint-utils set-vol -p /dev/ttyUSB0 -o 2 -v 88
```

Get the volume of output 2.
```bash
crosspoint-utils get-vol -p /dev/ttyUSB0 -o 2
```

Mute the video of output 1.
```bash
crosspoint-utils video-mute -p /dev/ttyUSB0 -o 1
```

Unmute the video of output 1.
```bash
crosspoint-utils video-unmute -p /dev/ttyUSB0 -o 1
```

Check if the video is muted for output 1.
```bash
crosspoint-utils is-video-muted -p /dev/ttyUSB0 -o 1
```

Mute the audio of output 2.
```bash
crosspoint-utils audio-mute -p /dev/ttyUSB0 -o 2
```

Unmute the audio of output 2.
```bash
crosspoint-utils audio-unmute -p /dev/ttyUSB0 -o 2
```

Check if the audio is muted for output 2.
```bash
crosspoint-utils is-audio-muted -p /dev/ttyUSB0 -o 2
```

Save the current ties to global preset 1.
```bash
crosspoint-utils save-preset -p /dev/ttyUSB0 -s 1
```

Recall the ties of global preset 1.
```bash
crosspoint-utils recall-preset -p /dev/ttyUSB0 -s 1
```

Remove all the ties from global preset 1.
```bash
crosspoint-utils clear-preset -p /dev/ttyUSB0 -s 1
```

Reset all ties back to factory default.
```bash
crosspoint-utils reset-presets -p /dev/ttyUSB0
```

Reset all audio levels back to factory default.
```bash
crosspoint-utils reset-audio-levels -p /dev/ttyUSB0
```

Reset all mutes back to factory default.
```bash
crosspoint-utils reset-mutes -p /dev/ttyUSB0
```

Reset the entire system back to factory default.
```bash
crosspoint-utils system-reset -p /dev/ttyUSB0
```
