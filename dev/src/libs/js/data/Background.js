export default class Background {
    template () {
        return {
            color: '#fff',
            opacity: 1.0,
        };
    }
    build (data) {
        let out = this.template();

        if (!data)
            return out;

        if (data.color) out.color = data.color;
        if (data.opacity) out.opacity = data.opacity;

        return out;
    };
}
