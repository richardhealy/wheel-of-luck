# Wheel of Luck

Wheel of Luck is an interactive web application featuring a spinning wheel game. Users can spin the wheel to randomly select a prize from a predefined set of options. The project consists of a React-based frontend and a Node.js backend using Fastify.

## Features

- Interactive spinning wheel animation
- Random prize selection
- Configurable prize options
- Responsive design
- Debug logs for development and troubleshooting

## Technologies Used

### Frontend
- React
- TypeScript
- Axios for API requests
- SVG for wheel rendering

### Backend
- Node.js
- Fastify
- TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- pnpm (v6.0.0 or later)

## Setup Instructions

1. Install dependencies:
   ```
   pnpm install
   ```

2. Start the both servers:
   ```
   pnpm dev
   ```

The frontend application will be available at `http://localhost:5173`.

## Usage

1. Open your web browser and go to `http://localhost:5173`.
2. Click the "Spin" button to start the wheel.
3. Wait for the wheel to stop spinning to see the result.
4. The selected prize will be displayed below the wheel.

## Customization

To modify the prize options:
1. Open `backend/src/index.ts`
2. Locate the `options` array
3. Modify the array elements to change the available prizes

## Debugging

The application includes debug logs that can be viewed in the browser console or on the page below the wheel. These logs provide information about the spinning process, including rotation calculations and final results.

## Contributing

Contributions to improve the Wheel of Luck project are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- Thanks to all contributors who have helped to improve this project.
- Special thanks to the React and Fastify communities for their excellent documentation and resources.