# API Load Testing Tool

A load testing tool for testing API endpoints using Node.js and the `loadtest` package.

## Features

- Configurable requests per second (RPS)
- Support for testing multiple endpoints
- Random address selection from a predefined list
- Environment variable configuration
- Protocol-specific testing for DeFi positions

## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn
```

3. Setup the environment variables:

```bash
cp .env.example .env
```

Configure the following environment variables in `.env`:
- `API_KEY`: Your API key for authentication
- `RPS`: Requests per second (default: 10)
- `DURATION`: Duration of the test in seconds (default: 120)

## Available Scripts
### Test token holdings endpoint
```bash
yarn loadtest:holding
```

### Test token balances endpoint
```bash
yarn loadtest:defi
```

### Test defi positions endpoint
```bash
yarn loadtest:defi
```


## Endpoints Tested

### Token Holdings
- Endpoint: `/v2/address/{address}/holding`
- Parameters:
  - `chain`: SUI
  - `includePnl`: false
- Concurrency: 10
- Duration: 60 seconds

### DeFi Positions
- Endpoint: `/v2/address/{address}/positions`
- Parameters:
  - `protocol`: Multiple protocols supported
- Concurrency: 10
- Duration: 1200 seconds
- Supported protocols include:
  - Aftermath Finance
  - BlueMove
  - Cetus
  - FlowX
  - Kriya
  - Navi
  - Scallop
  - Native Staking
  - SuiLend
  - Turbos Finance
  - Typus
  - Alpha Fi
  - Bluefin
  - Elixir
  - Sui NS

## License

MIT