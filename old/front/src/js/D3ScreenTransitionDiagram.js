class D3ScreenTransitionDiagram {
    constructor (options) {
        this._data = [];
        this.screens = [];
        this.edges = [];
        this._forground  = options.forground  ? options.forground  : null;
        this._background = options.background ? options.background : null;
    }
    /* **************************************************************** *
       Data manegement
     * **************************************************************** */
    // screen
    getRandamPosition () {
        let len = 888;
        let v =Math.random() * (len - 0) + 0;

        return v - (len / 2) ;
    }
    getTemplateNode () {
        return {
            name: { contents: '????????', font: null },
            link: { uri: '#' },
            background: {
                color: '#ffffff'
            },
            // sizeing
            padding: 11,
            location: {
                x: this.getRandamPosition(),
                y: this.getRandamPosition()
            },
            size: { w: 0, h: 0 },
            //
            ports: { in: [], out: [] },
            //
            _id: null,
            _class: null,
            _core: null,
        };
    }
    makeScreenPorts (data) {
        return {
            in:  [],
            out: [],
        };
    }
    getScreenSize (data, screen) {
        if (data.size)
            return data.size;

        let padding_both = screen.padding * 2;

        return {
            w: padding_both + data.name.length * 14 * 1.3,
            h: padding_both + 14,
        };
    }
    makeScreen (data) {
        let screen = this.getTemplateNode();
        screen.name.contents = data.name;
        screen._id = data._id;
        screen._class = data._class;
        screen._core  = data;

        if (data.background)
            screen.background.color = data.background.color;

        if (data.location)
            screen.location = data.location;

        screen.size = this.getScreenSize (data, screen);

        let ports = this.makeScreenPorts(data);
        screen.ports.in = ports.in;
        screen.ports.out = ports.out;

        if (data.link)
            screen.link.uri = data.link.uri;

        return screen;
    }
    makeScreens (list) {
        return list.map((screen) => {
            return this.makeScreen(screen);
        });
    }
    // edge
    getTemplateEdge () {
        return {
            from: null,
            to: null,
            _id: null,
            _class: null,
            _core: null,
        };
    };
    makeEdge (data) {
        let edge = this.getTemplateEdge();

        edge._id    = data._id;
        edge._class = data._class;
        edge._core  = data;

        edge.from = this.screens.find((d) => {
            return d._id == data.from_id;
        });
        edge.to = this.screens.find((d) => {
            return d._id == data.to_id;
        });

        return edge;
    }
    makeEdges (list) {
        return list.map((edge) => {
            return this.makeEdge(edge);
        });
    }
    // ports
    getPortTemplate () {
        return {
            items: [],
            location: { x: 0, y: 0 },
        };
    }
    makePort (edge) {
        let from = edge.from;
        let to   = edge.to;

        let ports_out = from.ports.out;
        let ports_in  = to.ports.in;

        if (ports_out.length==0)
            ports_out.push(this.getPortTemplate());

        if (ports_in.length==0)
            ports_in.push(this.getPortTemplate());

        ports_out[0].items.push(edge);
        ports_in[0].items.push(edge);
    }
    makePorts (edges) {
        for (let edge of edges)
            this.makePort(edge);
    }
    // main
    data(state) {
        this._data = state;

        this.screens = this.makeScreens(state.screens);
        this.edges   = this.makeEdges(state.edges);

        this.makePorts(this.edges);

        return this;
    }
    /* **************************************************************** *
       Sizing
     * **************************************************************** */
    sizing () {
        return this;
    }
    /* **************************************************************** *
       Positioning
     * **************************************************************** */
    positioningPort (screen) {
        let ports = screen.ports;

        for (let port of ports.in) {
            port.location.x = 0 - 8 - 4;
            port.location.y = Math.floor(screen.size.h / 2);
        }

        for (let port of ports.out) {
            port.location.x = 0 + 8 + 4 + screen.size.w;
            port.location.y = Math.floor(screen.size.h / 2);
        }
    }
    positioningPorts (screens) {
        for (let screen of screens)
            this.positioningPort(screen);
    }
    positioning () {
        this.positioningPorts(this.screens);
        return this;
    }
    /* **************************************************************** *
       Drag & Drop
     * **************************************************************** */
    screenDragStart (d) {
        let e = d3.event;

        d._drag = {
            start: { x: e.x, y: e.y }
        };
    }
    screenDraged (d, place) {
        let e = d3.event;
        this.moveScreenNode(d, e, place);
    }
    screenDragend (d) {
        let e = d3.event;

        d._drag = null;
    }
    /* **************************************************************** *
       Draw Screen Node
     * **************************************************************** */
    drawGroup (screens) {
        let place = this._forground;

        return place.selectAll('g.screen')
            .data(screens, (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', 'screen')
            .attr("transform", (d) => {
                return "translate(" + d.location.x + "," + d.location.y + ")";
            });
    }
    addScreenLink (group) {
        return group.append('a')
            .attr('class', 'screen-link')
            .attr('href', (d) => {
                return d.link.uri;
            });
    }
    getScreenBodyBackgroud (d) {
        if (d._class=='GROUP')
            return 'none';

        if (d._class=='START')
            return (d.background && d.background.color) ? d.background.color : '#fff';

        return (d.background && d.background.color) ? d.background.color : '#fff';
    }
    getScreenBodyStyleStrokeDasharray (d) {
        if (d._class=='GROUP')
            return 3;

        return 0;
    };
    getScreenBodyR (d) {
        if (d._class=='GROUP')
            return 3;

        if (d._class=='OUTSIDER')
            return 0;

        if (d._class=='START')
            return 14 * 1.5;

        return 8;
    };
    addScreenBody (a) {
        let self = this;

        let rect = a.append('rect')
            .attr('class', 'screen-body')
            .attr('width', (d) => { return d.size.w;})
            .attr('height', (d) => { return d.size.h;})
            .attr('rx', (d) => { return self.getScreenBodyR(d); })
            .attr('ry', (d) => { return self.getScreenBodyR(d); })
            .style('stroke-dasharray', (d) => {
                return self.getScreenBodyStyleStrokeDasharray (d);
            })
            .attr('fill', (d) => {
                return self.getScreenBodyBackgroud(d);
            })
            .attr('stroke', (d) => {
                return (d.stroke && d.stroke.color) ? d.stroke.color : '#333';
            })
            .attr('stroke-width', (d) => {
                return (d.stroke && d.stroke.width) ? d.stroke.width : 1;
            });

          rect.call(
              d3.drag()
                  .on("start", this.screenDragStart)
                  .on("drag", (d) => {
                      this.screenDraged(d, this._forground);
                  })
                  .on("end", this.screenDragend));
    }
    addScreenBodyText (a) {
        a.append('text')
            .attr('class', 'screen-name')
            .attr("x", (d) => { return d.padding; })
            .attr("y", (d) => { ;return d.padding * 2; }) // TODO: なんで 2 ?
            .attr('fill', '#333')
            .text((d) => {
                return d.name.contents;
            });
    }
    drawScreenBody (group) {
        let a = this.addScreenLink(group);

        this.addScreenBody(a);
        this.addScreenBodyText(a);
    }
    getLocationSize(d) {
                let text = '';
                text += 'id=' + d._id + ', ';
                text += 'x=' + Math.floor(d.location.x) + ', ';
                text += 'y=' + Math.floor(d.location.y) + ', ';
                text += 'w=' + Math.floor(d.size.w) + ', ';
                text += 'h=' + Math.floor(d.size.h) + '';
                return text;
    }
    drawLocationSize (groups) {
        let self = this;

        groups.append('text')
            .attr('class', 'location-size')
            .attr("x", (d) => { return d.padding; })
            .attr("y", (d) => {
                return d.padding + d.size.h + 14;
            })
            .attr('fill', '#595455')
            .attr('fong-size', 12)
            .text((d) => {
                return this.getLocationSize(d);
            });
    }
    drawPorts (groups) {
        groups
            .selectAll('circle.screen-port-in')
            .data((d) => { return d.ports.in;})
            .enter()
            .append('circle')
            .attr('class', 'screen-port-in')
            .attr('cx', (d) => {
                return d.location.x;
            })
            .attr('cy', (d) => {
                return d.location.y;
            })
            .attr('r', 4)
            .attr('fill', '#fff')
            .attr('stroke', '#000')
            .attr('stroke-width', 0.5);

        groups
            .selectAll('circle.screen-port-out')
            .data((d) => {
                return d.ports.out;
            })
            .enter()
            .append('circle')
            .attr('class', 'screen-port-out')
            .attr('cx', (d) => {
                return d.location.x;
            })
            .attr('cy', (d) => {
                return d.location.y;
            })
            .attr('r', 4)
            .attr('fill', '#fff')
            .attr('stroke', '#000')
            .attr('stroke-width', 0.5);
    }
    drawScreenNode (screens) {
        let groups = this.drawGroup(screens);

        this.drawScreenBody(groups);
        this.drawLocationSize(groups);
        this.drawPorts(groups);
    }
    moveScreenNode (d, e, place) {

        d.location.x += e.x - d._drag.start.x;
        d.location.y += e.y - d._drag.start.y;

        place
            .selectAll('g.screen')
            .data([d], (d) => { return d._id; })
            .attr("transform", (d) => {
                return "translate(" + d.location.x + "," + d.location.y + ")";
            });

        place
            .selectAll('text.location-size')
            .text((d) => {
                return this.getLocationSize(d);
            });

        this.drawEdge('update', d.ports.in.items);
        this.drawEdge('update', d.ports.out.items);
    }
    /* **************************************************************** *
       Draw Edge
     * **************************************************************** */
    findDrawEdgeObjects (mode, edges) {
        let place = this._background;

        if (mode=='create')
            return place
            .selectAll('g.edge')
            .data(edges, (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class','edge')
            .append('line')
            .attr('class', 'edge');

        if (mode=='update')
            return place.selectAll('line.edge');

        throw new Error('対応していないモードです。mode=' + mode);
    };
    drawEdge (mode, edges) {
        let place = this._background;

        let groups = this.findDrawEdgeObjects (mode, edges);

        groups
            .attr('x1', (d) => { return d.from.ports.out[0].location.x + d.from.location.x; })
            .attr('y1', (d) => { return d.from.ports.out[0].location.y + d.from.location.y; })
            .attr('x2', (d) => { return d.to.ports.in[0].location.x    + d.to.location.x; })
            .attr('y2', (d) => { return d.to.ports.in[0].location.y    + d.to.location.y;})
            .attr('stroke', '#dcdddd')
            .attr('stroke-width', 2);
    }
    /* **************************************************************** *
       Draw Root
     * **************************************************************** */
    draw () {
        this.drawScreenNode(this.screens);
        this.drawEdge('create', this.edges);
    }
}
