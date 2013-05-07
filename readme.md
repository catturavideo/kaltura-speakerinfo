# Cattura Speaker Information for the Kaltura Player #

The Cattura platform allows you to upload information about your presenter with the media itself, along with related files such as Powerpoint presentations, PDFs, and other files. This plugin helps display this information in a clean, intuitive user interface.

## Setup ##

1.  Create a new player (or edit an existing one) in the studio tab.

2.  Copy the line below and paste into the "plug-in line" field in the "Additional parameters and plugins" section of features and click "Go".

	speakerInfo.plugin=true&speakerInfo.path=/content/uiconf/ps/kaltura/kdp/v3.6.9/plugins/facadePlugin.swf&speakerInfo.relativeTo=video&speakerInfo.position=before&speakerInfo.includeInLayout=false&speakerInfo.widgetPosition=top&speakerInfo.onPageJs1=http://cf.cdn.catturavideo.com/assets/js/speakerinfo1.0.3.min.js&speakerInfo.onPageCss1=http://cf.cdn.catturavideo.com/assets/js/speakerinfo1.0.3.min.css&speakerInfo.requiresJQuery=true

	![Step 2](http://i.imgur.com/8rqIPVi.png)

3.  Scroll down to `speakerInfo.widgetPosition` and change the line underneath to the position you would like the widget to be. Valid values are "top", "bottom", "left", and "right" (without quotes).

	![Step 3](http://i.imgur.com/3p9o1wI.png)

## Notes ##

 * This plugin may not work on custom installations of Kaltura. If you have a custom installation please take the steps necessary to update to a version that supports KDP v3.6.9 or greater.
 * Because KDP has limited support for multiple plugins used at the same time, some positioning styles may not work together if you choose to use multiple plugins.

## Changelog ##

#### 1.0.3 ####

 * Bugfix: Email button on top/bottom mode will float alongside the heading to save screen space.
 * Feature: Support for speaker links.

#### 1.0.2 ####

 * Bugfix: Minor css issues.
 * Bugfix: Kaltura returns non-array on multipart request with 1 request.

#### 1.0.1 ####

 * Bugfix: The KMC would throw errors over file attachments, the old structure was dropped in favor of related assets.
 * Feature: Added e-mail speaker button.

#### 1.0.0 ####

Initial release

## License ##

Copyright (c) 2013 Cattura Video

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
