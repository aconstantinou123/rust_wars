use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;
use std::f64;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug, Copy, Clone)]
pub struct Enemy {
    size: f64,
    x: f64,
    y: f64,
    x_speed: f64,
    y_speed: f64,
    active: bool,
    ready_to_remove: bool,
}

#[wasm_bindgen]
impl Enemy {
    pub fn new(size: f64, x: f64, y: f64, x_speed: f64, y_speed: f64) -> Enemy {
        utils::set_panic_hook();
        Enemy {
            size,
            x,
            y,
            x_speed,
            y_speed,
            active: true,
            ready_to_remove: false,
        }
    }

     pub fn get_size(&self) -> f64 {
        self.size
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

    pub fn set_y(&mut self, y: f64) {
        self.y = y
    }

    pub fn increment_y(&mut self, y: f64) {
        self.y += y
    }

     pub fn increment_x(&mut self, x: f64) {
        self.x += x
    }

    pub fn get_x_speed(&self) -> f64 {
        self.x_speed
    }

    pub fn get_y_speed(&self) -> f64 {
        self.y_speed
    }

    pub fn reverse_x_speed(&mut self) {
        self.x_speed = -self.x_speed
    }

    pub fn reverse_y_speed(&mut self) {
        self.y_speed = -self.y_speed
    }

      pub fn is_active(&self) -> bool {
        self.active
    }

    pub fn set_active(&mut self) {
        self.active = !self.active
    }

    pub fn set_ready_to_remove(&mut self) {
        self.ready_to_remove = !self.ready_to_remove
    }

    pub fn move_enemy(&mut self) {
        self.x += self.x_speed;
        self.y += self.y_speed;
    }

    pub fn check_dead(&mut self, projectile: &Projectile) {
        let right_x = self.get_x() as f64 + self.get_size();
        let bottom_y = self.get_y() as f64 + self.get_size();
        if projectile.get_x() <= right_x  
        && projectile.get_x() >= self.get_x()
        && projectile.get_y() <= bottom_y 
        && projectile.get_y() >= self.get_y()
        {
            self.ready_to_remove = true;
        }
    }

    pub fn blow_up(&mut self){
        if self.ready_to_remove == true && self.size < 50.0 {
            self.size += 0.03
        }  else if self.ready_to_remove {
            self.set_active()
        }
    }

}