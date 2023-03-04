export function getStocksAndCurrencies() {
    return fetch('https://api.hgbrasil.com/finance?format=json-cors&fields=only_results,currencies,stocks&key=SUA-CHAVE')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar dados');
        })
}