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
      $.get('/beers', function(json) {
        beers.list = json.beers.beer;
        beers.pages = json.beers.pages;
        beers.render();
        if (cb) cb();
      }, 'json');
    },
    
    render: function() {
      console.log(beers.list);
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
        locations.show_location(location);
      });
      
      this.$location.delegate('a.to_list', 'click', function(e) {
        e.preventDefault();
        locations.show_list();
      });
      
      this.$location.delegate('a.add_beer', 'click', function(e) {
        e.preventDefault();
        locations.$list.hide();
        locations.$location.hide();
        beers.$beers.show();
      });
    },
    
    find: function(id) {
      return _(locations.nearby).detect(function(l) { return l.id === id });
    },
    
    show_location: function(location) {
      location.load(function() {
        var html = Marker.render('location', location);
        locations.$list.hide();
        locations.$location.html('').append(html).show();
      });
    },
    
    show_list: function() {
      locations.$location.hide();
      locations.$list.show();
    },
    
    render: function() {
      var html = Marker.render('locations', locations.nearby);
      locations.$list.append(html);
      locations.bind();
      locations.show_list();
    }
  };
      
  app = {
    
    render: function() {
      var cb = arguments.shift();
      cb.apply(this, arguments);
    },
    
    init: function() {
      // callback soup
      locations.detect(function() {
        beers.load(locations.render); 
      });      
    }
  };
  
  Location = function(data) {
    this.name = data.name;
    this.lat = data.geometry.location.lat();
    this.lng = data.geometry.location.lng();    
    this.id = this.lat + ':' + this.lng;
    this.beers = [];
  }
  
  Location.prototype = {
    
    load: function(cb) {
      
      var self = this;
      
      $.ajax({
        url: '/locations/' + encodeURI(self.id),
        type: 'GET',
        success: function(data) {
          self.populate(data);
          cb(self);
        }
      });
    },
    
    populate: function(data) {
      for (var key in data) {
        this[key] = data[key];
      }
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
  
  Marker.register('location', function(location) {
    this
      .a({ href: '#', className: 'to_list' })
        .text('back to list')
      .end()
      .h3(location.name).end();
      
      if (location.beers.length === 0) {
        this.p('No beers listed yet... Tell us what is available!').end();
      }
      else {
        this.partial('beers', location.beers)
      }
      
      this.a({ href: '#', className: 'add_beer' })
        .text('Report a beer')
  });

  Marker.register('beers', function(beers) {
    this
      .ul();
      
      for (var i = 0, len = beers.length; i < len; i++) {
        this
          .li(beers[i].name).end();
      }
  });

  app.init();
})();
