export default class Rectangle {
    template () {
        return { w: 0, h: 0 };
    }
    build (data) {
        let out = this.template();

        if (!data)
            return out;

        if (data.w) out.w = data.w;
        if (data.h) out.h = data.h;

        return out;
    };
}
