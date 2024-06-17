export default class Stroke {
    template () {
        return {
            color: '#afafb0',
            type: 'solid',
            width: 1,
        };
    }
    build (data) {
        let out = this.template();

        if (!data)
            return null;

        if (data.color) out.color = data.color;
        if (data.width) out.width = data.width;
        if (data.type)  out.type = data.type;

        return out;
    };
}
