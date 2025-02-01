// Copyright (c) 2025 Jacob
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

mod mouse;
use mouse::{get_mouse_position, get_mouse_lmb_state};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_mouse_position, get_mouse_lmb_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
