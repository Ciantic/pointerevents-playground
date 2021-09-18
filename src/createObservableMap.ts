import { untrack } from "solid-js";
import { createStore } from "solid-js/store";

/**
 * Solid JS
 *
 * @returns Map like observable
 */
export function createObservableMap<Key extends string | number, Value>(): Map<Key, Value> {
    // Some reason in following [k: Key] does not work?
    const [get, set] = createStore({} as { [k: string]: Value });

    return {
        delete(k: Key) {
            const ok = k in get;
            set(k as any, undefined as any);
            return ok;
        },
        set(k: Key, v: Value) {
            set(k, v);
            return this;
        },
        get(k: Key): Value | undefined {
            return get[k as any];
        },
        clear() {
            const keys = untrack(() => {
                return this.keys();
            });
            for (const key of keys) {
                set(key, undefined as any);
            }
        },
        forEach(cb) {
            for (const key in get) {
                if (Object.prototype.hasOwnProperty.call(get, key)) {
                    const element = get[key];
                    cb(element, key as any, this);
                }
            }
        },
        has(key: Key) {
            return key in get;
        },
        get size() {
            return Object.keys(get).length;
        },
        entries() {
            const v = get;
            const e = Object.entries(v) as any as [Key, Value][];
            const i = e[Symbol.iterator]();
            return i;
        },
        keys() {
            const k = Object.keys(get) as any as Key[];
            const i = k[Symbol.iterator]();
            return i;
        },
        values() {
            const k = Object.values(get);
            const i = k[Symbol.iterator]();
            return i;
        },
        [Symbol.iterator]() {
            return this.entries();
        },
        [Symbol.toStringTag]: "ObservableMap",
    };
}

/*
let foo = createObservableMap<string, string>();

createComputed(() => {
    console.log("get zoo", foo.get("zoo"));
});

createComputed(() => {
    console.log("get dii", foo.get("dii"));
});

foo.set("zoo", "zoo");
setTimeout(() => {
    foo.set("dii", "gah");
});
*/
