use wasm_bindgen::prelude::*;
use crate::utils;
use std::f64;

extern crate web_sys;


// A macro to provide `println!(..)`-style syntax for `console.log` logging.
#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct PlayerShip {
    side_count: i32,
    size: f64,
    rotation_degress: f64,
    centre_x: i32,
    centre_y: i32,
    radians: f64,
}

#[wasm_bindgen]
impl PlayerShip {
    pub fn new() -> PlayerShip {
        utils::set_panic_hook();
        let rotation_degress = 0.0;
        PlayerShip {
            side_count: 3,
            size: 60.0,
            rotation_degress,
            centre_x: 440,
            centre_y: 440,
            radians: rotation_degress * f64::consts::PI / 180.0,
        }
    }

    pub fn get_side_count(&self) -> i32 {
            self.side_count
    }

    pub fn get_size(&self) -> f64 {
        self.size
    }

    pub fn get_rotation_degrees(&self) -> f64 {
        self.rotation_degress
    }

    pub fn get_centre_x(&self) -> i32 {
        self.centre_x
    }

    pub fn get_centre_y(&self) -> i32 {
        self.centre_y
    }

    pub fn get_radians(&self) -> f64 {
        self.radians
    }

    pub fn set_centre_x(&mut self, x: i32) {
        self.centre_x += x
    }


    pub fn set_centre_y(&mut self, y: i32) {
        self.centre_y += y
    }

    pub fn set_rotation_degrees(&mut self, d: f64) {
        self.rotation_degress += d
    }

    pub fn generate_new_x(&self) -> f64 {
        let radians: f64 = 0.0;
        let new_x = self.size * radians.cos();
        new_x
    }
    
    pub fn generate_new_y(&self) -> f64 {
        let radians: f64 = 0.0;
        let new_y = self.size * radians.sin();
        new_y
    }

    pub fn draw_line_x(&self, i: f64) -> f64 {
        self.size * (i * 2.0 * f64::consts::PI / self.side_count as f64).cos()
    }

    pub fn draw_line_y(&self, i: f64) -> f64 {
        self.size * (i * 2.0 * f64::consts::PI / self.side_count as f64).sin()
    }
}