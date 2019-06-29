use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use crate::player_ship::PlayerShip;
extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
pub fn draw_player_ship(player_ship: &PlayerShip, 
color: &JsValue, context: &web_sys::CanvasRenderingContext2d, rotation_degrees: f64){
    let radians = rotation_degrees * f64::consts::PI / 180.0;
    context.translate(player_ship.get_centre_x(), player_ship.get_centre_y())
        .unwrap();
    context.rotate(radians)
        .unwrap();
    context.begin_path();
    context.move_to(player_ship.generate_new_x().round(), player_ship.generate_new_y().round());
    for i in 0..player_ship.get_side_count() + 1 {
        context.line_to(player_ship.draw_line_x(i as f64).round(), player_ship.draw_line_y(i as f64).round())
    } 
    context.move_to(0.0, 0.0);
    context.line_to(40.0, 0.0);
    context.move_to(0.0, 0.0);
    context.line_to(-30.0, 0.0);
    context.close_path();
    context.set_stroke_style(color);
    context.set_line_width(3.0);
    context.stroke();
    context.fill();
    context.rotate(-radians)
        .unwrap();
    context.translate(-player_ship.get_centre_x(), -player_ship.get_centre_y())
        .unwrap();
}



#[wasm_bindgen]
pub fn draw_projectile(x: f64, y: f64, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.set_fill_style(color);
    context.arc(x,  y, 5.0, 0.0, f64::consts::PI * 2.0).unwrap();
    context.fill();
}

#[wasm_bindgen]
pub fn draw_spiral_enemy(x: f64, y: f64, 
color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.set_stroke_style(color);
    context.arc(x,  y, 10.0, 0.0, f64::consts::PI * 2.0).unwrap();
    context.close_path();
    context.stroke();
}