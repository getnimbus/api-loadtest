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

4. Set maximum file descriptors limit:

Before running load tests, increase your system's maximum file descriptors limit to handle multiple concurrent connections:

```bash
# Check current limit
ulimit -n

# Set new limit (example for 65535)
ulimit -n 65535
```

Note: The limit should be higher than your maximum expected concurrent connections. If you're unable to set the limit, you may need sudo privileges or to modify system configuration files.

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

### Token Pricing
- Endpoint: `/tokens/sui/price`
- Method: POST
- Batch Size: 50 tokens per request
- Concurrency: 10
- Duration: 120 seconds

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