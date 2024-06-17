/**
 * 階層構造のデータです。
 * Data の 位置、サイズ を整えます。
 *
 * @example
 * let drawer = new Hierarchy();
 */
export default class Hierarchy {
    ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    data2rect (data) {
        return {
            from: {
                x: data.position.x,
                y: data.position.y,
            },
            to: {
                x: data.position.x + data._size.w,
                y: data.position.y + data._size.h,
            }
        };
    }
    rect2size (rect) {
        return {
            w: rect.to.x - rect.from.x,
            h: rect.to.y - rect.from.y,
        };
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Fitting
    ///// ////////////////////////////////////////////////////////////////
    calChildrenSizeCore (rect_a, rect_b) {
        if (!rect_a.from) {
            rect_a.from = { x: rect_b.from.x, y: rect_b.from.y };
        } else {
            if (rect_a.from.x > rect_b.from.x)
                rect_a.from.x = rect_b.from.x;

            if (rect_a.from.y > rect_b.from.y)
                rect_a.from.y = rect_b.from.y;
        }

        if (!rect_a.to) {
            rect_a.to = {
                x: rect_b.to.x,
                y: rect_b.to.y,
            };
        } else {
            if (rect_a.to.x < rect_b.to.x)
                rect_a.to.x = rect_b.to.x;

            if (rect_a.to.y < rect_b.to.y)
                rect_a.to.y = rect_b.to.y;
        }
    }
    calChildrenSize (rect, child) {
        let rect_a = rect;
        let rect_b = this.data2rect(child);

        this.calChildrenSizeCore(rect_a, rect_b);
    }
    fitting (data, parent) {
        // データのコピー
        data._size = {...data.size};
        data._position = {...data.position};

        if (parent) {
            const padding = parent.padding || 0;

            data._position.x += parent._position.x + padding;
            data._position.y += parent._position.y + padding;
        }

        const children = data.children;
        if (!children || children.length===0)
            return;

        // chldren のサイズ計算用
        let rect_children = {
            from: null,
            to: null,
        };

        // children のサイズを計算
        for (let child of children) {
            this.fitting(child, data);
            this.calChildrenSize(rect_children, child);
        }

        // 一応 from がマイナスになることも考えて補正
        if (rect_children.from.x < 0)
            rect_children.to.x += rect_children.from.x * -1;

        if (rect_children.from.y < 0)
            rect_children.to.y += rect_children.from.y * -1;

        // 親のサイズに変換
        const rect = {
            from: {
                x: 0,
                y: 0,
            },
            to: {
                x: rect_children.to.x,
                y: rect_children.to.y,
            }
        };

        // // padding をサイズに考慮
        const padding = data.padding;
        if (padding) {
            rect.from.x -= padding;
            rect.from.y -= padding;
            rect.to.x   += padding;
            rect.to.y   += padding;
        }

        // padding を考慮してズレていると思うのでノーマライズ
        rect.to.x -= rect.from.x;
        rect.to.y -= rect.from.y;
        rect.from.x = 0;
        rect.from.y = 0;

        // 最終サイズ
        const last_size = this.rect2size(rect);

        if (data._size.w < last_size.w)
            data._size.w = last_size.w;

        if (data._size.h < last_size.h)
            data._size.h = last_size.h;
    }
}
