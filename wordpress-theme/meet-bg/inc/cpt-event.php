<?php
/**
 * Custom Post Type: Event (Вечеря)
 * @package Meet-BG
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {

    register_post_type( 'event', [
        'labels' => [
            'name'               => __( 'Вечери', 'meet-bg' ),
            'singular_name'      => __( 'Вечеря', 'meet-bg' ),
            'add_new'            => __( 'Нова вечеря', 'meet-bg' ),
            'add_new_item'       => __( 'Добави нова вечеря', 'meet-bg' ),
            'edit_item'          => __( 'Редактирай вечеря', 'meet-bg' ),
            'new_item'           => __( 'Нова вечеря', 'meet-bg' ),
            'view_item'          => __( 'Виж вечеря', 'meet-bg' ),
            'search_items'       => __( 'Търси вечери', 'meet-bg' ),
            'not_found'          => __( 'Няма вечери', 'meet-bg' ),
            'menu_name'          => __( 'Вечери', 'meet-bg' ),
        ],
        'public'              => true,
        'show_in_rest'        => true,                    // Gutenberg + REST API
        'has_archive'         => 'vecheri',
        'rewrite'             => [ 'slug' => 'vecheri', 'with_front' => false ],
        'supports'            => [ 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ],
        'menu_icon'           => 'dashicons-food',
        'menu_position'       => 5,
        'taxonomies'          => [ 'event_city', 'event_status' ],
    ] );

    register_taxonomy( 'event_city', 'event', [
        'labels' => [
            'name'          => __( 'Градове', 'meet-bg' ),
            'singular_name' => __( 'Град', 'meet-bg' ),
            'menu_name'     => __( 'Градове', 'meet-bg' ),
        ],
        'public'            => true,
        'show_in_rest'      => true,
        'hierarchical'      => false,
        'rewrite'           => [ 'slug' => 'grad' ],
        'show_admin_column' => true,
    ] );

    register_taxonomy( 'event_status', 'event', [
        'labels' => [
            'name'          => __( 'Статус', 'meet-bg' ),
            'singular_name' => __( 'Статус', 'meet-bg' ),
        ],
        'public'            => true,
        'show_in_rest'      => true,
        'hierarchical'      => false,
        'rewrite'           => [ 'slug' => 'status' ],
        'show_admin_column' => true,
    ] );
} );

/* Order events by event date in admin and archive */
add_action( 'pre_get_posts', function ( $q ) {
    if ( is_admin() ) return;
    if ( ! $q->is_main_query() ) return;

    if ( $q->is_post_type_archive( 'event' ) || $q->is_tax( [ 'event_city', 'event_status' ] ) ) {
        $q->set( 'meta_key', 'event_date' );
        $q->set( 'orderby', 'meta_value' );
        $q->set( 'order', 'ASC' );
        $q->set( 'posts_per_page', 12 );

        // Hide events whose date has passed
        $q->set( 'meta_query', [ [
            'key'     => 'event_date',
            'value'   => current_time( 'Y-m-d' ),
            'compare' => '>=',
            'type'    => 'DATE',
        ] ] );
    }
} );
