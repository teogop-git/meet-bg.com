<?php
/**
 * Meet-BG theme bootstrap
 *
 * @package Meet-BG
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'MEETBG_VERSION', '1.1.0' );
define( 'MEETBG_DIR', get_template_directory() );
define( 'MEETBG_URI', get_template_directory_uri() );

/* -----------------------------------------------------------
 * 1. Theme support
 * --------------------------------------------------------- */
add_action( 'after_setup_theme', function () {
    load_theme_textdomain( 'meet-bg', MEETBG_DIR . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', [
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ] );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/editor.css' );

    // Image sizes
    add_image_size( 'event-card',  720, 480, true );
    add_image_size( 'event-hero', 1600, 900, true );

    // Menus
    register_nav_menus( [
        'primary'   => __( 'Главно меню',  'meet-bg' ),
        'country'   => __( 'Държави',      'meet-bg' ),
        'footer'    => __( 'Footer',       'meet-bg' ),
        'legal'     => __( 'Footer Legal', 'meet-bg' ),
    ] );
} );

/* -----------------------------------------------------------
 * 2. Asset enqueue
 * --------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', function () {
    // Google Fonts (Cormorant Garamond + Inter)
    wp_enqueue_style(
        'meetbg-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'meetbg-tokens',
        MEETBG_URI . '/assets/css/tokens.css',
        [],
        MEETBG_VERSION
    );

    wp_enqueue_style(
        'meetbg-site',
        MEETBG_URI . '/assets/css/site.css',
        [ 'meetbg-tokens' ],
        MEETBG_VERSION
    );

    wp_enqueue_script(
        'meetbg-app',
        MEETBG_URI . '/assets/js/app.js',
        [],
        MEETBG_VERSION,
        true
    );

    // Front page is a self-contained template (LAND.html port) with all
    // styles inline. Drop the shared site.css there to avoid class collisions.
    if ( is_front_page() ) {
        wp_dequeue_style( 'meetbg-site' );
    }
} );

/* -----------------------------------------------------------
 * 3. Includes
 * --------------------------------------------------------- */
require_once MEETBG_DIR . '/inc/cpt-event.php';
require_once MEETBG_DIR . '/inc/cpt-restaurant.php';
require_once MEETBG_DIR . '/inc/cpt-city.php';
require_once MEETBG_DIR . '/inc/acf-fallback.php';
require_once MEETBG_DIR . '/inc/template-tags.php';
require_once MEETBG_DIR . '/inc/blocks.php';

/* -----------------------------------------------------------
 * 4. SVG upload (safely)
 * --------------------------------------------------------- */
add_filter( 'upload_mimes', function ( $mimes ) {
    if ( current_user_can( 'manage_options' ) ) {
        $mimes['svg'] = 'image/svg+xml';
    }
    return $mimes;
} );

/* -----------------------------------------------------------
 * 5. Disable emojis (премиум бранд — не ползваме)
 * --------------------------------------------------------- */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

/* -----------------------------------------------------------
 * 6. Hide WordPress version (security)
 * --------------------------------------------------------- */
remove_action( 'wp_head', 'wp_generator' );

/* -----------------------------------------------------------
 * 7. Excerpt length / "Read more"
 * --------------------------------------------------------- */
add_filter( 'excerpt_length', fn() => 28 );
add_filter( 'excerpt_more',   fn() => '…' );

/* -----------------------------------------------------------
 * 8. Country-instance detection (meet-bg.com / .uk / .de / .us)
 *    Used to switch language defaults + show country in footer.
 * --------------------------------------------------------- */
function meetbg_country() {
    $host = strtolower( $_SERVER['HTTP_HOST'] ?? 'meet-bg.com' );
    if ( str_ends_with( $host, '.uk' ) ) return 'uk';
    if ( str_ends_with( $host, '.de' ) ) return 'de';
    if ( str_ends_with( $host, '.us' ) ) return 'us';
    return 'bg';
}
function meetbg_locale_default() {
    return [
        'bg' => 'bg_BG',
        'uk' => 'en_GB',
        'de' => 'de_DE',
        'us' => 'en_US',
    ][ meetbg_country() ];
}
