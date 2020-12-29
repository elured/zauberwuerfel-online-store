const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Ihre Konte ist erstellt',
        html: `
        <h1>Willkommen in Zauberwürfel-Olinestore</h1>
        <p>Sie haben neues Konto mit dem E-Mail ${email} erfolgreich erstellt</p>
        <hr/>
        <a href="${keys.BASE_URL}">Zauberwürfel-Olinestore</a>
        `
    }
}