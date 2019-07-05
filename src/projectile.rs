use wasm_bindgen::prelude::*;
use crate::utils;
use std::f64;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct Projectile {
    x: f64,
    y: f64,
    speed: f64,
    initial_angle: f64,
    active: bool,
}

#[wasm_bindgen]
impl Projectile {
    pub fn new(x: f64, y: f64, initial_angle: f64) -> Projectile {
        utils::set_panic_hook();
        
        Projectile {
            x,
            y,
            speed: 10.0,
            initial_angle,
            active: false,
        }
    }

    pub fn get_x(&self) -> f64 {
        self.x
    }

    pub fn get_y(&self) -> f64 {
        self.y
    }

    pub fn get_speed(&self) -> f64 {
        self.speed
    }

    pub fn get_initial_angle(&self) -> f64 {
        self.initial_angle
    }

    pub fn calculate_new_x(&mut self) {
       self.x += (self.initial_angle * f64::consts::PI/180.0).cos() * self.speed
    }

     pub fn calculate_new_y(&mut self) {
       self.y += (self.initial_angle * f64::consts::PI/180.0).sin() * self.speed
    }

    pub fn is_active(&self) -> bool {
        self.active
    }

    pub fn set_active(&mut self) {
        self.active = false
    }

    pub fn set_x(&mut self, x: f64) {
        self.x = x
    }

    pub fn set_y(&mut self, y: f64) {
        self.x = y
    }

    pub fn reset_state(&mut self, x: f64, y: f64, initial_angle: f64) {
        self.x = x;
        self.y = y;
        self.initial_angle = initial_angle;
        self.speed = 10.0;
        self.active = true;
    }
}