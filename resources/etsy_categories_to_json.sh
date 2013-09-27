#!/bin/bash

# will output key/value pairs of Etsy's categories/sub-categories
# these are to be used in the construction of the 'category' parameter
# in Etsy API calls, About:
# http://www.etsy.com/developers/documentation/getting_started/api_basics#type_category

# NOTE that this script relies on accessing the url that Etsy displays all of its
# categories at visually (html), and parsing the urls that are href-ed

touch etsy_cat.js
echo "// output of etsy_categories_to_json.sh" > etsy_cat.js
echo "window.etsyCategories = [" >> etsy_cat.js

curl http://www.etsy.com/categories?ref=fp_nav_colors | \
gawk 'match($0, /<a href="\/listing-category\/(.*)\/(.*)"/, ary) {print ary[1],ary[2]}' | \
sed 's/\([a-z,_]*\) \([a-z,_,0-9]*\)/\    {"\1": "\2"},/' | \
sed '$ s/\(.*\),/\1/' >> etsy_cat.js

echo "];" >> etsy_cat.js
