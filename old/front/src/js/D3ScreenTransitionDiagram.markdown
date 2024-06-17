# D3ScreenTransitionDiagram

## Usage

### html
```
    <body>
        <svg id="scketchbook"></svg>

        <script src="./data.js"></script>
        <script src="./index.js"></script>
    </body>
```

### js

```
(function draw () {
    let d3svg = makeD3Svg();
    let svg = d3svg.Svg();
    let forground = svg.selectAll('g.base.forground');
    let background = svg.selectAll('g.base.background');

    let options = {
        forground: forground,
        background: background,
    };

    new Sketcher(options)
        .data(STATE)
        .sizing()
        .positioning()
        .draw();
}());
```

### Data

```
const screens = [
    { _id: 1, name: 'screen', uri: '#', _class: 'SCREEN', location: null },
    { _id: 2, name: 'screen', uri: '#', _class: 'SCREEN', location: null },
    { _id: 3, name: 'screen', uri: '#', _class: 'SCREEN', location: null },
    { _id: 4, name: 'screen', uri: '#', _class: 'SCREEN', location: null },
    { _id: 5, name: 'screen', uri: '#', _class: 'SCREEN', location: null },
];

let _id = screens[screens.length-1]._id;

const edges = [
    { _id: ++_id, from_id: 1, from_class: null, to_id: 2, to_class: null, _class: 'EDGE'},
    { _id: ++_id, from_id: 1, from_class: null, to_id: 3, to_class: null, _class: 'EDGE'},
    { _id: ++_id, from_id: 2, from_class: null, to_id: 4, to_class: null, _class: 'EDGE'},
    { _id: ++_id, from_id: 3, from_class: null, to_id: 5, to_class: null, _class: 'EDGE'},
];

function fixEdges (edges) {
    let getScreen = (_id) => {
        for (let screen of screens)
            if (screen._id==_id)
                return screen;
        return null;
    };

    for (let edge of edges) {
        edge.from_class = getScreen(edge.from_id)._class;
        edge.to_class = getScreen(edge.to_id)._class;
    };

    return edges;
}

const STATE = {
    screens: screens,
    edges: fixEdges(edges),
};
```
