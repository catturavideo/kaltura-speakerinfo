default: speakerinfo.min.js speakerinfo.min.css

speakerinfo.min.js: speakerinfo.js
	uglifyjs -mt < speakerinfo.js > speakerinfo.min.js

speakerinfo.min.css: speakerinfo.css
	recess speakerinfo.css --compress > speakerinfo.min.css