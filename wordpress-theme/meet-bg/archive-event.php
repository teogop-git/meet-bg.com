<?php
/**
 * Archive: Events listing — /vecheri/
 * @package Meet-BG
 */
get_header(); ?>

<section class="archive-head section-cream">
  <div class="container">
    <h1><?php esc_html_e( 'Предстоящи вечери', 'meet-bg' ); ?></h1>
    <p><?php esc_html_e( 'Куриран списък — само вечери, в които има свободни места.', 'meet-bg' ); ?></p>

    <div class="archive-filters">
      <a href="<?php echo esc_url( get_post_type_archive_link( 'event' ) ); ?>" class="filter-pill <?php echo ! is_tax() ? 'is-active' : ''; ?>"><?php esc_html_e( 'Всички', 'meet-bg' ); ?></a>
      <?php
      $cities = get_terms( [ 'taxonomy' => 'event_city', 'hide_empty' => true ] );
      if ( ! is_wp_error( $cities ) ) {
          foreach ( $cities as $city ) {
              $active = is_tax( 'event_city', $city->slug ) ? 'is-active' : '';
              echo '<a class="filter-pill ' . esc_attr( $active ) . '" href="' . esc_url( get_term_link( $city ) ) . '">' . esc_html( $city->name ) . '</a>';
          }
      }
      ?>
    </div>
  </div>
</section>

<section class="section section-white" style="padding-top:0;">
  <div class="container">
    <?php if ( have_posts() ) : ?>
      <div class="events-grid">
        <?php while ( have_posts() ) : the_post(); meetbg_event_card(); endwhile; ?>
      </div>
      <div class="pagination">
        <?php echo paginate_links( [ 'mid_size' => 1 ] ); ?>
      </div>
    <?php else : ?>
      <p style="font-size:17px;color:var(--color-neutral-500);"><?php esc_html_e( 'Скоро ще обявим нови вечери.', 'meet-bg' ); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer();
