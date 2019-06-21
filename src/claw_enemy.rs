use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
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
pub struct ClawEnemy {
    size: f64,
    x: f64,
    y: f64,
    speed: f64,
    active: bool,
    ready_to_remove: bool,
    radians: f64,
}

#[wasm_bindgen]
impl ClawEnemy {
    pub fn new(x: f64, y: f64) -> ClawEnemy {
        utils::set_panic_hook();
        ClawEnemy {
            size: 25.0,
            x,
            y,
            speed: 2.5,
            active: true,
            ready_to_remove: false,
            radians: 0.0,
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

    pub fn increment_y(&mut self, y: f64) {
        self.y += y
    }

     pub fn increment_x(&mut self, x: f64) {
        self.x += x
    }

    pub fn get_speed(&self) -> f64 {
        self.speed
    }

    pub fn reverse_x_speed(&mut self) {
        self.speed = -self.speed
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

    pub fn move_enemy(&mut self, player_ship: &PlayerShip) {
        let delta_x = player_ship.get_centre_x() as f64 - self.x;
        let delta_y = player_ship.get_centre_y() as f64 - self.y;
        self.radians = delta_y.atan2(delta_x);
        self.x += self.radians.cos() * self.speed;
        self.y += self.radians.sin() * self.speed;
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

    pub fn avoid_projectile(&mut self, projectile: &Projectile) {
        let delta_x = projectile.get_x() - self.x;
        let delta_y = projectile.get_y() - self.y;
        if delta_x < 50.0 && delta_x > -50.0 {
            if projectile.get_x() < self.get_x() {
                self.x += 5.0
            } else {
                self.x -= 5.0
            }
        }
        if delta_y < 50.0 && delta_y > -50.0 {
            if projectile.get_y() < self.get_y() {
                self.y += 5.0
            } else {
                self.y -= 5.0
            }
        }
    }

    pub fn blow_up(&mut self){
        if self.ready_to_remove && self.size < 50.0 {
            self.size += 0.03
        }  else if self.ready_to_remove {
            self.set_active()
        }
    }
}