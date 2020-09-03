# Zoom CLI

Open Zoom meetings and update the Zoom client from the command line

## Installation

This repo is not published to any registry currently. So, in order to use it, do the following:

1. `npm i -g @autome/zoom-cli`

## Commands

Here are the commands that this package provides.

+ `zoom -l [room name]`: This command opens up a Zoom meeting in the browser
+ `zoom -a [key(room name):url]` || `zoom --add [key(room name):url]`: This command adds a new Zoom room to your configuration. Make sure that you provide a key, which is whatever you want to launch the Zoom room with, along with the url to the Zoom room. Make sure that your separate the two with a `:`.
+ `zoom -r [room name]` || `zoom --remove [room name]`: This command removes the Zoom room from your configuration.
+ `zoom -u` || `zoom --update`: This command updates your Zoom client.
+ `zoom --list`: This command lists all of the rooms that you currently have in your configuration.

*Support*: Feel free to submit an issue if you find a bug or want a new feature.