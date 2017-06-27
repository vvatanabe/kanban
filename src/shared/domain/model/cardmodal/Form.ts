export class Form<T> {

    public static create<V>(value: V, isOpen: boolean): Form<V> {
        return new Form(value, isOpen);
    }

    private constructor(readonly value: T, readonly isOpen: boolean = false) { }

    public show(): Form<T> {
        return this.copy({ isOpen: true });
    }

    public hide(): Form<T> {
        return this.copy({ isOpen: false });
    }

    private copy(params: { readonly value?: T, readonly isOpen?: boolean }): Form<T> {
        return Object.assign({}, this, params);
    }

}
