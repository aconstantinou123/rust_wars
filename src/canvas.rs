use std::f64;
use wasm_bindgen::prelude::*;
use crate::player_ship::PlayerShip;
use crate::power_up::PowerUp;
use crate::square_enemy::SquareEnemy;
use crate::basic_enemy::BasicEnemy;
use crate::follow_enemy::FollowEnemy;
use crate::claw_enemy::ClawEnemy;
use crate::projectile::Projectile;
use crate::spiral_enemy::SpiralEnemy;
use crate::star::Star;
extern crate web_sys;

#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
pub fn draw_player_ship(player_ship: &PlayerShip, context: &web_sys::CanvasRenderingContext2d){
    let radians = player_ship.get_rotation_degrees() * f64::consts::PI / 180.0;
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
    context.set_stroke_style(&player_ship.get_color());
    context.set_line_width(3.0);
    context.stroke();
    context.fill();
    context.rotate(-radians)
        .unwrap();
    context.translate(-player_ship.get_centre_x(), -player_ship.get_centre_y())
        .unwrap();
}

#[wasm_bindgen]
pub fn draw_projectile(projectile: &Projectile, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.set_fill_style(color);
    context.arc(projectile.get_x().round(), projectile.get_y().round(), 5.0, 0.0, f64::consts::PI * 2.0).unwrap();
    context.fill();
}

#[wasm_bindgen]
pub fn draw_star(star: &Star, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.set_fill_style(color);
    context.arc(star.get_x().round(), star.get_y().round(), 1.5, 0.0, f64::consts::PI * 2.0).unwrap();
    context.fill();
}

#[wasm_bindgen]
pub fn draw_shockwave(player_ship: &PlayerShip, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    context.set_stroke_style(color);
    context.stroke_rect(
        player_ship.shockwave.get_x().round(),
        player_ship.shockwave.get_y().round(),
        player_ship.shockwave.get_width(),
        player_ship.shockwave.get_height(),
    );
    if player_ship.shockwave.get_x() != 0.0 {
            context.stroke_rect(
            player_ship.shockwave.get_x().round() + 25.0,
            player_ship.shockwave.get_y().round() + 25.0,
            player_ship.shockwave.get_width() - 50.0,
            player_ship.shockwave.get_height() - 50.0,
        );
            context.stroke_rect(
            player_ship.shockwave.get_x().round() + 50.0,
            player_ship.shockwave.get_y().round() + 50.0,
            player_ship.shockwave.get_width() - 100.0,
            player_ship.shockwave.get_height() - 100.0,
        );
    } 
}

#[wasm_bindgen]
pub fn draw_power_up(power_up: &PowerUp, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.set_stroke_style(&power_up.get_color_1());
    context.arc(power_up.get_x(), power_up.get_y(), power_up.get_size(), 0.0, f64::consts::PI * 2.0).unwrap();
    context.stroke();
    context.begin_path();
    context.set_stroke_style(&power_up.get_color_2());
    context.arc(power_up.get_x(), power_up.get_y(), power_up.get_size() * 0.6, 0.0, f64::consts::PI * 2.0).unwrap();
    context.stroke();
    context.begin_path();
    context.set_stroke_style(&power_up.get_color_3());
    context.arc(power_up.get_x(), power_up.get_y(), power_up.get_size() * 0.3, 0.0, f64::consts::PI * 2.0).unwrap();
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_spiral_enemy(spiral_enemy: &SpiralEnemy, 
color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.set_stroke_style(color);
    context.arc(spiral_enemy.base.get_x().round(),  
    spiral_enemy.base.get_y().round(), 10.0, 0.0, f64::consts::PI * 2.0).unwrap();
    context.close_path();
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_square_enemy(square_enemy: &SquareEnemy, color: &JsValue,  context: &web_sys::CanvasRenderingContext2d){
    context.set_stroke_style(color);
    context.stroke_rect(square_enemy.base.get_x().round() - (square_enemy.base.get_size() / 2.0).round(),
    square_enemy.base.get_y().round() - (square_enemy.base.get_size() / 2.0).round(),
    square_enemy.base.get_size(),
    square_enemy.base.get_size())
}

#[wasm_bindgen]
pub fn draw_enemy_projectile(square_enemy: &SquareEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    context.begin_path();
    context.move_to(square_enemy.base.get_x().round() + (square_enemy.base.get_size() / 2.0).round(),
    square_enemy.base.get_y().round() + (square_enemy.base.get_size() / 2.0).round());
    context.line_to(square_enemy.get_laser_x().round(), square_enemy.get_laser_y().round());
    context.set_stroke_style(color);
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_basic_enemy(basic_enemy: &BasicEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    context.set_stroke_style(color);
    context.stroke_rect(basic_enemy.base.get_x().round() - (basic_enemy.base.get_size() / 2.0).round(),
    basic_enemy.base.get_y().round() - (basic_enemy.base.get_size() / 2.0).round(),
    basic_enemy.base.get_size(),
    basic_enemy.base.get_size())
}

#[wasm_bindgen]
pub fn draw_follow_enemy(follow_enemy: &mut FollowEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.begin_path();
    context.move_to(
        follow_enemy.x_draw_position().round(),
        follow_enemy.y_draw_position().round()
    );
    for i in 0..follow_enemy.get_number_of_sides() as i32 + 1 {
        context.line_to(
            follow_enemy.draw_x(i as f64).round(),
            follow_enemy.draw_y(i as f64).round()
        )
    }
    context.set_stroke_style(color);
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_claw_enemy(claw_enemy: &mut ClawEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    let center_x = claw_enemy.base.get_x() + claw_enemy.base.get_size() / 2.0;
    let center_y = claw_enemy.base.get_y() + claw_enemy.base.get_size() / 2.0;
    context.translate(center_x, center_y).unwrap();
    context.rotate(claw_enemy.get_radians()).unwrap();
    context.begin_path();
    context.move_to(
        claw_enemy.x_draw_position().round(),
        claw_enemy.y_draw_position().round()
    );
    for i in 0..claw_enemy.get_number_of_sides() as i32 + 1 {
        context.line_to(
            claw_enemy.draw_x(i as f64).round(),
            claw_enemy.draw_y(i as f64).round()
        )
    } 
    context.set_stroke_style(color);
    context.stroke();
    context.rotate(-claw_enemy.get_radians()).unwrap();
    context.translate(-center_x, -center_y).unwrap();
}