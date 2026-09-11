<?php
/**
 * Editor-side: register a reusable "Upcoming Events" block (server-rendered)
 * Use in any page via the block "Предстоящи вечери".
 * @package Meet-BG
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {
    register_block_type( 'meetbg/upcoming-events', [
        'attributes' => [
            'count' => [ 'type' => 'number', 'default' => 6 ],
        ],
        'render_callback' => function ( $attrs ) {
            $count = max( 1, min( 24, (int) ( $attrs['count'] ?? 6 ) ) );
            $q = meetbg_upcoming_events( $count );
            if ( ! $q->have_posts() ) return '<p>' . esc_html__( 'Скоро ще обявим нови вечери.', 'meet-bg' ) . '</p>';

            ob_start();
            echo '<div class="events-grid">';
            while ( $q->have_posts() ) { $q->the_post(); meetbg_event_card(); }
            echo '</div>';
            wp_reset_postdata();
            return ob_get_clean();
        },
    ] );
} );
