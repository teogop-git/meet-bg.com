<?php
/**
 * Fallback index — blog list / default loop.
 * Used only when no more specific template exists.
 * @package Meet-BG
 */
get_header(); ?>
<section class="section section-cream">
  <div class="container">
    <?php if ( have_posts() ) : ?>
      <h1 class="section-title"><?php single_post_title(); ?></h1>
      <?php while ( have_posts() ) : the_post(); ?>
        <article style="margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid var(--color-cream-dark);">
          <h2 style="font-family:var(--font-display);font-size:30px;margin-bottom:8px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <p style="color:var(--color-neutral-500);font-size:12px;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:16px;"><?php echo esc_html( get_the_date() ); ?></p>
          <?php the_excerpt(); ?>
        </article>
      <?php endwhile; ?>
    <?php else : ?>
      <p><?php esc_html_e( 'Няма съдържание.', 'meet-bg' ); ?></p>
    <?php endif; ?>
  </div>
</section>
<?php get_footer();
