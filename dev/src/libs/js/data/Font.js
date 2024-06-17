export default class Font {
    template () {
        return {
            size: 16,
            color: '#fff',
            weight: 'normal',
        };
    }
    build (data) {
        let out = this.template();

        if (!data)
            return out;

        if (data.size)  out.size  = data.size;
        if (data.color) out.color = data.color;
        if (data.weight) out.weight = data.weight;

        return out;
    };
}
