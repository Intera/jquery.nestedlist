# jquery.nestedlist
Creates a browsable nested list.

Features
- Unlimited nesting depth
- Arbitrary number of nested lists per page
- Change events for setting list titles or similar
- Compatible with Firefox, Chrome, Internet Exploder, Opera, Safari, and more

Additional features
- The up-link (anything with class ".nestedlist-up") can be anywhere on the page
- All cards have the same width
- Height is dynamic
- Shows first list on load
- HTML fallback with deactivated javascript possible
- At the moment, child lists can not be shared between list items
- It is possible to create a horizontal list by disabling the animation and setting a width for ``<li>``

# Dependencies
- jQuery

# Usage
Call "nestedList" on a jQuery object with the topmost ``<ul>`` element of the list.

    $("ul.demo-list").nestedList()

# Optional configuration
```
$(selector).nestedList({
  optionName: optionValue, ...
})
```

|optionName|optionValue|
----|----|----
|onBeforeChange|called before showing a list|function(-1 or 1, nextList)|
|onAfterChange|called after showing a list|function(-1 or 1, nextList)|
|upButtonSelector|for selecting the upButton anywhere in the document|string|
|upButtonShow|the default is function(upButton, nextList) { nextList.prepend(upButton) }|function(upButton, nextList)|
|shiftAnimation|options for jQuery.animate()|object|
|noScriptLinks|true or a selector relative to the nestedlist container to select links that should be replaced with their content text|boolean, string|

# Example DOM structure
```
ul
  li
    content
  li
    content
    ul
	    li
	    li
	    li
```

# Example of extra properties that can be styled
```css
.wrapper {
	border: 1px solid #000;
	width: 160px;
	overflow: hidden;
	float: left;
}

.wrapper + .wrapper {
	margin-left: 10%;
}

.demo-list, ul {
	width: 160px;
	padding-left: 0;
}

.leaf {
	background-color: #eee;
}

.hover {
	text-decoration: underline;
}

li {
	list-style-type: none;
	width: 144px;
}

.nestedlist-up, li {
	cursor: pointer;
}

.nestedlist-up:hover {
	text-decoration: underline;
}
```
