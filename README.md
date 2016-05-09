# tooltip
A lightweight, easy, straight-forward and very simple tooltip made with jQuery


### Demo
[https://ejfrias.github.io/tooltip](https://ejfrias.github.io/tooltip)


### Requirement
jQuery 1.x


### How to use
Just add a link to the css file in your `<head>` tag:
```
<link rel="stylesheet" href="/path/to/tooltip.css">
```

Then, before your closing `</body>` tag add:
```
<script src="/path/to/tooltip.js"></script>
```

**That's it!** You can now add the tooltip on any element by using `data-tooltip=""` attribute
```
<p data-tooltip="Hello world!">Hover me</p>
```


### Options
All options are required to be prefixed with `data-`

Name | Type | Default | Description
---- | ---- | ------- | -----------
tooltip | string | (empty) | The text that will show on the tooltip. Empty values will not show the tooltip. A class or id can be passed as well, if you have multiple tooltips that needs the same text just create an element with a class or id then put it as the `data-tooltip` value (e.g. `.source` or `#source`, the text of this element will then be the main source of the text of the tooltip. See example or demo to get better idea.
placement | enum (top, bottom, left, right) | top | Position of the tooltip.
distance | integer | 8 | Distance of the tooltip with the element in pixels.
class | string | (empty) | Additional class for styling the tooltip, multiple classes should be separated with a space.


### Contributing
Since this tooltip was made to be as simple as possible, requesting and/or proposing a feature would not be entertained. However, submitting bugs/issues are always welcome.