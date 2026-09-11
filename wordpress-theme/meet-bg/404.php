<?php get_header(); ?>
<section class="section section-cream">
  <div class="container" style="text-align:center;max-width:640px;padding:96px 24px;">
    <div style="font-family:var(--font-display);font-size:128px;font-weight:300;color:var(--color-gold);line-height:1;">404</div>
    <h1 class="section-title" style="margin:24px auto;"><?php esc_html_e( 'Тази страница не е сервирана.', 'meet-bg' ); ?></h1>
    <p style="color:var(--color-neutral-500);font-size:18px;margin-bottom:32px;"><?php esc_html_e( 'Изглежда, че сме изгубили запазването. Върни се към масата.', 'meet-bg' ); ?></p>
    <a class="btn btn-dark" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Към началото', 'meet-bg' ); ?> →</a>
  </div>
</section>
<?php get_footer();
