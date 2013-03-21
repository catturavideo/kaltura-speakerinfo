# Cattura Speaker Information for the Kaltura Player #

The Cattura platform allows you to upload information about your presenter with the media itself, along with related files such as Powerpoint presentations, PDFs, and other files. This plugin helps display this information in a clean, intuitive user interface.

## Setup ##

1.  Create a new player (or edit an existing one) in the studio tab.

2.  Copy the line below and paste into the "plug-in line" field in the "Additional parameters and plugins" section of features and click "Go".

	speakerInfo.plugin=true&speakerInfo.path=/content/uiconf/ps/kaltura/kdp/v3.6.9/plugins/facadePlugin.swf&speakerInfo.relativeTo=video&speakerInfo.position=before&speakerInfo.includeInLayout=false&speakerInfo.widgetPosition=top&speakerInfo.onPageJs1=http://cf.cdn.catturavideo.com/assets/js/speakerinfo1.0.0.min.js&speakerInfo.onPageCss1=http://cf.cdn.catturavideo.com/assets/js/speakerinfo1.0.0.min.css&speakerInfo.requiresJQuery=true

	![Step 2](http://i.imgur.com/8rqIPVi.png)

3.  Scroll down to `speakerInfo.widgetPosition` and change the line underneath to the position you would like the widget to be. Valid values are "top", "bottom", "left", and "right" (without quotes).

	![Step 3](http://i.imgur.com/3p9o1wI.png)

## Notes ##

 * This plugin may not work on custom installations of Kaltura. If you have a custom installation please take the steps necessary to update to a version that supports KDP v3.6.9 or greater.
 * Because KDP has limited support for multiple plugins used at the same time, some positioning styles may not work together if you choose to use multiple plugins.

## Changelog ##

#### 1.0.0 ####

Initial release