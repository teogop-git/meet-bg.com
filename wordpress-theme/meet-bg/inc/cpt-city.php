<?php
/**
 * Custom Post Type: City (Град)
 * @package Meet-BG
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {
    register_post_type( 'city', [
        'labels' => [
            'name'          => __( 'Градове', 'meet-bg' ),
            'singular_name' => __( 'Град', 'meet-bg' ),
            'menu_name'     => __( 'Градове', 'meet-bg' ),
            'add_new_item'  => __( 'Добави град', 'meet-bg' ),
        ],
        'public'        => true,
        'show_in_rest'  => true,
        'has_archive'   => 'gradove',
        'rewrite'       => [ 'slug' => 'gradove' ],
        'supports'      => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
        'menu_icon'     => 'dashicons-location',
        'menu_position' => 7,
    ] );
} );
