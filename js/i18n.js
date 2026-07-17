// Localization (i18n) — PT / EN / ES
// Central translation table + apply logic + flag language switcher.
// Static UI strings are keyed by data-i18n attributes in index.html.
// The projects carousel reads window.i18n for its own strings and localized
// data fields (see projects.js) and re-renders on the 'languagechange' event.

(function () {
    'use strict';

    var STORE_KEY = 'devilest-lang';
    var DEFAULT = 'en';
    var SUPPORTED = ['pt', 'en', 'es'];

    var STRINGS = {
        pt: {
            'nav.home': 'Início',
            'nav.studio': 'Estúdio',
            'nav.game': 'Jogos',
            'nav.contact': 'Contato',
            'hero.desc': 'Estúdio de games criando experiências de ação com significado e atitude rock n roll. Atualmente desenvolvendo uma aventura no submundo que combina temas filosóficos com mecânicas de combate intensas.',
            'hero.cta.projects': 'Ver Projetos',
            'hero.cta.about': 'Sobre o Estúdio',
            'about.title': 'O Estúdio',
            'about.focus.title': 'Foco & Visão',
            'about.focus.p1': 'A Devilest nasceu de uma paixão de vida por jogos de caça a demônios como Doom, Devil May Cry, Diablo e mundos de dark fantasy. O estúdio explora a interseção entre tecnologia e temas espirituais, criando jogos que desafiam os jogadores tanto mecânica quanto filosoficamente através de experiências de ação com significado.',
            'about.focus.p2': 'Fundada por Vitor Silvestre, um brasileiro com mais de 10 anos de desenvolvimento de jogos, formação em game design, experiência AAA e guitarra na veia para criar jogos de ação com significado e atitude rock n roll.',
            'about.foundation.title': 'Base de Desenvolvimento',
            'about.foundation.1': 'Bacharelado em Game Design',
            'about.foundation.2': 'Tech UI - Fortnite (Epic Games)',
            'about.foundation.3': 'Combat Designer (Warner Bros Games)',
            'about.foundation.4': 'Vivência no desenvolvimento de jogos brasileiro',
            'contact.title': 'Conecte-se',
            'contact.desc': 'Interessado em oportunidades de publicação, colaboração no desenvolvimento ou em acompanhar o progresso do projeto? Participe da nossa comunidade!',
            'contact.location': 'Brasil 🇧🇷',
            'contact.backToTop': 'Voltar ao início',
            'contact.form.title': 'Mande uma mensagem',
            'contact.form.emailLabel': 'Seu email',
            'contact.form.emailPlaceholder': 'voce@exemplo.com',
            'contact.form.messageLabel': 'Mensagem',
            'contact.form.messagePlaceholder': 'Conte o que você tem em mente...',
            'contact.form.newsletter': 'Quero receber a newsletter',
            'contact.form.send': 'Enviar email',
            'contact.form.hint': 'Isso abre seu aplicativo de email com a mensagem pronta para enviar.',
            'contact.form.subject': 'Contato pelo site',
            'carousel.playDefault': 'Jogue agora:',
            'carousel.playInBrowser': 'Jogar no navegador',
            'carousel.comingSoon': 'Em breve na',
            'carousel.empty': 'Projetos em breve.',
            'carousel.aria.prev': 'Slide anterior',
            'carousel.aria.next': 'Próximo slide',
            'carousel.aria.dots': 'Selecionar slide',
            'carousel.aria.goto': 'Ir para:',
            'carousel.aria.project': 'Projeto:',
            'carousel.aria.moreInfo': 'Mostrar descrição'
        },
        en: {
            'nav.home': 'Home',
            'nav.studio': 'Studio',
            'nav.game': 'Games',
            'nav.contact': 'Contact',
            'hero.desc': 'Game studio crafting meaningful action experiences with rock n roll attitude. Currently developing an underworld adventure that combines philosophical themes with intense combat mechanics.',
            'hero.cta.projects': 'View Projects',
            'hero.cta.about': 'About the Studio',
            'about.title': 'The Studio',
            'about.focus.title': 'Focus & Vision',
            'about.focus.p1': 'Devilest emerged from a lifelong passion for demon-fighting games like Doom, Devil May Cry, Diablo, and dark fantasy worlds. The studio explores the intersection of technology and spiritual themes, creating games that challenge players both mechanically and philosophically through meaningful action experiences.',
            'about.focus.p2': 'Founded by Vitor Silvestre, a Brazilian with 10+ years of game development, formal game design education, AAA background, and guitar playing to create meaningful action games with rock n roll attitude.',
            'about.foundation.title': 'Development Foundation',
            'about.foundation.1': "Bachelor's Degree in Game Design",
            'about.foundation.2': 'Tech UI - Fortnite (Epic Games)',
            'about.foundation.3': 'Combat Designer (Warner Bros Games)',
            'about.foundation.4': 'Brazilian Game Development Background',
            'contact.title': 'Connect',
            'contact.desc': "Interested in publishing opportunities, development collaboration, or following the project's progress? Join our community!",
            'contact.location': 'Brazil 🇧🇷',
            'contact.backToTop': 'Back to top',
            'contact.form.title': 'Send a message',
            'contact.form.emailLabel': 'Your email',
            'contact.form.emailPlaceholder': 'you@example.com',
            'contact.form.messageLabel': 'Message',
            'contact.form.messagePlaceholder': 'Tell me what you have in mind...',
            'contact.form.newsletter': 'Sign me up for the newsletter',
            'contact.form.send': 'Send email',
            'contact.form.hint': 'This opens your email app with the message ready to send.',
            'contact.form.subject': 'Contact from the site',
            'carousel.playDefault': 'Play now:',
            'carousel.playInBrowser': 'Play in browser',
            'carousel.comingSoon': 'Coming soon on',
            'carousel.empty': 'Projects coming soon.',
            'carousel.aria.prev': 'Previous slide',
            'carousel.aria.next': 'Next slide',
            'carousel.aria.dots': 'Select slide',
            'carousel.aria.goto': 'Go to:',
            'carousel.aria.project': 'Project:',
            'carousel.aria.moreInfo': 'Show description'
        },
        es: {
            'nav.home': 'Inicio',
            'nav.studio': 'Estudio',
            'nav.game': 'Juegos',
            'nav.contact': 'Contacto',
            'hero.desc': 'Estudio de videojuegos creando experiencias de acción con significado y actitud rock n roll. Actualmente desarrollando una aventura en el inframundo que combina temas filosóficos con mecánicas de combate intensas.',
            'hero.cta.projects': 'Ver Proyectos',
            'hero.cta.about': 'Sobre el Estudio',
            'about.title': 'El Estudio',
            'about.focus.title': 'Enfoque y Visión',
            'about.focus.p1': 'Devilest nació de una pasión de toda la vida por los juegos de caza de demonios como Doom, Devil May Cry, Diablo y los mundos de fantasía oscura. El estudio explora la intersección entre la tecnología y los temas espirituales, creando juegos que desafían a los jugadores tanto mecánica como filosóficamente a través de experiencias de acción con significado.',
            'about.focus.p2': 'Fundada por Vitor Silvestre, un brasileño con más de 10 años de desarrollo de videojuegos, formación en game design, experiencia AAA y guitarra en vena para crear juegos de acción con significado y actitud rock n roll.',
            'about.foundation.title': 'Base de Desarrollo',
            'about.foundation.1': 'Licenciatura en Game Design',
            'about.foundation.2': 'Tech UI - Fortnite (Epic Games)',
            'about.foundation.3': 'Combat Designer (Warner Bros Games)',
            'about.foundation.4': 'Experiencia en el desarrollo de videojuegos brasileño',
            'contact.title': 'Conecta',
            'contact.desc': '¿Interesado en oportunidades de publicación, colaboración en el desarrollo o en seguir el progreso del proyecto? ¡Únete a nuestra comunidad!',
            'contact.location': 'Brasil 🇧🇷',
            'contact.backToTop': 'Volver al inicio',
            'contact.form.title': 'Envía un mensaje',
            'contact.form.emailLabel': 'Tu email',
            'contact.form.emailPlaceholder': 'tu@ejemplo.com',
            'contact.form.messageLabel': 'Mensaje',
            'contact.form.messagePlaceholder': 'Cuéntame qué tienes en mente...',
            'contact.form.newsletter': 'Quiero recibir la newsletter',
            'contact.form.send': 'Enviar email',
            'contact.form.hint': 'Esto abre tu aplicación de email con el mensaje listo para enviar.',
            'contact.form.subject': 'Contacto desde el sitio',
            'carousel.playDefault': 'Juega ahora:',
            'carousel.playInBrowser': 'Jugar en el navegador',
            'carousel.comingSoon': 'Próximamente en',
            'carousel.empty': 'Proyectos próximamente.',
            'carousel.aria.prev': 'Diapositiva anterior',
            'carousel.aria.next': 'Diapositiva siguiente',
            'carousel.aria.dots': 'Seleccionar diapositiva',
            'carousel.aria.goto': 'Ir a:',
            'carousel.aria.project': 'Proyecto:',
            'carousel.aria.moreInfo': 'Mostrar descripción'
        }
    };

    function supported(lang) {
        return SUPPORTED.indexOf(lang) !== -1 ? lang : null;
    }

    function detect() {
        try {
            var saved = localStorage.getItem(STORE_KEY);
            if (supported(saved)) return saved;
        } catch (e) {}
        var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (nav.indexOf('pt') === 0) return 'pt';
        if (nav.indexOf('es') === 0) return 'es';
        return DEFAULT;
    }

    var current = detect();

    function t(key) {
        var table = STRINGS[current] || STRINGS[DEFAULT];
        if (table && table[key] != null) return table[key];
        if (STRINGS[DEFAULT][key] != null) return STRINGS[DEFAULT][key];
        return key;
    }

    function apply() {
        document.documentElement.lang = current;
        var nodes = document.querySelectorAll('[data-i18n]');
        Array.prototype.forEach.call(nodes, function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        // Form fields localize their placeholder rather than their content.
        var phs = document.querySelectorAll('[data-i18n-placeholder]');
        Array.prototype.forEach.call(phs, function (el) {
            el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
        });
        // Icon-only controls carry their whole meaning in the aria-label.
        var arias = document.querySelectorAll('[data-i18n-aria]');
        Array.prototype.forEach.call(arias, function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });
        var flags = document.querySelectorAll('[data-lang]');
        Array.prototype.forEach.call(flags, function (btn) {
            var on = btn.getAttribute('data-lang') === current;
            btn.classList.toggle('is-active', on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    }

    function setLang(lang) {
        if (!supported(lang) || lang === current) return;
        current = lang;
        try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
        apply();
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: current } }));
    }

    window.i18n = {
        get lang() { return current; },
        t: t,
        setLang: setLang
    };

    function wireFlags() {
        var flags = document.querySelectorAll('[data-lang]');
        Array.prototype.forEach.call(flags, function (btn) {
            btn.addEventListener('click', function () {
                setLang(btn.getAttribute('data-lang'));
            });
        });
    }

    function init() {
        apply();
        wireFlags();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
