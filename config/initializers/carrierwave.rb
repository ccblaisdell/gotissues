CarrierWave.configure do |config|
  config.storage = :s3
  
  config.s3_access_key_id = 'AKIAJZMHAB4NUFEM5HPA'
  config.s3_secret_access_key = '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'
  config.s3_bucket = 'got_issues'
end