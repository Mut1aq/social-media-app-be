# Story 03 - Infrastructure / Video 09 - Video ?

As a developer I want my backend to have the following: -

- Make sure the code is following the best practice
- Multi-lang support
- Custom Error Handling system
- Have API Documentation
- Enhance Security

## Acceptance Criteria: -

### Make sure the code is following the best practice

1. Remove unnecessary imports for config module.
2. Fix naming issue in the auth controller.
3. Separate types to different folder.

### Multi-lang support

1. Install and configure I18n module.
2. Create folder and path for translations.
3. Replace string errors with translations.

### Custom Error Handling system

1. Create and bind a new HttpException Filter with meaningful errors.

### Have API Documentation

1. Install and configure Swagger module.
2. Document our current APIs

### Enhance Security

1. Install and bind Helmet.
2. Install and configure Throttler module (rate limiting).
3. Set a limit to how big of a data can be sent to our backend
4. Strict validation for the bodies we receive
