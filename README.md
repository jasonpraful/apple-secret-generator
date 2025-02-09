# Secret Generator for Sign-In with Apple

## Quickstart

```bash
npx @jasonpraful/apple-secret-generator --help
```

## Usage

| Option       | Description                                                                                                                                                                                           | Required | Default | Example             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------- |
| -i, --key-id | The identifier of the key to use - derived from [here](https://developer.apple.com/account/resources/authkeys/)                                                                                       | Yes      | N/A     | FTXXXXX             |
| -k, --key    | The path to the key file - downloaded from [here](https://developer.apple.com/account/resources/authkeys/)                                                                                            | Yes      | key.p8  | ./key.p8            |
| -c, --client | The client ID of the service - derived by creating a service ID [here](https://developer.apple.com/account/resources/identifiers/add/bundleId). **Important**: This is not the same as the bundle ID. | Yes      | N/A     | com.example.service |
| -t, --team   | The identifier of the team to use - derived from [here](https://developer.apple.com/account/#/membership/)                                                                                            | Yes      | N/A     | XXXXXXXX            |
| -d, --days   | The number of days the secret should be valid for. **Please note:** The maximum value allowed by apple is 180days.                                                                                    | No       | 180     | 90                  |

## License

MIT
