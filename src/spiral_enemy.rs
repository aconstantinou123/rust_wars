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
#[derive(Debug)]
pub struct SpiralEnemy {
    size: f64,
    x: f64,
    y: f64,
    x_speed: f64,
    y_speed: f64,
    active: bool,
    ready_to_remove: bool,
    radians: f64,
    rotation_radius: f64,
    reverse: bool
}

#[wasm_bindgen]
impl SpiralEnemy {
    pub fn new(x: f64, y: f64) -> SpiralEnemy {
        utils::set_panic_hook();
        SpiralEnemy {
            size: 25.0,
            x,
            y,
            x_speed: 1.5,
            y_speed: 1.5,
            active: true,
            ready_to_remove: false,
            radians: 0.0,
            rotation_radius: 2.0,
            reverse: false,
        }
    }

    pub fn get_radians(&self) -> f64 {
        self.radians
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

    pub fn get_speed(&self) -> f64 {
        self.x_speed
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

    pub fn check_dead(&mut self, projectile: &Projectile) {
        let right_x = self.get_x() + self.get_size();
        let bottom_y = self.get_y() + self.get_size();
        if projectile.get_x() <= right_x  
        && projectile.get_x() >= self.get_x()
        && projectile.get_y() <= bottom_y 
        && projectile.get_y() >= self.get_y()
        {
            self.ready_to_remove = true
        }
    }

    pub fn blow_up(&mut self){
        if self.ready_to_remove && self.size < 50.0 {
            self.size += 0.03
        }  else if self.ready_to_remove {
            self.set_active()
        }
    }


    pub fn spiral_movement(&mut self) {
        let rotation_radius_increase = 0.1;
        self.radians += f64::consts::PI / 180.0 + 0.1;
        let x_rotation = self.rotation_radius * self.radians.cos();
        let y_rotation = self.rotation_radius * self.radians.sin();
        self.x += x_rotation + self.x_speed;
        self.y += y_rotation + self.x_speed;
        if self.rotation_radius <= 20.0 && self.reverse == false {
            self.rotation_radius += rotation_radius_increase/5.0;
        } else if self.rotation_radius > 20.0 && self.reverse == false {
            self.reverse = true
        } else if self.rotation_radius >= 5.0 && self.reverse == true {
            self.rotation_radius -= rotation_radius_increase/5.0;
        } else {
            self.reverse = false
        }
    }
}