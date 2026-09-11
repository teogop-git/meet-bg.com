<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="<?php echo esc_url( MEETBG_URI . '/assets/img/favicon.svg' ); ?>">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Към съдържанието', 'meet-bg' ); ?></a>

<header class="site-header">
  <div class="container site-header-inner">
    <a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Meet-BG">
      <img class="brand-symbol" src="<?php echo esc_url( MEETBG_URI . '/assets/img/logo-symbol.svg' ); ?>" alt="">
      <span class="brand-name">meet<span class="hyphen">-</span>bg</span>
    </a>

    <nav class="primary-nav" aria-label="<?php esc_attr_e( 'Главно меню', 'meet-bg' ); ?>">
      <?php
      if ( has_nav_menu( 'primary' ) ) {
          wp_nav_menu( [
              'theme_location' => 'primary',
              'container'      => false,
              'menu_class'     => '',
              'depth'          => 1,
              'fallback_cb'    => false,
          ] );
      } else { ?>
        <ul>
          <li><a href="<?php echo esc_url( home_url( '/vecheri/' ) ); ?>"><?php esc_html_e( 'Вечери', 'meet-bg' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/kak-raboti/' ) ); ?>"><?php esc_html_e( 'Как работи', 'meet-bg' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/za-nas/' ) ); ?>"><?php esc_html_e( 'За нас', 'meet-bg' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/kontakti/' ) ); ?>"><?php esc_html_e( 'Контакти', 'meet-bg' ); ?></a></li>
        </ul>
      <?php } ?>

      <div class="country-switch" aria-label="<?php esc_attr_e( 'Държави', 'meet-bg' ); ?>">
        <?php $c = meetbg_country(); ?>
        <a href="https://meet-bg.com" class="<?php echo $c === 'bg' ? 'is-current' : ''; ?>">BG</a>
        <a href="https://meet-bg.uk"  class="<?php echo $c === 'uk' ? 'is-current' : ''; ?>">UK</a>
        <a href="https://meet-bg.de"  class="<?php echo $c === 'de' ? 'is-current' : ''; ?>">DE</a>
        <a href="https://meet-bg.us"  class="<?php echo $c === 'us' ? 'is-current' : ''; ?>">US</a>
      </div>

      <a class="nav-cta" href="<?php echo esc_url( home_url( '/vecheri/' ) ); ?>">
        <?php esc_html_e( 'Запиши се', 'meet-bg' ); ?> →
      </a>
    </nav>

    <button class="mobile-toggle" data-nav-toggle aria-label="Меню">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <line x1="3" y1="7"  x2="21" y2="7"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="17" x2="21" y2="17"></line>
      </svg>
    </button>
  </div>
</header>

<main id="main">
