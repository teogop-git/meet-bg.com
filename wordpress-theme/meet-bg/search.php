<?php
/**
 * Search results
 * @package Meet-BG
 */
get_header(); ?>
<section class="archive-head section-cream">
  <div class="container">
    <h1><?php printf( esc_html__( 'Резултати за: %s', 'meet-bg' ), '<em>' . esc_html( get_search_query() ) . '</em>' ); ?></h1>
  </div>
</section>
<section class="section section-white" style="padding-top:0;">
  <div class="container">
    <?php if ( have_posts() ) : ?>
      <div class="events-grid">
        <?php while ( have_posts() ) : the_post();
          if ( get_post_type() === 'event' ) { meetbg_event_card(); }
          else {
            echo '<a class="event-card" href="' . esc_url( get_permalink() ) . '"><div class="event-card-body"><h3 class="event-card-title">' . esc_html( get_the_title() ) . '</h3><p style="color:var(--color-neutral-500);font-size:14px;">' . esc_html( get_the_excerpt() ) . '</p></div></a>';
          }
        endwhile; ?>
      </div>
    <?php else : ?>
      <p><?php esc_html_e( 'Няма резултати.', 'meet-bg' ); ?></p>
    <?php endif; ?>
  </div>
</section>
<?php get_footer();
