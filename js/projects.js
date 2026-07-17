// Projects Carousel — inline renderer
// Replaces the old iframe (projects-carousel.html) + carousel-loader.js.
// Reads Projects/projects.json and renders one starting slide + N show slides
// per project into a single sequential carousel inside #projects-carousel.

(function () {
    'use strict';

    var MOUNT_ID = 'projects-carousel';
    var DATA_URL = 'Projects/projects.json';
    var SWIPE_THRESHOLD = 40; // px

    var REDUCE = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Official store badges: colored image with a text fallback on 404.
    // Drop the real badge art into imgs/badges/ using these filenames.
    var STORE_BADGES = {
        steam:       { img: 'imgs/badges/steam.png',       label: 'Steam' },
        epic:        { img: 'imgs/badges/epic.png',        label: 'Epic Games' },
        playstation: { img: 'imgs/badges/playstation.png', label: 'PlayStation' },
        xbox:        { img: 'imgs/badges/xbox.png',        label: 'Xbox' },
        nintendo:    { img: 'imgs/badges/nintendo.png',    label: 'Nintendo eShop' }
    };

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // --- i18n ----------------------------------------------------------------

    function lang() {
        return (window.i18n && window.i18n.lang) || 'en';
    }

    // UI string from the i18n table, with a hard-coded fallback.
    function T(key, fallback) {
        return (window.i18n && window.i18n.t) ? window.i18n.t(key) : fallback;
    }

    // A localizable data field: either a plain string, or a { pt, en, es } map.
    function loc(field) {
        if (field == null) return '';
        if (typeof field !== 'object') return field;
        var l = lang();
        if (field[l] != null) return field[l];
        if (field.en != null) return field.en;
        if (field.pt != null) return field.pt;
        return '';
    }

    // --- markup builders -----------------------------------------------------

    // A media element (img/gif/video). The placeholder span lives in the
    // container and shows through when this element 404s and removes itself.
    //
    // The real URL is parked in data-src and only promoted to src when the
    // slide is first shown (see loadMedia). Every slide lives in the DOM at
    // once, so a plain src would make the browser fetch every GIF of every
    // project up front; loading="lazy" does not help because the offscreen
    // slides sit inside the viewport box, just translated sideways.
    function mediaInner(media, altText) {
        if (!media || !media.path) return '';
        var path = esc(media.path);
        if (media.type === 'video') {
            var flags = REDUCE ? 'controls' : 'autoplay';
            return '<video class="pc-media__el" data-src="' + path + '" muted loop playsinline ' +
                flags + ' onerror="this.remove();"></video>';
        }
        return '<img class="pc-media__el" data-src="' + path + '" alt="' + esc(altText || '') +
            '" onerror="this.remove();">';
    }

    // Promote data-src -> src for any media inside `scope`, once. Called for
    // the starting slide at render time and for every other slide the first
    // time the user navigates to it.
    function loadMedia(scope) {
        if (!scope) return;
        var els = scope.querySelectorAll('.pc-media__el[data-src]');
        Array.prototype.forEach.call(els, function (el) {
            el.src = el.getAttribute('data-src');
            el.removeAttribute('data-src');
        });
    }

    function badgesHtml(stores) {
        if (!stores || !stores.length) return '';
        return stores.map(function (store) {
            var url = esc(store.url || '#');
            // Unreleased store: a dead badge, not a link. Rendered as a span so
            // it cannot be clicked or focused, since there is no page to reach
            // yet. Always uses the text form: official badge art reads as a
            // live "buy/wishlist" button and would undercut the announcement.
            if (store.comingSoon) {
                var soonDef = STORE_BADGES[store.type];
                var soonLabel = store.label
                    ? loc(store.label)
                    : T('carousel.comingSoon', 'Em breve') + ' ' +
                      ((soonDef && soonDef.label) || store.type || '');
                return '<span class="pc-badge pc-badge--fallback pc-badge--soon">' +
                    '<span class="pc-badge__txt">' + esc(soonLabel) + '</span></span>';
            }
            if (store.type === 'web') {
                var webLabel = store.label ? loc(store.label) : T('carousel.playInBrowser', 'Jogar no navegador');
                return '<a class="pc-badge pc-badge--web" href="' + url +
                    '" target="_blank" rel="noopener">' +
                    '<span class="pc-badge__txt">' + esc(webLabel) +
                    '</span></a>';
            }
            var def = STORE_BADGES[store.type];
            var label = (def && def.label) || store.type || 'Loja';
            var img = def && def.img;
            var imgTag = img
                ? '<img class="pc-badge__img" src="' + esc(img) + '" alt="' + esc(label) +
                  '" onerror="this.parentNode.classList.add(\'pc-badge--fallback\'); this.remove();">'
                : '';
            return '<a class="pc-badge ' + (img ? '' : 'pc-badge--fallback') + '" href="' + url +
                '" target="_blank" rel="noopener" aria-label="' + esc(label) + '">' +
                imgTag +
                '<span class="pc-badge__txt">' + esc(label) + '</span></a>';
        }).join('');
    }

    // An empty playLabel ("" in every language) drops the label line entirely,
    // for projects whose badge already reads as a full call to action. The span
    // must be omitted rather than left empty, or the flex gap still spaces it.
    function playNow(project, compact) {
        var label = project.playLabel ? loc(project.playLabel) : T('carousel.playDefault', 'Jogue agora:');
        return '<div class="pc-playnow' + (compact ? ' pc-playnow--compact' : '') + '">' +
            (label ? '<span class="pc-playnow__label">' + esc(label) + '</span>' : '') +
            '<div class="pc-playnow__badges">' + badgesHtml(project.stores) + '</div>' +
            '</div>';
    }

    function bgLayer(project) {
        // Set background-image directly inline (resolves relative to the
        // document) rather than via a CSS var consumed in project.css, whose
        // url() resolution is browser-dependent and can 404.
        var style = project.background
            ? ' style="background-image:url(\'' + esc(project.background) + '\')"'
            : '';
        return '<div class="pc-slide__bg"' + style + '></div>';
    }

    function startSlide(project) {
        var hasLogo = !!project.logo;
        var logoImg = hasLogo
            ? '<img class="pc-logo__img" src="' + esc(project.logo) + '" alt="' + esc(project.title) +
              '" onerror="this.parentNode.classList.add(\'pc-logo--text\'); this.remove();">'
            : '';
        return '' +
        '<article class="pc-slide pc-slide--start" role="group" aria-roledescription="slide" aria-label="' +
            esc(project.title) + '">' +
            bgLayer(project) +
            '<div class="pc-slide__scrim pc-slide__scrim--start"></div>' +
            '<div class="pc-slide__inner">' +
                '<div class="pc-start">' +
                    '<div class="pc-start__left">' +
                        '<div class="pc-logo' + (hasLogo ? '' : ' pc-logo--text') + '">' +
                            logoImg +
                            '<span class="pc-logo__txt">' + esc(project.title) + '</span>' +
                        '</div>' +
                        '<p class="pc-start__pitch">' + esc(loc(project.pitch)) + '</p>' +
                        playNow(project, false) +
                    '</div>' +
                    '<div class="pc-start__right">' +
                        '<div class="pc-media pc-media--16x9 pc-mediawin">' +
                            '<span class="pc-media__ph">' + esc(project.title) + '</span>' +
                            mediaInner(project.startMedia, project.title) +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</article>';
    }

    function showSlide(project, slide) {
        var title = loc(slide.title);
        var text = loc(slide.text);
        var hasCaption = !!(title || text);
        // The GIF fills almost the whole band; the caption (title + text) is
        // hidden and revealed on hover (desktop) or tap/click (touch).
        var caption = hasCaption
            ? '<div class="pc-show__caption">' +
                  (title ? '<h3 class="pc-show__title">' + esc(title) + '</h3>' : '') +
                  (text ? '<p class="pc-show__text">' + esc(text) + '</p>' : '') +
              '</div>' +
              '<span class="pc-show__hint" aria-hidden="true"><i class="pc-show__hint-glyph">+</i></span>'
            : '';
        return '' +
        '<article class="pc-slide pc-slide--show" role="group" aria-roledescription="slide" aria-label="' +
            esc(project.title) + ': ' + esc(title) + '">' +
            bgLayer(project) +
            '<div class="pc-slide__scrim"></div>' +
            '<div class="pc-slide__inner">' +
                '<div class="pc-show">' +
                    '<div class="pc-show__media"' + (hasCaption ? ' data-caption="1"' : '') + '>' +
                        '<span class="pc-media__ph">' + esc(title || project.title) + '</span>' +
                        mediaInner({ type: 'gif', path: slide.media }, title) +
                        caption +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</article>';
    }

    function visibleProjects(projects) {
        return projects
            .filter(function (p) { return !p.hidden; })
            .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    }

    // One project's slides: its starting page followed by its show pages.
    function projectSlides(project) {
        var slides = [{ label: project.title, html: startSlide(project) }];
        (project.slides || []).forEach(function (slide) {
            slides.push({
                label: project.title + ' — ' + loc(slide.title),
                html: showSlide(project, slide)
            });
        });
        return slides;
    }

    // --- rendering + interaction ---------------------------------------------

    // Render one project into its own carousel band. Bands are stacked
    // vertically (one per project); each navigates independently.
    function renderBand(band, project) {
        var slides = projectSlides(project);
        var track = slides.map(function (s) { return s.html; }).join('');

        // Arrows + dots are only useful when there is more than one slide.
        var controls = '';
        if (slides.length > 1) {
            var goto = T('carousel.aria.goto', 'Ir para:');
            var dots = slides.map(function (s, i) {
                return '<button class="pc-dot" type="button" role="tab" data-i="' + i +
                    '" aria-label="' + esc(goto + ' ' + s.label) + '"></button>';
            }).join('');
            controls =
                '<button class="pc-nav pc-nav--prev" type="button" aria-label="' + esc(T('carousel.aria.prev', 'Slide anterior')) + '">' +
                    '<span aria-hidden="true">‹</span></button>' +
                '<button class="pc-nav pc-nav--next" type="button" aria-label="' + esc(T('carousel.aria.next', 'Próximo slide')) + '">' +
                    '<span aria-hidden="true">›</span></button>' +
                '<div class="pc-dots" role="tablist" aria-label="' + esc(T('carousel.aria.dots', 'Selecionar slide')) + '">' + dots + '</div>';
        }

        band.innerHTML =
            '<div class="pc-viewport">' +
                '<div class="pc-track">' + track + '</div>' +
            '</div>' + controls;

        // The track moves via translateX; the viewport must never scroll.
        // Focusing/clicking content in a non-active slide would otherwise make
        // the browser scroll the overflow:hidden viewport to reveal it,
        // desyncing it from the transform. Pin the scroll offset to 0.
        var viewport = band.querySelector('.pc-viewport');
        if (viewport) {
            viewport.addEventListener('scroll', function () {
                if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
                if (viewport.scrollTop !== 0) viewport.scrollTop = 0;
            });
        }

        // Only the starting slide loads its media now; the rest wait for the
        // user to navigate to them.
        loadMedia(band.querySelector('.pc-slide'));

        wireCaptions(band);
        if (slides.length > 1) wire(band, slides.length);
    }

    // Show-page captions: visible by default (see project.css). Clicking or
    // pressing Enter/Space dismisses the caption to uncover the art, and does
    // the same in reverse. Starts expanded, so aria-expanded starts true.
    function wireCaptions(scope) {
        var medias = scope.querySelectorAll('.pc-show__media[data-caption]');
        Array.prototype.forEach.call(medias, function (m) {
            m.setAttribute('role', 'button');
            m.setAttribute('tabindex', '0');
            m.setAttribute('aria-expanded', 'true');
            m.setAttribute('aria-label', T('carousel.aria.moreInfo', 'Mostrar ou ocultar descrição'));
            function toggle() {
                var hidden = m.classList.toggle('is-hidden');
                m.setAttribute('aria-expanded', hidden ? 'false' : 'true');
            }
            m.addEventListener('click', toggle);
            m.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    toggle();
                }
            });
        });
    }

    function wire(mount, total) {
        var track = mount.querySelector('.pc-track');
        var viewport = mount.querySelector('.pc-viewport');
        var prev = mount.querySelector('.pc-nav--prev');
        var next = mount.querySelector('.pc-nav--next');
        var dots = Array.prototype.slice.call(mount.querySelectorAll('.pc-dot'));
        var slideEls = Array.prototype.slice.call(mount.querySelectorAll('.pc-slide'));
        var index = 0;

        function update() {
            loadMedia(slideEls[index]);
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            dots.forEach(function (d, i) {
                var active = i === index;
                d.classList.toggle('is-active', active);
                d.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        // Circular: past the last slide wraps to the first, and vice-versa.
        function go(i) {
            index = ((i % total) + total) % total;
            update();
        }

        prev.addEventListener('click', function () { go(index - 1); });
        next.addEventListener('click', function () { go(index + 1); });
        dots.forEach(function (d) {
            d.addEventListener('click', function () { go(parseInt(d.getAttribute('data-i'), 10)); });
        });

        // Keyboard: only when the carousel is on screen, so arrow keys don't
        // get hijacked while the user is elsewhere on the page.
        function inView() {
            var r = mount.getBoundingClientRect();
            return r.top < window.innerHeight && r.bottom > 0;
        }
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            if (!inView()) return;
            if (e.key === 'ArrowLeft') go(index - 1);
            else go(index + 1);
        });

        // Touch swipe.
        var startX = null;
        viewport.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        viewport.addEventListener('touchend', function (e) {
            if (startX === null) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
            startX = null;
        });

        update();
    }

    // --- boot ----------------------------------------------------------------

    var mountEl = null;
    var loaded = null; // raw projects data, kept so we can re-render on language change

    function renderAll() {
        if (!mountEl) return;
        var projects = visibleProjects(loaded || []);
        if (!projects.length) {
            mountEl.innerHTML = '<div class="pc pc-empty">' + esc(T('carousel.empty', 'Projetos em breve.')) + '</div>';
            return;
        }
        mountEl.innerHTML = '';
        var projectAria = T('carousel.aria.project', 'Projeto:');
        projects.forEach(function (project) {
            var band = document.createElement('div');
            band.className = 'pc';
            band.setAttribute('aria-roledescription', 'carousel');
            band.setAttribute('aria-label', projectAria + ' ' + (project.title || ''));
            renderBand(band, project);
            mountEl.appendChild(band);
        });
    }

    function init() {
        mountEl = document.getElementById(MOUNT_ID);
        if (!mountEl) return;

        // Re-render the carousel (localized strings + fields) when language changes.
        document.addEventListener('languagechange', renderAll);

        fetch(DATA_URL, { cache: 'no-cache' })
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(function (data) {
                loaded = Array.isArray(data) ? data : [];
                renderAll();
            })
            .catch(function (err) {
                console.error('Projects carousel: failed to load data', err);
                mountEl.innerHTML = '<div class="pc pc-empty">' + esc(T('carousel.empty', 'Projetos em breve.')) + '</div>';
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
