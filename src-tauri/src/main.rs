// Copyright (c) 2025 Jacob
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    custom_tauri_decorations_lib::run()
}
