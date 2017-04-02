# 64Player
HTML5 music player in the style of the Commodore 64 demo scene.

This music player features:
- Commodore 64 graphics
- Low and high pass filters and delay sliders
- Spectrum and time analyzers
- VU meter
- Pixel and vector animations
- Play local sound files
- 6 Commodore 64 SID tunes converted to mp3 by Stone Oakvalley's Authentic SID Collection SOASC= (http://www.6581-8580.com)

Music included:
- Super Trucker - Reyn Ouwehand
- Wizball Highscore - Marting Galway
- Pimplesqueezer 6 - Johannes Bjerregaard
- LED Storm - Tim Follin
- Delta - Rob Hubbard
- Rubicon - Jeroen Tel

Known issue: In Safari on iOS the AudioAnalyser is not working. The workaround is to install 64Player as an app on your home screen.

Have fun!

Demo: http://www.johnbruin.net/64player

## Development

### Setup
- Install [NodeJS](https://nodejs.org) 6 LTS
- ```npm install```

### Serve locally
- ```node serve.js```
- Surf to [http://localhost:8181](http://localhost:8181)
