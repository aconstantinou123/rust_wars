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
pub struct ClawEnemy {
    pub base: Enemy,
    radians: f64,
    number_of_sides: f64,
}

#[wasm_bindgen]
impl ClawEnemy {
    pub fn new(x: f64, y: f64) -> ClawEnemy {
        utils::set_panic_hook();
        ClawEnemy {
            base: Enemy::new(25.0, x, y, 3.0, 3.0),
            radians: 0.0,
            number_of_sides: 4.5,
        }
    }

    pub fn get_radians(&self) -> f64 {
        self.radians
    }

    pub fn get_number_of_sides(&self) -> f64 {
        self.number_of_sides
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

    pub fn avoid_projectile(&mut self, projectile: &Projectile) {
        let delta_x = projectile.get_x() - self.base.get_x();
        let delta_y = projectile.get_y() - self.base.get_x();
        if delta_x < 50.0 && delta_x > -50.0 {
            if projectile.get_x() < self.base.get_x() {
                self.base.increment_x(5.0)
            } else {
                self.base.increment_y(-5.0)
            }
        }
        if delta_y < 50.0 && delta_y > -50.0 {
            if projectile.get_y() < self.base.get_y() {
                self.base.increment_x(5.0)
            } else {
                self.base.increment_y(-5.0)
            }
        }
    }

    pub fn blow_up(&mut self, player_ship: &mut PlayerShip){
       self.base.blow_up(player_ship)
    }

    pub fn check_player_ship_collision(&mut self, player_ship: &mut PlayerShip){
         self.base.check_player_ship_collision(player_ship)
    }

     pub fn x_draw_position(&mut self) -> f64 {
        let zero: f64 = 0.0;
        self.base.get_size() * zero.cos()
    }

     pub fn y_draw_position(&mut self) -> f64 {
        let zero: f64 = 0.0;
        self.base.get_size() * zero.sin()
    }

    pub fn draw_x(&self, i: f64) -> f64 {
        let x = i * 2.0 * f64::consts::PI / self.number_of_sides;
        self.base.get_size() * x.cos()
    }

    pub fn draw_y(&self, i: f64) -> f64 {
        let x = i * 2.0 * f64::consts::PI / self.number_of_sides;
        self.base.get_size() * x.sin()
    }

}