<?php
/**
 * Single Event template
 * @package Meet-BG
 */
get_header();
while ( have_posts() ) : the_post();
    $date  = get_field( 'event_date' );
    $time  = get_field( 'event_time' );
    $city  = get_field( 'event_city_label' );
    $rest  = get_field( 'event_restaurant' );
    $addr  = get_field( 'event_address' );
    $price = get_field( 'event_price' );
    $open  = (int) get_field( 'event_seats_open' );
    $total = (int) get_field( 'event_seats_total' );
    $url   = get_field( 'event_booking_url' );
    $when  = $date ? wp_date( 'l, j F Y', strtotime( $date ) ) : '';
?>

<section class="event-hero">
  <div class="container event-hero-grid">
    <div class="event-hero-img">
      <?php if ( has_post_thumbnail() ) the_post_thumbnail( 'event-hero' ); ?>
    </div>
    <div class="event-hero-meta">
      <div class="eyebrow">
        <?php echo esc_html( $city ?: __( 'Вечеря', 'meet-bg' ) ); ?>
        <?php if ( $rest ) echo ' · ' . esc_html( $rest ); ?>
      </div>
      <h1 class="event-hero-title"><?php the_title(); ?></h1>

      <div>
        <?php if ( $when ) : ?>
        <div class="event-meta-row">
          <span class="event-meta-label"><?php esc_html_e( 'Кога', 'meet-bg' ); ?></span>
          <span class="event-meta-value"><?php echo esc_html( $when . ( $time ? ' · ' . $time : '' ) ); ?></span>
        </div>
        <?php endif; ?>

        <?php if ( $rest ) : ?>
        <div class="event-meta-row">
          <span class="event-meta-label"><?php esc_html_e( 'Къде', 'meet-bg' ); ?></span>
          <span class="event-meta-value"><?php echo esc_html( $rest . ( $addr ? ' — ' . $addr : '' ) ); ?></span>
        </div>
        <?php endif; ?>

        <?php if ( $price ) : ?>
        <div class="event-meta-row">
          <span class="event-meta-label"><?php esc_html_e( 'Цена', 'meet-bg' ); ?></span>
          <span class="event-meta-value"><?php echo esc_html( $price ); ?></span>
        </div>
        <?php endif; ?>

        <?php if ( $total ) : ?>
        <div class="event-meta-row">
          <span class="event-meta-label"><?php esc_html_e( 'Места', 'meet-bg' ); ?></span>
          <span class="event-meta-value">
            <?php
            if ( $open <= 0 ) {
                esc_html_e( 'Пълна — записване в листа', 'meet-bg' );
            } else {
                printf(
                    /* translators: 1: open seats, 2: total seats */
                    esc_html__( '%1$d свободни от %2$d', 'meet-bg' ),
                    $open, $total
                );
            }
            ?>
          </span>
        </div>
        <?php endif; ?>
      </div>

      <div>
        <?php if ( $open > 0 ) : ?>
          <a class="btn btn-primary" href="<?php echo esc_url( $url ?: 'https://app.meet-bg.com' ); ?>">
            <?php esc_html_e( 'Резервирай място', 'meet-bg' ); ?>
          </a>
        <?php else : ?>
          <a class="btn btn-outline" href="<?php echo esc_url( $url ?: 'https://app.meet-bg.com' ); ?>">
            <?php esc_html_e( 'Запиши се в листа', 'meet-bg' ); ?>
          </a>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<section class="event-body">
  <div class="container event-body-inner">
    <?php the_content(); ?>
  </div>
</section>

<?php endwhile; get_footer(); ?>
