# Crosspoint Switcher

A simple to use CLI script for interfacing with 300 series CrossPoint devices from Extron.

## Usage

```
crosspoint <command>
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

```
crosspoint info -p /dev/tty-usbserial1
crosspoint set-tie -p /dev/tty-usbserial1 -i 1 -o 1
crosspoint get-tie -p /dev/tty-usbserial1 -o 1
crosspoint untie -p /dev/tty-usbserial1 -o 1
crosspoint set-gain -p /dev/tty-usbserial1 -i 1 -g 2
crosspoint get-gain -p /dev/tty-usbserial1 -i 1
crosspoint set-vol -p /dev/tty-usbserial1 -o 1 -v 88
crosspoint get-vol -p /dev/tty-usbserial1 -o 1
crosspoint video-mute -p /dev/tty-usbserial1 -o 1
crosspoint video-unmute -p /dev/tty-usbserial1 -o 1
crosspoint is-video-muted -p /dev/tty-usbserial1 -o 1
crosspoint audio-mute -p /dev/tty-usbserial1 -o 1
crosspoint audio-unmute -p /dev/tty-usbserial1 -o 1
crosspoint is-audio-muted -p /dev/tty-usbserial1 -o 1
crosspoint save-preset -p /dev/tty-usbserial1 -p 1
crosspoint recall-preset -p /dev/tty-usbserial1 -p 1
crosspoint clear-preset -p /dev/tty-usbserial1 -p 1
crosspoint reset-presets -p /dev/tty-usbserial1
crosspoint reset-audio-levels -p /dev/tty-usbserial1
crosspoint reset-mutes -p /dev/tty-usbserial1
crosspoint system-reset -p /dev/tty-usbserial1
```
