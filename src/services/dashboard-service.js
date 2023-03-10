export function getStocksAndCurrencies() {
  return fetch(
    'https://api.hgbrasil.com/finance?format=json-cors&fields=only_results,currencies,stocks&key=4f838463'
  ).then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Erro ao buscar dados')
  })
}
