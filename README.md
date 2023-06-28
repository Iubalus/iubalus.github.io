# iubalus.github.io

## Introduction

This is my Github Pages site accessible at
 - https://jubalrife.net
 - http://jubalrife.com (which redirects to the .net at the moment)
 - https://iubalus.github.io

I am using this site as a learning exercise and experimental playground.
> If you are here to use this as an example, please be cautious about what practices or examples you decide to reuse.

## Project Structure
- The source code lives under `com_jubalrife/`
- The deployed code lives under `docs/`

## History
My initial goal in creating this site was to learn how Github pages worked (and dabble in blogging)

The first iteration of the site was somewhat primitive. It was written in raw HTML with direct javascript imports. I started with JQuery to simplify some of the javascript operations (and allow me to tightly couple to the DOM) I used sass to make the css more convenient to write, but didn't manage the sass/css/mapping files very well (it was a bit of a mess)

Moving forward I decided that I wanted to re-write portions of this in Vue. I didn't have a good web-build in place so I was still operating from the "flat html page pulls in js and does work" paradigm. This limited the way I could work and blurred the lines between source code and deployed code.

My most recent iteration is using a Vite build and Vue/Typescript pages (I do still pull in my legacy pages as well using the public folders)

I have had quite a bit of fun laying out the pages, playing with some old console style stuff, dealing with embedded iframes, and other experiements (some preserved, some abandoned) and I will continue to modify the site and try new things going forward.
