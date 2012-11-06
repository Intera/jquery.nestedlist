# A simple nested list with jQuery

Features
- Unlimited nesting depth
- Change events for setting list titles or similar
- Arbitrary number of nested lists per page possible
- HTML fallback options with deactivated javascript
- Compatible with Firefox, Chrome, Internet Exploder, Opera, Safari, and more

Additional features
- All cards have the same width
- At the moment, child lists can not be shared between list items
- Height is dynamic
- It is possible to create a horizontal list by disabling the animation and setting a width for <li>
- Shows first list on load
- The up-link (anything with class ".nestedlist-up") can be anywhere on the page

# Usage
Call "nestedList" on a jQuery object with the topmost <ul> element of the list.

  $("ul.demo-list").nestedList()

# Optional configuration
```
$(selector).nestedList({
  optionName: optionValue, ...
})
```

|optionName|optionValue|
----|----
|onBeforeChange|function(-1 or 1, nextList)|
|onAfterChange|function(-1 or 1, nextList)|

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