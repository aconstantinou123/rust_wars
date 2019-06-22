use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
use crate::enemy::Enemy;
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
pub struct FollowEnemy {
    pub base: Enemy,
    radians: f64,
}

#[wasm_bindgen]
impl FollowEnemy {
    pub fn new(x: f64, y: f64) -> FollowEnemy {
        utils::set_panic_hook();
        FollowEnemy {
            base: Enemy::new(25.0, x, y, 1.5, 1.5),
            radians: 0.0,
        }
    }

    pub fn get_radians(&self) -> f64 {
        self.radians
    }

      pub fn move_enemy(&mut self, player_ship: &PlayerShip) {
        let delta_x = player_ship.get_centre_x() as f64 - self.base.get_x();
        let delta_y = player_ship.get_centre_y() as f64 - self.base.get_y();
        self.radians = delta_y.atan2(delta_x);
        self.base.increment_x(self.radians.cos() * self.base.get_x_speed());
        self.base.increment_y( self.radians.sin() * self.base.get_y_speed())
    }

    pub fn check_dead(&mut self, projectile: &Projectile) {
       self.base.check_dead(projectile)
    }

    pub fn blow_up(&mut self){
       self.base.blow_up()
    }
}