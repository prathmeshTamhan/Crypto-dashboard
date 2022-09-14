import React, { Component } from "react";
import Cardsection from "./components/cardsection";
import Chartsection from "./components/Chartsection";
import Header from "./components/Header";

export default class App extends Component {
  //to update state used constructor
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {},
    };
  }

  fetchData = async () => {
    let data = await fetch(
      "https://api.coingecko.com/api/v3/coins/" + this.state.Id
    );
    let JsonData = await data.json();
    this.setState({ Id: this.state.Id, Data: JsonData });
  };

  handlesubmit = async (event) => {
    await this.setState({ Id: event.target.value, Data: this.state.Data });
    this.fetchData();
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div>
        <Header handle_Submit={this.handlesubmit} />

        <Cardsection
          total_volume={
            this.state.Data.market_data
              ? this.state.Data.market_data.total_volume.usd
              : "-"
          }
          coinName={this.state.Data.name}
          sentiment={this.state.Data.sentiment_votes_up_percentage}
          marketCap={this.state.Data.market_cap_rank}
          liquidityScore={this.state.Data.liquidity_score}
          currentPrice={
            this.state.Data.market_data
              ? this.state.Data.market_data.current_price["usd"]
              : ""
          }
          mCap24={
            this.state.Data.market_data
              ? this.state.Data.market_data.market_cap_change_percentage_24h
              : ""
          }
          // ath={
          //   this.state.Data.market_data
          //     ? this.state.Data.market_data.ath.usd
          //     : ""
          // }
          atl={
            this.state.Data.market_data
              ? this.state.Data.market_data.ath.usd
              : ""
          }
          high24={
            this.state.Data.market_data
              ? this.state.Data.market_data.high_24h["usd"]
              : ""
          }
          low24={
            this.state.Data.market_data
              ? this.state.Data.market_data.low_24h["usd"]
              : ""
          }
        />
        <Chartsection
          Id={this.state.Id}
          priceChange24={
            this.state.Data.market_data
              ? this.state.Data.market_data.price_change_24h_in_currency.usd
              : ""
          }
          MarketCap={
            this.state.Data.market_data
              ? this.state.Data.market_data.market_cap.usd
              : ""
          }
          TotVol={
            this.state.Data.market_data
              ? this.state.Data.market_data.total_volume.usd
              : ""
          }
          Circulating={
            this.state.Data.market_data
              ? this.state.Data.market_data["circulating_supply"]
              : ""
          }
          twitterF={
            this.state.Data.community_data
              ? this.state.Data.community_data.twitter_followers
              : ""
          }
        />
      </div>
    );
  }
}
