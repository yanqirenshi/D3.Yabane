class D3WireFrame {
    constructor (options) {
    }
    /* ****************************************************************
       Data manegement
       **************************************************************** */
    dataSample () {
        return {
            label: '????????',
            padding: 8,
            margin: 8,
            position: { x: 0, y: 0 }, // 親からの相対的な位置
            size: { w: 0, h: 0 },
            border: {
                size: 1,
                color: '#888888',
                corner: 0,
            },
            background: {},
            children: [],
        };
    }
    data(state) {
        this._data = state;

        return this;
    }
    /* ****************************************************************
       Sizing
       **************************************************************** */
    sizing () {
        return this;
    }
    /* ****************************************************************
       Positioning
       **************************************************************** */
    positioning () {
        return this;
    }
    /* ****************************************************************
       Drag & Drop
       **************************************************************** */
    screenDragStart (d) {
        let e = d3.event;

        d._drag = {
            start: { x: e.x, y: e.y }
        };
    }
    screenDraged (d, place) {
        let e = d3.event;

    }
    screenDragend (d) {
        let e = d3.event;

        d._drag = null;
    }
    /* ****************************************************************
       Draw Root
       **************************************************************** */
    drawRect (groups) {
        groups
            .append("rect")
            .attr("width",  (d) => { return d.size.w; })
            .attr("height", (d) => { return d.size.h; })
            .attr("fill",   (d) => { return d.background.color; })
            .attr("stroke-width", (d) => { return d.border.size; })
            .attr("stroke",       (d) => { return d.border.color; })
            .attr("rx",           (d) => { return d.border.corner; })
            .attr("ry",           (d) => { return d.border.corner; });
    }
    drawDiagonal (groups) {
        let groups_children = groups
            .selectAll('g.child')
            .data((d) => {
                let out = d.children.filter((d) => {
                    return d.diagonal.visible;
                });
                return out;
            }, (d) => {
                return d._id;
            });

        let groups_diagonal = groups_children
            .append('g')
            .attr('class', 'diagonal');

        groups_diagonal
            .append('line')
            .attr('class', 'lt2rb')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d) => {
                return d.size.w;
            })
            .attr('y2', (d) => {
                return d.size.h;
            })
            .attr('stroke', (d) => { return d.diagonal.color; })
            .attr('stroke-width', (d) => { return d.diagonal.size; });

        groups_diagonal
            .append('line')
            .attr('class', 'lb2rt')
            .attr('x1', 0)
            .attr('y1', (d) => {
                return d.size.h;
            })
            .attr('x2', (d) => {
                return d.size.w;
            })
            .attr('y2', 0)
            .attr('stroke', (d) => { return d.diagonal.color; })
            .attr('stroke-width', (d) => { return d.diagonal.size; });
    }
    drawLabel (groups) {
        groups
            .append('text')
            .attr("x", (d) => { return d.padding; })
            .attr("y", (d) => { return d.padding + d.label.font.size; })
            .text((d) => { return d.label.contents; });
    }
    drawGroupChild (groups) {
        let groups_children = groups
            .selectAll('g.child')
            .data((d) => { return d.children; }, (d) => {
                return d._id;
            })
            .enter()
            .append('g')
            .attr('class', 'child')
            .attr("transform", (d) => {
                return "translate(" + d.position.x + "," + d.position.y + ")";
            });

        if (groups_children.size()==0)
            return groups_children;

        this.drawRect(groups_children);
        this.drawDiagonal(groups);
        this.drawLabel(groups_children);

        this.drawGroupChild (groups_children);

        return groups_children;
    }
    drawGroupRoot (place) {
        let groups =  place
            .selectAll('g.root')
            .data(this._data, (d) => { return d._id; })
            .enter()
            .append("g")
            .attr('class', 'root')
            .attr("transform", (d) => {
                return "translate(" + d.position.x + "," + d.position.y + ")";
            });

        this.drawRect(groups);
        this.drawLabel(groups);

        this.drawGroupChild(groups);
    }
    draw (place) {
        this.drawGroupRoot(place);
    }
}
