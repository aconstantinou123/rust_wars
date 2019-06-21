use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
use crate::square_enemy::SquareEnemy;
use crate::claw_enemy::ClawEnemy;
use crate::spiral_enemy::SpiralEnemy;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Space {
    height: f64,
    width: f64,
}

#[wasm_bindgen]
impl Space {

    pub fn new() -> Space {
        utils::set_panic_hook();
        Space {
            height: 860.0,
            width: 1660.0,
        }
    }

    pub fn get_height(&self) -> f64 {
        self.height
    }

    pub fn get_width(&self) -> f64 {
        self.width
    }

    pub fn check_projectile_out_of_bounds(&self, projectile: &mut Projectile) {
        if projectile.get_x() <= 0.0 || projectile.get_x() >= self.width 
        || projectile.get_y() <= 0.0 || projectile.get_y() >= self.height {
            projectile.set_active()
        }
    }

    pub fn check_player_ship_out_of_bounds(&self, player_ship: &mut PlayerShip) {
        if player_ship.get_centre_x() as f64 - player_ship.get_size() <= 0.0 {
            player_ship.set_centre_x(player_ship.get_size() as i32);
        } 
        if player_ship.get_centre_x() as f64 + player_ship.get_size() >= self.get_width() {
            player_ship.set_centre_x(self.get_width() as i32 - player_ship.get_size() as i32);
        }
        if player_ship.get_centre_y() as f64 - player_ship.get_size() <= 0.0 {
            player_ship.set_centre_y(player_ship.get_size() as i32)
        }
        if player_ship.get_centre_y() as f64 + player_ship.get_size() >= self.get_height() {
            player_ship.set_centre_y(self.get_height() as i32 - player_ship.get_size() as i32);
        }
    }

    pub fn check_enemy_at_edge(&self, square_enemy: &mut SquareEnemy) {
        if square_enemy.get_x() as f64 <= 0.0 {
            square_enemy.set_x(1);
            square_enemy.reverse_x_speed();
        } 
        if square_enemy.get_x() as f64 + square_enemy.get_size() >= self.get_width() {
            square_enemy.set_x(self.get_width() as i32 - square_enemy.get_size() as i32);
            square_enemy.reverse_x_speed()
        }
        if square_enemy.get_y() as f64 <= 0.0 {
            square_enemy.set_y(1);
            square_enemy.reverse_y_speed();
        }
        if square_enemy.get_y() as f64 + square_enemy.get_size() >= self.get_height() {
            square_enemy.set_y(self.get_height() as i32 - square_enemy.get_size() as i32);
            square_enemy.reverse_y_speed();
        }
    }


     pub fn check_claw_enemy_at_edge(&self, claw_enemy: &mut ClawEnemy) {
        if claw_enemy.get_x() <= 0.0 {
            claw_enemy.set_x(1.0);
        } 
        if claw_enemy.get_x() + claw_enemy.get_size() >= self.get_width() {
            claw_enemy.set_x(self.get_width() - claw_enemy.get_size());
        }
        if claw_enemy.get_y() as f64 <= 0.0 {
            claw_enemy.set_y(1.0);
        }
        if claw_enemy.get_y() + claw_enemy.get_size() >= self.get_height() {
            claw_enemy.set_y(self.get_height() - claw_enemy.get_size());
        }
    }

    pub fn check_spiral_enemy_at_edge(&self, spiral_enemy: &mut SpiralEnemy) {
        if spiral_enemy.get_x() <= 0.0 {
            spiral_enemy.set_x(1.0);
            spiral_enemy.reverse_x_speed();
        } 
        if spiral_enemy.get_x() + spiral_enemy.get_size() >= self.get_width() {
            spiral_enemy.set_x(self.get_width() - spiral_enemy.get_size());
            spiral_enemy.reverse_x_speed()
        }
        if spiral_enemy.get_y() <= 0.0 {
            spiral_enemy.set_y(1.0);
            spiral_enemy.reverse_y_speed();
        }
        if spiral_enemy.get_y() + spiral_enemy.get_size() >= self.get_height() {
            spiral_enemy.set_y(self.get_height() - spiral_enemy.get_size());
            spiral_enemy.reverse_y_speed();
        }
    }

}