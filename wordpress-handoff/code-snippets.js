/* WordPress Handoff — Code Snippets
   Всички блокове код за meet-bg.com WordPress темата.
   Достъпни през window.SNIPPETS[ключ]                        */

window.SNIPPETS = {

// ───────────────────────────────────────────────────────────
// 01 — FOLDER STRUCTURE
// ───────────────────────────────────────────────────────────
"folder-structure": `meetbg-theme/
├── style.css              ← Theme header + custom CSS
├── theme.json             ← Block editor settings (colors, type, spacing)
├── functions.php          ← Enqueue, CPTs, theme support
├── index.php              ← Fallback template
├── front-page.php         ← Главна страница
├── header.php             ← Глобален header (nav)
├── footer.php             ← Глобален footer
├── single-event.php       ← Страница на една вечеря
├── archive-event.php      ← Списък с всички вечери
├── page.php               ← Standard страница (About, Contact)
├── inc/
│   ├── cpt-event.php      ← Event Custom Post Type
│   ├── acf-fields.json    ← ACF полета (export от ACF UI)
│   └── enqueue.php        ← CSS/JS зареждане
├── template-parts/
│   ├── hero.php
│   ├── how-it-works.php
│   ├── events-grid.php
│   ├── event-card.php     ← reusable card
│   ├── quote.php
│   ├── why.php
│   └── countries.php
└── assets/
    ├── css/
    │   ├── tokens.css     ← всички CSS variables
    │   └── theme.css      ← компонентни стилове
    ├── js/
    │   └── main.js
    ├── img/
    └── fonts/             ← (Inter & Cormorant идват от Google)`,


// ───────────────────────────────────────────────────────────
// 02 — STYLE.CSS HEADER
// ───────────────────────────────────────────────────────────
"style-css": `/*
Theme Name: Meet-BG
Theme URI: https://meet-bg.com
Author: Teo Gopov
Description: Bulgarian social dining marketing theme. Premium, calm, invitation-driven.
Version: 1.0.0
Requires at least: 6.4
Tested up to: 6.5
Requires PHP: 8.0
License: Proprietary
Text Domain: meetbg
*/

/* Този файл е САМО header за WordPress.
   Истинските стилове са в assets/css/tokens.css и assets/css/theme.css */`,


// ───────────────────────────────────────────────────────────
// 03 — FUNCTIONS.PHP
// ───────────────────────────────────────────────────────────
"functions-php": `<?php
/**
 * Meet-BG theme functions
 */

// Theme support
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_theme_support('wp-block-styles');

    register_nav_menus([
        'primary' => __('Main nav', 'meetbg'),
        'footer-platform' => __('Footer · Платформа', 'meetbg'),
        'footer-countries' => __('Footer · Страни', 'meetbg'),
        'footer-company' => __('Footer · Компания', 'meetbg'),
    ]);
});

// Enqueue
add_action('wp_enqueue_scripts', function () {
    $v = wp_get_theme()->get('Version');

    // Google Fonts
    wp_enqueue_style(
        'meetbg-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap',
        [], null
    );

    // Tokens (variables only)
    wp_enqueue_style('meetbg-tokens', get_theme_file_uri('assets/css/tokens.css'), [], $v);

    // Theme components
    wp_enqueue_style('meetbg-theme', get_theme_file_uri('assets/css/theme.css'), ['meetbg-tokens'], $v);

    // JS (small — nav toggle, smooth scroll)
    wp_enqueue_script('meetbg-main', get_theme_file_uri('assets/js/main.js'), [], $v, true);
});

// Block editor uses the same tokens
add_action('after_setup_theme', function () {
    add_editor_style('assets/css/tokens.css');
    add_editor_style('assets/css/theme.css');
});

// Custom Post Types
require get_theme_file_path('inc/cpt-event.php');

// Helper: render an event card
function meetbg_event_card($post_id) {
    set_query_var('event_id', $post_id);
    get_template_part('template-parts/event-card');
}`,


// ───────────────────────────────────────────────────────────
// 04 — THEME.JSON (Block editor tokens)
// ───────────────────────────────────────────────────────────
"theme-json": `{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "appearanceTools": true,
    "layout": {
      "contentSize": "720px",
      "wideSize": "1200px"
    },
    "color": {
      "palette": [
        { "slug": "graphite", "name": "Graphite",   "color": "#1E1E1E" },
        { "slug": "gold",     "name": "Warm Gold",  "color": "#C9A24D" },
        { "slug": "gold-dark","name": "Gold Dark",  "color": "#A8833A" },
        { "slug": "cream",    "name": "Cream",      "color": "#F7F4EF" },
        { "slug": "cream-dark","name": "Cream Dark","color": "#EDE8E0" },
        { "slug": "white",    "name": "White",      "color": "#FFFFFF" },
        { "slug": "neutral",  "name": "Neutral",    "color": "#6B7280" }
      ],
      "custom": false,
      "customDuotone": false,
      "customGradient": false,
      "defaultPalette": false,
      "defaultGradients": false
    },
    "typography": {
      "fontFamilies": [
        {
          "slug": "display",
          "name": "Display",
          "fontFamily": "'Cormorant Garamond', Georgia, serif"
        },
        {
          "slug": "ui",
          "name": "UI",
          "fontFamily": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }
      ],
      "fontSizes": [
        { "slug": "small",  "size": "14px", "name": "Small" },
        { "slug": "medium", "size": "16px", "name": "Body" },
        { "slug": "large",  "size": "20px", "name": "Lead" },
        { "slug": "x-large","size": "32px", "name": "H3" },
        { "slug": "xx-large","size": "48px","name": "H1" }
      ],
      "customFontSize": true,
      "lineHeight": true,
      "letterSpacing": true
    },
    "spacing": {
      "spacingScale": {
        "operator": "*", "increment": 1.5, "steps": 7, "mediumStep": 1.5, "unit": "rem"
      },
      "units": ["px", "rem", "em", "%", "vw", "vh"]
    }
  },
  "styles": {
    "color": { "background": "var(--wp--preset--color--cream)", "text": "var(--wp--preset--color--graphite)" },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--ui)",
      "fontSize": "16px",
      "lineHeight": "1.65"
    },
    "elements": {
      "h1": { "typography": { "fontFamily": "var(--wp--preset--font-family--display)", "fontWeight": "500" } },
      "h2": { "typography": { "fontFamily": "var(--wp--preset--font-family--display)", "fontWeight": "500" } },
      "h3": { "typography": { "fontFamily": "var(--wp--preset--font-family--display)", "fontWeight": "400" } },
      "link": { "color": { "text": "var(--wp--preset--color--gold-dark)" } }
    }
  }
}`,


// ───────────────────────────────────────────────────────────
// 05 — HEADER.PHP
// ───────────────────────────────────────────────────────────
"header-php": `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/svg+xml" href="<?php echo get_theme_file_uri('assets/img/favicon.svg'); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<nav class="site-nav">
  <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-logo">
    <?php get_template_part('template-parts/logo-symbol'); ?>
    <span class="nav-wordmark">meet-bg</span>
  </a>

  <?php wp_nav_menu([
    'theme_location' => 'primary',
    'container' => false,
    'menu_class' => 'nav-links',
    'fallback_cb' => false,
  ]); ?>

  <div class="nav-right">
    <div class="nav-countries">
      <a href="https://meet-bg.uk" class="nav-country">🇬🇧 UK</a>
      <a href="https://meet-bg.de" class="nav-country">🇩🇪 DE</a>
      <a href="https://meet-bg.us" class="nav-country">🇺🇸 US</a>
    </div>
    <a href="https://app.meet-bg.com" class="nav-cta">Запиши се →</a>
  </div>
</nav>`,


// ───────────────────────────────────────────────────────────
// 06 — HEADER CSS
// ───────────────────────────────────────────────────────────
"header-css": `/* Site nav — sticky top bar */
.site-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(247, 244, 239, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-cream-dark);
  padding: 0 40px;
  height: 68px;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo svg { width: 32px; height: 32px; }
.nav-wordmark {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 500;
  color: var(--color-graphite);
  letter-spacing: -0.01em;
}
.nav-links {
  display: flex; gap: 28px; list-style: none;
  margin: 0; padding: 0;
}
.nav-links a {
  text-decoration: none;
  font-size: 14px; font-weight: 500;
  color: var(--color-neutral-500);
  transition: color var(--transition-fast);
}
.nav-links a:hover,
.nav-links .current-menu-item a {
  color: var(--color-graphite);
}
.nav-links .current-menu-item a {
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 2px;
}
.nav-right { display: flex; align-items: center; gap: 16px; }
.nav-countries { display: flex; gap: 8px; }
.nav-country {
  text-decoration: none;
  font-size: 12px; font-weight: 600;
  color: var(--color-neutral-400);
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid var(--color-neutral-300);
  transition: all var(--transition-fast);
}
.nav-country:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-dark);
}
.nav-cta {
  background: var(--color-graphite);
  color: white;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 13px; font-weight: 600;
  text-decoration: none;
  transition: background var(--transition-fast);
}
.nav-cta:hover { background: #2B2B2B; }

@media (max-width: 880px) {
  .site-nav { padding: 0 20px; }
  .nav-links, .nav-countries { display: none; }
}`,


// ───────────────────────────────────────────────────────────
// 07 — HERO (front-page section)
// ───────────────────────────────────────────────────────────
"hero-php": `<section class="hero">
  <div class="hero-content">
    <div class="hero-eyebrow"><?php esc_html_e('Bulgarian Social Dining', 'meetbg'); ?></div>
    <h1 class="hero-title">
      <?php esc_html_e('Вечери, които', 'meetbg'); ?><br>
      <em><?php esc_html_e('свързват хора.', 'meetbg'); ?></em>
    </h1>
    <p class="hero-body">
      <?php esc_html_e('Среща с непознати около обща маса. Само с правилните. В твоя град — или навсякъде по света.', 'meetbg'); ?>
    </p>
    <div class="hero-actions">
      <a href="<?php echo esc_url(get_post_type_archive_link('event')); ?>" class="btn-hero-primary">
        <?php esc_html_e('Резервирай място', 'meetbg'); ?>
      </a>
      <a href="#how-it-works" class="btn-hero-outline">
        <?php esc_html_e('Как работи →', 'meetbg'); ?>
      </a>
    </div>
    <div class="hero-stats">
      <?php
      $stats = get_field('homepage_stats', 'option') ?: [
        ['num' => '4',     'label' => 'Държави'],
        ['num' => '12+',   'label' => 'Града'],
        ['num' => '850+',  'label' => 'Вечери'],
        ['num' => '6 200', 'label' => 'Участника'],
      ];
      foreach ($stats as $s): ?>
        <div>
          <div class="stat-num"><?php echo esc_html($s['num']); ?></div>
          <div class="stat-label"><?php echo esc_html($s['label']); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="hero-visual">
    <?php
    // Първа предстояща вечеря
    $featured = new WP_Query([
      'post_type' => 'event',
      'posts_per_page' => 1,
      'meta_key' => 'event_date',
      'orderby' => 'meta_value',
      'order' => 'ASC',
      'meta_query' => [['key' => 'event_date', 'value' => date('Y-m-d'), 'compare' => '>=']],
    ]);
    if ($featured->have_posts()): $featured->the_post();
      get_template_part('template-parts/hero-event-card');
    endif; wp_reset_postdata();
    ?>
  </div>
</section>`,


// ───────────────────────────────────────────────────────────
// 08 — HERO CSS
// ───────────────────────────────────────────────────────────
"hero-css": `.hero {
  background: var(--color-graphite);
  color: white;
  padding: 100px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  min-height: 600px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle at 70% 50%, rgba(201,162,77,0.08) 0%, transparent 60%);
  pointer-events: none;
}
.hero-content { position: relative; z-index: 1; }
.hero-eyebrow {
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 20px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: 58px; font-weight: 300;
  line-height: 1.1; letter-spacing: -0.02em;
  margin-bottom: 24px;
}
.hero-title em { font-style: italic; color: var(--color-gold); }
.hero-body {
  font-size: 17px; line-height: 1.7;
  color: rgba(255,255,255,0.7);
  margin-bottom: 36px;
  max-width: 480px;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-hero-primary {
  background: var(--color-gold);
  color: var(--color-graphite);
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 15px; font-weight: 600;
  text-decoration: none;
  transition: background var(--transition-fast);
}
.btn-hero-primary:hover { background: var(--color-gold-dark); }
.btn-hero-outline {
  border: 1.5px solid rgba(255,255,255,0.3);
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 15px; font-weight: 500;
  text-decoration: none;
  transition: border-color var(--transition-fast);
}
.btn-hero-outline:hover { border-color: rgba(255,255,255,0.6); }
.hero-stats {
  display: flex; gap: 32px;
  margin-top: 48px;
  padding-top: 36px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.stat-num {
  font-family: var(--font-display);
  font-size: 36px; font-weight: 500;
  color: var(--color-gold);
}
.stat-label {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 2px;
}

@media (max-width: 880px) {
  .hero { grid-template-columns: 1fr; padding: 60px 20px; }
  .hero-title { font-size: 42px; }
  .hero-stats { flex-wrap: wrap; gap: 20px; }
}`,


// ───────────────────────────────────────────────────────────
// 09 — HOW IT WORKS
// ───────────────────────────────────────────────────────────
"steps-php": `<section class="section" id="how-it-works">
  <div class="container">
    <div class="section-label"><?php esc_html_e('Как работи', 'meetbg'); ?></div>
    <h2 class="section-title"><?php esc_html_e('Три стъпки до нова вечеря', 'meetbg'); ?></h2>
    <p class="section-body">
      <?php esc_html_e('Без сложности. Избираш вечеря, заплащаш такса, пристигаш. Всичко останало е осигурено.', 'meetbg'); ?>
    </p>
    <div class="steps">
      <?php
      $steps = [
        ['01', 'Избери вечеря',          'Разглеждай предстоящи вечери в твоя град — или в UK, DE, US.'],
        ['02', 'Запиши се',              'Регистрирай се с истинско име и потвърди телефон. Заплати онлайн чрез Stripe.'],
        ['03', 'Пристигни & свържи се',  'Координаторът те посреща. Маса за 10–12 души. Реален разговор.'],
      ];
      foreach ($steps as [$num, $title, $text]): ?>
        <div class="step">
          <div class="step-num"><?php echo esc_html($num); ?></div>
          <div class="step-title"><?php echo esc_html($title); ?></div>
          <p class="step-text"><?php echo esc_html($text); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>`,

"steps-css": `.section { padding: 80px 40px; }
.section .container { max-width: 1200px; margin: 0 auto; }
.section-label {
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--color-gold-dark);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display);
  font-size: 40px; font-weight: 500;
  color: var(--color-graphite);
  margin-bottom: 16px;
  line-height: 1.2;
}
.section-body {
  font-size: 17px;
  color: var(--color-neutral-500);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 48px;
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.step-num {
  font-family: var(--font-display);
  font-size: 48px; font-weight: 300;
  color: var(--color-gold);
  line-height: 1;
  margin-bottom: 12px;
}
.step-title {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 500;
  margin-bottom: 10px;
}
.step-text {
  font-size: 15px;
  color: var(--color-neutral-500);
  line-height: 1.65;
}

@media (max-width: 880px) {
  .steps { grid-template-columns: 1fr; gap: 32px; }
  .section { padding: 60px 20px; }
}`,


// ───────────────────────────────────────────────────────────
// 10 — EVENT CARD (reusable template part)
// ───────────────────────────────────────────────────────────
"event-card-php": `<?php
/**
 * template-parts/event-card.php
 * Vars expected (via set_query_var):
 *   $event_id — Event post ID. Defaults to current post in loop.
 */
$event_id = get_query_var('event_id') ?: get_the_ID();

$date     = get_field('event_date', $event_id);     // 2025-04-25 19:30
$city     = get_field('event_city', $event_id);     // Sofia
$country  = get_field('event_country', $event_id);  // BG
$venue    = get_field('event_venue', $event_id);    // DOMO Restaurant
$price    = get_field('event_price', $event_id);    // "€10"
$seats    = (int) get_field('event_seats_left', $event_id);
$capacity = (int) get_field('event_capacity', $event_id);

$seat_class = 'seats-ok';
$seat_text  = $seats . ' места';
if ($seats === 0)        { $seat_class = 'seats-full'; $seat_text = 'Пълна — Листа'; }
elseif ($seats <= 3)     { $seat_class = 'seats-low';  $seat_text = '⚡ ' . $seats . ' места'; }

$img_class = 'event-img-' . strtolower($city);
?>
<article class="event-card">
  <a href="<?php the_permalink($event_id); ?>" class="event-card-link">
    <?php if (has_post_thumbnail($event_id)): ?>
      <div class="event-img" style="background-image:url('<?php echo esc_url(get_the_post_thumbnail_url($event_id, 'large')); ?>')"></div>
    <?php else: ?>
      <div class="event-img <?php echo esc_attr($img_class); ?>">
        📍 <?php echo esc_html($city . ', ' . $country); ?>
      </div>
    <?php endif; ?>
    <div class="event-body">
      <div class="event-date"><?php echo esc_html(date_i18n('D, j M · H:i', strtotime($date))); ?></div>
      <h3 class="event-name"><?php echo esc_html(get_the_title($event_id)); ?></h3>
      <div class="event-venue"><?php echo esc_html($venue . ' · ' . $city); ?></div>
      <div class="event-foot">
        <span class="event-price"><?php echo esc_html($price); ?></span>
        <span class="event-seats <?php echo esc_attr($seat_class); ?>"><?php echo esc_html($seat_text); ?></span>
      </div>
    </div>
  </a>
  <a href="<?php the_permalink($event_id); ?>" class="event-cta <?php echo $seats === 0 ? 'is-disabled' : ''; ?>">
    <?php echo $seats === 0 ? 'Запиши в листа' : 'Резервирай място'; ?>
  </a>
</article>`,


"event-card-css": `.events-section {
  background: var(--color-cream-dark);
  padding: 80px 40px;
}
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
  max-width: 1200px;
  margin-left: auto; margin-right: auto;
}

/* Card */
.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  display: flex; flex-direction: column;
}
.event-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
.event-card-link { text-decoration: none; color: inherit; display: block; }

.event-img {
  height: 140px;
  background-size: cover;
  background-position: center;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
}
.event-img-sofia    { background: linear-gradient(160deg, #1E1E1E 0%, #2B2B2B 100%); }
.event-img-london   { background: linear-gradient(160deg, #0D1B2A 0%, #1E2D3A 100%); }
.event-img-munich,
.event-img-berlin   { background: linear-gradient(160deg, #1A1A2E 0%, #16213E 100%); }
.event-img-chicago,
.event-img-new\\\\ york { background: linear-gradient(160deg, #2D1B1B 0%, #1E1E1E 100%); }

.event-body { padding: 16px 18px; }
.event-date {
  font-size: 11px;
  color: var(--color-gold-dark);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.event-name {
  font-family: var(--font-display);
  font-size: 19px; font-weight: 500;
  color: var(--color-graphite);
  margin-bottom: 8px;
  line-height: 1.3;
}
.event-venue {
  font-size: 13px;
  color: var(--color-neutral-500);
}
.event-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 12px;
}
.event-price {
  font-size: 14px; font-weight: 600;
  color: var(--color-graphite);
}
.event-seats {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 99px;
  font-weight: 600;
}
.seats-ok   { background: #F0FDF4; color: #166534; }
.seats-low  { background: #FEF9C3; color: #854D0E; }
.seats-full { background: #FEE2E2; color: #991B1B; }

.event-cta {
  margin: 0 18px 18px;
  padding: 11px;
  background: var(--color-graphite);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px; font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-ui);
  transition: background var(--transition-fast);
}
.event-cta:hover { background: #2B2B2B; }
.event-cta.is-disabled { background: #9CA3AF; cursor: not-allowed; }

@media (max-width: 880px) {
  .events-grid { grid-template-columns: 1fr; padding: 0 20px; }
}`,


// ───────────────────────────────────────────────────────────
// 11 — QUOTE
// ───────────────────────────────────────────────────────────
"quote-php": `<section class="quote-section">
  <div class="quote-mark">"</div>
  <p class="quote-text">
    <?php echo wp_kses_post(get_field('homepage_quote', 'option') ?: 'Французите продават обещание. Ние продаваме изпълнение.'); ?>
  </p>
  <div class="quote-attr">
    <?php echo esc_html(get_field('homepage_quote_attr', 'option') ?: 'Meet-BG · Местна платформа, международна общност'); ?>
  </div>
</section>`,

"quote-css": `.quote-section {
  background: var(--color-graphite);
  padding: 80px 40px;
  text-align: center;
}
.quote-mark {
  font-family: var(--font-display);
  font-size: 80px;
  color: var(--color-gold);
  line-height: 0.8;
  margin-bottom: 16px;
}
.quote-text {
  font-family: var(--font-display);
  font-size: 32px; font-weight: 300;
  color: white;
  line-height: 1.4;
  max-width: 700px;
  margin: 0 auto 24px;
  font-style: italic;
}
.quote-attr {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}`,


// ───────────────────────────────────────────────────────────
// 12 — FOOTER.PHP
// ───────────────────────────────────────────────────────────
"footer-php": `<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <div class="logo">
        <?php get_template_part('template-parts/logo-symbol', null, ['color' => 'white']); ?>
        <span class="footer-brand-name">meet-bg</span>
      </div>
      <p class="footer-desc">
        Платформа за социални вечери за българите по света. Реални хора. Реални срещи.
      </p>
    </div>

    <div class="footer-col">
      <h4>Платформа</h4>
      <?php wp_nav_menu(['theme_location' => 'footer-platform', 'container' => false, 'fallback_cb' => false]); ?>
    </div>
    <div class="footer-col">
      <h4>Страни</h4>
      <?php wp_nav_menu(['theme_location' => 'footer-countries', 'container' => false, 'fallback_cb' => false]); ?>
    </div>
    <div class="footer-col">
      <h4>Компания</h4>
      <?php wp_nav_menu(['theme_location' => 'footer-company', 'container' => false, 'fallback_cb' => false]); ?>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-copy">© <?php echo date('Y'); ?> Meet-BG. Всички права запазени.</div>
    <div class="footer-legal">
      <a href="/privacy">Поверителност</a>
      <a href="/terms">Условия</a>
      <a href="/cookies">Бисквитки</a>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>`,

"footer-css": `.site-footer {
  background: #111;
  padding: 48px 40px 32px;
}
.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  max-width: 1200px;
  margin: 0 auto;
}
.footer-brand .logo {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 14px;
}
.footer-brand svg { width: 28px; height: 28px; }
.footer-brand-name {
  font-family: var(--font-display);
  font-size: 18px;
  color: white;
  font-weight: 500;
}
.footer-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  line-height: 1.7;
  max-width: 280px;
}
.footer-col h4 {
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 14px;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; }
.footer-col a {
  display: block;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color var(--transition-fast);
}
.footer-col a:hover { color: var(--color-gold); }

.footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); }
.footer-legal { display: flex; gap: 20px; }
.footer-legal a {
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  text-decoration: none;
}
.footer-legal a:hover { color: rgba(255,255,255,0.5); }

@media (max-width: 880px) {
  .footer-top { grid-template-columns: 1fr; gap: 28px; padding: 0 20px 32px; }
  .footer-bottom { flex-direction: column; gap: 12px; padding: 24px 20px 0; }
}`,


// ───────────────────────────────────────────────────────────
// 13 — CPT: EVENT
// ───────────────────────────────────────────────────────────
"cpt-event": `<?php
/**
 * inc/cpt-event.php — Event Custom Post Type
 */

add_action('init', function () {
    register_post_type('event', [
        'labels' => [
            'name'               => 'Вечери',
            'singular_name'      => 'Вечеря',
            'add_new'            => 'Нова вечеря',
            'add_new_item'       => 'Добави нова вечеря',
            'edit_item'          => 'Редактирай вечеря',
            'new_item'           => 'Нова вечеря',
            'view_item'          => 'Виж вечерята',
            'search_items'       => 'Търси вечеря',
            'menu_name'          => 'Вечери',
        ],
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'vecheri'],
        'menu_icon'           => 'dashicons-food',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest'        => true,   // Gutenberg + REST API
        'taxonomies'          => ['event_city', 'event_country'],
    ]);

    // Taxonomy: City
    register_taxonomy('event_city', 'event', [
        'labels' => ['name' => 'Градове', 'singular_name' => 'Град'],
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'grad'],
    ]);

    // Taxonomy: Country
    register_taxonomy('event_country', 'event', [
        'labels' => ['name' => 'Страни', 'singular_name' => 'Страна'],
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'strana'],
    ]);
});

// Flush rewrite rules on theme activation
add_action('after_switch_theme', function () {
    flush_rewrite_rules();
});`,


// ───────────────────────────────────────────────────────────
// 14 — ACF FIELDS (JSON export)
// ───────────────────────────────────────────────────────────
"acf-fields": `{
  "key": "group_event_details",
  "title": "Детайли за вечеря",
  "fields": [
    {
      "key": "field_event_date",
      "label": "Дата и час",
      "name": "event_date",
      "type": "date_time_picker",
      "display_format": "d/m/Y H:i",
      "return_format": "Y-m-d H:i:s",
      "required": 1
    },
    {
      "key": "field_event_city",
      "label": "Град",
      "name": "event_city",
      "type": "text",
      "required": 1,
      "placeholder": "Sofia"
    },
    {
      "key": "field_event_country",
      "label": "Код на страна",
      "name": "event_country",
      "type": "text",
      "required": 1,
      "placeholder": "BG / UK / DE / US",
      "maxlength": 2
    },
    {
      "key": "field_event_venue",
      "label": "Ресторант",
      "name": "event_venue",
      "type": "text",
      "required": 1,
      "placeholder": "DOMO Restaurant"
    },
    {
      "key": "field_event_address",
      "label": "Адрес",
      "name": "event_address",
      "type": "text"
    },
    {
      "key": "field_event_price",
      "label": "Цена (с валута)",
      "name": "event_price",
      "type": "text",
      "required": 1,
      "placeholder": "€10 / £18 / €17"
    },
    {
      "key": "field_event_capacity",
      "label": "Капацитет (общо места)",
      "name": "event_capacity",
      "type": "number",
      "default_value": 12,
      "min": 4, "max": 20
    },
    {
      "key": "field_event_seats_left",
      "label": "Свободни места",
      "name": "event_seats_left",
      "type": "number",
      "default_value": 12
    },
    {
      "key": "field_event_coordinator",
      "label": "Координатор",
      "name": "event_coordinator",
      "type": "text"
    },
    {
      "key": "field_event_booking_url",
      "label": "Линк за резервация (Stripe / app)",
      "name": "event_booking_url",
      "type": "url",
      "instructions": "Обикновено https://app.meet-bg.com/event/{slug}"
    }
  ],
  "location": [[{
    "param": "post_type", "operator": "==", "value": "event"
  }]]
}`,


// ───────────────────────────────────────────────────────────
// 15 — FRONT-PAGE.PHP
// ───────────────────────────────────────────────────────────
"front-page-php": `<?php
/**
 * front-page.php — Главната страница на meet-bg.com
 */
get_header(); ?>

<?php get_template_part('template-parts/hero'); ?>

<?php get_template_part('template-parts/how-it-works'); ?>

<!-- Предстоящи вечери -->
<section class="events-section">
  <div class="container">
    <div class="section-label">Предстоящи вечери</div>
    <h2 class="section-title">Намери маса в твоя град</h2>

    <div class="events-grid">
      <?php
      $q = new WP_Query([
        'post_type' => 'event',
        'posts_per_page' => 6,
        'meta_key' => 'event_date',
        'orderby' => 'meta_value',
        'order' => 'ASC',
        'meta_query' => [['key' => 'event_date', 'value' => date('Y-m-d'), 'compare' => '>=']],
      ]);
      while ($q->have_posts()): $q->the_post();
        get_template_part('template-parts/event-card');
      endwhile;
      wp_reset_postdata();
      ?>
    </div>

    <div style="text-align:center;margin-top:40px">
      <a href="<?php echo esc_url(get_post_type_archive_link('event')); ?>" class="btn-hero-outline" style="color:var(--color-graphite);border-color:var(--color-neutral-300)">
        Виж всички вечери →
      </a>
    </div>
  </div>
</section>

<?php get_template_part('template-parts/quote'); ?>
<?php get_template_part('template-parts/why'); ?>

<?php get_footer(); ?>`,


// ───────────────────────────────────────────────────────────
// 16 — SINGLE-EVENT.PHP
// ───────────────────────────────────────────────────────────
"single-event-php": `<?php
/**
 * single-event.php — Страница на една вечеря
 */
get_header();
while (have_posts()): the_post();

  $date     = get_field('event_date');
  $city     = get_field('event_city');
  $venue    = get_field('event_venue');
  $address  = get_field('event_address');
  $price    = get_field('event_price');
  $seats    = (int) get_field('event_seats_left');
  $coord    = get_field('event_coordinator');
  $book_url = get_field('event_booking_url');
?>
<article class="single-event">
  <header class="single-event-hero" <?php if (has_post_thumbnail()): ?>style="background-image:linear-gradient(rgba(30,30,30,0.6),rgba(30,30,30,0.85)),url('<?php echo esc_url(get_the_post_thumbnail_url(null, 'large')); ?>')"<?php endif; ?>>
    <div class="container">
      <div class="single-event-eyebrow"><?php echo esc_html(date_i18n('l, j F Y · H:i', strtotime($date))); ?></div>
      <h1 class="single-event-title"><?php the_title(); ?></h1>
      <div class="single-event-meta">
        <span>📍 <?php echo esc_html($venue . ', ' . $city); ?></span>
        <span>·</span>
        <span><?php echo esc_html($price); ?></span>
        <span>·</span>
        <span class="event-seats <?php echo $seats <= 3 ? 'seats-low' : 'seats-ok'; ?>">
          <?php echo $seats > 0 ? $seats . ' свободни места' : 'Пълна вечеря'; ?>
        </span>
      </div>
    </div>
  </header>

  <div class="container single-event-body">
    <div class="single-event-content"><?php the_content(); ?></div>

    <aside class="single-event-sidebar">
      <div class="booking-card">
        <div class="booking-price"><?php echo esc_html($price); ?></div>
        <div class="booking-meta">за човек · включва вечеря</div>
        <?php if ($seats > 0): ?>
          <a href="<?php echo esc_url($book_url); ?>" class="btn-hero-primary" style="display:block;text-align:center">
            Резервирай място
          </a>
        <?php else: ?>
          <a href="#waitlist" class="btn-hero-outline" style="display:block;text-align:center;color:var(--color-graphite);border-color:var(--color-neutral-300)">
            Запиши в лист на изчакване
          </a>
        <?php endif; ?>
        <div class="booking-coord">
          <strong>Координатор:</strong> <?php echo esc_html($coord); ?>
        </div>
      </div>
    </aside>
  </div>
</article>

<?php endwhile; get_footer(); ?>`,


// ───────────────────────────────────────────────────────────
// 17 — MAIN.JS (минимум — smooth scroll + mobile nav)
// ───────────────────────────────────────────────────────────
"main-js": `// Meet-BG — main.js
(function () {
  'use strict';

  // Smooth scroll за anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile nav toggle (ако добавиш hamburger бутон)
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }
})();`,


// ───────────────────────────────────────────────────────────
// 18 — SUPERHOSTING DEPLOY
// ───────────────────────────────────────────────────────────
"deploy-superhosting": `# Качване на тема в SuperHosting

## 1. Подготовка локално
\`\`\`bash
cd meetbg-theme
zip -r meetbg-theme.zip . -x "*.DS_Store" -x "node_modules/*" -x ".git/*"
\`\`\`

## 2. SuperHosting cPanel
1. Влез в cPanel: https://cp.superhosting.bg
2. **File Manager** → \`public_html/wp-content/themes/\`
3. **Upload** → избери \`meetbg-theme.zip\`
4. Right-click на zip-а → **Extract**
5. Изтрий zip-а след extract

## 3. WordPress админ
1. https://meet-bg.com/wp-admin
2. **Appearance → Themes** → активирай "Meet-BG"
3. **Plugins → Add New** инсталирай:
   - **Advanced Custom Fields** (free версия е достатъчна)
   - **WP Rocket** (платен — SuperHosting е бавен без cache)
   - **Yoast SEO**
   - **Wordfence** (security — задължително)
4. **Settings → Permalinks** → Post name → Save (flush на rewrite rules)

## 4. Импорт на ACF полета
1. В ACF → **Tools → Import** → качи \`inc/acf-fields.json\`

## 5. Менюта
**Appearance → Menus** → създай 4 менюта и назначи на:
- **Main nav** → primary
- **Footer · Платформа** → footer-platform
- **Footer · Страни** → footer-countries
- **Footer · Компания** → footer-company

## 6. WP Rocket настройки (важно за SuperHosting)
- ✅ Page caching
- ✅ Minify CSS / JS
- ✅ Combine Google Fonts
- ✅ Lazy load images
- ✅ Preload — homepage + всички event архиви

## 7. SSL
SuperHosting дава безплатен Let's Encrypt:
- cPanel → **SSL/TLS Status** → Run AutoSSL

## 8. Тестове преди live
- [ ] Homepage зарежда < 2s (provj. на gtmetrix.com)
- [ ] Event single page работи
- [ ] Менюта показват правилни линкове
- [ ] Mobile (320px, 768px) — всички секции четими
- [ ] OG image за social sharing (Yoast)
- [ ] GDPR cookie banner (Complianz plugin)

## 9. Backup
- cPanel → **Backup Wizard** → пълен backup веднъж седмично
- WP плъгин **UpdraftPlus** → автоматичен backup в Google Drive`
};

// Sugar API за UI-я
window.getSnippet = function(key) { return window.SNIPPETS[key] || '— не намерено —'; };
