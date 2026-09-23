# FrozenFoodFactory

Public site: [https://riskata.github.io/website-trio/](https://riskata.github.io/website-trio/)

## Hosting on GitHub Pages

The repo [RisKata/website-trio](https://github.com/RisKata/website-trio) must be **public**. GitHub Actions builds the Angular app on every push to `main` and publishes it with [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

One-time setup in the GitHub repo:

1. **Settings → General → Danger Zone**: set visibility to Public, if it is still private.
2. **Settings → Pages → Build and deployment**: set Source to **GitHub Actions**.
3. Push `main`. The **Deploy to GitHub Pages** workflow publishes the site.

Local `ng serve` keeps the base path `/`. Production builds use `/website-trio/` so assets and routes match the Pages URL. Direct links such as `/about` are restored by `public/404.html`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.27.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
