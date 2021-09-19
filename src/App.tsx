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
            Width: {props.width} <br />
            Tilt: ({props.tilt.x}, {props.tilt.y}) <br />
            Pressure: {props.pressure.toFixed(4)}, tangential: {props.tangentialPressure.toFixed(4)}{" "}
            <br />
            Twist: {props.twist} <br />
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
                Legacy TouchEvent touches.length = {pointers.touchPoints()}
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
                <a target="_blank" href="https://www.youtube.com/watch?v=cYzfboD5PaE">
                    See this video about the issue.
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
            <p>
                3. iOS has rather annoying bug: when using the four finger gesture to switch
                application,{" "}
                <a target="_blank" href="https://www.youtube.com/watch?v=pDGB4Hr9tKI">
                    the pointerup or pointerleave is never triggered
                </a>
                .
            </p>
            <p>
                4. iPad Pencil reports a buttons value of 1, constant width 0.5, tilt is between -90
                and 90 where (0, 0) means the pencil is at orthogonal angle. Natural angle for right
                handed person like mee seems to be about (50, 27). Pressure is between 0 and 1, on
                comfortable pressure it was 0.09 and 0.12, but values above 0.25 felt way too heavy
                for me. Constant values in fields: tangential 0, and twist 0. Tested on 2021-09-19
                with Safari 14.8, on iPad.
            </p>
            <p>
                5. iPad with finger reports a buttons value of 1, width seems to go in steps: 41.68,
                62.53, 83.42, 104.23, 125.10, 145.95, 166.83, 250.25. Where last values in the list
                was basically my entire palm and difficult to reproduce. Natural width seemed to be
                62.53. Constant values in fields: tilt (90, 0), pressure 0, tangential 0 and twist
                0. Tested on 2021-09-19 with Safari 14.8, on iPad.
            </p>
            <p>
                6. Android 10 with finger reports a buttons value of 1. Constant value in all the
                fields: width 0.3636, tilt (0, 0), pressure 1, tangential 0 and twist 0. Practically
                this means on my Android phone the only useful value is the coordinates of the
                finger. Tested on 2021-09-19 with Xiaomi Mi 9.
            </p>
            <p>
                7. On Google Chrome with mouse the surprise to me was a pressure, which seems to go
                from 0 to 0.5 when clicking a mouse button! Constant fields are: width 1, tilt
                (0,0), tangential 0, twist 0. Tested on Chrome 93.0.4577.63.
            </p>
            <p>
                <em>TODO: Convert these value findings to a table...</em>
            </p>
        </div>
    );
};

export default App;
