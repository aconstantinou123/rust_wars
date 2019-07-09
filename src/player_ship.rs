use wasm_bindgen::prelude::*;
use std::f64;
use crate::utils;
use crate::shockwave::Shockwave;
use crate::power_up::PowerUpType;
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
pub struct PlayerShip {
    side_count: i32,
    size: f64,
    rotation_degress: f64,
    centre_x: f64,
    centre_y: f64,
    radians: f64,
    speed: i32,
    health: i32,
    is_alive: bool,
    score: i32,
    pub shockwave: Shockwave,
    power_up: PowerUpType,
    color: JsValue,
}

#[wasm_bindgen]
impl PlayerShip {
    pub fn new() -> PlayerShip {
        utils::set_panic_hook();
        let rotation_degress = 270.0;
        PlayerShip {
            side_count: 3,
            size: 17.5,
            rotation_degress,
            centre_x: 900.0,
            centre_y: 600.0,
            radians: rotation_degress * f64::consts::PI / 180.0,
            speed: 4,
            health: 100,
            is_alive: true,
            score: 0,
            shockwave: Shockwave::new(0.0, 0.0),
            power_up: PowerUpType::Normal,
            color: JsValue::from("#33F0FF"),
        }
    }

    pub fn get_power_up(&self) -> String {
        match self.power_up {
            PowerUpType::Normal => String::from("normal"),
            PowerUpType::ExtraFirePower => String::from("projectile"),
            PowerUpType::Invincible => String::from("invincible"),
            PowerUpType::EnemySlowDown => String::from("slowdown"),
        }
    }

    pub fn get_color(&self) -> JsValue {
        self.color.clone()
    }

    pub fn set_color(&mut self, new_color: JsValue) {
        self.color = new_color
    }

    pub fn set_power_up(&mut self, power_up: PowerUpType) {
        self.power_up = power_up
    }

    pub fn get_score(&self) -> i32 {
        self.score
    }

    pub fn set_score(&mut self, points: i32) {
        self.score += points
    }

    pub fn get_is_alive(&self) -> bool {
        self.is_alive
    }

    pub fn set_is_alive(&mut self) {
        self.is_alive = !self.is_alive
    }

    pub fn get_health(&self) -> i32 {
        self.health
    }

    pub fn set_health(&mut self, health: i32) {
        self.health += health
    }

    pub fn get_speed(&self) -> i32 {
        self.speed
    }

    pub fn get_side_count(&self) -> i32 {
            self.side_count
    }

    pub fn get_size(&self) -> f64 {
        self.size
    }

    pub fn get_rotation_degrees(&self) -> f64 {
        self.rotation_degress
    }

    pub fn get_centre_x(&self) -> f64 {
        self.centre_x
    }

    pub fn get_centre_y(&self) -> f64 {
        self.centre_y
    }

    pub fn get_radians(&self) -> f64 {
        self.radians
    }

    pub fn increment_centre_x(&mut self, x: f64) {
        self.centre_x += x
    }

    pub fn set_centre_x(&mut self, x: f64) {
        self.centre_x = x
    }

    pub fn set_centre_y(&mut self, y: f64) {
        self.centre_y = y
    }

    pub fn increment_centre_y(&mut self, y: f64) {
        self.centre_y += y
    }

    pub fn increment_rotation_degrees(&mut self, d: f64) {
        self.rotation_degress += d
    }

    pub fn generate_new_x(&self) -> f64 {
        let radians: f64 = 0.0;
        let new_x = self.size * radians.cos();
        new_x
    }
    
    pub fn generate_new_y(&self) -> f64 {
        let radians: f64 = 0.0;
        let new_y = self.size * radians.sin();
        new_y
    }

    pub fn draw_line_x(&self, i: f64) -> f64 {
        self.size * (i * 2.0 * f64::consts::PI / self.side_count as f64).cos()
    }

    pub fn draw_line_y(&self, i: f64) -> f64 {
        self.size * (i * 2.0 * f64::consts::PI / self.side_count as f64).sin()
    }

    pub fn check_is_dead(&mut self){
        if self.size >= 100.0 {
            self.is_alive = false;
        } else if self.health <= 0 {
            self.size += 2.0
        } 
    }

    pub fn activate_shockwave(&mut self) {
        self.shockwave.activate_shockwave(self.centre_x, self.centre_y);
    }

    pub fn detonate(&mut self, space: &Space) {
        self.shockwave.detonate(space)
    }
}