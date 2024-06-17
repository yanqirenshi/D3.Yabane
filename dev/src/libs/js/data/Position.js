export default class Position {
    template () {
        return { x:0, y:0, z:0 };
    }
    build (data) {
        let out = this.template();

        if (!data)
            return out;

        if (data.x) out.x = data.x;
        if (data.y) out.y = data.y;
        if (data.z) out.z = data.z;

        return out;
    };
}
