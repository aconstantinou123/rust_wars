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
use crate::space::Space;
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
    let new_x = player_ship.generate_new_x().round();
    let new_y = player_ship.generate_new_y().round();
    let coordinates: Vec<_> = (0 ..player_ship.get_side_count() + 1)
        .map(f64::from)
        .map(|i| (player_ship.draw_line_x(i).round(), 
        player_ship.draw_line_y(i).round()))
        .collect();
    context.translate(player_ship.get_centre_x(), player_ship.get_centre_y())
        .unwrap();
    context.rotate(radians)
        .unwrap();
    context.set_line_width(2.0);
    context.set_stroke_style(&player_ship.get_color());
    context.begin_path();
    context.move_to(new_x, new_y);
    for i in 0..player_ship.get_side_count() + 1 {
        context.line_to(coordinates[i as usize].0, coordinates[i as usize].1);
        context.stroke();
    } 
    context.begin_path();
    context.set_line_width(2.0);
    context.move_to(0.0, 0.0);
    context.line_to(15.0, 0.0);
    context.move_to(0.0, 0.0);
    context.line_to(-10.0, 0.0);
    context.close_path();
    context.set_stroke_style(&player_ship.get_color());
    context.stroke();
    context.rotate(-radians)
        .unwrap();
    context.translate(-player_ship.get_centre_x(), -player_ship.get_centre_y())
        .unwrap();
}

#[wasm_bindgen]
pub fn draw_projectile(projectile: &Projectile, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    let x = projectile.get_x().round();
    let y = projectile.get_y().round();
    let two_pi = f64::consts::PI * 2.0;
    context.set_fill_style(color);
    context.begin_path();
    context.arc(x, y, 3.0, 0.0, two_pi).unwrap();
    context.fill();
}

#[wasm_bindgen]
pub fn draw_star(star: &Star, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    let x = star.get_x().round();
    let y = star.get_y().round();
    context.begin_path();
    context.set_stroke_style(color);
    context.move_to(x, y);
    context.line_to(x + 1.0, y + 1.0);
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_shockwave(player_ship: &PlayerShip, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    let x = player_ship.shockwave.get_x().round();
    let y = player_ship.shockwave.get_y().round();
    let width = player_ship.shockwave.get_width();
    let height = player_ship.shockwave.get_height();
    context.set_stroke_style(color);
    context.set_line_width(2.0);
    context.begin_path();
    context.stroke_rect(x, y, width, height);
    if player_ship.shockwave.get_x() != 0.0 {
            context.begin_path();
            context.stroke_rect(
            x + 25.0,
            y + 25.0,
            width - 50.0,
            height - 50.0,
        );
             context.begin_path();
            context.stroke_rect(
            x + 50.0,
            y + 50.0,
            width - 100.0,
            height - 100.0,
        );
    } 
}

#[wasm_bindgen]
pub fn draw_power_up(power_up: &PowerUp, context: &web_sys::CanvasRenderingContext2d) {
    let two_pi = f64::consts::PI * 2.0;
    context.begin_path();
    context.set_line_width(2.0);
    context.set_stroke_style(&power_up.get_color_1());
    context.arc(power_up.get_x(), power_up.get_y(), power_up.get_size(), 0.0, two_pi).unwrap();
    context.stroke();
    context.begin_path();
    context.set_line_width(2.0);
    context.set_stroke_style(&power_up.get_color_2());
    context.arc(power_up.get_x(), power_up.get_y(), power_up.get_size() * 0.6, 0.0, two_pi).unwrap();
    context.stroke();
    context.begin_path();
    context.set_line_width(2.0);
    context.set_stroke_style(&power_up.get_color_3());
    context.arc(power_up.get_x(), power_up.get_y(), power_up.get_size() * 0.3, 0.0, two_pi).unwrap();
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_spiral_enemy(spiral_enemy: &SpiralEnemy, 
color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    let x = spiral_enemy.base.get_x().round();
    let y = spiral_enemy.base.get_y().round();
    let size = spiral_enemy.base.get_size();
    let two_pi = f64::consts::PI * 2.0;
    context.set_line_width(2.0);
    context.set_stroke_style(color);
    context.begin_path();
    context.arc(x, y, size, 0.0, two_pi).unwrap();
    context.close_path();
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_square_enemy(square_enemy: &SquareEnemy, color: &JsValue,  context: &web_sys::CanvasRenderingContext2d){
    let x = square_enemy.base.get_x().round() - (square_enemy.base.get_size() / 2.0).round();
    let y = square_enemy.base.get_y().round() - (square_enemy.base.get_size() / 2.0).round();
    let size = square_enemy.base.get_size();
    context.set_line_width(2.0);
    context.set_stroke_style(color);
    context.begin_path();
    context.stroke_rect(x, y, size, size)
}

#[wasm_bindgen]
pub fn draw_enemy_projectile(square_enemy: &SquareEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    let x = square_enemy.base.get_x().round() + (square_enemy.base.get_size() / 2.0).round();
    let y = square_enemy.base.get_y().round() + (square_enemy.base.get_size() / 2.0).round();
    let laser_x = square_enemy.get_laser_x().round();
    let laser_y = square_enemy.get_laser_y().round();
    context.set_line_width(2.0);
    context.set_stroke_style(color);
    context.begin_path();
    context.move_to(x, y);
    context.line_to(laser_x, laser_y);
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_basic_enemy(basic_enemy: &BasicEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    let x = basic_enemy.base.get_x().round() - (basic_enemy.base.get_size() / 2.0).round();
    let y = basic_enemy.base.get_y().round() - (basic_enemy.base.get_size() / 2.0).round();
    let size = basic_enemy.base.get_size();
    context.set_stroke_style(color);
    context.set_line_width(2.0);
    context.begin_path();
    context.stroke_rect(x, y, size, size);
}

#[wasm_bindgen]
pub fn draw_follow_enemy(follow_enemy: &mut FollowEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d) {
    context.set_line_width(2.0);
    let x = follow_enemy.x_draw_position().round();
    let y = follow_enemy.y_draw_position().round();
    let coordinates: Vec<_> = (0 ..follow_enemy.get_number_of_sides() as i32 + 1)
        .map(f64::from)
        .map(|i| (follow_enemy.draw_x(i).round(), follow_enemy.draw_y(i).round()))
        .collect();
    context.move_to(x, y);
    context.begin_path();
    for i in 0..follow_enemy.get_number_of_sides() as i32 + 1 {
            context.line_to(
            coordinates[i as usize].0,
            coordinates[i as usize].1,
            );
    }
    context.set_stroke_style(color);
    context.stroke();
}

#[wasm_bindgen]
pub fn draw_claw_enemy(claw_enemy: &mut ClawEnemy, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    let center_x = claw_enemy.base.get_x() + claw_enemy.base.get_size() / 2.0;
    let center_y = claw_enemy.base.get_y() + claw_enemy.base.get_size() / 2.0;
    let x = claw_enemy.x_draw_position().round();
    let y = claw_enemy.y_draw_position().round();
    let coordinates: Vec<_> = (0 ..claw_enemy.get_number_of_sides() as i32 + 1)
        .map(f64::from)
        .map(|i| (claw_enemy.draw_x(i).round(), claw_enemy.draw_y(i).round()))
        .collect();
    context.translate(center_x, center_y).unwrap();
    context.rotate(claw_enemy.get_radians()).unwrap();
    context.set_line_width(2.0);
    context.begin_path();
    context.move_to(x, y);
    for i in 0..claw_enemy.get_number_of_sides() as i32 + 1 {
        context.set_line_width(2.0);
        context.line_to(
            coordinates[i as usize].0,
            coordinates[i as usize].1,
        )
    } 
    context.set_stroke_style(color);
    context.stroke();
    context.rotate(-claw_enemy.get_radians()).unwrap();
    context.translate(-center_x, -center_y).unwrap();
}

#[wasm_bindgen]
pub fn draw_outline(space: &Space, color: &JsValue, context: &web_sys::CanvasRenderingContext2d){
    context.set_line_width(10.0);
    context.set_stroke_style(color);
    context.begin_path();
    context.stroke_rect(0.0, 0.0, space.get_width(), space.get_height());
}

#[wasm_bindgen]
pub fn draw_offscreen_canvas(space: &Space, player_ship: &PlayerShip, 
canvas: &web_sys::HtmlCanvasElement, 
offscreen_canvas: &web_sys::HtmlCanvasElement, 
primary_context: &web_sys::CanvasRenderingContext2d,
offscreen_context: &web_sys::CanvasRenderingContext2d){
    primary_context.begin_path();
    primary_context.set_transform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0).unwrap();
    primary_context.clear_rect(0.0, 0.0, space.get_width() * 2.0, space.get_height() * 2.0);
    primary_context.translate(-player_ship.get_centre_x() + canvas.width() as f64 / 2.0, 
    -player_ship.get_centre_y() + canvas.height() as f64 / 2.0).unwrap();
    primary_context.draw_image_with_html_canvas_element(offscreen_canvas, 0.0, 0.0).unwrap();
    offscreen_context.begin_path();
    offscreen_context.clear_rect(0.0, 0.0, space.get_width(), space.get_height());
}