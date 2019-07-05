use wasm_bindgen::prelude::*;
use std::f64;
use crate::utils;
use crate::projectile::Projectile;
use crate::space::Space;
use crate::player_ship::PlayerShip;
use crate::laser::Laser;
use crate::enemy::{Enemy, EnemyType};
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
pub struct SquareEnemy {
    pub base: Enemy,
    in_x_position: bool,
    in_y_position: bool,
    laser: Laser,
}

#[wasm_bindgen]
impl SquareEnemy {
    pub fn new(x: f64, y: f64) -> SquareEnemy {
        utils::set_panic_hook();
        SquareEnemy {
            base: Enemy::new(35.0, x, y, 2.0, 2.0, EnemyType::Square),
            in_x_position: false,
            in_y_position: false,
            laser: Laser::new(0.0, x, y),
        }
    }

    pub fn get_can_shoot(&self) -> bool {
        self.laser.get_can_shoot()
    }

    pub fn get_laser_x(&self) -> f64 {
        self.laser.get_x()
    }

    pub fn get_laser_y(&self) -> f64 {
        self.laser.get_y()
    }

    pub fn move_enemy(&mut self, space: &Space, player_ship: &mut PlayerShip) {
        let laser_x = self.base.get_x() + (self.base.get_size() / 2.0);
        let laser_y = self.base.get_y() + (self.base.get_size() / 2.0);
        if self.in_x_position == false || self.in_y_position == false {
            self.laser.align_with_enemy_position(laser_x, laser_y);
            self.move_to_position(space)
        } else if self.laser.get_shoot_timer() <= 500 && self.laser.get_can_shoot() == false {
            if self.laser.get_radians() != 0.0 {
                self.laser.reset_radians();
            }
            self.laser.align_with_enemy_position(laser_x, laser_y);
            self.laser.delay_shot(player_ship);
            self.patrol_edges(space)
        } else {
            self.laser.delay_shot(player_ship);
        }
    }

    pub fn patrol_edges(&mut self, space: &Space) {
        if self.base.get_x() < (space.get_width() - self.base.get_size() - 105.0) 
            && self.base.get_y() <= 105.0 {
            self.base.increment_x(self.base.get_x_speed())
        } else if self.base.get_y() < (space.get_height() - self.base.get_size() - 105.0) 
            && self.base.get_x() >= (space.get_width() - self.base.get_size() - 105.0) {
            self.base.increment_y(self.base.get_x_speed())
        } else if self.base.get_x() > 105.0 
            && self.base.get_y() >= (space.get_height() - self.base.get_size() - 105.0) {
            self.base.increment_x(-self.base.get_x_speed())
        } else if self.base.get_y() > 105.0 
            && self.base.get_x() <= 105.0 {
            self.base.increment_y(-self.base.get_x_speed())
        }
    }

    pub fn move_to_position(&mut self, space: &Space) {
        if self.base.get_x() < space.get_width() *  0.5 && self.base.get_x() > 100.0 {
            self.base.increment_x(-self.base.get_x_speed())
        } else if self.base.get_x() > space.get_width() *  0.5 && self.base.get_x() < space.get_width() - 100.0 {
             self.base.increment_x(self.base.get_x_speed())
        } else {
            self.in_x_position = true;
        }
        if self.base.get_y() < space.get_height() * 0.5 && self.base.get_y() > 100.0 {
            self.base.increment_y(-self.base.get_x_speed())
        } else if self.base.get_y() > space.get_height() *  0.5 && self.base.get_y() < space.get_height() - 100.0 {
            self.base.increment_y(self.base.get_x_speed())
        } else {
            self.in_y_position = true;
        }
     }

    pub fn check_dead(&mut self, projectile: &Projectile){
         self.base.check_dead(projectile)
    }

    pub fn blow_up(&mut self, player_ship: &mut PlayerShip, val: i32){
       self.base.blow_up(player_ship, val)
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

    pub fn get_added_to_array(&self) -> bool {
        self.base.get_added_to_array()
    }

    pub fn set_add_to_array(&mut self) {
        self.base.set_add_to_array()
    }


    pub fn update(&mut self, player_ship: &mut PlayerShip, space: &Space) {
        self.check_player_ship_collision(player_ship);
        space.check_enemy_at_edge(self);
        self.check_shockwave_collision(&player_ship.shockwave);
        self.change_speed(player_ship, 0.2);
        self.move_enemy(space, player_ship);
        self.base.move_and_reactivate(space, 2.0, 35.0);
    }

}