interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
}

interface IUseFetch {
  data: ICrypto[] | null;
  isPending: boolean;
  error: string | null;
}

export { ICrypto, IUseFetch };
