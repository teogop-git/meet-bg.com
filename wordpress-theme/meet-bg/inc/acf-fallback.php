<?php
/**
 * Native meta box fallback for Event fields — used WHEN
 * Advanced Custom Fields (ACF) plugin is not installed.
 *
 * If ACF is active, register the same field names via the
 * ACF UI ("event_date", "event_time", "event_city_label",
 * "event_restaurant", "event_price", "event_seats_open",
 * "event_seats_total", "event_address", "event_booking_url")
 * and these meta boxes will be ignored automatically.
 *
 * @package Meet-BG
 */
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! function_exists( 'get_field' ) ) {
    function get_field( $key, $post_id = null ) {
        return get_post_meta( $post_id ?: get_the_ID(), $key, true );
    }
}

add_action( 'add_meta_boxes', function () {
    add_meta_box(
        'meetbg_event_details',
        __( 'Детайли на вечерята', 'meet-bg' ),
        'meetbg_event_meta_box',
        'event',
        'normal',
        'high'
    );
} );

function meetbg_event_meta_box( $post ) {
    wp_nonce_field( 'meetbg_event_save', 'meetbg_event_nonce' );
    $fields = [
        'event_date'         => [ __( 'Дата (ГГГГ-ММ-ДД)', 'meet-bg' ),  'date' ],
        'event_time'         => [ __( 'Час (HH:MM)', 'meet-bg' ),         'time' ],
        'event_city_label'   => [ __( 'Град (etiket — напр. Sofia)', 'meet-bg' ), 'text' ],
        'event_restaurant'   => [ __( 'Ресторант (име)', 'meet-bg' ),     'text' ],
        'event_address'      => [ __( 'Адрес', 'meet-bg' ),               'text' ],
        'event_price'        => [ __( 'Цена (напр. €10 / €17)', 'meet-bg' ), 'text' ],
        'event_seats_open'   => [ __( 'Свободни места', 'meet-bg' ),      'number' ],
        'event_seats_total'  => [ __( 'Общо места', 'meet-bg' ),          'number' ],
        'event_booking_url'  => [ __( 'Booking URL (за app.meet-bg.com)', 'meet-bg' ), 'url' ],
    ];
    echo '<style>.meetbg-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 24px;margin-top:12px}.meetbg-grid label{display:block;font-weight:600;font-size:12px;margin-bottom:4px;color:#444}.meetbg-grid input{width:100%}</style>';
    echo '<div class="meetbg-grid">';
    foreach ( $fields as $key => [ $label, $type ] ) {
        $val = esc_attr( get_post_meta( $post->ID, $key, true ) );
        echo '<div><label for="' . esc_attr( $key ) . '">' . esc_html( $label ) . '</label>';
        echo '<input type="' . esc_attr( $type ) . '" id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" value="' . $val . '"></div>';
    }
    echo '</div>';
}

add_action( 'save_post_event', function ( $post_id ) {
    if ( ! isset( $_POST['meetbg_event_nonce'] ) || ! wp_verify_nonce( $_POST['meetbg_event_nonce'], 'meetbg_event_save' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $keys = [ 'event_date', 'event_time', 'event_city_label', 'event_restaurant', 'event_address', 'event_price', 'event_seats_open', 'event_seats_total', 'event_booking_url' ];
    foreach ( $keys as $k ) {
        if ( isset( $_POST[ $k ] ) ) {
            update_post_meta( $post_id, $k, sanitize_text_field( wp_unslash( $_POST[ $k ] ) ) );
        }
    }
} );
