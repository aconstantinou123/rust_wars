use wasm_bindgen::prelude::*;
use std::f64;
use crate::utils;
use crate::projectile::Projectile;
use crate::enemy::Enemy;
use crate::player_ship::PlayerShip;
use crate::shockwave::Shockwave;

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
    pub base: Enemy,
    radians: f64,
    rotation_radius: f64,
    reverse: bool
}

#[wasm_bindgen]
impl SpiralEnemy {
    pub fn new(x: f64, y: f64) -> SpiralEnemy {
        utils::set_panic_hook();
        SpiralEnemy {
            base: Enemy::new(25.0, x, y, 1.0, 1.0),
            radians: 0.0,
            rotation_radius: 2.0,
            reverse: false,
        }
    }

    pub fn get_radians(&self) -> f64 {
        self.radians
    }

    pub fn check_dead(&mut self, projectile: &Projectile) {
       self.base.check_dead(projectile)
    }

    pub fn blow_up(&mut self, player_ship: &mut PlayerShip, score_to_add: i32){
       self.base.blow_up(player_ship, score_to_add)
    }


    pub fn spiral_movement(&mut self) {
        let rotation_radius_increase = 0.1;
        self.radians += f64::consts::PI / 180.0 + 0.1;
        let x_rotation = self.rotation_radius * self.radians.cos();
        let y_rotation = self.rotation_radius * self.radians.sin();
        self.base.increment_x(x_rotation + self.base.get_x_speed());
        self.base.increment_y(y_rotation + self.base.get_y_speed());
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

    pub fn check_player_ship_collision(&mut self, player_ship: &mut PlayerShip){
         self.base.check_player_ship_collision(player_ship)
    }

    pub fn check_shockwave_collision(&mut self, shockwave: &Shockwave) {
        self.base.check_shockwave_collision(shockwave)
    }

    pub fn change_speed(&mut self, player_ship: &PlayerShip, speed: f64) {
        self.base.change_speed(player_ship, speed)
    }

}