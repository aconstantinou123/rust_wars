use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;
use crate::player_ship::PlayerShip;
use crate::shockwave::Shockwave;
use crate::space::Space;
use std::f64;
use rand::prelude::*;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
pub enum EnemyType {
    Basic,
    Claw,
    Follow,
    Spiral,
    Square,
}

#[wasm_bindgen]
#[derive(Debug, Copy, Clone)]
pub struct Enemy {
    size: f64,
    x: f64,
    y: f64,
    x_speed: f64,
    y_speed: f64,
    original_x_speed: f64,
    original_y_speed: f64,
    active: bool,
    ready_to_remove: bool,
    removal_time: i32,
    added_to_array: bool,
    enemy_type: EnemyType,
}

#[wasm_bindgen]
impl Enemy {
    pub fn new(size: f64, x: f64, y: f64, x_speed: f64, y_speed: f64, enemy_type: EnemyType) -> Enemy {
        utils::set_panic_hook();
        Enemy {
            size,
            x,
            y,
            x_speed,
            y_speed,
            original_x_speed: x_speed,
            original_y_speed: y_speed,
            active: false,
            removal_time: 0,
            added_to_array: false,
            ready_to_remove: false,
            enemy_type,
        }
    }

    pub fn get_added_to_array(&self) -> bool {
        self.added_to_array
    }

    pub fn set_add_to_array(&mut self) {
        self.added_to_array = true
    }

     pub fn get_size(&self) -> f64 {
        self.size
    }

    pub fn get_enemy_type(&self) -> JsValue {
        JsValue::from_serde(&self.enemy_type).unwrap()
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
        self.x_speed = -self.x_speed;
        self.original_x_speed = self.x_speed;
    }

    pub fn reverse_y_speed(&mut self) {
        self.y_speed = -self.y_speed;
        self.original_y_speed = self.y_speed;
    }

    pub fn set_x_speed(&mut self, x: f64) {
        self.x_speed = x
    }

    pub fn set_y_speed(&mut self, y: f64) {
        self.y_speed = y
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

    pub fn get_is_ready_to_remove(&self) -> bool {
        self.ready_to_remove
    }

    pub fn move_enemy(&mut self) {
        self.x += self.x_speed;
        self.y += self.y_speed;
    }

    pub fn check_dead(&mut self, projectile: &Projectile) {
        if projectile.is_active() == true {
            let right_x = self.get_x() as f64 + self.get_size();
            let bottom_y = self.get_y() as f64 + self.get_size();
            if projectile.get_x() <= right_x  
            && projectile.get_x() >= self.get_x()
            && projectile.get_y() <= bottom_y 
            && projectile.get_y() >= self.get_y()
            {
                self.ready_to_remove = true;
            }
        }
    }

     pub fn check_player_ship_collision(&mut self, player_ship: &mut PlayerShip) {
        if self.ready_to_remove == false {
            let delta_x = player_ship.get_centre_x() - self.get_x();
            let delta_y = player_ship.get_centre_y() - self.get_y();
            let radians = delta_y.atan2(delta_x);

            let right_x = self.get_x() + (self.get_size() / 2.0);
            let left_x = self.get_x() - (self.get_size() / 2.0);
            let bottom_y = self.get_y() + (self.get_size() / 2.0);
            let top_y = self.get_y() - (self.get_size() / 2.0);

            let left_side_of_ship = player_ship.get_centre_x() - (player_ship.get_size() / 2.0);
            let right_side_of_ship = player_ship.get_centre_x() + (player_ship.get_size() / 2.0);
            let top_of_ship = player_ship.get_centre_y() - (player_ship.get_size() / 2.0);
            let bottom_of_ship = player_ship.get_centre_y() + (player_ship.get_size() / 2.0);

            if left_side_of_ship <= right_x
            && left_side_of_ship >= left_x 
            && player_ship.get_centre_y() <= bottom_y 
            && player_ship.get_centre_y() >= top_y {
                self.increment_x(-(radians.cos() * (self.x_speed * 10.0)));
                self.increment_y(-(radians.sin() * (self.y_speed * 10.0)));
                player_ship.increment_centre_x(radians.cos() * (player_ship.get_speed() as f64 * 5.0));
                player_ship.increment_centre_y(radians.sin() * (player_ship.get_speed() as f64 * 5.0));
                if player_ship.get_power_up() != "invincible" {
                    player_ship.set_health(-5);
                } else {
                    self.active = false;
                    player_ship.set_score(500);
                }
            } 
            if right_side_of_ship >= left_x
            && right_side_of_ship <= right_x
            && player_ship.get_centre_y() <= bottom_y 
            && player_ship.get_centre_y() >= top_y {
                self.increment_x(-(radians.cos() * (self.x_speed * 10.0)));
                self.increment_y(-(radians.sin() * (self.y_speed * 10.0)));
                player_ship.increment_centre_x(radians.cos() * (player_ship.get_speed() as f64 * 5.0));
                player_ship.increment_centre_y(radians.sin() * (player_ship.get_speed() as f64 * 5.0));
                if player_ship.get_power_up() != "invincible" {
                    player_ship.set_health(-5);
                } else {
                    self.active = false;
                    player_ship.set_score(500);
                }
            }
            if bottom_of_ship >= top_y
            && bottom_of_ship <= bottom_y
            && player_ship.get_centre_x() >= left_x
            && player_ship.get_centre_x() <= right_x {
                self.increment_x(-(radians.cos() * (self.x_speed * 10.0)));
                self.increment_y(-(radians.sin() * (self.y_speed * 10.0)));
                player_ship.increment_centre_x(radians.cos() * (player_ship.get_speed() as f64 * 5.0));
                player_ship.increment_centre_y(radians.sin() * (player_ship.get_speed() as f64 * 5.0));
                if player_ship.get_power_up() != "invincible" {
                    player_ship.set_health(-5);
                } else {
                    self.active = false;
                    player_ship.set_score(500);
                }
            }
            if top_of_ship <= bottom_y
            && top_of_ship >= self.get_y()
            && player_ship.get_centre_x() >= left_x
            && player_ship.get_centre_x() <= right_x {
                self.increment_x(-(radians.cos() * (self.x_speed * 10.0)));
                self.increment_y(-(radians.sin() * (self.y_speed * 10.0)));
                player_ship.increment_centre_x(radians.cos() * (player_ship.get_speed() as f64 * 5.0));
                player_ship.increment_centre_y(radians.sin() * (player_ship.get_speed() as f64 * 5.0));
                if player_ship.get_power_up() != "invincible" {
                    player_ship.set_health(-5);
                } else {
                    self.active = false;
                    player_ship.set_score(500);
                }
            }
        }
    }

    pub fn check_shockwave_collision(&mut self, shockwave: &Shockwave){
        let right_x = self.get_x() + (self.get_size() / 2.0);
        let left_x = self.get_x() - (self.get_size() / 2.0);
        if shockwave.get_x() <= right_x && shockwave.get_x() >= left_x {
            self.active = false;
        }
        if shockwave.get_x() + (shockwave.get_x() * 2.0) >= left_x 
        && shockwave.get_x() + (shockwave.get_x() * 2.0) <= right_x {
            self.active = false;
        }
    }

    pub fn blow_up(&mut self, player_ship: &mut PlayerShip, score_to_add: i32){
        if self.ready_to_remove == true && self.size < 50.0 {
            self.size += 0.03
        }  else if self.ready_to_remove && self.active == true {
            self.set_active();
            player_ship.set_score(score_to_add)
        }
    }

    pub fn move_and_reactivate(&mut self, space: &Space, original_speed: f64, original_size: f64) {
        if self.active == false && self.removal_time < 120 {
            self.x = space.get_width() * 2.0;
            self.y = space.get_height() * 2.0;
            self.removal_time += 1;
        } else if self.active == false{
            self.active = true;
            self.ready_to_remove = false;
            self.removal_time = 0;
            let mut rng = thread_rng();
            let rand_x = rng.gen_range(0, space.get_width() as i32 - 30);
            let rand_y = rng.gen_range(0, space.get_height() as i32 - 30);
            self.x = rand_x as f64;
            self.y = rand_y as f64;
            self.x_speed = original_speed;
            self.y_speed = original_speed;
            self.size = original_size;
        }
    }

    pub fn change_speed(&mut self, player_ship: &PlayerShip, speed: f64) {
         if player_ship.get_power_up() == "slowdown" {
             self.x_speed = speed;
             self.y_speed = speed;
        } else {
            self.x_speed = self.original_x_speed;
            self.y_speed = self.original_y_speed;
        }
     }

}