Modal for Fuse

Library to use modal in [Fuse](http://www.fusetools.com/).

Modal dialogs are implemented using UIAlertController for iOS, and AlertDialogBuilder for Android.
There is also a hackish fallback using UX, replacing the whole UX tree with the dialog.

## Usage

```xml
<ModalJS ux:Global="Modal" />
```

```javascript
		var Modal = require('Modal');
		function click () {
			Modal.showModal(
				"This is my title",
				"This is my body. It can be very long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed justo ac arcu semper egestas. Mauris eget ipsum sit amet sem vulputate congue. Nam tellus nunc, malesuada quis dignissim vitae, tincidunt quis mi.",
				["Ok", "Cancel"],
				function (s) {
					debug_log("Got callback with " + s);
				});
		}
```




Fuse caching imagesource
========================

A naive caching imagesource, with missing memory management.

## Usage

    <Image>
        <CachedHttpImageSource Url="{url}" />
    </Image>







    Fuse CameraPanel
    ================

    Library to use the camera as a panel in [Fuse](http://www.fusetools.com/).

    Currently supports iOS

    Issues, feature request and pull request are welcomed.

    ## Usage:

    ### UX

        <CameraStream>
          <CameraVisual Facing="Front" />
        </CameraStream>

    ### JS/UX Approach

        <JavaScript>
        var cameraExt = require('CameraExtended');

        function shoot () {
          cameraExt
              .takePicture()
              .then(function (file) {
                  debug_log("Filename: " + file.Name);
                  debug_log("Path: " + file.Path);

                  cameraExt.refreshCamera();
              })
              .catch(function (e) {
                  debug_log(e);
              });    
        }
        module.exports.shoot = shoot;
        </JavaScript>

        <CameraStream>
            <CameraVisual Camera="cam" Facing="Front"/>
            <Camera ux:Global="cam" />
            <CameraExtended ux:Global="CameraExtended" Camera="cam" />
        </CameraStream>
