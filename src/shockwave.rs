use wasm_bindgen::prelude::*;
use std::f64;
use crate::space::Space;

extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug, Copy, Clone)]
pub struct Shockwave {
    x: f64,
    y: f64,
    height: f64,
    width: f64,
    speed: f64,
    is_active: bool,
    shockwaves_remaining: i32,
}

#[wasm_bindgen]
impl Shockwave {

    pub fn new(x: f64, y: f64) -> Shockwave {
        Shockwave {
            x,
            y,
            height: 0.0,
            width: 0.0,
            speed: 10.0,
            is_active: false,
            shockwaves_remaining: 3,
        }
    }

    pub fn get_x(&self) -> f64 {
        self.x
    }

    pub fn get_y(&self) -> f64 {
        self.y
    }

     pub fn get_height(&self) -> f64 {
        self.height
    }

     pub fn get_width(&self) -> f64 {
        self.width
    }

    pub fn get_is_active(&self) -> bool {
        self.is_active
    }

    pub fn get_shockwaves_remaining(&self) -> i32 {
        self.shockwaves_remaining
    }

    pub fn activate_shockwave(&mut self, x: f64, y: f64) {
        if self.shockwaves_remaining > 0 {
            self.x = x;
            self.y = y;
            self.is_active = true;
            self.shockwaves_remaining -= 1;
        }
    }

    pub fn detonate(&mut self, space: &Space) {
        if self.x <= space.get_width() && self.is_active == true {
            self.width += self.speed;
            self.x -= self.speed / 2.0;
        }
        if self.x <= space.get_width() && self.is_active == true {
            self.height += self.speed;
            self.y -= self.speed / 2.0;
        }
        if self.width >= space.get_width() && self.height >= space.get_height() {
            self.is_active = false;
            self.x = 0.0;
            self.y = 0.0;
            self.height = 0.0;
            self.width = 0.0;

        }

    }

}