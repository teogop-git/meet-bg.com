<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
          <img class="brand-symbol" src="<?php echo esc_url( MEETBG_URI . '/assets/img/logo-symbol-white.svg' ); ?>" alt="" width="32" height="32">
          <span class="brand-name">meet<span class="hyphen">-</span>bg</span>
        </a>
        <p class="footer-tag">
          <?php esc_html_e( 'Срещни български — там, където живееш. Вечери, които свързват хора.', 'meet-bg' ); ?>
        </p>
      </div>

      <div class="footer-col">
        <h4><?php esc_html_e( 'Платформа', 'meet-bg' ); ?></h4>
        <ul>
          <li><a href="<?php echo esc_url( home_url( '/vecheri/' ) ); ?>"><?php esc_html_e( 'Вечери', 'meet-bg' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/kak-raboti/' ) ); ?>"><?php esc_html_e( 'Как работи', 'meet-bg' ); ?></a></li>
          <li><a href="https://app.meet-bg.com"><?php esc_html_e( 'Приложение', 'meet-bg' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/za-restoranti/' ) ); ?>"><?php esc_html_e( 'За ресторанти', 'meet-bg' ); ?></a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4><?php esc_html_e( 'Държави', 'meet-bg' ); ?></h4>
        <ul>
          <li><a href="https://meet-bg.com">България</a></li>
          <li><a href="https://meet-bg.uk">United Kingdom</a></li>
          <li><a href="https://meet-bg.de">Deutschland</a></li>
          <li><a href="https://meet-bg.us">United States</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4><?php esc_html_e( 'Контакти', 'meet-bg' ); ?></h4>
        <ul>
          <li><a href="mailto:hello@meet-bg.com">hello@meet-bg.com</a></li>
          <li><a href="https://instagram.com/meetbg">Instagram</a></li>
          <li><a href="https://facebook.com/meetbg">Facebook</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bot">
      <div>© <?php echo esc_html( date( 'Y' ) ); ?> Meet-BG. <?php esc_html_e( 'Всички права запазени.', 'meet-bg' ); ?></div>
      <div class="footer-legal">
        <a href="<?php echo esc_url( home_url( '/poveritelnost/' ) ); ?>"><?php esc_html_e( 'Поверителност', 'meet-bg' ); ?></a>
        <a href="<?php echo esc_url( home_url( '/usloviya/' ) ); ?>"><?php esc_html_e( 'Условия', 'meet-bg' ); ?></a>
        <a href="<?php echo esc_url( home_url( '/biskvitki/' ) ); ?>"><?php esc_html_e( 'Бисквитки', 'meet-bg' ); ?></a>
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
