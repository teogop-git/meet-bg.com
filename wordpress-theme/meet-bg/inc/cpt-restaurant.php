<?php
/**
 * Custom Post Type: Restaurant (Ресторант партньор)
 * @package Meet-BG
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {
    register_post_type( 'restaurant', [
        'labels' => [
            'name'          => __( 'Ресторанти', 'meet-bg' ),
            'singular_name' => __( 'Ресторант', 'meet-bg' ),
            'menu_name'     => __( 'Ресторанти', 'meet-bg' ),
            'add_new_item'  => __( 'Добави ресторант', 'meet-bg' ),
        ],
        'public'        => true,
        'show_in_rest'  => true,
        'has_archive'   => 'restoranti',
        'rewrite'       => [ 'slug' => 'restoranti' ],
        'supports'      => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
        'menu_icon'     => 'dashicons-store',
        'menu_position' => 6,
    ] );
} );
