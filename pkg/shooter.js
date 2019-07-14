import * as wasm from './shooter_bg';

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {PlayerShip} player_ship
* @param {any} context
* @returns {void}
*/
export function draw_player_ship(player_ship, context) {
    try {
        return wasm.draw_player_ship(player_ship.ptr, addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Projectile} projectile
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_projectile(projectile, color, context) {
    try {
        return wasm.draw_projectile(projectile.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Star} star
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_star(star, color, context) {
    try {
        return wasm.draw_star(star.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {PlayerShip} player_ship
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_shockwave(player_ship, color, context) {
    try {
        return wasm.draw_shockwave(player_ship.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {PowerUp} power_up
* @param {any} context
* @returns {void}
*/
export function draw_power_up(power_up, context) {
    try {
        return wasm.draw_power_up(power_up.ptr, addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {SpiralEnemy} spiral_enemy
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_spiral_enemy(spiral_enemy, color, context) {
    try {
        return wasm.draw_spiral_enemy(spiral_enemy.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {SquareEnemy} square_enemy
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_square_enemy(square_enemy, color, context) {
    try {
        return wasm.draw_square_enemy(square_enemy.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {SquareEnemy} square_enemy
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_enemy_projectile(square_enemy, color, context) {
    try {
        return wasm.draw_enemy_projectile(square_enemy.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {BasicEnemy} basic_enemy
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_basic_enemy(basic_enemy, color, context) {
    try {
        return wasm.draw_basic_enemy(basic_enemy.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {FollowEnemy} follow_enemy
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_follow_enemy(follow_enemy, color, context) {
    try {
        return wasm.draw_follow_enemy(follow_enemy.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {ClawEnemy} claw_enemy
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_claw_enemy(claw_enemy, color, context) {
    try {
        return wasm.draw_claw_enemy(claw_enemy.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Space} space
* @param {any} color
* @param {any} context
* @returns {void}
*/
export function draw_outline(space, color, context) {
    try {
        return wasm.draw_outline(space.ptr, addBorrowedObject(color), addBorrowedObject(context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Space} space
* @param {PlayerShip} player_ship
* @param {any} canvas
* @param {any} offscreen_canvas
* @param {any} primary_context
* @param {any} offscreen_context
* @returns {void}
*/
export function draw_offscreen_canvas(space, player_ship, canvas, offscreen_canvas, primary_context, offscreen_context) {
    try {
        return wasm.draw_offscreen_canvas(space.ptr, player_ship.ptr, addBorrowedObject(canvas), addBorrowedObject(offscreen_canvas), addBorrowedObject(primary_context), addBorrowedObject(offscreen_context));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
*/
export const EnemyType = Object.freeze({ Basic:0,Claw:1,Follow:2,Spiral:3,Square:4, });
/**
*/
export const PowerUpType = Object.freeze({ ExtraFirePower:0,EnemySlowDown:1,Invincible:2,Normal:3, });
/**
*/
export class BasicEnemy {

    static __wrap(ptr) {
        const obj = Object.create(BasicEnemy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_basicenemy_free(ptr);
    }
    /**
    * @returns {Enemy}
    */
    get base() {
        return Enemy.__wrap(wasm.__wbg_get_basicenemy_base(this.ptr));
    }
    /**
    * @param {Enemy} arg0
    * @returns {void}
    */
    set base(arg0) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.__wbg_set_basicenemy_base(this.ptr, ptr0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {BasicEnemy}
    */
    static new(x, y) {
        return BasicEnemy.__wrap(wasm.basicenemy_new(x, y));
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_dead(projectile) {
        return wasm.basicenemy_check_dead(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} score_to_add
    * @returns {void}
    */
    blow_up(player_ship, score_to_add) {
        return wasm.basicenemy_blow_up(this.ptr, player_ship.ptr, score_to_add);
    }
    /**
    * @returns {void}
    */
    move_enemy() {
        return wasm.basicenemy_move_enemy(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_collision(player_ship) {
        return wasm.basicenemy_check_player_ship_collision(this.ptr, player_ship.ptr);
    }
    /**
    * @param {Shockwave} shockwave
    * @returns {void}
    */
    check_shockwave_collision(shockwave) {
        return wasm.basicenemy_check_shockwave_collision(this.ptr, shockwave.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} speed
    * @returns {void}
    */
    change_speed(player_ship, speed) {
        return wasm.basicenemy_change_speed(this.ptr, player_ship.ptr, speed);
    }
    /**
    * @returns {Enemy}
    */
    get_base() {
        return Enemy.__wrap(wasm.basicenemy_get_base(this.ptr));
    }
    /**
    * @returns {void}
    */
    set_active() {
        return wasm.basicenemy_set_active(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    is_active() {
        return (wasm.basicenemy_is_active(this.ptr)) !== 0;
    }
    /**
    * @returns {boolean}
    */
    get_added_to_array() {
        return (wasm.basicenemy_get_added_to_array(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_add_to_array() {
        return wasm.basicenemy_set_add_to_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    remove_enemy_from_array() {
        return wasm.basicenemy_remove_enemy_from_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove_false() {
        return wasm.basicenemy_set_ready_to_remove_false(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {Space} space
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    update(player_ship, space, max_x, max_y) {
        return wasm.basicenemy_update(this.ptr, player_ship.ptr, space.ptr, max_x, max_y);
    }
}
/**
*/
export class ClawEnemy {

    static __wrap(ptr) {
        const obj = Object.create(ClawEnemy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_clawenemy_free(ptr);
    }
    /**
    * @returns {Enemy}
    */
    get base() {
        return Enemy.__wrap(wasm.__wbg_get_clawenemy_base(this.ptr));
    }
    /**
    * @param {Enemy} arg0
    * @returns {void}
    */
    set base(arg0) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.__wbg_set_clawenemy_base(this.ptr, ptr0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {ClawEnemy}
    */
    static new(x, y) {
        return ClawEnemy.__wrap(wasm.clawenemy_new(x, y));
    }
    /**
    * @returns {number}
    */
    get_radians() {
        return wasm.clawenemy_get_radians(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_number_of_sides() {
        return wasm.clawenemy_get_number_of_sides(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    move_enemy(player_ship) {
        return wasm.clawenemy_move_enemy(this.ptr, player_ship.ptr);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_dead(projectile) {
        return wasm.clawenemy_check_dead(this.ptr, projectile.ptr);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    avoid_projectile(projectile) {
        return wasm.clawenemy_avoid_projectile(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} score_to_add
    * @returns {void}
    */
    blow_up(player_ship, score_to_add) {
        return wasm.clawenemy_blow_up(this.ptr, player_ship.ptr, score_to_add);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_collision(player_ship) {
        return wasm.clawenemy_check_player_ship_collision(this.ptr, player_ship.ptr);
    }
    /**
    * @returns {number}
    */
    x_draw_position() {
        return wasm.clawenemy_x_draw_position(this.ptr);
    }
    /**
    * @returns {number}
    */
    y_draw_position() {
        return wasm.clawenemy_y_draw_position(this.ptr);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    draw_x(i) {
        return wasm.clawenemy_draw_x(this.ptr, i);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    draw_y(i) {
        return wasm.clawenemy_draw_y(this.ptr, i);
    }
    /**
    * @param {Shockwave} shockwave
    * @returns {void}
    */
    check_shockwave_collision(shockwave) {
        return wasm.clawenemy_check_shockwave_collision(this.ptr, shockwave.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} speed
    * @returns {void}
    */
    change_speed(player_ship, speed) {
        return wasm.clawenemy_change_speed(this.ptr, player_ship.ptr, speed);
    }
    /**
    * @returns {boolean}
    */
    get_added_to_array() {
        return (wasm.clawenemy_get_added_to_array(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_add_to_array() {
        return wasm.clawenemy_set_add_to_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    remove_enemy_from_array() {
        return wasm.clawenemy_remove_enemy_from_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove_false() {
        return wasm.clawenemy_set_ready_to_remove_false(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {Space} space
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    update(player_ship, space, max_x, max_y) {
        return wasm.clawenemy_update(this.ptr, player_ship.ptr, space.ptr, max_x, max_y);
    }
}
/**
*/
export class Enemy {

    static __wrap(ptr) {
        const obj = Object.create(Enemy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_enemy_free(ptr);
    }
    /**
    * @param {number} size
    * @param {number} x
    * @param {number} y
    * @param {number} x_speed
    * @param {number} y_speed
    * @param {number} enemy_type
    * @returns {Enemy}
    */
    static new(size, x, y, x_speed, y_speed, enemy_type) {
        return Enemy.__wrap(wasm.enemy_new(size, x, y, x_speed, y_speed, enemy_type));
    }
    /**
    * @param {number} size
    * @returns {void}
    */
    set_size(size) {
        return wasm.enemy_set_size(this.ptr, size);
    }
    /**
    * @returns {boolean}
    */
    get_added_to_array() {
        return (wasm.enemy_get_added_to_array(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_add_to_array() {
        return wasm.enemy_set_add_to_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    remove_enemy_from_array() {
        return wasm.enemy_remove_enemy_from_array(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_size() {
        return wasm.enemy_get_size(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_enemy_type() {
        return takeObject(wasm.enemy_get_enemy_type(this.ptr));
    }
    /**
    * @returns {number}
    */
    get_x() {
        return wasm.enemy_get_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y() {
        return wasm.enemy_get_y(this.ptr);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    set_x(x) {
        return wasm.enemy_set_x(this.ptr, x);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    set_y(y) {
        return wasm.enemy_set_y(this.ptr, y);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    increment_y(y) {
        return wasm.enemy_increment_y(this.ptr, y);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    increment_x(x) {
        return wasm.enemy_increment_x(this.ptr, x);
    }
    /**
    * @returns {number}
    */
    get_x_speed() {
        return wasm.enemy_get_x_speed(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y_speed() {
        return wasm.enemy_get_y_speed(this.ptr);
    }
    /**
    * @returns {void}
    */
    reverse_x_speed() {
        return wasm.enemy_reverse_x_speed(this.ptr);
    }
    /**
    * @returns {void}
    */
    reverse_y_speed() {
        return wasm.enemy_reverse_y_speed(this.ptr);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    set_x_speed(x) {
        return wasm.enemy_set_x_speed(this.ptr, x);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    set_y_speed(y) {
        return wasm.enemy_set_y_speed(this.ptr, y);
    }
    /**
    * @returns {boolean}
    */
    is_active() {
        return (wasm.enemy_is_active(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_active() {
        return wasm.enemy_set_active(this.ptr);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove() {
        return wasm.enemy_set_ready_to_remove(this.ptr);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove_false() {
        return wasm.enemy_set_ready_to_remove_false(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    get_is_ready_to_remove() {
        return (wasm.enemy_get_is_ready_to_remove(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    move_enemy() {
        return wasm.enemy_move_enemy(this.ptr);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_dead(projectile) {
        return wasm.enemy_check_dead(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_collision(player_ship) {
        return wasm.enemy_check_player_ship_collision(this.ptr, player_ship.ptr);
    }
    /**
    * @param {Shockwave} shockwave
    * @returns {void}
    */
    check_shockwave_collision(shockwave) {
        return wasm.enemy_check_shockwave_collision(this.ptr, shockwave.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} score_to_add
    * @returns {void}
    */
    blow_up(player_ship, score_to_add) {
        return wasm.enemy_blow_up(this.ptr, player_ship.ptr, score_to_add);
    }
    /**
    * @param {Space} space
    * @param {number} original_speed
    * @param {number} original_size
    * @param {number} max_x
    * @param {number} max_y
    * @param {number} buffer
    * @returns {void}
    */
    move_and_reactivate(space, original_speed, original_size, max_x, max_y, buffer) {
        return wasm.enemy_move_and_reactivate(this.ptr, space.ptr, original_speed, original_size, max_x, max_y, buffer);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} speed
    * @returns {void}
    */
    change_speed(player_ship, speed) {
        return wasm.enemy_change_speed(this.ptr, player_ship.ptr, speed);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} window_width
    * @param {number} window_height
    * @returns {boolean}
    */
    can_draw(player_ship, window_width, window_height) {
        return (wasm.enemy_can_draw(this.ptr, player_ship.ptr, window_width, window_height)) !== 0;
    }
}
/**
*/
export class FollowEnemy {

    static __wrap(ptr) {
        const obj = Object.create(FollowEnemy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_followenemy_free(ptr);
    }
    /**
    * @returns {Enemy}
    */
    get base() {
        return Enemy.__wrap(wasm.__wbg_get_followenemy_base(this.ptr));
    }
    /**
    * @param {Enemy} arg0
    * @returns {void}
    */
    set base(arg0) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.__wbg_set_followenemy_base(this.ptr, ptr0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {FollowEnemy}
    */
    static new(x, y) {
        return FollowEnemy.__wrap(wasm.followenemy_new(x, y));
    }
    /**
    * @returns {number}
    */
    get_number_of_sides() {
        return wasm.followenemy_get_number_of_sides(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_radians() {
        return wasm.followenemy_get_radians(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    move_enemy(player_ship) {
        return wasm.followenemy_move_enemy(this.ptr, player_ship.ptr);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_dead(projectile) {
        return wasm.followenemy_check_dead(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} val
    * @returns {void}
    */
    blow_up(player_ship, val) {
        return wasm.followenemy_blow_up(this.ptr, player_ship.ptr, val);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_collision(player_ship) {
        return wasm.followenemy_check_player_ship_collision(this.ptr, player_ship.ptr);
    }
    /**
    * @returns {number}
    */
    x_draw_position() {
        return wasm.followenemy_x_draw_position(this.ptr);
    }
    /**
    * @returns {number}
    */
    y_draw_position() {
        return wasm.followenemy_y_draw_position(this.ptr);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    draw_x(i) {
        return wasm.followenemy_draw_x(this.ptr, i);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    draw_y(i) {
        return wasm.followenemy_draw_y(this.ptr, i);
    }
    /**
    * @param {Shockwave} shockwave
    * @returns {void}
    */
    check_shockwave_collision(shockwave) {
        return wasm.followenemy_check_shockwave_collision(this.ptr, shockwave.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} speed
    * @returns {void}
    */
    change_speed(player_ship, speed) {
        return wasm.followenemy_change_speed(this.ptr, player_ship.ptr, speed);
    }
    /**
    * @returns {boolean}
    */
    get_added_to_array() {
        return (wasm.followenemy_get_added_to_array(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_add_to_array() {
        return wasm.followenemy_set_add_to_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    remove_enemy_from_array() {
        return wasm.followenemy_remove_enemy_from_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove_false() {
        return wasm.followenemy_set_ready_to_remove_false(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {Space} space
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    update(player_ship, space, max_x, max_y) {
        return wasm.followenemy_update(this.ptr, player_ship.ptr, space.ptr, max_x, max_y);
    }
}
/**
*/
export class Laser {

    static __wrap(ptr) {
        const obj = Object.create(Laser.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_laser_free(ptr);
    }
    /**
    * @param {number} radians
    * @param {number} x
    * @param {number} y
    * @returns {Laser}
    */
    static new(radians, x, y) {
        return Laser.__wrap(wasm.laser_new(radians, x, y));
    }
    /**
    * @returns {number}
    */
    get_x() {
        return wasm.laser_get_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y() {
        return wasm.laser_get_y(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_shoot_timer() {
        return wasm.laser_get_shoot_timer(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    get_can_shoot() {
        return (wasm.laser_get_can_shoot(this.ptr)) !== 0;
    }
    /**
    * @param {boolean} can_shoot
    * @returns {void}
    */
    set_can_shoot(can_shoot) {
        return wasm.laser_set_can_shoot(this.ptr, can_shoot);
    }
    /**
    * @returns {number}
    */
    get_radians() {
        return wasm.laser_get_radians(this.ptr);
    }
    /**
    * @returns {void}
    */
    reset_radians() {
        return wasm.laser_reset_radians(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_laser_hit(player_ship) {
        return wasm.laser_check_laser_hit(this.ptr, player_ship.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    delay_shot(player_ship) {
        return wasm.laser_delay_shot(this.ptr, player_ship.ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {void}
    */
    align_with_enemy_position(x, y) {
        return wasm.laser_align_with_enemy_position(this.ptr, x, y);
    }
}
/**
*/
export class PlayerShip {

    static __wrap(ptr) {
        const obj = Object.create(PlayerShip.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_playership_free(ptr);
    }
    /**
    * @returns {Shockwave}
    */
    get shockwave() {
        return Shockwave.__wrap(wasm.__wbg_get_playership_shockwave(this.ptr));
    }
    /**
    * @param {Shockwave} arg0
    * @returns {void}
    */
    set shockwave(arg0) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.__wbg_set_playership_shockwave(this.ptr, ptr0);
    }
    /**
    * @param {number} centre_x
    * @param {number} centre_y
    * @returns {PlayerShip}
    */
    static new(centre_x, centre_y) {
        return PlayerShip.__wrap(wasm.playership_new(centre_x, centre_y));
    }
    /**
    * @returns {string}
    */
    get_power_up() {
        const retptr = globalArgumentPtr();
        wasm.playership_get_power_up(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {any}
    */
    get_color() {
        return takeObject(wasm.playership_get_color(this.ptr));
    }
    /**
    * @param {any} new_color
    * @returns {void}
    */
    set_color(new_color) {
        return wasm.playership_set_color(this.ptr, addHeapObject(new_color));
    }
    /**
    * @param {number} power_up
    * @returns {void}
    */
    set_power_up(power_up) {
        return wasm.playership_set_power_up(this.ptr, power_up);
    }
    /**
    * @returns {number}
    */
    get_score() {
        return wasm.playership_get_score(this.ptr);
    }
    /**
    * @param {number} points
    * @returns {void}
    */
    set_score(points) {
        return wasm.playership_set_score(this.ptr, points);
    }
    /**
    * @returns {boolean}
    */
    get_is_alive() {
        return (wasm.playership_get_is_alive(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_is_alive() {
        return wasm.playership_set_is_alive(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_health() {
        return wasm.playership_get_health(this.ptr);
    }
    /**
    * @param {number} health
    * @returns {void}
    */
    set_health(health) {
        return wasm.playership_set_health(this.ptr, health);
    }
    /**
    * @returns {number}
    */
    get_speed() {
        return wasm.playership_get_speed(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_side_count() {
        return wasm.playership_get_side_count(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_size() {
        return wasm.playership_get_size(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_rotation_degrees() {
        return wasm.playership_get_rotation_degrees(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_centre_x() {
        return wasm.playership_get_centre_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_centre_y() {
        return wasm.playership_get_centre_y(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_radians() {
        return wasm.playership_get_radians(this.ptr);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    increment_centre_x(x) {
        return wasm.playership_increment_centre_x(this.ptr, x);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    set_centre_x(x) {
        return wasm.playership_set_centre_x(this.ptr, x);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    set_centre_y(y) {
        return wasm.playership_set_centre_y(this.ptr, y);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    increment_centre_y(y) {
        return wasm.playership_increment_centre_y(this.ptr, y);
    }
    /**
    * @param {number} d
    * @returns {void}
    */
    increment_rotation_degrees(d) {
        return wasm.playership_increment_rotation_degrees(this.ptr, d);
    }
    /**
    * @returns {number}
    */
    generate_new_x() {
        return wasm.playership_generate_new_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    generate_new_y() {
        return wasm.playership_generate_new_y(this.ptr);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    draw_line_x(i) {
        return wasm.playership_draw_line_x(this.ptr, i);
    }
    /**
    * @param {number} i
    * @returns {number}
    */
    draw_line_y(i) {
        return wasm.playership_draw_line_y(this.ptr, i);
    }
    /**
    * @returns {void}
    */
    check_is_dead() {
        return wasm.playership_check_is_dead(this.ptr);
    }
    /**
    * @returns {void}
    */
    activate_shockwave() {
        return wasm.playership_activate_shockwave(this.ptr);
    }
    /**
    * @param {Space} space
    * @returns {void}
    */
    detonate(space) {
        return wasm.playership_detonate(this.ptr, space.ptr);
    }
}
/**
*/
export class PowerUp {

    static __wrap(ptr) {
        const obj = Object.create(PowerUp.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_powerup_free(ptr);
    }
    /**
    * @returns {PowerUp}
    */
    static new() {
        return PowerUp.__wrap(wasm.powerup_new());
    }
    /**
    * @returns {any}
    */
    get_color_1() {
        return takeObject(wasm.powerup_get_color_1(this.ptr));
    }
    /**
    * @returns {any}
    */
    get_color_2() {
        return takeObject(wasm.powerup_get_color_2(this.ptr));
    }
    /**
    * @returns {any}
    */
    get_color_3() {
        return takeObject(wasm.powerup_get_color_3(this.ptr));
    }
    /**
    * @returns {number}
    */
    get_x() {
        return wasm.powerup_get_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y() {
        return wasm.powerup_get_y(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    get_is_active() {
        return (wasm.powerup_get_is_active(this.ptr)) !== 0;
    }
    /**
    * @returns {number}
    */
    get_timer() {
        return wasm.powerup_get_timer(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_size() {
        return wasm.powerup_get_size(this.ptr);
    }
    /**
    * @param {Space} space
    * @returns {void}
    */
    generate_random_position(space) {
        return wasm.powerup_generate_random_position(this.ptr, space.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    power_up_countdown(player_ship) {
        return wasm.powerup_power_up_countdown(this.ptr, player_ship.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_collision_with_player_ship(player_ship) {
        return wasm.powerup_check_collision_with_player_ship(this.ptr, player_ship.ptr);
    }
    /**
    * @returns {void}
    */
    change_colors() {
        return wasm.powerup_change_colors(this.ptr);
    }
}
/**
*/
export class Projectile {

    static __wrap(ptr) {
        const obj = Object.create(Projectile.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_projectile_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} initial_angle
    * @returns {Projectile}
    */
    static new(x, y, initial_angle) {
        return Projectile.__wrap(wasm.projectile_new(x, y, initial_angle));
    }
    /**
    * @returns {number}
    */
    get_x() {
        return wasm.projectile_get_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y() {
        return wasm.projectile_get_y(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_speed() {
        return wasm.projectile_get_speed(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_initial_angle() {
        return wasm.projectile_get_initial_angle(this.ptr);
    }
    /**
    * @returns {void}
    */
    calculate_new_x() {
        return wasm.projectile_calculate_new_x(this.ptr);
    }
    /**
    * @returns {void}
    */
    calculate_new_y() {
        return wasm.projectile_calculate_new_y(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    is_active() {
        return (wasm.projectile_is_active(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_active() {
        return wasm.projectile_set_active(this.ptr);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    set_x(x) {
        return wasm.projectile_set_x(this.ptr, x);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    set_y(y) {
        return wasm.projectile_set_y(this.ptr, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} initial_angle
    * @returns {void}
    */
    reset_state(x, y, initial_angle) {
        return wasm.projectile_reset_state(this.ptr, x, y, initial_angle);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} window_width
    * @param {number} window_height
    * @returns {boolean}
    */
    can_draw(player_ship, window_width, window_height) {
        return (wasm.projectile_can_draw(this.ptr, player_ship.ptr, window_width, window_height)) !== 0;
    }
}
/**
*/
export class Shockwave {

    static __wrap(ptr) {
        const obj = Object.create(Shockwave.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_shockwave_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {Shockwave}
    */
    static new(x, y) {
        return Shockwave.__wrap(wasm.shockwave_new(x, y));
    }
    /**
    * @returns {number}
    */
    get_x() {
        return wasm.shockwave_get_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y() {
        return wasm.shockwave_get_y(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_height() {
        return wasm.shockwave_get_height(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_width() {
        return wasm.shockwave_get_width(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    get_is_active() {
        return (wasm.shockwave_get_is_active(this.ptr)) !== 0;
    }
    /**
    * @returns {number}
    */
    get_shockwaves_remaining() {
        return wasm.shockwave_get_shockwaves_remaining(this.ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {void}
    */
    activate_shockwave(x, y) {
        return wasm.shockwave_activate_shockwave(this.ptr, x, y);
    }
    /**
    * @param {Space} space
    * @returns {void}
    */
    detonate(space) {
        return wasm.shockwave_detonate(this.ptr, space.ptr);
    }
}
/**
*/
export class Space {

    static __wrap(ptr) {
        const obj = Object.create(Space.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_space_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {Space}
    */
    static new(width, height) {
        return Space.__wrap(wasm.space_new(width, height));
    }
    /**
    * @returns {number}
    */
    get_intensity_level() {
        return wasm.space_get_intensity_level(this.ptr);
    }
    /**
    * @returns {void}
    */
    increment_intensity_level() {
        return wasm.space_increment_intensity_level(this.ptr);
    }
    /**
    * @returns {void}
    */
    reset_intensity_level() {
        return wasm.space_reset_intensity_level(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_height() {
        return wasm.space_get_height(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_width() {
        return wasm.space_get_width(this.ptr);
    }
    /**
    * @param {Star} star
    * @returns {void}
    */
    check_star_out_of_bounds(star) {
        return wasm.space_check_star_out_of_bounds(this.ptr, star.ptr);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_projectile_out_of_bounds(projectile) {
        return wasm.space_check_projectile_out_of_bounds(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_out_of_bounds(player_ship) {
        return wasm.space_check_player_ship_out_of_bounds(this.ptr, player_ship.ptr);
    }
    /**
    * @param {SquareEnemy} square_enemy
    * @returns {void}
    */
    check_enemy_at_edge(square_enemy) {
        return wasm.space_check_enemy_at_edge(this.ptr, square_enemy.ptr);
    }
    /**
    * @param {ClawEnemy} claw_enemy
    * @returns {void}
    */
    check_claw_enemy_at_edge(claw_enemy) {
        return wasm.space_check_claw_enemy_at_edge(this.ptr, claw_enemy.ptr);
    }
    /**
    * @param {SpiralEnemy} spiral_enemy
    * @returns {void}
    */
    check_spiral_enemy_at_edge(spiral_enemy) {
        return wasm.space_check_spiral_enemy_at_edge(this.ptr, spiral_enemy.ptr);
    }
    /**
    * @param {BasicEnemy} basic_enemy
    * @returns {void}
    */
    check_basic_enemy_at_edge(basic_enemy) {
        return wasm.space_check_basic_enemy_at_edge(this.ptr, basic_enemy.ptr);
    }
}
/**
*/
export class SpiralEnemy {

    static __wrap(ptr) {
        const obj = Object.create(SpiralEnemy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_spiralenemy_free(ptr);
    }
    /**
    * @returns {Enemy}
    */
    get base() {
        return Enemy.__wrap(wasm.__wbg_get_spiralenemy_base(this.ptr));
    }
    /**
    * @param {Enemy} arg0
    * @returns {void}
    */
    set base(arg0) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.__wbg_set_spiralenemy_base(this.ptr, ptr0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {SpiralEnemy}
    */
    static new(x, y) {
        return SpiralEnemy.__wrap(wasm.spiralenemy_new(x, y));
    }
    /**
    * @returns {number}
    */
    get_radians() {
        return wasm.spiralenemy_get_radians(this.ptr);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_dead(projectile) {
        return wasm.spiralenemy_check_dead(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} val
    * @returns {void}
    */
    blow_up(player_ship, val) {
        return wasm.spiralenemy_blow_up(this.ptr, player_ship.ptr, val);
    }
    /**
    * @returns {void}
    */
    spiral_movement() {
        return wasm.spiralenemy_spiral_movement(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_collision(player_ship) {
        return wasm.spiralenemy_check_player_ship_collision(this.ptr, player_ship.ptr);
    }
    /**
    * @param {Shockwave} shockwave
    * @returns {void}
    */
    check_shockwave_collision(shockwave) {
        return wasm.spiralenemy_check_shockwave_collision(this.ptr, shockwave.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} speed
    * @returns {void}
    */
    change_speed(player_ship, speed) {
        return wasm.spiralenemy_change_speed(this.ptr, player_ship.ptr, speed);
    }
    /**
    * @returns {boolean}
    */
    get_added_to_array() {
        return (wasm.spiralenemy_get_added_to_array(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_add_to_array() {
        return wasm.spiralenemy_set_add_to_array(this.ptr);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    set_x(x) {
        return wasm.spiralenemy_set_x(this.ptr, x);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    set_y(y) {
        return wasm.spiralenemy_set_y(this.ptr, y);
    }
    /**
    * @returns {void}
    */
    set_active() {
        return wasm.spiralenemy_set_active(this.ptr);
    }
    /**
    * @param {number} speed
    * @returns {void}
    */
    set_speed(speed) {
        return wasm.spiralenemy_set_speed(this.ptr, speed);
    }
    /**
    * @returns {void}
    */
    remove_enemy_from_array() {
        return wasm.spiralenemy_remove_enemy_from_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove_false() {
        return wasm.spiralenemy_set_ready_to_remove_false(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {Space} space
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    update(player_ship, space, max_x, max_y) {
        return wasm.spiralenemy_update(this.ptr, player_ship.ptr, space.ptr, max_x, max_y);
    }
}
/**
*/
export class SquareEnemy {

    static __wrap(ptr) {
        const obj = Object.create(SquareEnemy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_squareenemy_free(ptr);
    }
    /**
    * @returns {Enemy}
    */
    get base() {
        return Enemy.__wrap(wasm.__wbg_get_squareenemy_base(this.ptr));
    }
    /**
    * @param {Enemy} arg0
    * @returns {void}
    */
    set base(arg0) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.__wbg_set_squareenemy_base(this.ptr, ptr0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {SquareEnemy}
    */
    static new(x, y) {
        return SquareEnemy.__wrap(wasm.squareenemy_new(x, y));
    }
    /**
    * @returns {boolean}
    */
    get_can_shoot() {
        return (wasm.squareenemy_get_can_shoot(this.ptr)) !== 0;
    }
    /**
    * @returns {number}
    */
    get_laser_x() {
        return wasm.squareenemy_get_laser_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_laser_y() {
        return wasm.squareenemy_get_laser_y(this.ptr);
    }
    /**
    * @param {number} max_x
    * @param {number} max_y
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    move_enemy(max_x, max_y, player_ship) {
        return wasm.squareenemy_move_enemy(this.ptr, max_x, max_y, player_ship.ptr);
    }
    /**
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    patrol_edges(max_x, max_y) {
        return wasm.squareenemy_patrol_edges(this.ptr, max_x, max_y);
    }
    /**
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    move_to_position(max_x, max_y) {
        return wasm.squareenemy_move_to_position(this.ptr, max_x, max_y);
    }
    /**
    * @param {Projectile} projectile
    * @returns {void}
    */
    check_dead(projectile) {
        return wasm.squareenemy_check_dead(this.ptr, projectile.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} val
    * @returns {void}
    */
    blow_up(player_ship, val) {
        return wasm.squareenemy_blow_up(this.ptr, player_ship.ptr, val);
    }
    /**
    * @param {PlayerShip} player_ship
    * @returns {void}
    */
    check_player_ship_collision(player_ship) {
        return wasm.squareenemy_check_player_ship_collision(this.ptr, player_ship.ptr);
    }
    /**
    * @param {Shockwave} shockwave
    * @returns {void}
    */
    check_shockwave_collision(shockwave) {
        return wasm.squareenemy_check_shockwave_collision(this.ptr, shockwave.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} speed
    * @returns {void}
    */
    change_speed(player_ship, speed) {
        return wasm.squareenemy_change_speed(this.ptr, player_ship.ptr, speed);
    }
    /**
    * @returns {boolean}
    */
    get_added_to_array() {
        return (wasm.squareenemy_get_added_to_array(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_add_to_array() {
        return wasm.squareenemy_set_add_to_array(this.ptr);
    }
    /**
    * @returns {void}
    */
    remove_enemy_from_array() {
        return wasm.squareenemy_remove_enemy_from_array(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {Space} space
    * @param {number} max_x
    * @param {number} max_y
    * @returns {void}
    */
    update(player_ship, space, max_x, max_y) {
        return wasm.squareenemy_update(this.ptr, player_ship.ptr, space.ptr, max_x, max_y);
    }
    /**
    * @returns {void}
    */
    set_ready_to_remove_false() {
        return wasm.squareenemy_set_ready_to_remove_false(this.ptr);
    }
}
/**
*/
export class Star {

    static __wrap(ptr) {
        const obj = Object.create(Star.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_star_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {Star}
    */
    static new(x, y) {
        return Star.__wrap(wasm.star_new(x, y));
    }
    /**
    * @returns {number}
    */
    get_x() {
        return wasm.star_get_x(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_y() {
        return wasm.star_get_y(this.ptr);
    }
    /**
    * @param {number} x
    * @returns {void}
    */
    set_x(x) {
        return wasm.star_set_x(this.ptr, x);
    }
    /**
    * @returns {void}
    */
    set_radians() {
        return wasm.star_set_radians(this.ptr);
    }
    /**
    * @param {number} y
    * @returns {void}
    */
    set_y(y) {
        return wasm.star_set_y(this.ptr, y);
    }
    /**
    * @returns {void}
    */
    calculate_new_x() {
        return wasm.star_calculate_new_x(this.ptr);
    }
    /**
    * @returns {void}
    */
    calculate_new_y() {
        return wasm.star_calculate_new_y(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    is_active() {
        return (wasm.star_is_active(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    set_active() {
        return wasm.star_set_active(this.ptr);
    }
    /**
    * @param {PlayerShip} player_ship
    * @param {number} window_width
    * @param {number} window_height
    * @returns {boolean}
    */
    can_draw(player_ship, window_width, window_height) {
        return (wasm.star_can_draw(this.ptr, player_ship.ptr, window_width, window_height)) !== 0;
    }
}

export const __wbindgen_object_clone_ref = function(arg0) {
    return addHeapObject(getObject(arg0));
};

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_json_parse = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(JSON.parse(varg0));
};

export const __wbindgen_string_new = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(varg0);
};

export const __wbg_new_59cb74e423758ede = function() {
    return addHeapObject(new Error());
};

export const __wbg_stack_558ba5917b466edd = function(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

};

export const __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
};

export const __wbg_new_3a746f2619705add = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
};

export const __wbg_call_f54d3a6dadb199ca = function(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
};

export const __wbindgen_jsval_eq = function(arg0, arg1) {
    return getObject(arg0) === getObject(arg1);
};

export const __wbg_self_ac379e780a0d8b94 = function(arg0) {
    return addHeapObject(getObject(arg0).self);
};

export const __wbg_require_6461b1e9a0d7c34a = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
};

export const __wbg_crypto_1e4302b85d4f64a2 = function(arg0) {
    return addHeapObject(getObject(arg0).crypto);
};

export const __wbindgen_is_undefined = function(arg0) {
    return getObject(arg0) === undefined;
};

export const __wbg_getRandomValues_1b4ba144162a5c9e = function(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
};

export const __wbg_getRandomValues_1ef11e888e5228e9 = function(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
};

export const __wbg_randomFillSync_1b52c8482374c55b = function(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
};

export const __widl_f_draw_image_with_html_canvas_element_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3) {
    try {
        getObject(arg0).drawImage(getObject(arg1), arg2, arg3);
    } catch (e) {
        handleError(e);
    }
};

export const __widl_f_begin_path_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).beginPath();
};

export const __widl_f_fill_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).fill();
};

export const __widl_f_stroke_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).stroke();
};

export const __widl_f_set_stroke_style_CanvasRenderingContext2D = function(arg0, arg1) {
    getObject(arg0).strokeStyle = getObject(arg1);
};

export const __widl_f_set_fill_style_CanvasRenderingContext2D = function(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
};

export const __widl_f_set_line_width_CanvasRenderingContext2D = function(arg0, arg1) {
    getObject(arg0).lineWidth = arg1;
};

export const __widl_f_arc_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    try {
        getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
    } catch (e) {
        handleError(e);
    }
};

export const __widl_f_close_path_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).closePath();
};

export const __widl_f_line_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
    getObject(arg0).lineTo(arg1, arg2);
};

export const __widl_f_move_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
    getObject(arg0).moveTo(arg1, arg2);
};

export const __widl_f_clear_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
};

export const __widl_f_stroke_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).strokeRect(arg1, arg2, arg3, arg4);
};

export const __widl_f_restore_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).restore();
};

export const __widl_f_save_CanvasRenderingContext2D = function(arg0) {
    getObject(arg0).save();
};

export const __widl_f_rotate_CanvasRenderingContext2D = function(arg0, arg1) {
    try {
        getObject(arg0).rotate(arg1);
    } catch (e) {
        handleError(e);
    }
};

export const __widl_f_set_transform_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    try {
        getObject(arg0).setTransform(arg1, arg2, arg3, arg4, arg5, arg6);
    } catch (e) {
        handleError(e);
    }
};

export const __widl_f_translate_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
    try {
        getObject(arg0).translate(arg1, arg2);
    } catch (e) {
        handleError(e);
    }
};

export const __widl_f_width_HTMLCanvasElement = function(arg0) {
    return getObject(arg0).width;
};

export const __widl_f_height_HTMLCanvasElement = function(arg0) {
    return getObject(arg0).height;
};

export const __wbindgen_debug_string = function(ret, arg0) {

    const retptr = passStringToWasm(debugString(getObject(arg0)));
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

};

export const __wbindgen_throw = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    throw new Error(varg0);
};

