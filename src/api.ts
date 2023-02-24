const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); //현재
  const startDate = Math.floor(Date.now() / 1000 - 60 * 60 * 24 * 7); //1주 전
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}` //3주의 데이터
  ).then((response) => response.json());
}
