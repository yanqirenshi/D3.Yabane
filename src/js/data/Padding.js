export default class Padding {
    template () {
        return 0;
    }
    build (data) {
        let out = this.template();

        if (!data)
            return out;

        return data;
    };
}
