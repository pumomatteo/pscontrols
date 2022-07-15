import { UtilityManager } from "./utilityManager";

export class KeyValuePair<K, V>
{
    key: K;
    value: V;
}

export class Dictionary<K, V>
{
    items: KeyValuePair<K, V>[];

    private _map: Map<K, V> | null;
    private get map(): Map<K, V>
    {
        if (this._map == null)
            this._map = this.asMap();
        return this._map;
    }

    constructor()
    {
        this.items = [];
    }

    public asMap(): Map<K, V>
    {
        return new Map<K, V>(this.items.map(k => [k.key, k.value]));
    }

    public static fromMap<K, V>(map: Map<K, V>): Dictionary<K, V>
    {
        let dict = new Dictionary<K, V>();

        for (let item of map)
        {
            let pair = new KeyValuePair<K, V>();
            pair.key = item[0];
            pair.value = item[1];
            dict.items.push(pair);
        }

        dict._map = map;

        return dict;
    }

    public static parse<K, V>(dict: Dictionary<K, V>): Dictionary<K, V>
    {
        let ret = new Dictionary<K, V>();
        ret.items = dict.items;
        return ret;
    }

    public get(key: K): V | undefined
    {
        return this.map.get(key);
    }

    public set(key: K, value: V)
    {
        let item = this.items.find(k => k.key == key);
        if (item == null)
        {
            item = new KeyValuePair<K, V>();
            item.key = key;
        }
        item.value = value;

        this.map.set(key, value);
        this.items.push(item);
    }

    //#region Utility
    public has(key: K)
    {
        return this.map.has(key);
    }

    public delete(key: K)
    {
        let itemToDelete = this.items.find(k => k.key == key);
        if (itemToDelete != null)
            this.items.vrDeleteItem(itemToDelete, "key");
        this.map.delete(key);
    }

    public changeKey(oldKey: K, newKey: K)
    {
        let oldItems = UtilityManager.duplicate(this.get(oldKey));
        this.delete(oldKey);
        this.set(newKey, oldItems);
    }

    public keys()
    {
        return this.items.map(k => k.key);
    }
    //#endregion
}