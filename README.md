# Meet-BG · Design Assets

Дизайн артефакти за платформата Meet-BG — социални вечери за българи по света.

---

## Съдържание на проекта

```
Email Templates.html          ← Имейл шаблони (потвърждение + напомняне)
Invitation Card.html          ← Покана за вечеря (A5, тъмна, двуезична, QR)
tweaks-panel.jsx              ← Споделен UI компонент (Tweaks панел)

pwa/
  app/
    manifest.webmanifest      ← PWA манифест за app.meet-bg.com
    icons/                    ← Икони 72–512px + maskable
      icon-72.png
      icon-96.png
      icon-128.png
      icon-144.png
      icon-152.png
      icon-180.png            ← apple-touch-icon
      icon-192.png
      icon-384.png
      icon-512.png
      icon-512-maskable.png   ← Maskable icon (Android adaptive)
  marketing/
    manifest.webmanifest      ← PWA манифест за meet-bg.com / .uk / .de / .us
    icons/                    ← Същите размери, фон #1E1E1E
      ...
  PWA Preview.html            ← Визуален преглед + deployment checklist
```

---

## Имейл шаблони

**Файл:** `Email Templates.html`

Два шаблона, side-by-side:

| Шаблон | Тригер | Описание |
|---|---|---|
| Потвърждение | При успешна резервация | Детайли на събитието, референтен номер, checklist |
| Напомняне | 24ч. преди вечерята | Countdown, координатор, практически бележки |

**Tweaks:** език (BG/EN), гост, координатор, ресторант, дата, цена.

> ⚠️ Шаблоните са **HTML preview** за одобрение — не са директно изпращаеми имейл файлове.  
> За изпращане: копирай HTML съдържанието в ESPs като Mailchimp, Brevo (Sendinblue) или директно в WordPress plugin (напр. WP Mail SMTP + custom template).

---

## Покана за вечеря

**Файл:** `Invitation Card.html`

- Формат: A5 portrait (148×210mm), готов за печат
- Стил: тъмен фон (#1A1714), Warm Gold акценти, Cormorant Garamond
- Езици: български + английски (двуезична)
- QR код: генериран динамично от `reserveUrl` параметъра
- **Tweaks:** всички полета (заглавие, дата, ресторант, URL за резервация)

**За печат / PDF:**
1. Отвори файла в браузър
2. Натисни бутона **"Принтирай / Export PDF"**
3. В диалога избери: "Save as PDF" (Chrome) или "Microsoft Print to PDF"
4. Paper size: A5 · Margins: None · Background graphics: ✅ ON

---

## PWA пакет

### Инсталация — app.meet-bg.com (WordPress / Next.js)

**1. Качи файловете:**
```
/manifest.webmanifest         (в корена на домейна)
/icons/icon-72.png            (и всички останали икони)
/icons/icon-512-maskable.png
```

**2. Добави в `<head>` на всяка страница:**
```html
<!-- PWA: meet-bg app -->
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0D0D0D">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="meet-bg">
<link rel="apple-touch-icon" href="/icons/icon-180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">
```

**WordPress:** постави кода чрез *Appearance → Theme Editor → header.php* или plugin като **Insert Headers and Footers**.

### Инсталация — meet-bg.com (маркетинг сайт)

Същата процедура с файловете от `pwa/marketing/`. Повтори за всеки домейн (.uk, .de, .us) — манифестът е идентичен, само `theme_color` е `#1E1E1E`.

---

## Качване в SuperHosting (cPanel)

### Метод 1 — cPanel File Manager (препоръчително)

1. Влез в **SuperHosting cPanel** → **File Manager**
2. Навигирай до `public_html/` (или subdirectory на домейна)
3. Бутон **Upload** → качи `.webmanifest` и папката `icons/`
4. Провери permissions: файловете трябва да са `644`, папките `755`

> **MIME тип за манифеста:** SuperHosting cPanel → **MIME Types** → добави:  
> Extension: `webmanifest` · MIME type: `application/manifest+json`

### Метод 2 — FTP с FileZilla

```
Host:     ftp.meet-bg.com        (или IP от cPanel → FTP Accounts)
Username: твоят cPanel username
Password: твоята cPanel парола
Port:     21  (или 22 за SFTP)
```

1. Свържи се
2. Плъзни `manifest.webmanifest` и `icons/` в `public_html/`

### Метод 3 — SSH (ако е активиран)

```bash
scp -r pwa/app/icons/ user@meet-bg.com:public_html/icons/
scp pwa/app/manifest.webmanifest user@meet-bg.com:public_html/
```

### Проверка след качване

Отвори Chrome DevTools → **Application** → **Manifest**  
Трябва да виждаш: ✅ иконите, ✅ `name`, ✅ `theme_color`

---

## Цветова палитра (референция)

| Токен | Hex | Употреба |
|---|---|---|
| Graphite Black | `#1E1E1E` | Маркетинг фон, тъмни секции |
| Warm Gold | `#C9A24D` | Акценти, CTA, икони |
| Cream White | `#F7F4EF` | Светъл фон |
| App Orange | `#F47A20` | App акцент (само в приложението) |
| App BG | `#0D0D0D` | Тъмен app фон |

---

## Типография

| Роля | Семейство | Тегло |
|---|---|---|
| Display / Headlines | Cormorant Garamond | 300–500 |
| UI / Body | Inter | 400–600 |

Google Fonts: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap`

---

*Meet-BG Design System · 2025*
