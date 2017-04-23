 json.type "FeatureCollection"
 json.features @cemeteries do |cemetery|
  json.type "Feature"
  json.id Integer(cemetery["id"])
  json.properties do
    json.title "#{cemetery['name']} (#{cemetery['cemetery_id']})"
  end
  json.geometry JSON.parse(cemetery["geometry"])
end
