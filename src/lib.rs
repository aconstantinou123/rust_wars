pub mod utils;
pub mod player_ship;
pub mod projectile;
pub mod space;
pub mod square_enemy;
pub mod follow_enemy;
pub mod claw_enemy;
pub mod spiral_enemy;
pub mod laser;
pub mod enemy;
pub mod basic_enemy;
pub mod shockwave;
pub mod power_up;
pub mod canvas;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;