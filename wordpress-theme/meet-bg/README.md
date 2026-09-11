# Meet-BG · WordPress Theme

Custom WordPress тема за **meet-bg.com** (+ .uk / .de / .us). Базирана на Meet-BG Design System.

## Какво има

- **Front page** (`front-page.php`) — landing с hero, how-it-works, upcoming events, quote, CTA
- **Event archive** (`archive-event.php`) — listing с филтри по град
- **Event single** (`single-event.php`) — детайли + резервация
- **Custom Post Types:** Event, Restaurant, City
- **Custom Taxonomies:** City, Status
- **ACF fields** за вечерите (с native fallback ако ACF не е инсталиран)
- **Country detection** (`meetbg_country()`) — автоматично разпознаване на домейна
- **Reusable block:** "Upcoming Events" (server-rendered)

## Инсталация

Виж `INSTALL.md` — пълен production deploy guide за SuperHosting.

**Кратък вариант:**
1. ZIP-вай тази папка
2. Admin → Appearance → Themes → Add New → Upload
3. Активирай
4. Инсталирай Advanced Custom Fields плъгин
5. Виж `INSTALL.md` за останалото

## Структура

```
meet-bg/
├── style.css              ← theme metadata (WP requirement)
├── functions.php          ← bootstrap, enqueue, theme support
├── header.php / footer.php
├── front-page.php         ← homepage
├── page.php               ← обикновени страници
├── index.php              ← fallback
├── 404.php / search.php
├── archive-event.php      ← /vecheri/
├── single-event.php       ← /vecheri/{slug}/
├── inc/
│   ├── cpt-event.php
│   ├── cpt-restaurant.php
│   ├── cpt-city.php
│   ├── acf-fallback.php   ← native meta box ако няма ACF
│   ├── template-tags.php  ← meetbg_event_card(), meetbg_upcoming_events()
│   └── blocks.php         ← Gutenberg block: Upcoming Events
├── assets/
│   ├── css/
│   │   ├── tokens.css     ← design system tokens
│   │   ├── site.css       ← layout + components
│   │   └── editor.css     ← Gutenberg matching styles
│   ├── js/app.js          ← mobile nav, smooth scroll
│   └── img/               ← logo SVGs
├── languages/             ← .po/.mo (бъдеще)
├── INSTALL.md             ← production deploy guide
└── README.md              ← този файл
```

## Design tokens

Всички цветове, типография, spacing, radius, shadow живеят в `assets/css/tokens.css`. Това е същият файл като в `wordpress-handoff/tokens.css`. Едно място за промени.

## Update workflow

1. Промени локално (VS Code)
2. Версия в `style.css` → bump (`Version: 1.0.1`)
3. ZIP → upload в WP admin → Replace existing

За живи production сайтове **винаги** използвай child theme за override-и. Не редактирай родителската тема директно.
