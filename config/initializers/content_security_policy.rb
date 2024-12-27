# Be sure to restart your server when you modify this file.

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self, :https
    policy.font_src    :self, :https, :data
    policy.img_src     :self, :https, :data, 
                       "https://images.unsplash.com", 
                       "https://images.pexels.com",
                       "https://pixabay.com"
    policy.object_src  :none
    policy.script_src  :self, :https, :unsafe_hashes
    policy.style_src   :self, :https, :unsafe_inline  # For Tailwind
    policy.connect_src :self, :https,
                       "https://api.unsplash.com",
                       "https://api.pexels.com",
                       "https://pixabay.com"
  end

  # Generate session nonces for permitted importmap and inline scripts
  config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
  config.content_security_policy_nonce_directives = %w(script-src)
end
