class D3UMLComponetBase {}
class D3UMLComponetIcon {}
class D3UMLComponetConnector {}
class D3UMLComponetJoint {}
class D3UMLComponetEdge {}

class D3UMLComponent {
    constructor (options) {
    }
    /* ****************************************************************
       Data manegement
       **************************************************************** */
    dataSample () {
        // 階層構造 にしよう。

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
            children: [
                {}, {}, {},
            ],
        };
    }
    data(state) {
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
    draw () {
    }
}
