Project art for the Projects carousel.
Drop the real files here using these EXACT names (referenced by Projects/projects.json).
Until a file exists it 404s and the carousel shows a graceful fallback
(missing logo -> text title, missing background -> solid black, missing gif -> bordered placeholder box).

=====================================================================
RECOMMENDED SIZE + FORMAT (per asset type)
=====================================================================

LOGO  (*_logo.png)
  Format : PNG with TRANSPARENT background (SVG also works)
  Size   : ~800 x 400 px (displayed up to ~150px tall; 2x for retina)
  Notes  : Landscape wordmark that reads on one line. Trim empty margins.

BACKGROUND  (*_bg.jpg)
  Format : JPG (or WebP)
  Size   : 1920 x 1080 px minimum, 2560 x 1440 px ideal (16:9 landscape)
  Notes  : A dark scrim is laid over it for text legibility, so darker /
           high-contrast art works best. Keep focal point off the left third
           (that's where the logo + text sit on the starting page).

STARTING MEDIA  (*_main.gif)  -> right-hand window on the starting page
  Format : GIF or MP4 (MP4 preferred for size; set "type":"video" in JSON)
  Aspect : 16:9
  Size   : 1280 x 720 px (or 960 x 540). Keep GIFs under ~5 MB.

SHOW MEDIA  (*_army.gif, *_permadeath.gif, ...)  -> big image on show pages
  Format : GIF or MP4 (MP4 preferred; set "type":"video" in JSON)
  Aspect : 16:9 landscape
  Size   : 1280 x 720 px (or wider, e.g. 1600 x 720)
  Notes  : Displayed with object-fit: cover (fills the frame, may crop edges).
           Keep the important action roughly centered.

=====================================================================
FILE LIST
=====================================================================

Netherlords
  netherlords_logo.png       Game logo (see LOGO)
  netherlords_bg.jpg         Background (see BACKGROUND)
  netherlords_main.gif       Starting-page media (see STARTING MEDIA)
  netherlords_combat.gif     Show: "Combate soulslike visceral" (see SHOW MEDIA)
  netherlords_deck.gif       Show: "Monte seu deck. Forje seu poder."
  netherlords_loot.gif       Show: "Loot que nunca se repete"
  netherlords_world.gif      Show: "Um mundo erguido sobre a vida após a morte"

Devil Hunters
  devilhunters_logo.png       Game logo
  devilhunters_bg.jpg         Background
  devilhunters_main.gif       Starting-page media
  devilhunters_village.gif    Show: "A vila do portal"
  devilhunters_permadeath.gif Show: "Morte permanente, ranking eterno"
  devilhunters_coop.gif       Show: "Co-op por link de sala"
