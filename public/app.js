const toCurrency = price => {
    return new Intl.NumberFormat('de-DE', {
        currency: "EUR",
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {

        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id
            const csrf = event.target.dataset.csrf

            fetch('/card/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(card => {
                    if (card.cubes.length) {
                        const html = card.cubes.map(i => {
                            return `<tr>
                                        <td>${i.title}</td>
                                        <td>${i.count}</td>
                                        <td>
                                            <button class="btn btn-small js-remove" data-id="${i.id}">Löschen</button>
                                        </td>
                                    </tr>`
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.price)

                    } else {
                        $card.innerHTML = '<p>Einkaufswagen ist leer</p>'
                    }
                })

        }
    })
}

M.Tabs.init(document.querySelectorAll('.tabs'));