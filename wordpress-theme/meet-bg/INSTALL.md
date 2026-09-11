# Meet-BG · WordPress Install Guide (SuperHosting)

**Този документ е твоят чеклист за production deploy.** Следвай стъпките по ред. Време за изпълнение: ~3–4 часа за първия домейн, ~30 мин. за всеки следващ.

---

## АРХИТЕКТУРНО РЕШЕНИЕ

| Домейн          | Език по подразб. | WordPress инсталация | База данни  |
|-----------------|-------------------|----------------------|-------------|
| meet-bg.com     | Български (bg_BG) | Отделна              | `meetbg_com`|
| meet-bg.uk      | English (en_GB)   | Отделна              | `meetbg_uk` |
| meet-bg.de      | Deutsch (de_DE)   | Отделна              | `meetbg_de` |
| meet-bg.us      | English (en_US)   | Отделна              | `meetbg_us` |

**Защо отделни инсталации, не Multisite?**
- По-проста backup стратегия (всеки сайт е независим)
- По-малък blast radius при пробив
- Лесно да продадеш / отделиш един пазар по-късно
- SuperHosting има предложения за multi-domain hosting в един cPanel акаунт

**Една и съща тема (`meet-bg`) се качва във всичките 4 инсталации.**

---

## ЧАСТ 1 · Подготовка на SuperHosting акаунта

### 1.1. Потвърди DNS
В cPanel → **Domains → Domain Information**, провери че за всеки от:
- `meet-bg.com`
- `meet-bg.uk`
- `meet-bg.de`
- `meet-bg.us`

…NS записите сочат към:
```
ns1.superhosting.bg
ns2.superhosting.bg
```

Ако някой все още сочи към регистратора (Namecheap, GoDaddy и др.) — смени NS-ите оттам. **Изчакай 24–48 часа** за DNS propagation преди да продължиш.

### 1.2. Активирай PHP 8.2
cPanel → **Select PHP Version** → избери **8.2** (или 8.3). Включи extensions: `gd`, `imagick`, `mbstring`, `curl`, `mysqli`, `intl`, `zip`, `opcache`.

### 1.3. Включи LiteSpeed Cache (SuperHosting има LSWS)
cPanel → **LiteSpeed Web Cache Manager** → Enable for all domains.

### 1.4. Генерирай SSL
cPanel → **SSL/TLS Status** → Изпълни **AutoSSL** за всичките 4 домейна + техните www. варианти. Изчакай зеленото катинарче.

### 1.5. Създай email акаунти
cPanel → **Email Accounts** → за всеки домейн:
- `hello@meet-bg.{com,uk,de,us}`
- `noreply@meet-bg.{com,uk,de,us}` (за WordPress notifications)

### 1.6. SPF + DKIM + DMARC
cPanel → **Email Deliverability** → за всеки домейн натисни **"Install the suggested record"** за SPF и DKIM. После добави DMARC ръчно в **Zone Editor**:
```
Type: TXT
Name: _dmarc.meet-bg.com
Value: v=DMARC1; p=quarantine; rua=mailto:hello@meet-bg.com
```
(повтори за .uk, .de, .us)

---

## ЧАСТ 2 · WordPress инсталация (за meet-bg.com)

### 2.1. Инсталирай чрез Softaculous
cPanel → **Softaculous Apps Installer** → **WordPress** → **Install Now**.

| Поле | Стойност |
|------|----------|
| Software Version | Latest (6.4+) |
| Choose Protocol | `https://` |
| Choose Domain | `meet-bg.com` |
| In Directory | *(empty — корен)* |
| Site Name | Meet-BG |
| Site Description | Срещни български — там, където живееш |
| Admin Username | **НЕ "admin"** — напр. `teo_admin` |
| Admin Password | (генерирай силна — 16+ символа) |
| Admin Email | hello@meet-bg.com |
| Select Language | Bulgarian |
| Database Name | `meetbg_com` |
| Table Prefix | **`mbg_`** (не дефолтния `wp_` — security) |
| Enable Auto Upgrades | ✅ Minor only |
| Backup Location | `Local` (daily) |

Натисни **Install**.

### 2.2. Първи login
Отвори `https://meet-bg.com/wp-admin` → логни се с admin credentials.

### 2.3. Settings checklist
**Settings → General**
- Site Title: `Meet-BG`
- Tagline: `Вечери, които свързват хора.`
- WordPress Address (URL): `https://meet-bg.com`
- Site Address (URL): `https://meet-bg.com`
- Site Language: **Български**
- Timezone: `Europe/Sofia`
- Date Format: `j F Y`
- Time Format: `H:i`

**Settings → Reading**
- Your homepage displays: **A static page**
  - Homepage: *(засега празно — ще създадем след качването на темата)*
- Search Engine Visibility: **Discourage** ✅ (включи това, докато не си готов)

**Settings → Permalinks**
- Common Settings: **Post name** (`/%postname%/`)

**Settings → Discussion**
- Allow people to submit comments on new posts: **Uncheck** (премиум бранд)

---

## ЧАСТ 3 · Инсталация на темата `meet-bg`

### 3.1. Качване
**Метод А (препоръчван):** zip-вай `wordpress-theme/meet-bg/` папката, после:
- Admin → **Appearance → Themes → Add New → Upload Theme** → избери `meet-bg.zip` → **Install Now** → **Activate**.

**Метод Б (FTP):** качи цялата папка `meet-bg/` в `/wp-content/themes/meet-bg/` през FTP (FileZilla — данните в cPanel → FTP Accounts).

### 3.2. Задължителни плъгини
Admin → **Plugins → Add New** → инсталирай и активирай:

| Плъгин | За какво |
|--------|---------|
| **Advanced Custom Fields** | Полета за вечерите (Date, Price, Seats…) |
| **Wordfence Security** | Защита, brute-force, malware scan |
| **WP Mail SMTP** | За да не отиват писмата в spam (важно за БГ) |
| **LiteSpeed Cache** | Кеш (SuperHosting има LSWS — задължително) |
| **Yoast SEO** или **Rank Math** | SEO, sitemap, Open Graph |
| **WP Crontrol** | Дебъгване на cron (полезно за бъдеще) |
| **Polylang** *(само на .com)* | Ако решиш да добавиш и EN на .com по-късно |

### 3.3. ACF: създай Field Group за вечерите
Admin → **ACF → Field Groups → Add New**

**Field Group Name:** `Event Details`

**Полета (точно тези slug-ове — кодът ги използва):**

| Field Label              | Field Name             | Type     | Required |
|--------------------------|------------------------|----------|----------|
| Дата                     | `event_date`           | Date Picker (ГГГГ-ММ-ДД, save+display format `Y-m-d`) | ✅ |
| Час                      | `event_time`           | Time Picker (HH:mm, save+display `H:i`) | ✅ |
| Град (etiket)            | `event_city_label`     | Text     | ✅ |
| Ресторант (име)          | `event_restaurant`     | Text     | ✅ |
| Адрес                    | `event_address`        | Text     |   |
| Цена                     | `event_price`          | Text (напр. "€10" / "€17") | ✅ |
| Свободни места           | `event_seats_open`     | Number   | ✅ |
| Общо места               | `event_seats_total`    | Number   | ✅ |
| Booking URL              | `event_booking_url`    | URL (към app.meet-bg.com) |   |

**Location Rules:** `Post Type` is equal to `Event`

Save Field Group.

> ⚠️ Темата има **fallback** на тези полета и без ACF (виж `inc/acf-fallback.php`), но ACF е по-добра редакторска среда — препоръчвам да го инсталираш.

### 3.4. WP Mail SMTP — конфигурация за SuperHosting mail
**WP Mail SMTP → Settings**
- From Email: `noreply@meet-bg.com`
- From Name: `Meet-BG`
- Mailer: **Other SMTP**
- SMTP Host: `mail.meet-bg.com` (от cPanel → Email Accounts → Connect Devices)
- Encryption: **SSL**
- SMTP Port: **465**
- Authentication: ✅
- Username: `noreply@meet-bg.com`
- Password: (паролата от email акаунта)

Send Test Email до собствения си gmail/outlook. Провери дали идва в inbox (не в spam).

---

## ЧАСТ 4 · Първоначално съдържание

### 4.1. Създай статичните страници
Admin → **Pages → Add New** → създай:

| Title          | Slug             | Template |
|----------------|------------------|----------|
| Начало         | `nachalo`        | (default) |
| Как работи     | `kak-raboti`     | (default) |
| За нас         | `za-nas`         | (default) |
| Контакти       | `kontakti`       | (default) |
| Поверителност  | `poveritelnost`  | (default) |
| Условия        | `usloviya`       | (default) |
| Бисквитки      | `biskvitki`      | (default) |
| За ресторанти  | `za-restoranti`  | (default) |

### 4.2. Задади Homepage
Admin → **Settings → Reading** → Your homepage displays: **A static page** → Homepage: **Начало**.

Темата автоматично ще използва `front-page.php` за homepage (не `page.php`) — не е нужно да слагаш съдържание в самата страница; тя е placeholder, реалният hero/sections идват от темата.

### 4.3. Менюта
Admin → **Appearance → Menus** → създай:

**Меню 1: "Главно меню"** → Location: `primary`
- Вечери (link to: post type archive `/vecheri/`)
- Как работи
- За нас
- Контакти

### 4.4. Първа вечеря (тестова)
Admin → **Вечери → Нова вечеря**
- Title: `Bulgarska Vecher — DOMO`
- Featured Image: качи снимка (1600×900 e идеално)
- Дата: `2025-05-30`
- Час: `19:30`
- Град: `Sofia`
- Ресторант: `DOMO`
- Цена: `€10`
- Свободни места: `3`
- Общо места: `10`
- Съдържание (Body): кратко описание

Publish. Отвори `https://meet-bg.com` — трябва да видиш вечерята в hero и в "Предстоящи".

---

## ЧАСТ 5 · Production hardening

### 5.1. `wp-config.php` подобрения
Влез през **File Manager** в `/public_html/wp-config.php`. Добави преди `/* That's all, stop editing! */`:

```php
// Disable file editing from admin
define( 'DISALLOW_FILE_EDIT', true );

// Force SSL admin
define( 'FORCE_SSL_ADMIN', true );

// Auto-updates: minor only
define( 'WP_AUTO_UPDATE_CORE', 'minor' );

// Increase memory if needed
define( 'WP_MEMORY_LIMIT', '256M' );

// Disable XML-RPC pingbacks (security)
define( 'XMLRPC_DISABLED', true );
```

### 5.2. `.htaccess` security
Добави в края на `/public_html/.htaccess`:

```apache
# Block xmlrpc.php
<Files xmlrpc.php>
  Order allow,deny
  Deny from all
</Files>

# Block wp-config from web
<Files wp-config.php>
  Order allow,deny
  Deny from all
</Files>

# Disable directory browsing
Options -Indexes

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp    "access plus 1 year"
  ExpiresByType image/jpeg    "access plus 1 year"
  ExpiresByType image/png     "access plus 1 year"
  ExpiresByType text/css      "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2    "access plus 1 year"
</IfModule>

# Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
```

### 5.3. Wordfence минимум
- Firewall: **Enabled and Protecting**
- Brute Force Protection: **On** (lock out after 5 failed attempts)
- 2FA: **Enable за admin потребителя си**
- Notify me at: hello@meet-bg.com

### 5.4. Backup
cPanel → **JetBackup 5** (ако SuperHosting планът ти го включва) → Schedule daily, retention 14 дни.

Алтернатива: **UpdraftPlus** плъгин → Google Drive backup → Weekly DB + Monthly files.

### 5.5. Преди да пуснеш сайта публично
- Admin → **Settings → Reading** → Discourage search engines → **UNCHECK**
- Submit sitemap в **Google Search Console**: `https://meet-bg.com/sitemap_index.xml` (Yoast/RankMath го генерира)
- Добави **Plausible** или **Umami** tracking (GDPR-friendly, не GA)
- Тествай **PageSpeed Insights**: https://pagespeed.web.dev/ — цел: 90+ Mobile

---

## ЧАСТ 6 · Повтори за meet-bg.uk / .de / .us

За всеки от останалите 3 домейна — **същите стъпки** от Част 2 нататък, но със следните разлики:

| Поле | meet-bg.uk | meet-bg.de | meet-bg.us |
|------|-----------|-----------|-----------|
| Database Name | `meetbg_uk` | `meetbg_de` | `meetbg_us` |
| Table Prefix | `mbg_uk_` | `mbg_de_` | `mbg_us_` |
| Site Language | English (UK) | Deutsch | English (US) |
| Timezone | Europe/London | Europe/Berlin | America/New_York |
| Admin Email | hello@meet-bg.uk | hello@meet-bg.de | hello@meet-bg.us |
| Date Format | `j F Y` | `j. F Y` | `F j, Y` |

**Кратък начин:** клонирай meet-bg.com инсталацията през **Softaculous → Clone** в новата директория, после смени site URL през **wp-admin → Settings → General**. Превеждаш съдържанието ръчно (или с Polylang ако искаш един WP-сайт да обслужва 2 езика).

> Когато си в .uk/.de/.us инсталация, темата автоматично разпознава домейна (виж `meetbg_country()` в `functions.php`) и активира съответния language switcher item.

---

## ЧАСТ 7 · DNS за app.meet-bg.com

App-ът ще живее на отделен subdomain. В cPanel:
1. **Domains → Create A New Domain** → `app.meet-bg.com` → Document Root: `/home/USER/apps/meet-bg-app/`
2. Засега може да е същият WordPress (MVP) — инсталирай нова WP инстанция там
3. По-късно (v2) ще го замениш с Next.js деплой през **SuperHosting Node.js** селектор

**Subdomain alias:** `app.meetme.bg` → редирект към `app.meet-bg.com` (за по-къс URL на mobile).
В .htaccess на `meetme.bg`:
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^app\.meetme\.bg$ [NC]
RewriteRule ^(.*)$ https://app.meet-bg.com/$1 [L,R=301]
```

---

## ЧАСТ 8 · Контролен списък преди launch

- [ ] Всичките 4 домейна отварят със зелено катинарче
- [ ] `https://meet-bg.com` и `https://www.meet-bg.com` водят до едно и също (canonical)
- [ ] Test event се вижда в homepage hero + в "Предстоящи"
- [ ] WP Mail SMTP test писмо отива в inbox (не spam)
- [ ] PageSpeed Insights: Mobile 85+, Desktop 95+
- [ ] Backup тест: ръчно restore на тестова страница
- [ ] Wordfence firewall: enabled
- [ ] Admin user НЕ е "admin", парола 16+ символа, 2FA enabled
- [ ] Search engine visibility: НЕ е discouraged
- [ ] Google Search Console: property added, sitemap submitted
- [ ] Plausible/Umami tracking активно
- [ ] Favicon се показва във всички browsers
- [ ] Footer: правилна година, всички линкове работят
- [ ] Country switcher: подчертава правилната държава според домейна

---

## ЧЕСТО СРЕЩАНИ ПРОБЛЕМИ

**"Темата не се показва правилно" / Бели области**
- Изчисти кеша: LiteSpeed Cache → Purge All
- Browser hard refresh: Ctrl+Shift+R

**"Permalinks не работят / 404 на single event"**
- Settings → Permalinks → натисни **Save Changes** (без да променяш — това regenerate-ва правилата)

**"Cyrillic в URL-ите се чупи"**
- Settings → Permalinks → Custom: `/%postname%/`
- В Slug полето на всеки post — въведи **транслитериран** slug (`bulgarska-vecher-domo`), не кирилски

**"Снимките са огромни и зареждат бавно"**
- Инсталирай **EWWW Image Optimizer** или **ShortPixel** → bulk optimize всички съществуващи images → convert to WebP

**"Имейлите отиват в spam"**
- Провери че SPF, DKIM, DMARC са в DNS
- Тествай на https://www.mail-tester.com (трябва 9+/10)

---

## ВРЪЗКА КЪМ APP-А (бъдеще)

Когато Next.js app-ът е готов:
- WordPress остава **content + marketing layer** (front-page, events listing, blog)
- App.meet-bg.com поема: profile, booking, messaging, payments
- WordPress експозва events през **REST API**: `https://meet-bg.com/wp-json/wp/v2/event`
- App-ът чете оттам и handle-ва booking-а

Това е причината кодът използва `event_booking_url` поле — линкът от event card-а в WP сочи към app-а за самата резервация.

---

## ПОДДРЪЖКА

- **Тема файлове:** `wp-content/themes/meet-bg/`
- **При промени в темата** — създай child theme: `wp-content/themes/meet-bg-child/` с `style.css` (Template: meet-bg) + `functions.php`. Никога не редактирай оригинала директно.
- **Update strategy:** WordPress core minor → auto. Plugins → manual преглед всяка седмица. Темата → ръчен upload на нова версия.

Готов си. Поздрави за първото си production deployment 🍷
