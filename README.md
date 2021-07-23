# Buttonwood Subgraph

## Tranche

Example query
```gql
{
  bonds(first:1) {
    id
    owners
    collateral {
      id
      symbol
      name
      decimals
      totalSupply
    }
    maturityDate
    isMature
    totalDebt
    totalCollateral
    tranches {
      id
      index
      token {
        id
        decimals
        totalSupply
      }
      ratio
    }
  }
}

```

Output
```json
{
  "data": {
    "bonds": [
      {
        "collateral": {
          "decimals": "9",
          "id": "0x3e0437898a5667a4769b1ca5a34aab1ae7e81377",
          "name": "Ampleforth",
          "symbol": "AMPL",
          "totalSupply": "55914539459679239"
        },
        "id": "0x1a153458428f7b7b3d47ba08d2038395af790087",
        "isMature": false,
        "maturityDate": "1726990425",
        "owners": [
          "0xf7aba9b064a12330a00eafaa930e2fe8e76e65f0"
        ],
        "totalCollateral": "20000000000",
        "totalDebt": "20000000000",
        "tranches": [
          {
            "id": "0x1d5804b532b3b4fdca8ee9f9f33cf56dc5bfb3d9",
            "index": "1",
            "ratio": "300",
            "token": {
              "decimals": "9",
              "id": "0x1d5804b532b3b4fdca8ee9f9f33cf56dc5bfb3d9",
              "totalSupply": "6000000000"
            }
          },
          {
            "id": "0x3602034c89075f057afdff5e57b161d2ca6829fa",
            "index": "2",
            "ratio": "500",
            "token": {
              "decimals": "9",
              "id": "0x3602034c89075f057afdff5e57b161d2ca6829fa",
              "totalSupply": "10000000000"
            }
          },
          {
            "id": "0x737efcf9e46350f2c525049c52499dd1534d513b",
            "index": "0",
            "ratio": "200",
            "token": {
              "decimals": "9",
              "id": "0x737efcf9e46350f2c525049c52499dd1534d513b",
              "totalSupply": "4000000000"
            }
          }
        ]
      },
    }
}

```
