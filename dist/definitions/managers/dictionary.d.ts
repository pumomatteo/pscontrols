export declare class KeyValuePair<K, V> {
    key: K;
    value: V;
}
export declare class Dictionary<K, V> {
    items: KeyValuePair<K, V>[];
    private _map;
    private get map();
    constructor();
    asMap(): Map<K, V>;
    static fromMap<K, V>(map: Map<K, V>): Dictionary<K, V>;
    static parse<K, V>(dict: Dictionary<K, V>): Dictionary<K, V>;
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    has(key: K): boolean;
    delete(key: K): void;
    changeKey(oldKey: K, newKey: K): void;
    keys(): K[];
}
