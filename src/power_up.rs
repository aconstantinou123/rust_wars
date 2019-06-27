use wasm_bindgen::prelude::*;
use std::f64;
use crate::utils;
use rand::prelude::*;
use crate::player_ship::PlayerShip;
use crate::space::Space;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub enum PowerUpType {
    ExtraFirePower,
    Invincible,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct PowerUp {
    x: f64,
    y: f64,
    size: f64,
    current_milisecond: i32,
    timer: i32,
    is_active: bool,
    set_new_timer: bool,
    power_up_type: PowerUpType
}

#[wasm_bindgen]
impl PowerUp {
    pub fn new() -> PowerUp {
        PowerUp {
            x: -50.0,
            y: -50.0,
            size: 20.0,
            current_milisecond: 0,
            timer: 0,
            set_new_timer: true,
            is_active: false,
            power_up_type: PowerUpType::ExtraFirePower,
        }
    }

    pub fn get_x(&self) -> f64 {
        self.x
    }

    pub fn get_y(&self) -> f64 {
        self.y
    }

    pub fn get_is_active(&self) -> bool {
        self.is_active
    }

    pub fn get_timer(&self) -> i32 {
        self.timer
    }

    pub fn get_size(&self) -> f64 {
        self.size
    }

    pub fn generate_random_position(&mut self, space: &Space) {
        let mut rng = thread_rng();
        if self.set_new_timer == true {
           self.timer = rng.gen_range(0, 1800);
           self.set_new_timer = false;
        } else if self.current_milisecond < self.timer  {
            self.current_milisecond += 1
        } else {
            self.x = rng.gen_range(20, space.get_width() as i32 - 20) as f64;
            self.y = rng.gen_range(20, space.get_height() as i32 - 20) as f64;
            self.set_new_timer = true;
            self.current_milisecond = 0;
        }
    }

}