import { createComputed, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
};

export type Pointer = Immutable<{
    // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#determining_button_states
    id: string;
    buttons: number;
    type: string;
    pressure: number;
    tangentialPressure: number;
    tilt: { x: number; y: number };
    page: { x: number; y: number };
    twist: number;
    width: number;
    offset: { x: number; y: number };
    events: string[];
}>;

type PointerCache = Map<string, Pointer>;

export function createPointerCache(init?: PointerCache) {
    const cache = init ?? (new Map() as PointerCache);
    const [handleTouchStart, setHandleTouchStart] = createSignal(false);
    const [handlePointerEvents, setHandlePointerEvents] = createSignal(false);
    const [captureOnDown, setCaptureOnDown] = createSignal(false);
    const [removeOnLeave, setRemoveOnLeave] = createSignal(true);
    const [touchPoints, setTouchPoints] = createSignal(0);
    const ignore = (e: TouchEvent) => e.preventDefault();
    const countTouchpoints = (e: TouchEvent) => {
        setTouchPoints(e.touches.length);
    };
    return {
        touchPoints,
        handlePointerEvents,
        setHandlePointerEvents,
        removeOnLeave,
        setRemoveOnLeave,
        captureOnDown,
        setCaptureOnDown,
        handleTouchStart,
        setHandleTouchStart,
        list() {
            return [...cache.entries()];
        },
        object() {
            return Object.fromEntries(cache.entries());
        },
        pointer(pointerId: number) {
            return cache.get("" + pointerId);
        },
        get size() {
            return cache.size;
        },
        handle(e: PointerEvent) {
            if (!(e.currentTarget instanceof HTMLElement)) {
                throw new Error("This experiment works only with elements");
            }
            const k = "" + e.pointerId;

            // Remove touch/pen events on pointerleave
            if (removeOnLeave()) {
                if (
                    e.type === "pointerleave" &&
                    (e.pointerType === "touch" || e.pointerType === "pen")
                ) {
                    cache.delete(k);
                    return;
                }
            }

            if (captureOnDown()) {
                if (e.type === "pointerdown") {
                    e.currentTarget.setPointerCapture(e.pointerId);
                }

                if (e.type === "pointerup") {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                }
            }

            if (handlePointerEvents()) {
                e.preventDefault();
            }

            let events = cache.get(k)?.events ?? [];
            cache.set(k, {
                id: k,
                buttons: e.buttons,
                type: e.pointerType,
                pressure: e.pressure,
                tangentialPressure: e.tangentialPressure,
                tilt: { x: e.tiltX, y: e.tiltY },
                page: { x: e.pageX, y: e.pageY },
                twist: e.twist,
                width: e.width,
                offset: { x: e.offsetX, y: e.offsetY },
                events: e.type !== "pointermove" ? [...events, e.type] : events,
            });
        },

        listen(el: HTMLElement) {
            el.addEventListener("pointerenter", this.handle);
            el.addEventListener("pointerleave", this.handle);
            el.addEventListener("pointerdown", this.handle);
            el.addEventListener("pointerup", this.handle);
            el.addEventListener("pointermove", this.handle);

            el.addEventListener("touchstart", countTouchpoints);
            el.addEventListener("touchcancel", countTouchpoints);
            el.addEventListener("touchend", countTouchpoints);
            el.addEventListener("touchmove", countTouchpoints);

            createComputed(() => {
                if (removeOnLeave()) {
                    cache.clear();
                }
            });

            createComputed(() => {
                if (handleTouchStart()) {
                    el.addEventListener("touchstart", ignore);
                } else {
                    el.removeEventListener("touchstart", ignore);
                }
            });
        },
        // unlisten(el: HTMLElement) {
        //     el.removeEventListener("pointerenter", this.handle);
        //     el.removeEventListener("pointerleave", this.handle);
        //     el.removeEventListener("pointerdown", this.handle);
        //     el.removeEventListener("pointerup", this.handle);
        //     el.removeEventListener("pointermove", this.handle);
        //     el.removeEventListener("touchstart", ignore);
        // },
    };
}
