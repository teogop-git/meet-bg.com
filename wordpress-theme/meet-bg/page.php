<?php
/**
 * Standard page template
 * @package Meet-BG
 */
get_header(); ?>
<section class="section section-cream">
  <div class="container" style="max-width:820px;">
    <?php while ( have_posts() ) : the_post(); ?>
      <h1 class="section-title" style="margin-bottom:32px;"><?php the_title(); ?></h1>
      <div class="page-content"><?php the_content(); ?></div>
    <?php endwhile; ?>
  </div>
</section>
<?php get_footer();
