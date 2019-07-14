use wasm_bindgen::prelude::*;
use crate::utils;
use crate::player_ship::PlayerShip;
use std::f64;
use rand::prelude::*;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct Star {
    x: f64,
    y: f64,
    speed: f64,
    radians: f64,
    active: bool,
}

#[wasm_bindgen]
impl Star {
    
    pub fn new(x: f64, y: f64) -> Star {
        utils::set_panic_hook();
        let speed = 2.0;
        let mut rng = thread_rng();
        let rand_angle = rng.gen_range(0, 360);
        let radians = rand_angle as f64 * f64::consts::PI/180.0;
        Star {
            x,
            y,
            speed,
            radians,
            active: true
        }
    }

    pub fn get_x(&self) -> f64 {
        self.x
    }

    pub fn get_y(&self) -> f64 {
        self.y
    }

     pub fn set_x(&mut self, x: f64) {
        self.x = x
    }

     pub fn set_radians(&mut self) {
        let mut rng = thread_rng();
        let rand_angle = rng.gen_range(0, 360);
        let radians = rand_angle as f64 * f64::consts::PI/180.0;
        self.radians = radians;
    }

    pub fn set_y(&mut self, y: f64) {
        self.y = y
    }

    pub fn calculate_new_x(&mut self) {
       self.x += self.radians.cos() * self.speed
    }

    pub fn calculate_new_y(&mut self) {
       self.y += self.radians.sin() * self.speed
    }

    pub fn is_active(&self) -> bool {
        self.active
    }

    pub fn set_active(&mut self) {
        self.active = false
    }

    pub fn can_draw(&self, player_ship: &PlayerShip, window_width: f64, window_height: f64) -> bool {
        let min_x = player_ship.get_centre_x() - (window_width / 2.0);
        let max_x = player_ship.get_centre_x() + (window_width / 2.0);
        let min_y = player_ship.get_centre_y() - (window_height / 2.0);
        let max_y = player_ship.get_centre_y() + (window_height / 2.0);
        if(self.x >= min_x && self.x <= max_x)
        && (self.y >= min_y && self.y <= max_y){
            true
        } else {
            false
        }
    }
}