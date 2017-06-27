export default interface Action<T> {
    readonly type: string;
    readonly payload: T;
}
