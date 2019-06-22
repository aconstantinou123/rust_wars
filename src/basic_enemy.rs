use wasm_bindgen::prelude::*;
use crate::utils;
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
pub struct BasicEnemy {
    pub base: Enemy
}

#[wasm_bindgen]
impl BasicEnemy {
    pub fn new(x: f64, y: f64) -> BasicEnemy {
        utils::set_panic_hook();
        BasicEnemy {
            base: Enemy::new(15.0, x, y, 1.0, 1.0)
        }
    }
}