#Etsy Searcher


##TODO
* ~~Visit the homepage, launch a BB router~~
* Search Etsy (change route for bookmarkability)
    * Instantiate a BB collection of items
        * override the `fetch` commmand of a collection to query the Etsy API
    * launch Subsearch view (adds a single level subroute, that will be edited to accomadate both searches and filters)
    * launch Filter view
    * be able to Eliminate items from the list (put into a recently eliminated view?)
    * Click to get more info about the item
        * Lightbox?
        * should this have a 2 level deep nested subroute?
        * option to buy the item, i.e. redirect to Etsy's site
    * Infinite scroll, to get the next 25 items
        * Infinite scroll should be modified by the URI, so that filtering a search, and then scrolling down will yield a further search with the same filters
    * Drag and drop images of products to save the products in some bucket
        * or just check a box to save the image into a bucket