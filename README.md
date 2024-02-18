# Percy's Picks

Percy's Picks is a single-page application (SPA) built using React, React Bootstrap, React Router, lodash, and Bootstrap. It showcases curated film content. The application allows users to view a list of movies, search for movies by title, view details about individual movies, and save movies to Favorites. Profile updates and user authentication are also supported. The application is responsive and mobile-friendly, and it includes a custom 404 error page for handling invalid routes. JWT tokens are used for user authentication and authorization along with password hashing for security in the backend.

## Accessing the Hosted Site
Percy's Picks is now hosted and accessible online. You can visit the site at https://percyspicks.netlify.app/.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your local machine.
- npm (Node Package Manager)

## Technologies Used
- React: A JavaScript library for building user interfaces.
- React Bootstrap: A front-end framework built on top of Bootstrap for React components.
- React Router: A routing library for React that enables navigation between different components.
- lodash: A utility library that provides helpful functions for manipulating and working with arrays, objects, and other data types.

## Dependencies
- Production Dependencies
- bootstrap: ^5.3.2
- lodash: ^4.17.21
- prop-types: ^15.8.1
- react: ^18.2.0
- react-bootstrap: ^2.10.1
- react-dom: ^18.2.0
- react-router: ^6.22.0
- react-router-dom: ^6.22.0
- save: ^2.9.0
## Development Dependencies
- @parcel/transformer-sass: ^2.11.0
- parcel: ^2.11.0
- process: ^0.11.10

## API
Percy's Picks interacts with a custom movie API available at [Movie-API](https://github.com/RaedanGroup/Movie-API). The API provides data about movies, including their titles, descriptions, genres, directors, and more. Please refer to the API documentation for more details on available endpoints and data formats.

## Testing with Parcel

If you prefer to test the project locally, follow these steps:

1. Install Parcel globally if you haven't already:
      ```
      npm install -g parcel
      ```
2. Run the following command to start the development server:
      ```
      parcel src/index.html
      ```
3. Open your browser and navigate to `http://localhost:1234/` to view the site.

## Deployment
To deploy Percy's Picks to a hosting provider, follow these general steps:

1. Build your React project for production using Parcel (or another bundler of your choice). For example, to build the project using Parcel, run the following command (replace the public URL with your own if necessary to match your hosting provider's configuration):
```
parcel build src/index.html --public-url /
```
2. Upload the generated dist folder to your hosting provider. The dist folder contains the compiled and minified files for your project. You can use an FTP client, the hosting provider's file manager, or another method to upload the files to your server.

3. Configure your hosting provider to serve the index.html file as the default file for your website. This step is necessary for single-page applications (SPAs) built with React Router to work correctly. The exact steps for configuring this setting depend on your hosting provider.