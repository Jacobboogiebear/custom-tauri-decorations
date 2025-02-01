// Copyright (c) 2025 Jacob
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use device_query::{DeviceState, DeviceQuery};

#[tauri::command]
pub fn get_mouse_position() -> (i32, i32) {
    let device_state = DeviceState::new();
    let ms = device_state.get_mouse();
    return ms.coords;
}

#[tauri::command]
pub fn get_mouse_lmb_state() -> bool {
    let device_state = DeviceState::new();
    let ms = device_state.get_mouse();
    return ms.button_pressed[1];
}