class StockImageService
  def self.fetch_images(query, transparent: false, page: 1, per_page: 10)
    if transparent
      fetch_pixabay_images(query, transparent, page, per_page)
    else
      unsplash_images = fetch_unsplash_images(query, page, per_page)
      pexels_images   = fetch_pexels_images(query, page, per_page)
      pixabay_images  = fetch_pixabay_images(query, transparent, page, per_page)

      (unsplash_images + pexels_images + pixabay_images).uniq { |img| img[:url] }
    end
  end

  def self.fetch_unsplash_images(query, page, per_page)
    access_key = ENV['UNSPLASH_ACCESS_KEY']
    url = "https://api.unsplash.com/search/photos?query=#{CGI.escape(query)}&page=#{page}&per_page=#{per_page}"
    headers = { 'Authorization' => "Client-ID #{access_key}" }
    response = HTTParty.get(url, headers: headers)
    results = response.parsed_response['results'] || []

    results.map do |img|
      {
        url: img['urls']['regular'],
        source: 'Unsplash',
        attribution: "Photo by #{img['user']['name']} on Unsplash (#{img['links']['html']})"
      }
    end
  end

  def self.fetch_pexels_images(query, page, per_page)
    api_key = ENV['PEXELS_API_KEY']
    url = "https://api.pexels.com/v1/search?query=#{CGI.escape(query)}&page=#{page}&per_page=#{per_page}"
    headers = { 'Authorization' => api_key }
    response = HTTParty.get(url, headers: headers)
    results = response.parsed_response['photos'] || []

    results.map do |img|
      {
        url: img['src']['large'],
        source: 'Pexels',
        attribution: "Photo by #{img['photographer']} on Pexels (#{img['url']})"
      }
    end
  end

  def self.fetch_pixabay_images(query, transparent, page, per_page)
    api_key = ENV['PIXABAY_API_KEY']
    url = "https://pixabay.com/api/?key=#{api_key}&q=#{CGI.escape(query)}&page=#{page}&per_page=#{per_page}"
    url += "&colors=transparent" if transparent
    url += "&image_type=photo"
    response = HTTParty.get(url)
    results = response.parsed_response['hits'] || []

    results.map do |img|
      {
        url: img['webformatURL'],
        source: 'Pixabay',
        attribution: "Image by #{img['user']} from Pixabay",
        type: img['type']
      }
    end
  end
end
