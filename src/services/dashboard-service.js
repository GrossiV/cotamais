export function getStocksAndCurrencies() {
  return fetch(
    `https://api.hgbrasil.com/finance?format=json-cors&fields=only_results,currencies,stocks&key=${
      import.meta.env.VITE_HGF_KEY
    }`
  ).then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Erro ao buscar dados')
  })
}
