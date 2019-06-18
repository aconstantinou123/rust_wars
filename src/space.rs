use wasm_bindgen::prelude::*;
use crate::utils;
use crate::projectile::Projectile;

extern crate web_sys;


// A macro to provide `println!(..)`-style syntax for `console.log` logging.
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
}