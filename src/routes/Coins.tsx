import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../\bapi";

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const CoinsList = styled.h1``;
const Rank = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 10px;
  list-style: none;
  transition: all 0.2s ease-in-out;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    scale: calc(1.05);
  }
`;
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.div`
  text-align: center;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                    imgUrl: `https://coinicons-api.vercel.app/api/icon/${coin?.symbol?.toLowerCase()}`,
                  },
                }}
              >
                <Rank>{coin.rank}.</Rank>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin?.symbol?.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
