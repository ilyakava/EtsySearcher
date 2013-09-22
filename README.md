#Etsy Searcher


##TODO
* ~~Visit the homepage, launch a BB router~~
* Search Etsy (change route for bookmarkability)
    * ~~Instantiate a BB collection of items~~
        * ~~create a `populate` commmand of a collection to query the Etsy API~~
    * Display the collection with a view
        * have this view create subviews on each individual item
    * launch Subsearch view (adds a single level subroute, that will be edited to accomadate both searches and filters)
        * url [max length](http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers) is around 2,000 characters
    * launch Filter view
        * store a filter object (in the Listings collection?) that contains a params hash that could be passed to query the API
            * in addition to eliminating items in the current collection, need to query API with the filter params
        * **emergent problem**: setting many filters, and then querying, and then removing the filters, will only affect results returned from further queries
        * Semantics: "listing(s)" are from Etsy, but they are "results" when they are displayed on the page. "Results" are comprised of many "listings"
    * be able to Eliminate items from the list (put into a recently eliminated view?)
    * Click to get more info about the item
        * Lightbox?
        * should this have a 2 level deep nested subroute?
        * option to buy the item, i.e. redirect to Etsy's site
    * Infinite scroll, to get the next 25 items
        * Infinite scroll should be modified by the URI, so that filtering a search, and then scrolling down will yield a further search with the same filters
    * Drag and drop images of products to save the products in some bucket
        * or just check a box to save the image into a bucket