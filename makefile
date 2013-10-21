default: speakerinfo.min.js speakerinfo.min.css

speakerinfo.min.js: speakerinfo.js
	./node_modules/.bin/uglifyjs -mt < speakerinfo.js > speakerinfo.min.js

speakerinfo.min.css: speakerinfo.css
	./node_modules/.bin/lessc --compress -O2 speakerinfo.css > speakerinfo.min.css
