// Copyright (c) 2025 Jacob
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Import @tauri-apps/api/cores' "invoke" method
import { invoke } from "@tauri-apps/api/core";

// Import @tauri-apps/api/windows' "getCurrentWindow" method and "PhysicalPosition" element
import { getCurrentWindow, PhysicalPosition } from '@tauri-apps/api/window';

// Imports the styles for the Decorations
import "./decorations.css";

// Import images
import EXIT_ICON from '../assets/exit-icon.svg';
import MINIMIZE_ICON from '../assets/minizmze-icon.svg';


// THe main element for Decorations
export default function DecorationsBar(): JSX.Element {
    // Returned element
    return <div className="decb_container">
        {/** The title of the window */}
        <div className="decb_title" >Example Window</div>
        {/** Container for the exit button */}
        <div className="decb_exit" onClick={() => {
            {/** OnClick close the window/process */}
            getCurrentWindow().close(); 
        }}>
            {/** Exit Icon from svgrepo.com */}
            <img className="decb_exit_icon" src={EXIT_ICON} />
        {/** End of exit button div */}
        </div>
        {/** Container for minimize button */}
        <div className="decb_minimize" onClick={() => {
            {/** OnClick minimize window */}
            getCurrentWindow().minimize();
        }}>
            {/** Minimize Icon from svgrepo.com */}
            <img className="decb_minimize_icon" src={MINIMIZE_ICON} />
        {/** End of minimize button div */}
        </div>
        {/** Touchbar for dragging window */}
        <div className="decb_touchbar" onMouseDown={async () => {
            {/** Get starting mouse position */}
            let start_mouse_position: [number, number] = await invoke("get_mouse_position");
            {/** Get starting window top-left position */}
            let inner_position: { x: number, y: number } = await getCurrentWindow().innerPosition();

            {/** Get offset X of mouse and window */}
            let offsetX: number = start_mouse_position[0] - inner_position.x;
            {/** Get offset Y of mouse and window */}
            let offsetY: number = start_mouse_position[1] - inner_position.y;

            {/** Create and store Interval for window movement */}
            let int = setInterval(async () => {
                {/** Check if left mouse button is pressed  */}
                if (await invoke("get_mouse_lmb_state")) {
                    {/** Get current mouse position */}
                    let current_mouse_position: [number, number] = await invoke("get_mouse_position");
                    {/** Get window and set physical (on-screen) location of window on screen */}
                    getCurrentWindow().setPosition(new PhysicalPosition(current_mouse_position[0] - offsetX, current_mouse_position[1] - offsetY))
                } else {
                    {/** Clear interval */}
                    clearInterval(int);
                }
            {/** Set framerate to 60 fps */}
            }, 1 / 60 * 1000);
        }} />
    </div>;
}
