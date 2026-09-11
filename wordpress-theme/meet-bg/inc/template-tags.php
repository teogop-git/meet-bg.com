<?php
/**
 * Template tags
 * @package Meet-BG
 */
if ( ! defined( 'ABSPATH' ) ) exit;

/** Render an event card given a post ID (or current post). */
function meetbg_event_card( $post_id = null ) {
    $post_id   = $post_id ?: get_the_ID();
    $date      = get_field( 'event_date',        $post_id );
    $time      = get_field( 'event_time',        $post_id );
    $city      = get_field( 'event_city_label',  $post_id );
    $rest      = get_field( 'event_restaurant',  $post_id );
    $price     = get_field( 'event_price',       $post_id );
    $open      = (int) get_field( 'event_seats_open',  $post_id );
    $total     = (int) get_field( 'event_seats_total', $post_id );
    $thumb     = get_the_post_thumbnail_url( $post_id, 'event-card' );

    // Seats label
    if ( $open <= 0 ) {
        $seats_class = 'seats-full';
        $seats_label = __( 'Пълна', 'meet-bg' );
    } elseif ( $open <= 3 ) {
        $seats_class = 'seats-low';
        $seats_label = sprintf( _n( '⚡ %d място', '⚡ %d места', $open, 'meet-bg' ), $open );
    } else {
        $seats_class = 'seats-open';
        $seats_label = sprintf( _n( '%d свободно', '%d свободни', $open, 'meet-bg' ), $open );
    }

    // Formatted date — "Пет, 25 Апр"
    $date_label = '';
    if ( $date ) {
        $ts = strtotime( $date . ' ' . ( $time ?: '00:00' ) );
        $date_label = wp_date( 'D, j M', $ts );
        if ( $time ) $date_label .= ' · ' . esc_html( $time );
    }
    ?>
    <a class="event-card" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>">
      <div class="event-card-img">
        <?php if ( $thumb ) : ?>
          <img src="<?php echo esc_url( $thumb ); ?>" alt="" loading="lazy">
        <?php endif; ?>
        <?php if ( $city ) : ?>
          <span class="badge-city"><?php echo esc_html( $city ); ?></span>
        <?php endif; ?>
      </div>
      <div class="event-card-body">
        <?php if ( $date_label ) : ?>
          <div class="event-card-date"><?php echo esc_html( $date_label ); ?></div>
        <?php endif; ?>
        <h3 class="event-card-title"><?php echo esc_html( get_the_title( $post_id ) ); ?></h3>
        <?php if ( $rest ) : ?>
          <div class="event-card-restaurant"><?php echo esc_html( $rest ); ?></div>
        <?php endif; ?>
        <div class="event-card-foot">
          <span class="event-price"><?php echo esc_html( $price ?: '—' ); ?></span>
          <span class="event-seats <?php echo esc_attr( $seats_class ); ?>"><?php echo esc_html( $seats_label ); ?></span>
        </div>
      </div>
    </a>
    <?php
}

/** Get the next N upcoming events. */
function meetbg_upcoming_events( $count = 6 ) {
    return new WP_Query( [
        'post_type'      => 'event',
        'posts_per_page' => $count,
        'meta_key'       => 'event_date',
        'orderby'        => 'meta_value',
        'order'          => 'ASC',
        'meta_query'     => [ [
            'key'     => 'event_date',
            'value'   => current_time( 'Y-m-d' ),
            'compare' => '>=',
            'type'    => 'DATE',
        ] ],
    ] );
}
