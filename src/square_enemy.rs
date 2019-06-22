use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;
use crate::space::Space;
use crate::player_ship::PlayerShip;
use crate::laser::Laser;
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
    x: f64,
    y: f64,
    x_speed: f64,
    y_speed: f64,
    active: bool,
    ready_to_remove: bool,
    in_x_position: bool,
    in_y_position: bool,
    laser: Laser,
}

#[wasm_bindgen]
impl SquareEnemy {
    pub fn new(x: f64, y: f64) -> SquareEnemy {
        utils::set_panic_hook();
        SquareEnemy {
            size: 15.0,
            x,
            y,
            x_speed: 1.0,
            y_speed: 1.0,
            active: true,
            ready_to_remove: false,
            in_x_position: false,
            in_y_position: false,
            laser: Laser::new(0.0, x, y),
        }
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

     pub fn set_ready_to_remove(&mut self) {
        self.ready_to_remove = !self.ready_to_remove
    }

    // pub fn move_enemy(&mut self) {
    //     self.x += self.x_speed;
    //     self.y += self.y_speed;
    // }

    pub fn check_dead(&mut self, projectile: &Projectile) {
        let right_x = self.get_x() as f64 + self.get_size();
        let bottom_y = self.get_y() as f64 + self.get_size();
        if projectile.get_x() <= right_x  
        && projectile.get_x() >= self.get_x()
        && projectile.get_y() <= bottom_y 
        && projectile.get_y() >= self.get_y()
        {
            self.ready_to_remove = true
        }
    }

    pub fn blow_up(&mut self){
        if self.ready_to_remove && self.size < 50.0 {
            self.size += 0.03
        }  else if self.ready_to_remove {
            self.set_active()
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

    pub fn move_enemy(&mut self, space: &Space, player_ship: &PlayerShip) {
        // log!("{}", self.laser.get_x());
        // log!("{}", self.laser.get_y());
        if self.in_x_position == false || self.in_y_position == false {
            self.laser.align_with_enemy_position(self.x, self.y);
            self.move_to_position(space)
        } else if self.laser.get_shoot_timer() <= 500 && self.laser.get_can_shoot() == false {
            if self.laser.get_radians() != 0.0 {
                self.laser.reset_radians();
                log!("here")
            }
            self.laser.align_with_enemy_position(self.x, self.y);
            self.laser.delay_shot(player_ship);
            self.patrol_edges(space)
        } else {
            self.laser.delay_shot(player_ship);
        }
    }

    pub fn patrol_edges(&mut self, space: &Space) {
        if self.x < space.get_width() - 100.0 && self.y == 100.0 {
            self.x += self.x_speed
        } else if self.y < space.get_height() - 100.0 && self.x == space.get_width() - 100.0 {
            self.y += self.y_speed
        } else if self.x > 100.0 && self.y == space.get_height() - 100.0 {
            self.x -= self.x_speed
        } else if self.y > 100.0 && self.x == 100.0 {
            self.y -= self.y_speed
        }
    }

    pub fn move_to_position(&mut self, space: &Space) {
        if self.x < space.get_width() *  0.5 && self.x > 100.0 {
            self.x -= self.x_speed;
        } else if self.x > space.get_width() *  0.5 && self.x < space.get_width() - 100.0 {
            self.x += self.x_speed;
        } else {
            self.in_x_position = true;
        }
        if self.y < space.get_height() * 0.5 && self.y > 100.0 {
            self.y -= self.y_speed;
        } else if self.y > space.get_height() *  0.5 && self.y < space.get_height() - 100.0 {
            self.y += self.y_speed;
        } else {
            self.in_y_position = true;
        }
     }
}