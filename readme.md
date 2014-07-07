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

|optionName|description|optionValue|
----|----|----
|onBeforeChange|called before showing a list|function(-1 or 1, nextList, nestedList)|
|onAfterChange|called after showing a list|function(-1 or 1, nextList, nestedList)|
|upButton|for retrieving the upButton anywhere in the document by jQuery-selector or jQuery object. The upButton is one container that is moved around and inserted where it is needed.|string, jQuery|
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

See demo/demo.css for an example stylesheet

# Methods and objects
## nestedListsObject
$.nestedList returns a nestedListsObject
### Example
    var nestedLists = jQuery(".demo-list").nestedList()
### Content
    {
      nestedLists: [nestedListObject, ...],
      closeAll: closeAll
    }
### Methods
|name|description|
----|----|----
|closeAll()|closes all open sub-lists of all nestedLists and shows the toplevel/first list|
## nestedListObject
    {
      container: container,
      toplevelClass: toplevelClass,
      closeList: closeList
    }
### Methods
|name|description|
----|----|----
|closeList()|close the currently active sub-list and show its parent list|
