require "rubygems"
require "bundler"
require "net/http"
Bundler.require

if ENV['MONGOHQ_URL']
  db_name = URI.parse(ENV['MONGOHQ_URL']).path.gsub(/^\//, '')
  conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
else
  db_name = 'tba'
  conn = Mongo::Connection.new
end

MongoMapper.connection = conn
MongoMapper.database = db_name

module OnTap
  BEER_URI = "http://www.brewerydb.com/api/beers?apikey=c3c5521565c5115a9461ec06e60d69fd&format=json"
end

class Location
  include MongoMapper::Document
  key :id
end

get "/" do
  "hi"
end

get "/beers" do
  content_type :json
  response = Net::HTTP.get_response(URI.parse(OnTap::BEER_URI))
  response.body
end

post "/locations/" do
  
end

get "/locations/:id" do
  content_type :json
  loc = Location.where(:id => params[:id]).first
  (loc || {}).to_json
end

post "/locations/:id/beers" do
  
end