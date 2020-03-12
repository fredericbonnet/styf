# Stop Touching Your Face!

Compulsive face touching is a major factor of virus propagation.
This app displays a notification anytime it detects hand movements
around your face. Help stop the propagation of COVID-19!

## Usage

1. Open the app page: https://styf.netlify.com
2. Wait for model to load
3. Click on the "Enable hand detection" switch
4. Accept all permissions (webcam access and desktop notifications)
5. Test the app by enabling video preview and moving your hand at head level
6. Leave the tab open in the background as long as necessary, don't minimize the window! Disable video preview for better performances

## Test locally

To launch the app locally, clone this repository then run these commands:

```
npm ci
npm start
```

This should start a HTTP server at http://127.0.0.1:8080.

## Known issues

The hand detection package sometimes detects false positive when moving your head. This is a minor disturbance.

Don't pay attention to the quality of the code, it's a very quick-and-dirty app I wrote in a couple of hours.

## Acknowledgements

This app was made possible by the awesome
[Handtrack.js](https://github.com/victordibia/handtrack.js/) package!

The app page is based on Material Design Lite and more specifically the [Stand-alone article](https://getmdl.io/templates/article/index.html) template.
