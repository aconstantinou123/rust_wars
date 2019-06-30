use wasm_bindgen::prelude::*;
use std::f64;
use crate::utils;
use rand::prelude::*;
use crate::player_ship::PlayerShip;
use crate::space::Space;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq)]
pub enum PowerUpType {
    ExtraFirePower,
    EnemySlowDown,
    Invincible,
    Normal,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct PowerUp {
    x: f64,
    y: f64,
    size: f64,
    current_milisecond: i32,
    timer: i32,
    is_active: bool,
    set_new_timer: bool,
    power_up_type: PowerUpType,
    color1: JsValue,
    color2: JsValue,
    color3: JsValue,
}

#[wasm_bindgen]
impl PowerUp {
    pub fn new() -> PowerUp {
        utils::set_panic_hook();
        let mut rng = thread_rng();
        let num = rng.gen_range(0, 3);
        let power_up_type = match num {
            0 => PowerUpType::EnemySlowDown,
            1 => PowerUpType::ExtraFirePower,
            2 => PowerUpType::Invincible,
            _ => PowerUpType::ExtraFirePower,
        };
        // let power_up_type = PowerUpType::Invincible;
        let colors = match power_up_type {
            PowerUpType::EnemySlowDown => (JsValue::from("#FF00FF"), JsValue::from("#FF00CC"), JsValue::from("#FF0099")),
            PowerUpType::ExtraFirePower => (JsValue::from("#0062FF"), JsValue::from("#099FFF"), JsValue::from("#00FFFF")),
            PowerUpType::Invincible => (JsValue::from("#FFFF00"), JsValue::from("#FFFF33"), JsValue::from("#FFFF33")),
            PowerUpType::Normal => (JsValue::from("#0062FF"), JsValue::from("#099FFF"), JsValue::from("#00FFFF")),
        };
        PowerUp {
            x: -50.0,
            y: -50.0,
            size: 30.0,
            current_milisecond: 0,
            timer: 0,
            set_new_timer: true,
            is_active: true,
            power_up_type,
            color1: colors.0,
            color2: colors.1,
            color3: colors.2,
        }
    }

    pub fn get_color_1(&self) -> JsValue {
        self.color1.clone()
    }

    pub fn get_color_2(&self) -> JsValue {
        self.color2.clone()
    }

    pub fn get_color_3(&self) -> JsValue {
        self.color3.clone()
    }

    pub fn get_x(&self) -> f64 {
        self.x
    }

    pub fn get_y(&self) -> f64 {
        self.y
    }

    pub fn get_is_active(&self) -> bool {
        self.is_active
    }

    pub fn get_timer(&self) -> i32 {
        self.timer
    }

    pub fn get_size(&self) -> f64 {
        self.size
    }

    pub fn generate_random_position(&mut self, space: &Space) {
        let mut rng = thread_rng();
        if self.set_new_timer == true && self.is_active == true {
           self.timer = rng.gen_range(1200, 1800);
           self.set_new_timer = false;
        } else if self.current_milisecond < self.timer && self.is_active == true {
            self.current_milisecond += 1
        } else if self.is_active == true {
            self.x = rng.gen_range(20, space.get_width() as i32 - 20) as f64;
            self.y = rng.gen_range(20, space.get_height() as i32 - 20) as f64;
            self.set_new_timer = true;
            self.current_milisecond = 0;
        }
    }

    pub fn power_up_countdown(&mut self, player_ship: &mut PlayerShip){
        if self.set_new_timer == true && player_ship.get_power_up() != "normal" {
            self.timer = 1200;
            self.set_new_timer = false
        } else if player_ship.get_power_up() != "normal"
        && self.current_milisecond < self.timer {
            self.current_milisecond += 1;
        } else if player_ship.get_power_up() != "normal" {
            player_ship.set_power_up(PowerUpType::Normal);
            player_ship.set_color(JsValue::from("#33F0FF"));
            self.set_new_timer = true;
            self.current_milisecond = 0;
            self.is_active = true;
            let mut rng = thread_rng();
            let num = rng.gen_range(0, 3);
            self.power_up_type = match num {
                0 => PowerUpType::EnemySlowDown,
                1 => PowerUpType::ExtraFirePower,
                3 => PowerUpType::Invincible,
                _ => PowerUpType::ExtraFirePower,
            };
            self.change_colors()
        }
    }

    pub fn check_collision_with_player_ship(&mut self, player_ship: &mut PlayerShip){
        let left_side_of_ship = player_ship.get_centre_x() - (player_ship.get_size() / 2.0);
        let right_side_of_ship = player_ship.get_centre_x() + (player_ship.get_size() / 2.0);
        let top_of_ship = player_ship.get_centre_y() - (player_ship.get_size() / 2.0);
        let bottom_of_ship = player_ship.get_centre_y() + (player_ship.get_size() / 2.0);

        let right_x = self.x + (self.get_size() / 2.0);
        let left_x = self.x - (self.get_size() / 2.0);
        let bottom_y = self.y + (self.get_size() / 2.0);
        let top_y = self.y - (self.get_size() / 2.0);

        if left_x <= right_side_of_ship && right_x >= left_side_of_ship
        && top_y <= bottom_of_ship && bottom_y >= top_of_ship {
            self.is_active = false;
            self.x = -50.0;
            self.y = -50.0;
            self.set_new_timer = true;
            self.current_milisecond = 0;
            match self.power_up_type {
                PowerUpType::EnemySlowDown => {
                    player_ship.set_power_up(PowerUpType::EnemySlowDown);
                    player_ship.set_color(JsValue::from("#33F0FF"));
                } 
                PowerUpType::ExtraFirePower => {
                    player_ship.set_power_up(PowerUpType::ExtraFirePower);
                    player_ship.set_color(JsValue::from("#33F0FF"));
                } 
                PowerUpType::Invincible => {
                    player_ship.set_power_up(PowerUpType::Invincible);
                    player_ship.set_color(JsValue::from("#FF0000"));
                } 
                _ => ()
            }
        }
    }

    pub fn change_colors(&mut self) {
        match self.power_up_type {
            PowerUpType::EnemySlowDown => {
                self.color1 = JsValue::from("#FF00FF");
                self.color2 = JsValue::from("#FF00CC");
                self.color3 = JsValue::from("#FF0099")
            },
            PowerUpType::ExtraFirePower => {
                self.color1 = JsValue::from("#0062FF"); 
                self.color2 = JsValue::from("#099FFF");
                self.color3 = JsValue::from("#00FFFF");
            },
            PowerUpType::Invincible => {
                self.color1 = JsValue::from("#FFFF00"); 
                self.color2 = JsValue::from("#FFFF33");
                self.color3 = JsValue::from("#FFFF33");
            },
            PowerUpType::Normal => {
                self.color1 = JsValue::from("#0062FF"); 
                self.color2 = JsValue::from("#099FFF");
                self.color3 = JsValue::from("#00FFFF");
            },
        }
    }

}