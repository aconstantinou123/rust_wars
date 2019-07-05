use wasm_bindgen::prelude::*;
use crate::utils;
use crate::enemy::{Enemy, EnemyType};
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
use crate::space::Space;
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
            base: Enemy::new(35.0, x, y, 2.0, 2.0, EnemyType::Basic)
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

    pub fn change_speed(&mut self, player_ship: &PlayerShip, speed: f64) {
        self.base.change_speed(player_ship, speed)
    }

    pub fn get_base(&self) -> Enemy {
        self.base
    }

    pub fn set_active(&mut self) {
        self.base.set_active();
    }

    pub fn is_active(&self) -> bool {
        self.base.is_active()
    }
    
    pub fn get_added_to_array(&self) -> bool {
        self.base.get_added_to_array()
    }

    pub fn set_add_to_array(&mut self) {
        self.base.set_add_to_array()
    }

    pub fn update(&mut self, player_ship: &mut PlayerShip, space: &Space) {
        self.check_player_ship_collision(player_ship);
        self.change_speed(player_ship, 0.2);
        space.check_basic_enemy_at_edge(self);
        self.check_shockwave_collision(&player_ship.shockwave);
        self.move_enemy();
        self.base.move_and_reactivate(space, 2.0, 35.0);
    }

}