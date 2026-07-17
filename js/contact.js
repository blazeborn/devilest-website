// Contact form — mailto composer
// The site is static (GitHub Pages), so there is no endpoint to POST to.
// Submitting hands the message to the visitor's own email client, pre-filled
// and addressed to TO. Nothing is stored or sent by us: if the visitor never
// hits send in their client, the message does not exist.

(function () {
    'use strict';

    var FORM_ID = 'contact-form';
    var TO = 'v@devilest.com';

    // Deliberately not localized: this is an inbox filter key, so it has to
    // read the same no matter which language the visitor used.
    var NEWSLETTER_TAG = '[adicionar a newsletter]';

    function T(key, fallback) {
        return (window.i18n && window.i18n.t) ? window.i18n.t(key) : fallback;
    }

    function init() {
        var form = document.getElementById(FORM_ID);
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var email = (form.querySelector('#cf-email') || {}).value || '';
            var message = (form.querySelector('#cf-message') || {}).value || '';
            var wantsNews = !!(form.querySelector('#cf-newsletter') || {}).checked;

            var subject = T('contact.form.subject', 'Contato pelo site');
            if (wantsNews) subject += ' ' + NEWSLETTER_TAG;

            var body =
                T('contact.form.emailLabel', 'Seu email') + ': ' + email.trim() + '\n\n' +
                T('contact.form.messageLabel', 'Mensagem') + ':\n' + message.trim();

            window.location.href = 'mailto:' + TO +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
