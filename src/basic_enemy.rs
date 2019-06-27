use wasm_bindgen::prelude::*;
use crate::utils;
use crate::enemy::Enemy;
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
use crate::shockwave::Shockwave;
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
pub struct BasicEnemy {
    pub base: Enemy
}

#[wasm_bindgen]
impl BasicEnemy {
    pub fn new(x: f64, y: f64) -> BasicEnemy {
        utils::set_panic_hook();
        BasicEnemy {
            base: Enemy::new(25.0, x, y, 1.0, 1.0)
        }
    }

    pub fn check_dead(&mut self, projectile: &Projectile) {
       self.base.check_dead(projectile)
    }

    pub fn blow_up(&mut self, player_ship: &mut PlayerShip, score_to_add: i32){
       self.base.blow_up(player_ship, score_to_add)
    }

    pub fn move_enemy(&mut self){
        self.base.move_enemy()
    }

    pub fn check_player_ship_collision(&mut self, player_ship: &mut PlayerShip){
         self.base.check_player_ship_collision(player_ship)
    }

    pub fn check_shockwave_collision(&mut self, shockwave: &Shockwave) {
        self.base.check_shockwave_collision(shockwave)
    }

}