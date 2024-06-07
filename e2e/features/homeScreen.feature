Feature: User use all features in the HomeScreen

Background: 
Given User on the Home Screen

  Scenario: User can see LineChartHome
    When User tap <coin> in the CoinMarketFlatList
    Then User should see text <coinSymbol> and component "LineChartHome"

  Examples:
  |coin     |coinSymbol |
  |Solana   |$SOL       |
  |Chainlink|$LINK      |

  Scenario: User can swipes the coinMarketFlatList
    When User swipes "down" the "coinMarketFlatList" until <coin>
    Then User should be able to see text <coin>

  Examples:
  |coin     |
  |Aptos    |
  |Polygon  |