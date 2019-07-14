/* tslint:disable */
/**
* @param {PlayerShip} player_ship 
* @param {any} context 
* @returns {void} 
*/
export function draw_player_ship(player_ship: PlayerShip, context: any): void;
/**
* @param {Projectile} projectile 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_projectile(projectile: Projectile, color: any, context: any): void;
/**
* @param {Star} star 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_star(star: Star, color: any, context: any): void;
/**
* @param {PlayerShip} player_ship 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_shockwave(player_ship: PlayerShip, color: any, context: any): void;
/**
* @param {PowerUp} power_up 
* @param {any} context 
* @returns {void} 
*/
export function draw_power_up(power_up: PowerUp, context: any): void;
/**
* @param {SpiralEnemy} spiral_enemy 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_spiral_enemy(spiral_enemy: SpiralEnemy, color: any, context: any): void;
/**
* @param {SquareEnemy} square_enemy 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_square_enemy(square_enemy: SquareEnemy, color: any, context: any): void;
/**
* @param {SquareEnemy} square_enemy 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_enemy_projectile(square_enemy: SquareEnemy, color: any, context: any): void;
/**
* @param {BasicEnemy} basic_enemy 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_basic_enemy(basic_enemy: BasicEnemy, color: any, context: any): void;
/**
* @param {FollowEnemy} follow_enemy 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_follow_enemy(follow_enemy: FollowEnemy, color: any, context: any): void;
/**
* @param {ClawEnemy} claw_enemy 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_claw_enemy(claw_enemy: ClawEnemy, color: any, context: any): void;
/**
* @param {Space} space 
* @param {any} color 
* @param {any} context 
* @returns {void} 
*/
export function draw_outline(space: Space, color: any, context: any): void;
/**
* @param {Space} space 
* @param {PlayerShip} player_ship 
* @param {any} canvas 
* @param {any} offscreen_canvas 
* @param {any} primary_context 
* @param {any} offscreen_context 
* @returns {void} 
*/
export function draw_offscreen_canvas(space: Space, player_ship: PlayerShip, canvas: any, offscreen_canvas: any, primary_context: any, offscreen_context: any): void;
export enum EnemyType {
  Basic,
  Claw,
  Follow,
  Spiral,
  Square,
}
/**
*/
export enum PowerUpType {
  ExtraFirePower,
  EnemySlowDown,
  Invincible,
  Normal,
}
/**
*/
/**
*/
export class BasicEnemy {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {BasicEnemy} 
*/
  static new(x: number, y: number): BasicEnemy;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_dead(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} score_to_add 
* @returns {void} 
*/
  blow_up(player_ship: PlayerShip, score_to_add: number): void;
/**
* @returns {void} 
*/
  move_enemy(): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_collision(player_ship: PlayerShip): void;
/**
* @param {Shockwave} shockwave 
* @returns {void} 
*/
  check_shockwave_collision(shockwave: Shockwave): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} speed 
* @returns {void} 
*/
  change_speed(player_ship: PlayerShip, speed: number): void;
/**
* @returns {Enemy} 
*/
  get_base(): Enemy;
/**
* @returns {void} 
*/
  set_active(): void;
/**
* @returns {boolean} 
*/
  is_active(): boolean;
/**
* @returns {boolean} 
*/
  get_added_to_array(): boolean;
/**
* @returns {void} 
*/
  set_add_to_array(): void;
/**
* @returns {void} 
*/
  remove_enemy_from_array(): void;
/**
* @returns {void} 
*/
  set_ready_to_remove_false(): void;
/**
* @param {PlayerShip} player_ship 
* @param {Space} space 
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  update(player_ship: PlayerShip, space: Space, max_x: number, max_y: number): void;
  base: Enemy;
}
/**
*/
export class ClawEnemy {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {ClawEnemy} 
*/
  static new(x: number, y: number): ClawEnemy;
/**
* @returns {number} 
*/
  get_radians(): number;
/**
* @returns {number} 
*/
  get_number_of_sides(): number;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  move_enemy(player_ship: PlayerShip): void;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_dead(projectile: Projectile): void;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  avoid_projectile(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} score_to_add 
* @returns {void} 
*/
  blow_up(player_ship: PlayerShip, score_to_add: number): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_collision(player_ship: PlayerShip): void;
/**
* @returns {number} 
*/
  x_draw_position(): number;
/**
* @returns {number} 
*/
  y_draw_position(): number;
/**
* @param {number} i 
* @returns {number} 
*/
  draw_x(i: number): number;
/**
* @param {number} i 
* @returns {number} 
*/
  draw_y(i: number): number;
/**
* @param {Shockwave} shockwave 
* @returns {void} 
*/
  check_shockwave_collision(shockwave: Shockwave): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} speed 
* @returns {void} 
*/
  change_speed(player_ship: PlayerShip, speed: number): void;
/**
* @returns {boolean} 
*/
  get_added_to_array(): boolean;
/**
* @returns {void} 
*/
  set_add_to_array(): void;
/**
* @returns {void} 
*/
  remove_enemy_from_array(): void;
/**
* @returns {void} 
*/
  set_ready_to_remove_false(): void;
/**
* @param {PlayerShip} player_ship 
* @param {Space} space 
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  update(player_ship: PlayerShip, space: Space, max_x: number, max_y: number): void;
  base: Enemy;
}
/**
*/
export class Enemy {
  free(): void;
/**
* @param {number} size 
* @param {number} x 
* @param {number} y 
* @param {number} x_speed 
* @param {number} y_speed 
* @param {number} enemy_type 
* @returns {Enemy} 
*/
  static new(size: number, x: number, y: number, x_speed: number, y_speed: number, enemy_type: number): Enemy;
/**
* @param {number} size 
* @returns {void} 
*/
  set_size(size: number): void;
/**
* @returns {boolean} 
*/
  get_added_to_array(): boolean;
/**
* @returns {void} 
*/
  set_add_to_array(): void;
/**
* @returns {void} 
*/
  remove_enemy_from_array(): void;
/**
* @returns {number} 
*/
  get_size(): number;
/**
* @returns {any} 
*/
  get_enemy_type(): any;
/**
* @returns {number} 
*/
  get_x(): number;
/**
* @returns {number} 
*/
  get_y(): number;
/**
* @param {number} x 
* @returns {void} 
*/
  set_x(x: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  set_y(y: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  increment_y(y: number): void;
/**
* @param {number} x 
* @returns {void} 
*/
  increment_x(x: number): void;
/**
* @returns {number} 
*/
  get_x_speed(): number;
/**
* @returns {number} 
*/
  get_y_speed(): number;
/**
* @returns {void} 
*/
  reverse_x_speed(): void;
/**
* @returns {void} 
*/
  reverse_y_speed(): void;
/**
* @param {number} x 
* @returns {void} 
*/
  set_x_speed(x: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  set_y_speed(y: number): void;
/**
* @returns {boolean} 
*/
  is_active(): boolean;
/**
* @returns {void} 
*/
  set_active(): void;
/**
* @returns {void} 
*/
  set_ready_to_remove(): void;
/**
* @returns {void} 
*/
  set_ready_to_remove_false(): void;
/**
* @returns {boolean} 
*/
  get_is_ready_to_remove(): boolean;
/**
* @returns {void} 
*/
  move_enemy(): void;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_dead(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_collision(player_ship: PlayerShip): void;
/**
* @param {Shockwave} shockwave 
* @returns {void} 
*/
  check_shockwave_collision(shockwave: Shockwave): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} score_to_add 
* @returns {void} 
*/
  blow_up(player_ship: PlayerShip, score_to_add: number): void;
/**
* @param {Space} space 
* @param {number} original_speed 
* @param {number} original_size 
* @param {number} max_x 
* @param {number} max_y 
* @param {number} buffer 
* @returns {void} 
*/
  move_and_reactivate(space: Space, original_speed: number, original_size: number, max_x: number, max_y: number, buffer: number): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} speed 
* @returns {void} 
*/
  change_speed(player_ship: PlayerShip, speed: number): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} window_width 
* @param {number} window_height 
* @returns {boolean} 
*/
  can_draw(player_ship: PlayerShip, window_width: number, window_height: number): boolean;
}
/**
*/
export class FollowEnemy {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {FollowEnemy} 
*/
  static new(x: number, y: number): FollowEnemy;
/**
* @returns {number} 
*/
  get_number_of_sides(): number;
/**
* @returns {number} 
*/
  get_radians(): number;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  move_enemy(player_ship: PlayerShip): void;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_dead(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} val 
* @returns {void} 
*/
  blow_up(player_ship: PlayerShip, val: number): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_collision(player_ship: PlayerShip): void;
/**
* @returns {number} 
*/
  x_draw_position(): number;
/**
* @returns {number} 
*/
  y_draw_position(): number;
/**
* @param {number} i 
* @returns {number} 
*/
  draw_x(i: number): number;
/**
* @param {number} i 
* @returns {number} 
*/
  draw_y(i: number): number;
/**
* @param {Shockwave} shockwave 
* @returns {void} 
*/
  check_shockwave_collision(shockwave: Shockwave): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} speed 
* @returns {void} 
*/
  change_speed(player_ship: PlayerShip, speed: number): void;
/**
* @returns {boolean} 
*/
  get_added_to_array(): boolean;
/**
* @returns {void} 
*/
  set_add_to_array(): void;
/**
* @returns {void} 
*/
  remove_enemy_from_array(): void;
/**
* @returns {void} 
*/
  set_ready_to_remove_false(): void;
/**
* @param {PlayerShip} player_ship 
* @param {Space} space 
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  update(player_ship: PlayerShip, space: Space, max_x: number, max_y: number): void;
  base: Enemy;
}
/**
*/
export class Laser {
  free(): void;
/**
* @param {number} radians 
* @param {number} x 
* @param {number} y 
* @returns {Laser} 
*/
  static new(radians: number, x: number, y: number): Laser;
/**
* @returns {number} 
*/
  get_x(): number;
/**
* @returns {number} 
*/
  get_y(): number;
/**
* @returns {number} 
*/
  get_shoot_timer(): number;
/**
* @returns {boolean} 
*/
  get_can_shoot(): boolean;
/**
* @param {boolean} can_shoot 
* @returns {void} 
*/
  set_can_shoot(can_shoot: boolean): void;
/**
* @returns {number} 
*/
  get_radians(): number;
/**
* @returns {void} 
*/
  reset_radians(): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_laser_hit(player_ship: PlayerShip): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  delay_shot(player_ship: PlayerShip): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {void} 
*/
  align_with_enemy_position(x: number, y: number): void;
}
/**
*/
export class PlayerShip {
  free(): void;
/**
* @param {number} centre_x 
* @param {number} centre_y 
* @returns {PlayerShip} 
*/
  static new(centre_x: number, centre_y: number): PlayerShip;
/**
* @returns {string} 
*/
  get_power_up(): string;
/**
* @returns {any} 
*/
  get_color(): any;
/**
* @param {any} new_color 
* @returns {void} 
*/
  set_color(new_color: any): void;
/**
* @param {number} power_up 
* @returns {void} 
*/
  set_power_up(power_up: number): void;
/**
* @returns {number} 
*/
  get_score(): number;
/**
* @param {number} points 
* @returns {void} 
*/
  set_score(points: number): void;
/**
* @returns {boolean} 
*/
  get_is_alive(): boolean;
/**
* @returns {void} 
*/
  set_is_alive(): void;
/**
* @returns {number} 
*/
  get_health(): number;
/**
* @param {number} health 
* @returns {void} 
*/
  set_health(health: number): void;
/**
* @returns {number} 
*/
  get_speed(): number;
/**
* @returns {number} 
*/
  get_side_count(): number;
/**
* @returns {number} 
*/
  get_size(): number;
/**
* @returns {number} 
*/
  get_rotation_degrees(): number;
/**
* @returns {number} 
*/
  get_centre_x(): number;
/**
* @returns {number} 
*/
  get_centre_y(): number;
/**
* @returns {number} 
*/
  get_radians(): number;
/**
* @param {number} x 
* @returns {void} 
*/
  increment_centre_x(x: number): void;
/**
* @param {number} x 
* @returns {void} 
*/
  set_centre_x(x: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  set_centre_y(y: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  increment_centre_y(y: number): void;
/**
* @param {number} d 
* @returns {void} 
*/
  increment_rotation_degrees(d: number): void;
/**
* @returns {number} 
*/
  generate_new_x(): number;
/**
* @returns {number} 
*/
  generate_new_y(): number;
/**
* @param {number} i 
* @returns {number} 
*/
  draw_line_x(i: number): number;
/**
* @param {number} i 
* @returns {number} 
*/
  draw_line_y(i: number): number;
/**
* @returns {void} 
*/
  check_is_dead(): void;
/**
* @returns {void} 
*/
  activate_shockwave(): void;
/**
* @param {Space} space 
* @returns {void} 
*/
  detonate(space: Space): void;
  shockwave: Shockwave;
}
/**
*/
export class PowerUp {
  free(): void;
/**
* @returns {PowerUp} 
*/
  static new(): PowerUp;
/**
* @returns {any} 
*/
  get_color_1(): any;
/**
* @returns {any} 
*/
  get_color_2(): any;
/**
* @returns {any} 
*/
  get_color_3(): any;
/**
* @returns {number} 
*/
  get_x(): number;
/**
* @returns {number} 
*/
  get_y(): number;
/**
* @returns {boolean} 
*/
  get_is_active(): boolean;
/**
* @returns {number} 
*/
  get_timer(): number;
/**
* @returns {number} 
*/
  get_size(): number;
/**
* @param {Space} space 
* @returns {void} 
*/
  generate_random_position(space: Space): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  power_up_countdown(player_ship: PlayerShip): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_collision_with_player_ship(player_ship: PlayerShip): void;
/**
* @returns {void} 
*/
  change_colors(): void;
}
/**
*/
export class Projectile {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @param {number} initial_angle 
* @returns {Projectile} 
*/
  static new(x: number, y: number, initial_angle: number): Projectile;
/**
* @returns {number} 
*/
  get_x(): number;
/**
* @returns {number} 
*/
  get_y(): number;
/**
* @returns {number} 
*/
  get_speed(): number;
/**
* @returns {number} 
*/
  get_initial_angle(): number;
/**
* @returns {void} 
*/
  calculate_new_x(): void;
/**
* @returns {void} 
*/
  calculate_new_y(): void;
/**
* @returns {boolean} 
*/
  is_active(): boolean;
/**
* @returns {void} 
*/
  set_active(): void;
/**
* @param {number} x 
* @returns {void} 
*/
  set_x(x: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  set_y(y: number): void;
/**
* @param {number} x 
* @param {number} y 
* @param {number} initial_angle 
* @returns {void} 
*/
  reset_state(x: number, y: number, initial_angle: number): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} window_width 
* @param {number} window_height 
* @returns {boolean} 
*/
  can_draw(player_ship: PlayerShip, window_width: number, window_height: number): boolean;
}
/**
*/
export class Shockwave {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {Shockwave} 
*/
  static new(x: number, y: number): Shockwave;
/**
* @returns {number} 
*/
  get_x(): number;
/**
* @returns {number} 
*/
  get_y(): number;
/**
* @returns {number} 
*/
  get_height(): number;
/**
* @returns {number} 
*/
  get_width(): number;
/**
* @returns {boolean} 
*/
  get_is_active(): boolean;
/**
* @returns {number} 
*/
  get_shockwaves_remaining(): number;
/**
* @param {number} x 
* @param {number} y 
* @returns {void} 
*/
  activate_shockwave(x: number, y: number): void;
/**
* @param {Space} space 
* @returns {void} 
*/
  detonate(space: Space): void;
}
/**
*/
export class Space {
  free(): void;
/**
* @param {number} width 
* @param {number} height 
* @returns {Space} 
*/
  static new(width: number, height: number): Space;
/**
* @returns {number} 
*/
  get_intensity_level(): number;
/**
* @returns {void} 
*/
  increment_intensity_level(): void;
/**
* @returns {void} 
*/
  reset_intensity_level(): void;
/**
* @returns {number} 
*/
  get_height(): number;
/**
* @returns {number} 
*/
  get_width(): number;
/**
* @param {Star} star 
* @returns {void} 
*/
  check_star_out_of_bounds(star: Star): void;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_projectile_out_of_bounds(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_out_of_bounds(player_ship: PlayerShip): void;
/**
* @param {SquareEnemy} square_enemy 
* @returns {void} 
*/
  check_enemy_at_edge(square_enemy: SquareEnemy): void;
/**
* @param {ClawEnemy} claw_enemy 
* @returns {void} 
*/
  check_claw_enemy_at_edge(claw_enemy: ClawEnemy): void;
/**
* @param {SpiralEnemy} spiral_enemy 
* @returns {void} 
*/
  check_spiral_enemy_at_edge(spiral_enemy: SpiralEnemy): void;
/**
* @param {BasicEnemy} basic_enemy 
* @returns {void} 
*/
  check_basic_enemy_at_edge(basic_enemy: BasicEnemy): void;
}
/**
*/
export class SpiralEnemy {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {SpiralEnemy} 
*/
  static new(x: number, y: number): SpiralEnemy;
/**
* @returns {number} 
*/
  get_radians(): number;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_dead(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} val 
* @returns {void} 
*/
  blow_up(player_ship: PlayerShip, val: number): void;
/**
* @returns {void} 
*/
  spiral_movement(): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_collision(player_ship: PlayerShip): void;
/**
* @param {Shockwave} shockwave 
* @returns {void} 
*/
  check_shockwave_collision(shockwave: Shockwave): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} speed 
* @returns {void} 
*/
  change_speed(player_ship: PlayerShip, speed: number): void;
/**
* @returns {boolean} 
*/
  get_added_to_array(): boolean;
/**
* @returns {void} 
*/
  set_add_to_array(): void;
/**
* @param {number} x 
* @returns {void} 
*/
  set_x(x: number): void;
/**
* @param {number} y 
* @returns {void} 
*/
  set_y(y: number): void;
/**
* @returns {void} 
*/
  set_active(): void;
/**
* @param {number} speed 
* @returns {void} 
*/
  set_speed(speed: number): void;
/**
* @returns {void} 
*/
  remove_enemy_from_array(): void;
/**
* @returns {void} 
*/
  set_ready_to_remove_false(): void;
/**
* @param {PlayerShip} player_ship 
* @param {Space} space 
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  update(player_ship: PlayerShip, space: Space, max_x: number, max_y: number): void;
  base: Enemy;
}
/**
*/
export class SquareEnemy {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {SquareEnemy} 
*/
  static new(x: number, y: number): SquareEnemy;
/**
* @returns {boolean} 
*/
  get_can_shoot(): boolean;
/**
* @returns {number} 
*/
  get_laser_x(): number;
/**
* @returns {number} 
*/
  get_laser_y(): number;
/**
* @param {number} max_x 
* @param {number} max_y 
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  move_enemy(max_x: number, max_y: number, player_ship: PlayerShip): void;
/**
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  patrol_edges(max_x: number, max_y: number): void;
/**
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  move_to_position(max_x: number, max_y: number): void;
/**
* @param {Projectile} projectile 
* @returns {void} 
*/
  check_dead(projectile: Projectile): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} val 
* @returns {void} 
*/
  blow_up(player_ship: PlayerShip, val: number): void;
/**
* @param {PlayerShip} player_ship 
* @returns {void} 
*/
  check_player_ship_collision(player_ship: PlayerShip): void;
/**
* @param {Shockwave} shockwave 
* @returns {void} 
*/
  check_shockwave_collision(shockwave: Shockwave): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} speed 
* @returns {void} 
*/
  change_speed(player_ship: PlayerShip, speed: number): void;
/**
* @returns {boolean} 
*/
  get_added_to_array(): boolean;
/**
* @returns {void} 
*/
  set_add_to_array(): void;
/**
* @returns {void} 
*/
  remove_enemy_from_array(): void;
/**
* @param {PlayerShip} player_ship 
* @param {Space} space 
* @param {number} max_x 
* @param {number} max_y 
* @returns {void} 
*/
  update(player_ship: PlayerShip, space: Space, max_x: number, max_y: number): void;
/**
* @returns {void} 
*/
  set_ready_to_remove_false(): void;
  base: Enemy;
}
/**
*/
export class Star {
  free(): void;
/**
* @param {number} x 
* @param {number} y 
* @returns {Star} 
*/
  static new(x: number, y: number): Star;
/**
* @returns {number} 
*/
  get_x(): number;
/**
* @returns {number} 
*/
  get_y(): number;
/**
* @param {number} x 
* @returns {void} 
*/
  set_x(x: number): void;
/**
* @returns {void} 
*/
  set_radians(): void;
/**
* @param {number} y 
* @returns {void} 
*/
  set_y(y: number): void;
/**
* @returns {void} 
*/
  calculate_new_x(): void;
/**
* @returns {void} 
*/
  calculate_new_y(): void;
/**
* @returns {boolean} 
*/
  is_active(): boolean;
/**
* @returns {void} 
*/
  set_active(): void;
/**
* @param {PlayerShip} player_ship 
* @param {number} window_width 
* @param {number} window_height 
* @returns {boolean} 
*/
  can_draw(player_ship: PlayerShip, window_width: number, window_height: number): boolean;
}
