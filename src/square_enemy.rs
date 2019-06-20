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
pub struct SquareEnemy {
    size: f64,
    x: i32,
    y: i32,
    x_speed: f64,
    y_speed: f64,
    active: bool,
}

#[wasm_bindgen]
impl SquareEnemy {
    pub fn new(x: i32, y: i32) -> SquareEnemy {
        utils::set_panic_hook();
        SquareEnemy {
            size: 30.0,
            x,
            y,
            x_speed: 5.0,
            y_speed: 5.0,
            active: true,
        }
    }

     pub fn get_size(&self) -> f64 {
        self.size
    }

     pub fn get_x(&self) -> i32 {
        self.x
    }

    pub fn get_y(&self) -> i32 {
        self.y
    }

     pub fn set_x(&mut self, x: i32) {
        self.x = x
    }

    pub fn set_y(&mut self, y: i32) {
        self.y = y
    }

    pub fn increment_y(&mut self, y: i32) {
        self.y += y
    }

     pub fn increment_x(&mut self, x: i32) {
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

    pub fn move_enemy(&mut self) {
        self.x += self.x_speed as i32;
        self.y += self.y_speed as i32;
    }

    pub fn check_dead(&mut self, projectile: &Projectile) {
        let right_x = self.get_x() as f64 + self.get_size();
        let bottom_y = self.get_y() as f64 + self.get_size();
        // log!("{}", bottom_y);
        if projectile.get_x() <= right_x  
        && projectile.get_x() >= self.get_x() as f64
        && projectile.get_y() <= bottom_y 
        && projectile.get_y() >= self.get_y() as f64
        {
            log!("projectile x {}", projectile.get_x());
            log!("projectile y {}", projectile.get_y());
            log!("right {}", right_x);
            log!("left {}", self.get_x());
            log!("bottom {}", bottom_y);
            log!("top {}", self.get_y());
            self.set_active();
        }
    }
}