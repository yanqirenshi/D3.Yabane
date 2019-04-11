class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pages() {
        return [
            {
                code: "home", menu_label: '家',
                active_section: 'root', home_section: 'root',
                children: [
                    { code: 'root', tag: 'home_page_root' },
                ],
            },
            {
                code: "usage",
                menu_label: '使用',
                active_section: 'root',
                home_section: 'root',
                children: [
                    { code: 'root', tag: 'usage_page_root', name: 'root' },
                ],
            },
        ];
    }
    init () {
        let data = {
            site: {
                active_page: 'home',
                home_page: 'home',
                pages: this.pages(),
            }
        };

        for (let page of data.site.pages)
            this.setHashTo(page);

        this._contents = Immutable.Map(data);
        return this;
    }
}
