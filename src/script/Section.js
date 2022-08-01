export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items,
        this._renderer= renderer,
        this._container= document.querySelector(containerSelector)
    }

_renderer(item) {
    this._container.append(item)
}

addItem() {
this._items.forEach(element => {
    this._renderer(element)
})
}
}