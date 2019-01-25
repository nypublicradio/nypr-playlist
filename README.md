# nypr-playlist

A widget for creating embeddable playlists.

## This is a toolkit module
This is a module designed to be used with [nypr-toolkit](https://github.com/nypublicradio/nypr-toolkit). See [that readme](https://github.com/nypublicradio/nypr-toolkit#development) for details on setting up a toolkit instance to work with modules.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd nypr-playlist`
* `yarn install`


## Configuration

| **Config Value** | **Description**                                          |
| -------------------------- | ---------------------------------------------- |
| `AWS_ACCESS_KEY_ID`        | Access key to AWS account.                     |
| `AWS_SECRET_ACCESS_KEY`    | Secret access key to AWS account.              |
| `AWS_PROFILE`              | For local AWS profile setup.                   |
| `AWS_REGION`               | Region for AWS account.                        |
| `AWS_BUCKET`               | Bucket for AWS S3.                             |
| `AWS_PREFIX`               | Prefix for AWS bucket.                         |
| `PUBLISHER_API`            | URL for Publisher API.                         |
| `THEMES`                   | URL for Themes.                                |
| `PLATFORM_EVENTS_SERVICE`  | URL for the platform events collector endpoint.|

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

**Installation Success:**

Initial state should display "Fill out the fields and your preview will appear here"

### Query Parameters

* **Title:** The Playlist title
* **Blurb:** A blurb describing the playlist.
* **Stories:** A comma separated string of story slugs.
* **Brand:** A theme.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
