import { Component, createSignal, onMount, Show } from "solid-js";
import { createObservableMap } from "./createObservableMap";
import { createPointerCache, Pointer } from "./createPointerCache";

const ShowPointer = (props: Pointer) => {
    return (
        <>
            ID: {props.id} <br />
            Type: {props.type} <br />
            {props.events
                .slice(-20)
                .reverse()
                .map((d) => (
                    <span>{d}&nbsp;</span>
                ))}{" "}
            <br />
            Buttons: {props.buttons} <br />
            Tilt: ({props.tilt.x}, {props.tilt.y}) <br />
            Page: ({props.page.x.toFixed(2)}, {props.page.y.toFixed(2)}) <br />
            Offset: ({props.offset.x.toFixed(2)}, {props.offset.y.toFixed(2)}) <br />
            <br />
        </>
    );
};

const App: Component = () => {
    let testArea: HTMLDivElement | undefined;
    let pointers = createPointerCache(createObservableMap());
    onMount(() => {
        if (!testArea) {
            return;
        }
        pointers.listen(testArea);
    });
    return (
        <div class="app">
            <h1>PointerEvents playground</h1>
            <label>
                <input
                    type="checkbox"
                    checked={pointers.removeOnLeave()}
                    onInput={(e: any) => pointers.setRemoveOnLeave(e.target.checked)}
                />{" "}
                remove touch and pen log entry on pointerleave (
                {pointers.removeOnLeave() ? "On" : "Off"})
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={pointers.captureOnDown()}
                    onInput={(e: any) => pointers.setCaptureOnDown(e.target.checked)}
                />{" "}
                setPointerCapture on clicking down release on up (
                {pointers.captureOnDown() ? "On" : "Off"})
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={pointers.handlePointerEvents()}
                    onInput={(e: any) => pointers.setHandlePointerEvents(e.target.checked)}
                />{" "}
                handle pointerevents ({pointers.handlePointerEvents() ? "On" : "Off"})
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={pointers.handleTouchStart()}
                    onInput={(e: any) => pointers.setHandleTouchStart(e.target.checked)}
                />{" "}
                handle touchstart ({pointers.handleTouchStart() ? "On" : "Off"})
            </label>
            <pre>
                {pointers.list().map(([id, p]) => (
                    <ShowPointer {...p} />
                ))}
            </pre>
            <div ref={testArea} class="test-area">
                <div class="text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis tincidunt erat in
                    purus ullamcorper ultricies. Duis lacinia aliquet dolor. Maecenas velit enim,
                    eleifend a, tempor eu, mattis in, nisl. Maecenas ut orci. Sed egestas auctor
                    sem. Curabitur vitae pede vel nisl tristique commodo. Phasellus ut nisl. Cras
                    massa. Suspendisse potenti. Vestibulum vitae augue.
                </div>
                {pointers.list().map(([id, p]) => (
                    <div
                        class="pointer"
                        style={{
                            top: p.offset.y + "px",
                            left: p.offset.x + "px",
                        }}
                    ></div>
                ))}
            </div>
            <h2>Notes</h2>
            <p>
                1. Handling <code>touchstart</code> prevents iOS from triggering "text selection"
                when hold pressing. It's notable that iOS selects the text <em>below</em> the
                element. In this test it's the title "Notes" and <b>not</b> the text underneath your
                finger.{" "}
                <a href="https://www.youtube.com/watch?v=cYzfboD5PaE">
                    Tested on 2021-09-18 with Safari 14.8, on iPad.
                </a>{" "}
                Notice that CSS properties <code>touch-action: none</code>,{" "}
                <code>user-select: none</code> or <code>-webkit-user-select: none</code> did NOT
                work. It also required the touchstart handling.
            </p>
            <p>
                2. Set capture seems rather meaningless on touch screens of iOS and Android. However
                on desktop mouse with Google Chrome it seems necessity if you want to be able to pan
                a view or drag a slider naturally.
            </p>
        </div>
    );
};

export default App;
