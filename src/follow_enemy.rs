use wasm_bindgen::prelude::*;
use std::f64;
use crate::utils;
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
use crate::enemy::{Enemy, EnemyType};
use crate::shockwave::Shockwave;
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
pub struct FollowEnemy {
    pub base: Enemy,
    radians: f64,
    number_of_sides: f64,
}

#[wasm_bindgen]
impl FollowEnemy {
    pub fn new(x: f64, y: f64) -> FollowEnemy {
        utils::set_panic_hook();
        FollowEnemy {
            base: Enemy::new(35.0, x, y, 2.5, 2.5, EnemyType::Follow),
            radians: 0.0,
            number_of_sides: 6.0,
        }
    }

    pub fn get_number_of_sides(&self) -> f64 {
        self.number_of_sides
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

    pub fn blow_up(&mut self, player_ship: &mut PlayerShip, val: i32){
       self.base.blow_up(player_ship, val)
    }

    pub fn check_player_ship_collision(&mut self, player_ship: &mut PlayerShip){
         self.base.check_player_ship_collision(player_ship)
    }

    pub fn x_draw_position(&mut self) -> f64 {
        let zero: f64 = 0.0;
        self.base.get_x() + self.base.get_size() * zero.cos()
    }

     pub fn y_draw_position(&mut self) -> f64 {
        let zero: f64 = 0.0;
        self.base.get_y() + self.base.get_size() * zero.sin()
    }

    pub fn draw_x(&self, i: f64) -> f64 {
        let x = i * 2.0 * f64::consts::PI / self.number_of_sides;
        self.base.get_x() + self.base.get_size() * x.cos()
    }

    pub fn draw_y(&self, i: f64) -> f64 {
        let x = i * 2.0 * f64::consts::PI / self.number_of_sides;
        self.base.get_y() + self.base.get_size() * x.sin()
    }

    pub fn check_shockwave_collision(&mut self, shockwave: &Shockwave) {
        self.base.check_shockwave_collision(shockwave)
    }

    pub fn change_speed(&mut self, player_ship: &PlayerShip, speed: f64) {
        self.base.change_speed(player_ship, speed)
    }

    pub fn get_added_to_array(&self) -> bool {
        self.base.get_added_to_array()
    }

    pub fn set_add_to_array(&mut self) {
        self.base.set_add_to_array()
    }

    pub fn update(&mut self, player_ship: &mut PlayerShip, space: &Space) {
        self.check_player_ship_collision(player_ship);
        self.check_shockwave_collision(&player_ship.shockwave);
        self.change_speed(player_ship, 0.2);
        self.move_enemy(player_ship);
        self.base.move_and_reactivate(space, 2.5, 35.0);
    }

}