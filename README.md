# react-hexmap

This is the entrypoint for a hexmap component to be used in turn-based online games.

It is the first public component that I'm creating for turnstyles, an online board game creation toolkit.

It will end up as a group of related components but this will be the topmost parent of the hexmap component.

There are three main goals for it

	1. the ability to paint a map with data properties as brush elements in a design mode
	2. fine grained authorization of data visibility for fog of war and map view modes between players and the game master
	3. the ability for players to change map view modes and drag and drop actor elements based on movement rules 

At some point the top level stuff will get pulled into a higher level map component that allows one to mix and match hexmap layers with point, rectangular and freestyle polygon shapes, so though the hexes will allow for automatic border managment, the internal datastructure will be adjacency lists for maximum flexibility when there are other layer and cell types.
With such a broad focus the first version of this will just be a spike that I can put into server side containers to flesh it all out together.	


## Status

I have a lot of local experiments and variations using different libraries (including an aurelia one that I will eventually compare and contrast with this one.)

But currently I'm still refining my ideas, especially with accounting for server side authorization and visibility. So this will be mostly design level information for now.

Feel free to ping me with any questions or thoughts in the issues list though.


## Demo & Examples

Live demo: [Cortrah.github.io/react-hexmap](http://Cortrah.github.io/react-hexmap/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-hexmap is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-hexmap.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-hexmap --save
```


## Usage

# Case 1: instantiate hexmap for display 

	1. displays a default blank map if there is no map data 
	2. if map data is passed in display it
	3. if a zoom level is specified, display at the right zoom level
	4. hex level elements should take render_at functions for different zoom levels
	4. if height and width are specified set size to it
	5. options for allowing the user (or engine) to resize and zoom 
	6. options for allowing the user to trigger visibility modes via a toolbar

# Case 2: instantiate hexmap for gameplay 

    1. everything from case 1 
    2. a turn slider that displays read only turn level data for the same view mode that is currently set
    3. in the current turn, the ability to drag and drop elements based on movement rules 
    4. Those drag actions should be maintained in an actions list
	
# Case 3: instantiate a hexmap in design view  

	1. displays a default blank map if no data, or game state if passed
	2. sets a default property brush for painting, or a saved brush
	3. painting on hexes with the current brush should work in memory
	4. the ability to switch brush properties, including player visibility and zoom level visibilty
	5. the ability to save and load named states locally
	6. the ability to output the state as text to copy and paste
	7. the ability to configure a named service endpoint for saving and loading
	
# Case 4: custom map elements
	1. terrain tiles, markers, colors
	2. realm markers, colors
	3. leaders
	3. units
	4. items
	5. features

```
var ReactHexmap = require('react-hexmap');

<ReactHexmap>Example</ReactHexmap>
```

### Properties

* __DOCUMENT PROPERTIES HERE__

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## Related projects and resources
[Dungeon Painter] (http://pyromancers.com/) Is a pretty nice interface for this kind of thing.
[redblob resources](http://www.redblobgames.com/grids/hexagons/) A great reference for some of the different types and interactions to consider, as well as some good methods, though the data structure will certainly be different.


## Thanks
Thanks to Jed Watson for his react component project template at
[react component template](https://github.com/JedWatson/generator-react-component)

## License
MIT. Copyright (c) 2015 Cortlandt Winters.

