import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../\bapi";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: inherit;

  a {
    position: absolute;
    left: 30px;
    font-size: 30px;
  }
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;
const Title = styled.h1`
  display: flex;
  font-size: 48px;
  max-width: 300px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  background-color: black;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  margin: 30px 0;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div:first-child {
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const Tab = styled.div<{ isActive: boolean }>`
  background-color: black;
  width: 45%;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface RouteState {
  name: string;
  imgUrl: string;
}
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      <Helmet>
        <title>
          {" "}
          {state?.name ? state.name : infoLoading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={`/`}>⬅</Link>
        <Title>
          <Img
            src={
              state?.imgUrl
                ? state.imgUrl
                : infoLoading
                ? ""
                : `https://coinicons-api.vercel.app/api/icon/${infoData?.symbol?.toLowerCase()}`
            }
          />

          {state?.name ? state.name : infoLoading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <div>rank:</div>
              <div>{infoData?.rank}</div>
            </OverviewItem>
            <OverviewItem>
              <div>symbol:</div>
              <div>{infoData?.symbol}</div>
            </OverviewItem>
            <OverviewItem>
              <div>price:</div>
              <div>${tickersData?.quotes?.USD?.price.toFixed(3)}</div>
            </OverviewItem>
          </Overview>
          <span>{infoData?.description}</span>
          <Overview>
            <OverviewItem>
              <div>total supply:</div>
              <div>{tickersData?.total_supply}</div>
            </OverviewItem>
            <OverviewItem>
              <div>max supply:</div>
              <div>{tickersData?.max_supply}</div>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>CHART</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>PRICE</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
