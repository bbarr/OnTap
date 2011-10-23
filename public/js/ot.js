(function() {
  
  // modules
  var app, beer, locations, util;
  
  // constructors
  var Location, Beer;
  
  util = {
    
    bubble: function(tag, el) {
      tag = tag.toUpperCase();
      while (el.tagName !== tag) el = el.parentNode;
      return el;
    }
  };
  
  beers = {
    
    list: [],
    $beers: $('#beers'),
    
    load: function(cb) {
      var json = { "beers": { "beer": [ { "id": "6204", "name": "\"My\" Bock", "description": "Amber, malty and not too heavy, all around favorite even for the drinkers of the yellow fizzy stuff", "brewery": "1428", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "6", "style": "15", "links": { "edit": "http://brewerydb.com/beer/edit/id/6204", "detail": "http://brewerydb.com/beer/info/id/6204" } }, "created": "2011-06-01T09:39:12+00:00", "updated": "" }, { "id": "7219", "name": "\"Ptarmigan\" Pilsner", "description": "Ptarmigan Pilsner our GABF Silver Medal Winner is A traditional European Style Pilsner with a light hop aroma, smooth malt flavor and a distinctively clean finish.", "brewery": "64", "metadata": { "srm": "3", "available": "Year Round", "glassware": "4", "ibu": "42", "abv": "4.7", "style": "7", "links": { "edit": "http://brewerydb.com/beer/edit/id/7219", "detail": "http://brewerydb.com/beer/info/id/7219" } }, "created": "2011-02-25T05:40:25+00:00", "updated": "" }, { "id": "7218", "name": "\"Wheeler\" Wheat", "description": "Wheeler Wheat is a light and refreshing beer to quench your thirst after a hard day of adventure seeking. An American-style wheat beer with just a hint of orange peel and coriander, enjoy it with a slice of fruit if you like, we recommend a slice of orange!", "brewery": "64", "metadata": { "srm": "4", "available": "Year Round", "glassware": "5", "ibu": "18", "abv": "4.6", "style": "21", "links": { "edit": "http://brewerydb.com/beer/edit/id/7218", "detail": "http://brewerydb.com/beer/info/id/7218" } }, "created": "2011-02-25T05:36:45+00:00", "updated": "" }, { "id": "9607", "name": "\"Wintah\" Ale", "description": "Wormtown Brewery's Winter Seasonal is an American Brown Ale. Mahogany Brown in color with malty aroma and hints of toasted brown bread. Medium body highlighting luscious malt flavor and aftertaste of roasty cocoa.\n\nGold Medal Winner @ GIBF 2010", "brewery": "1708", "metadata": { "srm": "", "available": "Seasonal", "glassware": "5", "ibu": "24", "abv": "6", "style": "35", "links": { "edit": "http://brewerydb.com/beer/edit/id/9607", "detail": "http://brewerydb.com/beer/info/id/9607" } }, "created": "2011-08-19T16:11:16+00:00", "updated": "" }, { "id": "2829", "name": "#40 Golden Lager", "description": "", "brewery": "871", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/2829", "detail": "http://brewerydb.com/beer/info/id/2829" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "5104", "name": "#42 Cream Ale", "description": "", "brewery": "794", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "18", "links": { "edit": "http://brewerydb.com/beer/edit/id/5104", "detail": "http://brewerydb.com/beer/info/id/5104" } }, "created": "2010-10-31T15:17:21+00:00", "updated": "" }, { "id": "3776", "name": "#9", "description": "Not quite pale ale. A beer cloaked in secrecy. An ale whose mysterious unusual palate will swirl across your tongue and ask more questions than it answers.\n\nA sort of dry, crisp, fruity, refreshing, not-quite pale ale. #9 is really impossible to describe because there's never been anything else quite like it. Our secret ingredient introduces a most unusual aroma which is balanced with residual sweetness.", "brewery": "812", "metadata": { "srm": "9", "available": "Year Round", "glassware": "5", "ibu": "20", "abv": "4.6", "style": "33", "links": { "edit": "http://brewerydb.com/beer/edit/id/3776", "detail": "http://brewerydb.com/beer/info/id/3776" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "2010-11-27T07:27:54+00:00" }, { "id": "3032", "name": "'400' Honey Ale", "description": "Toasty malt and plenty of local wildflower honey make this golden blonde ale one of our most popular beers. Named after the famous “400” Chicago and Northwestern passenger train.", "brewery": "1268", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "", "style": "19", "links": { "edit": "http://brewerydb.com/beer/edit/id/3032", "detail": "http://brewerydb.com/beer/info/id/3032" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "2011-08-24T11:39:45+00:00" }, { "id": "9865", "name": "'A' Mountain Red", "description": "A medium bodied ale with a copper red color and malty caramel flavor that has a mild hop flavor and aroma.", "brewery": "1262", "metadata": { "srm": "", "available": "", "glassware": "5", "ibu": "", "abv": "", "style": "34", "links": { "edit": "http://brewerydb.com/beer/edit/id/9865", "detail": "http://brewerydb.com/beer/info/id/9865" } }, "created": "2011-08-25T08:11:05+00:00", "updated": "" }, { "id": "6523", "name": "'Bombs Away' Double IPA", "description": "This powerful India Pale Ale is dry-hopped with both Mt. Hood and Liberty hops to make an unbeatable brew.", "brewery": "409", "metadata": { "srm": "", "available": "Seasonal", "glassware": "5", "ibu": "", "abv": "11.5", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/6523", "detail": "http://brewerydb.com/beer/info/id/6523" } }, "created": "2011-01-29T14:26:45+00:00", "updated": "" }, { "id": "5739", "name": "(512) ALT", "description": "(512) ALT is a German-style amber ale that is fermented cooler than typical ales and cold conditioned like a lager. ALT means \"old\" in German and refers to a beer style made using ale yeast after many German brewers had switched to newly discovered lager yeast. This ale has a very smooth, yet pronounced, hop bitterness with a malty backbone and a characteristic German yeast character. Made with 98% Organic 2-row and Munch malts and US noble hops.", "brewery": "1", "metadata": { "srm": "", "available": "Spring", "glassware": "5", "ibu": "", "abv": "6", "style": "22", "links": { "edit": "http://brewerydb.com/beer/edit/id/5739", "detail": "http://brewerydb.com/beer/info/id/5739" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-04-04T15:00:40+00:00" }, { "id": "6804", "name": "(512) Black IPA", "description": "An entirely new creation from organic 2-row, organic Crystal 60 and Carafa III, a huskless black malt that gives this beer it’s black color with notes of coffee and chicory without any tannic bitterness. The hop additions are many and generous, featuring Apollo, Horizon, and Nugget, clocking the beer in at 70 IBU. Over 11 pounds per batch of Nugget hops are added directly to the fermenter yielding a resiny herbal and spicy aroma. A hybrid style for dark beer fans who love hops.", "brewery": "1", "metadata": { "srm": "Over 40", "available": "Seasonal", "glassware": "5", "ibu": "", "abv": "7", "style": "98", "links": { "edit": "http://brewerydb.com/beer/edit/id/6804", "detail": "http://brewerydb.com/beer/info/id/6804" } }, "created": "2011-10-02T06:23:36+00:00", "updated": "2011-09-15T05:21:11+00:00" }, { "id": "5740", "name": "(512) Bruin", "description": "At once cuddly and ferocious, (512) BRUIN combines a smooth, rich maltiness and mahogany color with a solid hop backbone and stealthy 7.6% alcohol. Made with Organic 2 Row and Munich malts, plus Chocolate and Crystal malts, domestic hops, and a touch of molasses, this brew has notes of raisins, dark sugars, and cocoa, and pairs perfectly with food and the crisp fall air.", "brewery": "1", "metadata": { "srm": "", "available": "Fall", "glassware": "5", "ibu": "", "abv": "7.6", "style": "35", "links": { "edit": "http://brewerydb.com/beer/edit/id/5740", "detail": "http://brewerydb.com/beer/info/id/5740" } }, "created": "2010-12-21T05:10:32+00:00", "updated": "2011-04-04T15:01:30+00:00" }, { "id": "6447", "name": "(512) Cascabel Cream Stout", "description": "Our cream stout, is an indulgent beer brewed with generous amounts of English chocolate and roasted malts, as well as the traditional addition of lactose. Our stout, however, parted ways with tradition when we added over 20 pounds of Cascabel peppers to the beer. Cascabel peppers, also called Guajillo, are characterized by their earthy character and deep, smooth spiciness. The peppers were de-stemmed by hand and added to the beer post-fermentation to achieve their most potent flavor potential. They add hints of raisins and berries to the beer, as well as a subtle tingling spiciness that washes away with each gulp.", "brewery": "1", "metadata": { "srm": "", "available": "Seasonal", "glassware": "5", "ibu": "", "abv": "6", "style": "43", "links": { "edit": "http://brewerydb.com/beer/edit/id/6447", "detail": "http://brewerydb.com/beer/info/id/6447" } }, "created": "2011-01-27T14:05:37+00:00", "updated": "2011-09-15T05:22:42+00:00" }, { "id": "5737", "name": "(512) IPA", "description": "(512) India Pale Ale is a big, aggressively dry-hopped American IPA with smooth bitterness (~65 IBU) balanced by medium maltiness. Organic 2-row malted barley, loads of hops, and great Austin water create an ale with apricot and vanilla aromatics that lure you in for more.", "brewery": "1", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "65", "abv": "7", "style": "49", "links": { "edit": "http://brewerydb.com/beer/edit/id/5737", "detail": "http://brewerydb.com/beer/info/id/5737" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2010-12-21T05:10:04+00:00" }, { "id": "5864", "name": "(512) One", "description": "Our first anniversary release is a Belgian-style strong ale that is amber in color, with a light to medium body. Subtle malt sweetness is balanced with noticeable hop flavor, light raisin and mildly spicy, cake-like flavors, and is finished with local wildflower honey aromas. Made with 80% Organic Malted Barley, Belgian Specialty grains, Forbidden Fruit yeast, domestic hops and Round Rock local wildflower honey, this beer is deceptively high in alcohol.", "brewery": "1", "metadata": { "srm": "", "available": "Summer", "glassware": "8", "ibu": "", "abv": "8", "style": "69", "links": { "edit": "http://brewerydb.com/beer/edit/id/5864", "detail": "http://brewerydb.com/beer/info/id/5864" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-04-04T15:03:25+00:00" }, { "id": "5736", "name": "(512) Pale", "description": "With Organic 2-row malted barley, (512) Pale is a copper colored American Pale Ale that balances earthy hop bitterness and hop flavor with a rich malty body.", "brewery": "1", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "5.8", "style": "33", "links": { "edit": "http://brewerydb.com/beer/edit/id/5736", "detail": "http://brewerydb.com/beer/info/id/5736" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-04-04T14:57:03+00:00" }, { "id": "5738", "name": "(512) Pecan Porter", "description": "Nearly black in color, (512) Pecan Porter is made with Organic US 2-row and Crystal malts along with Baird's Chocolate and Black malts. Its full body and malty sweetness are balanced with subtle pecan aroma and flavor from locally grown pecans. Yet another true Austin original!", "brewery": "1", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "6.8", "style": "39", "links": { "edit": "http://brewerydb.com/beer/edit/id/5738", "detail": "http://brewerydb.com/beer/info/id/5738" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-04-04T14:58:47+00:00" }, { "id": "5863", "name": "(512) Two", "description": "Our 2nd Anniversary release is an Double IPA heavily hopped with over 4 lbs/bbl of Simcoe, Magnum, Nugget and Ahtanum. This is a big, malty ale with delicate hop and rich malt aroma, complex hop flavor and sustained smooth hop bitterness. Hops are added from beginning to end during the brewing process and, like most (512) ales, this one is made using over 80% USDA certified organic ingredients. Not to be missed.", "brewery": "1", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "9", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/5863", "detail": "http://brewerydb.com/beer/info/id/5863" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-04-04T15:02:35+00:00" }, { "id": "5741", "name": "(512) Whiskey Barrel Aged Double Pecan Porter", "description": "Our first barrel project is in kegs and on it's way to beer bars around Austin. This is a bigger, bolder version of our mainstay Pecan Porter, with a richer finish. Two months on recently emptied Jack Daniels select barrels imparted a wonderful vanilla character from the oak and a pleasant amount of whiskey nose and flavor. All in all, I'm really proud of the hard work and effort put into this beer. Our first attempt at brewing it and our first attempt at managing barrels has paid off for everyone! Seek out this beer, but don't put it off. There is a very limited number of kegs available and it might go fast.", "brewery": "1", "metadata": { "srm": "", "available": "Winter", "glassware": "5", "ibu": "", "abv": "8.2", "style": "39", "links": { "edit": "http://brewerydb.com/beer/edit/id/5741", "detail": "http://brewerydb.com/beer/info/id/5741" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-10-02T05:17:54+00:00" }, { "id": "5735", "name": "(512) Wit", "description": "Made in the style of the Belgian wheat beers that are so refreshing, (512) Wit is a hazy ale spiced with coriander and domestic grapefruit peel. 50% US Organic 2-row malted barley and 50% US unmalted wheat and oats make this a light, crisp ale well suited for any occasion.", "brewery": "1", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "5.2", "style": "55", "links": { "edit": "http://brewerydb.com/beer/edit/id/5735", "detail": "http://brewerydb.com/beer/info/id/5735" } }, "created": "2010-12-21T05:10:04+00:00", "updated": "2011-04-04T14:49:09+00:00" }, { "id": "4857", "name": ".38 Special Bitter", "description": "Don't let the name scare you, this is an easy drinker, slightly sweet and bitter.", "brewery": "1219", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "3.8", "style": "25", "links": { "edit": "http://brewerydb.com/beer/edit/id/4857", "detail": "http://brewerydb.com/beer/info/id/4857" } }, "created": "2010-10-31T15:17:21+00:00", "updated": "" }, { "id": "10625", "name": "077XX India Pale Ale", "description": "", "brewery": "2243", "metadata": { "srm": "", "available": "", "glassware": "5", "ibu": "", "abv": "", "style": "49", "links": { "edit": "http://brewerydb.com/beer/edit/id/10625", "detail": "http://brewerydb.com/beer/info/id/10625" } }, "created": "2011-09-17T12:31:16+00:00", "updated": "" }, { "id": "7552", "name": "1 North Lager", "description": "A classic Vienna lager style beer. Similar to an Oktoberfest, but not quite as malty, the 1 N. Lager (named after our address) is a medium bodied lager that normally comes around in late summer and fall.\n\nGrain: 2 Row, Munich 10, Vienna, Caramel 60\nHops: Saaz, Mt. Hood", "brewery": "1573", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "", "style": "9", "links": { "edit": "http://brewerydb.com/beer/edit/id/7552", "detail": "http://brewerydb.com/beer/info/id/7552" } }, "created": "2011-04-03T06:06:17+00:00", "updated": "" }, { "id": "2089", "name": "1,2,3 Ale", "description": "", "brewery": "943", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "34", "links": { "edit": "http://brewerydb.com/beer/edit/id/2089", "detail": "http://brewerydb.com/beer/info/id/2089" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "3913", "name": "10 Squared Anniversary Reel Ale", "description": "The Mighty Fish Brewers first produced Ten Squared Anniversary Ale to celebrate Fish Brewing Company's tenth anniversary. The ale was so good and the response to it so overwhelmingly positive that it has become the crown jewel of REEL ALEs.\n\nTen different hops: Horizon, Chinook, Columbus, Willamette, Tradition, Northern Brewer, Santiam, Tettnanger, Cascade and Golding, in the order of their use -- give Ten Squared a unique hop character which has to be tasted to be believed.\n\nEven with 100 IBUs, this brew sports a strong malt backbone. Two-row Pale, Caramel 40, Caramel 75, Special B and Aromatic malts impart remarkable balance for such a hop monster. This is smooth ale with surprising similarities to ten year old malt whiskey.", "brewery": "526", "metadata": { "srm": "", "available": "Seasonal", "glassware": "5", "ibu": "100", "abv": "10", "style": "49", "links": { "edit": "http://brewerydb.com/beer/edit/id/3913", "detail": "http://brewerydb.com/beer/info/id/3913" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "2010-12-22T04:18:30+00:00" }, { "id": "9994", "name": "10-10-10", "description": "Our limited release Imperial IPA is all about excess. We use massive quantities of the finest European barley malts and American hops to produce a wonderfully malty beer with outrageous hop expression. From the initial aroma, through the balanced finish and the lingering hop flavors that coat your palette, 10-10-10 is truly fertilizer for the hop lover's soul\n\nIngredients:\nMaris Otter and Munich Malts\nAmarillo, Cascade, Centennial, Columbus, Northern Brewer, and Simcoe Hops", "brewery": "1684", "metadata": { "srm": "", "available": "Limited", "glassware": "5", "ibu": "110", "abv": "10", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/9994", "detail": "http://brewerydb.com/beer/info/id/9994" } }, "created": "2011-08-26T17:49:04+00:00", "updated": "" }, { "id": "4035", "name": "1000 Barley Wine", "description": "", "brewery": "1316", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "9.2", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/4035", "detail": "http://brewerydb.com/beer/info/id/4035" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "4025", "name": "1084 Barleywine", "description": "", "brewery": "850", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "73", "links": { "edit": "http://brewerydb.com/beer/edit/id/4025", "detail": "http://brewerydb.com/beer/info/id/4025" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "9733", "name": "10k IPA", "description": "", "brewery": "549", "metadata": { "srm": "", "available": "Limited", "glassware": "5", "ibu": "", "abv": "9.1", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/9733", "detail": "http://brewerydb.com/beer/info/id/9733" } }, "created": "2011-08-21T17:52:30+00:00", "updated": "" }, { "id": "7275", "name": "11", "description": "A distinctly hoppy Double IPA fermented with our House strain of Scottish ale yeast and dry hopped twice with Amarillo and Summit hops. We think you'll agree that this beer goes to 11.", "brewery": "94", "metadata": { "srm": "", "available": "Limited", "glassware": "5", "ibu": "", "abv": "8.2", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/7275", "detail": "http://brewerydb.com/beer/info/id/7275" } }, "created": "2011-02-27T15:28:09+00:00", "updated": "" }, { "id": "7917", "name": "110 K + OT", "description": "", "brewery": "379", "metadata": { "srm": "", "available": "Limited", "glassware": "4", "ibu": "", "abv": "10", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/7917", "detail": "http://brewerydb.com/beer/info/id/7917" } }, "created": "2011-04-28T18:33:12+00:00", "updated": "" }, { "id": "1048", "name": "1100 Wheat Wine", "description": "", "brewery": "527", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "11.5", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/1048", "detail": "http://brewerydb.com/beer/info/id/1048" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "10779", "name": "11th Hour IPA", "description": "Hop aroma and flavor dominate this IPA. However, the malt character of this deep amber colored ale nicely balances the hop component thus avoiding a harsh bitterness. Pure hoppiness!", "brewery": "1593", "metadata": { "srm": "", "available": "Year Round", "glassware": "5", "ibu": "", "abv": "", "style": "49", "links": { "edit": "http://brewerydb.com/beer/edit/id/10779", "detail": "http://brewerydb.com/beer/info/id/10779" } }, "created": "2011-09-28T18:06:58+00:00", "updated": "" }, { "id": "4229", "name": "12 Dogs Christmas Ale", "description": "Spiced for the holidays with honey, cinnamon, ginger, nutmeg and Santa's secret recipe.", "brewery": "1255", "metadata": { "srm": "", "available": "Seasonal", "glassware": "5", "ibu": "21.5", "abv": "8.3", "style": "75", "links": { "edit": "http://brewerydb.com/beer/edit/id/4229", "detail": "http://brewerydb.com/beer/info/id/4229" } }, "created": "2010-10-31T15:17:21+00:00", "updated": "2011-11-01T16:21:40+00:00" }, { "id": "8376", "name": "12 Horse Ale", "description": "", "brewery": "1408", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/8376", "detail": "http://brewerydb.com/beer/info/id/8376" } }, "created": "2011-06-06T14:26:29+00:00", "updated": "" }, { "id": "3950", "name": "120 Minute IPA", "description": "Too extreme to be called beer? Brewed to a colossal 45-degree plato, boiled for a full 2 hours while being continuously hopped with high-alpha American hops, then dry-hopped daily in the fermenter for a month & aged for another month on whole-leaf hops!!!\n\nOur 120 Minute I.P.A. is by far the biggest I.P.A. ever brewed! At about 18% abv and 120 ibus you can see why we call this beer THE HOLY GRAIL for hopheads!\n\nWe brew 120 Minute IPA three times a year, but it goes fast. If you find some grab a few bottles, some to enjoy and some to age.", "brewery": "459", "metadata": { "srm": "", "available": "Limited", "glassware": "5", "ibu": "120", "abv": "18", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/3950", "detail": "http://brewerydb.com/beer/info/id/3950" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "2010-10-30T18:17:25+00:00" }, { "id": "1459", "name": "120 Shilling Scotch Ale", "description": "", "brewery": "756", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "32", "links": { "edit": "http://brewerydb.com/beer/edit/id/1459", "detail": "http://brewerydb.com/beer/info/id/1459" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "5595", "name": "13th Anniversary Ale", "description": "Stone 13th Anniversary Ale pours brilliant deep red with a light tan foam. Up front, the aroma is all piney, resinous and citrus hops. Upon tasting, the hops are still on the front, and they are balanced with the malty, toffee like flavors contributed from the blend of crystal and amber malts used in the brewhouse. The finish is deliciously bitter, with a touch of warmth provided by the 9.5% alcohol. Bitterness comes in at 90+ IBU.", "brewery": "1204", "metadata": { "srm": "", "available": "Not Available", "glassware": "", "ibu": "90", "abv": "9.5", "style": "33", "links": { "edit": "http://brewerydb.com/beer/edit/id/5595", "detail": "http://brewerydb.com/beer/info/id/5595" } }, "created": "2010-10-31T15:17:21+00:00", "updated": "2011-10-06T05:19:36+00:00" }, { "id": "7901", "name": "13th Hour Stout", "description": "", "brewery": "157", "metadata": { "srm": "", "available": "", "glassware": "5", "ibu": "", "abv": "9", "style": "46", "links": { "edit": "http://brewerydb.com/beer/edit/id/7901", "detail": "http://brewerydb.com/beer/info/id/7901" } }, "created": "2011-04-27T18:25:15+00:00", "updated": "" }, { "id": "8491", "name": "15 Anniversary", "description": "", "brewery": "1453", "metadata": { "srm": "", "available": "Limited", "glassware": "6", "ibu": "", "abv": "15", "style": "68", "links": { "edit": "http://brewerydb.com/beer/edit/id/8491", "detail": "http://brewerydb.com/beer/info/id/8491" } }, "created": "2011-10-06T06:24:03+00:00", "updated": "" }, { "id": "1805", "name": "1554 Enlightened Black Ale", "description": "Born of a flood and centuries-old Belgian text, 1554 Enlightened Black Ale uses a lager yeast strain and dark chocolaty malts to redefine what dark beer can be. In 1997, a Fort Collins flood destroyed the original recipe our researcher, Phil Benstein, found in the library. So Phil and brewmaster, Peter Bouckaert, traveled to Belgium to retrieve this unique style lost to the ages. Their first challenge was deciphering antiquated script and outdated units of measurement, but trial and error (and many months of in-house sampling) culminated in 1554, a highly quaffable dark beer with a moderate body and mouthfeel.", "brewery": "905", "metadata": { "srm": "", "available": "Year Round", "glassware": "6", "ibu": "21", "abv": "5.6", "style": "59", "links": { "edit": "http://brewerydb.com/beer/edit/id/1805", "detail": "http://brewerydb.com/beer/info/id/1805" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "2011-04-28T18:57:11+00:00" }, { "id": "8862", "name": "15th Anniversary", "description": "", "brewery": "471", "metadata": { "srm": "", "available": "Limited", "glassware": "4", "ibu": "", "abv": "", "style": "7", "links": { "edit": "http://brewerydb.com/beer/edit/id/8862", "detail": "http://brewerydb.com/beer/info/id/8862" } }, "created": "2011-07-07T04:09:54+00:00", "updated": "" }, { "id": "8280", "name": "15th Anniversary Ale", "description": "", "brewery": "1044", "metadata": { "srm": "", "available": "Limited", "glassware": "5", "ibu": "", "abv": "", "style": "47", "links": { "edit": "http://brewerydb.com/beer/edit/id/8280", "detail": "http://brewerydb.com/beer/info/id/8280" } }, "created": "2011-05-29T07:26:04+00:00", "updated": "" }, { "id": "5986", "name": "15th Anniversary Wood Aged Double IPA", "description": "Based on our most award-winning beer, Denver Pale Ale, this copper-hued treat is a celebration of everything Great Divide does best. Plenty of malty sweetness provides a backdrop for earthy, floral English and American hops, while French and American oak round off the edges and provide a touch of vanilla. Thanks to everyone who's supported us for the last 15 years—here’s to 15 more!", "brewery": "604", "metadata": { "srm": "", "available": "Seasonal", "glassware": "5", "ibu": "", "abv": "10", "style": "50", "links": { "edit": "http://brewerydb.com/beer/edit/id/5986", "detail": "http://brewerydb.com/beer/info/id/5986" } }, "created": "2010-12-17T16:58:48+00:00", "updated": "" }, { "id": "8845", "name": "1634 Ale", "description": "", "brewery": "1516", "metadata": { "srm": "", "available": "", "glassware": "5", "ibu": "", "abv": "", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/8845", "detail": "http://brewerydb.com/beer/info/id/8845" } }, "created": "2011-03-07T06:27:43+00:00", "updated": "" }, { "id": "2547", "name": "1634 Urtyp Hell", "description": "", "brewery": "972", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/2547", "detail": "http://brewerydb.com/beer/info/id/2547" } }, "created": "2010-10-31T15:17:20+00:00", "updated": "" }, { "id": "4410", "name": "1664", "description": "", "brewery": "203", "metadata": { "srm": "", "available": "", "glassware": "", "ibu": "", "abv": "", "style": "", "links": { "edit": "http://brewerydb.com/beer/edit/id/4410", "detail": "http://brewerydb.com/beer/info/id/4410" } }, "created": "2010-10-31T15:17:21+00:00", "updated": "2011-09-18T16:01:33+00:00" }, { "id": "10824", "name": "16th Avenue Pilsner", "description": "A refreshing, golden-hued European-style pilsner with a sublime Czech \nSaaz hop signature.", "brewery": "3226", "metadata": { "srm": "", "available": "", "glassware": "4", "ibu": "32", "abv": "5", "style": "7", "links": { "edit": "http://brewerydb.com/beer/edit/id/10824", "detail": "http://brewerydb.com/beer/info/id/10824" } }, "created": "2011-09-29T17:33:36+00:00", "updated": "" }, { "id": "9708", "name": "1757 Amber Lager", "description": "Crisp, drinkable lager with a malty backbone and a pleasant hop character. This style of lager has been traditionally brewed in Germany as an \"Export Lager\", which was a tax classification for slightly higher alcohol content.", "brewery": "1328", "metadata": { "srm": "", "available": "", "glassware": "5", "ibu": "", "abv": "6", "style": "5", "links": { "edit": "http://brewerydb.com/beer/edit/id/9708", "detail": "http://brewerydb.com/beer/info/id/9708" } }, "created": "2011-08-21T05:00:01+00:00", "updated": "" } ], "pages": { "page": "1", "total": "220" } } }
      beers.list = json.beers.beer;
      beers.pages = json.beers.pages;
      if (cb) cb();
    },
    
    render: function() {
      var html = Marker.render('beers', beers.list);
      this.$beers.append(html);
    }
  };

  locations = {
    
    nearby: [],
    existing: [],
    $list: $('#locations'),
    $location: $('#location'),
    
    detect: function(cb) {
      
       navigator.geolocation.getCurrentPosition(function(position) {
         
          var loc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
              places = new google.maps.places.PlacesService(document.getElementById('map_decoy'));

          places.search({
              location: loc,
              radius: '10000',
              types: [ 'bar', 'restaurant' ]
            }, function(data) { 
              locations.nearby = _(data).map(function(l) { return new Location(l); }); 
              if (cb) cb();
            });
        });
    },
    
    bind: function() {
      this.$list.delegate('li', 'click', function(e) {
        var target = util.bubble('li', e.target),
            location = locations.find(target.getAttribute('id'));
        locations.show(location);
      });
    },
    
    find: function(id) {
      return _(locations.nearby).detect(function(l) { return l.id === id });
    },
    
    show: function(location) {
      location.persisted(function(result) {
        if (result) {
          console.log(location, result, 'persisted!');
        }
        else {
          console.log(location, result, 'not persisted yet')
        }
      });
    },
    
    render: function() {
      var html = Marker.render('locations', locations.nearby);
      locations.$list.append(html);
      locations.bind();
    }
  };
      
  app = {
    
    render: function() {
      var cb = arguments.shift();
      cb.apply(this, arguments);
    },
    
    init: function() {
      $.ajax({
        url: 'http://localhost:9393',
        type: 'GET',
        success: function(data) {
          console.log(data);
        }
      })
      beers.load();
      locations.detect(locations.render);      
    }
  };
  
  Location = function(data) {
    this.name = data.name;
    this.lat = data.geometry.location.lat();
    this.lng = data.geometry.location.lng();    
    this.id = this.lat + ':' + this.lng;
  }
  
  Location.prototype = {
    
    persisted: function(cb) {
      var self = this,
          result = _(locations.existing).detect(function(l) { return l.id === self.id });
      cb(result);
    }
  };

  Marker.register('locations', function(locations) {
    var self = this;
    _(locations).each(function(l) {
      self
        .li({ id: l.id })
          .text(l.name)
        .end();
    });
  });

  Marker.register('beers', function(beers) {

    console.log(beers);
  });

  app.init();
})();
